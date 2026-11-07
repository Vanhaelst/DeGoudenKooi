const DEFAULT_CRAFT_API_URL = "https://degoudenkooi.pluxit.be/web/api";
const DEFAULT_REVALIDATE_SECONDS = 3600;
// Craft normally answers within 0.2-0.6 s. Two attempts of 4 s (plus a short
// pause) stay well below the 15 s function limit on Vercel, also when a page
// needs two Craft requests one after the other.
const DEFAULT_TIMEOUT_MS = 4000;
const DEFAULT_TOTAL_BUDGET_MS = 8500;
const MAX_ATTEMPTS = 2;
const MAX_MEMORY_ENTRIES = 60;
const MIN_ATTEMPT_MS = 1000;
const RETRY_DELAY_MS = 250;

const lastSuccessfulResponses = new Map();

const configuredRevalidate = Number.parseInt(
  process.env.CRAFT_API_REVALIDATE_SECONDS || "",
  10,
);

export const REVALIDATE =
  Number.isFinite(configuredRevalidate) && configuredRevalidate > 0
    ? configuredRevalidate
    : DEFAULT_REVALIDATE_SECONDS;

class CraftApiError extends Error {
  constructor(message, { causeCode, code, retryable = false, status } = {}) {
    super(message);
    this.name = "CraftApiError";
    this.causeCode = causeCode;
    this.code = code;
    this.retryable = retryable;
    this.status = status;
  }
}

const wait = (delay) =>
  new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

function getRequestOptions(options) {
  if (typeof options === "number") {
    return { revalidate: options, tags: [] };
  }

  return {
    revalidate: options?.revalidate ?? REVALIDATE,
    tags: Array.isArray(options?.tags) ? options.tags : [],
  };
}

function getPositiveIntegerFromEnv(name, fallback) {
  const configured = Number.parseInt(process.env[name] || "", 10);

  return Number.isFinite(configured) && configured > 0 ? configured : fallback;
}

function getOperationName(graphql) {
  return (
    graphql.match(/\b(?:query|mutation)\s+([A-Za-z0-9_]+)/)?.[1] || "anonymous"
  );
}

// Next.js uses errors with a digest (redirect, notFound, dynamic usage) for
// its own control flow. Those must never be treated as a Craft outage.
function isNextInternalError(error) {
  return typeof error?.digest === "string";
}

function rememberSuccessfulResponse(key, data) {
  if (lastSuccessfulResponses.has(key)) {
    lastSuccessfulResponses.delete(key);
  }

  lastSuccessfulResponses.set(key, data);

  if (lastSuccessfulResponses.size > MAX_MEMORY_ENTRIES) {
    const oldestKey = lastSuccessfulResponses.keys().next().value;
    lastSuccessfulResponses.delete(oldestKey);
  }
}

async function requestCraftApi({
  graphql,
  timeoutMs,
  token,
  useFetchCache,
  revalidate,
  tags,
}) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const craftUrl = process.env.CRAFT_API_URL || DEFAULT_CRAFT_API_URL;

  const headers = {
    "Content-Type": "application/graphql",
  };

  if (token) {
    headers["X-Craft-Token"] = token;
  }

  const requestOptions = {
    method: "post",
    body: graphql,
    headers,
    signal: controller.signal,
  };

  // Inside the durable cache (see loadWithLastKnownGood) Next.js already
  // bypasses the fetch cache, so no cache options are passed there.
  if (typeof window === "undefined" && useFetchCache) {
    if (token || revalidate === 0) {
      requestOptions.cache = "no-store";
    } else {
      requestOptions.next = { tags, revalidate };
    }
  }

  try {
    const response = await fetch(craftUrl, requestOptions);

    if (!response.ok) {
      throw new CraftApiError("Craft API returned an unsuccessful response", {
        code: "http_error",
        retryable:
          response.status === 408 ||
          response.status === 429 ||
          response.status >= 500,
        status: response.status,
      });
    }

    let json;

    try {
      json = await response.json();
    } catch {
      throw new CraftApiError("Craft API returned invalid JSON", {
        code: "invalid_json",
        retryable: true,
      });
    }

    if (json.errors) {
      throw new CraftApiError("Craft API returned GraphQL errors", {
        code: "graphql_error",
      });
    }

    return json.data;
  } catch (error) {
    if (isNextInternalError(error)) {
      throw error;
    }

    if (error?.name === "AbortError") {
      throw new CraftApiError("Craft API request timed out", {
        code: "timeout",
        retryable: true,
      });
    }

    if (error instanceof CraftApiError) {
      throw error;
    }

    throw new CraftApiError("Craft API request failed", {
      causeCode: error?.cause?.code || error?.code,
      code: "network_error",
      retryable: true,
    });
  } finally {
    clearTimeout(timeoutId);
  }
}

// Asks Craft at most MAX_ATTEMPTS times within one overall time budget.
// Only temporary problems (time-out, network, 5xx, invalid JSON) are retried.
async function loadFromCraft({
  graphql,
  operation,
  tags,
  token,
  useFetchCache,
  revalidate,
}) {
  const timeoutMs = getPositiveIntegerFromEnv(
    "CRAFT_API_TIMEOUT_MS",
    DEFAULT_TIMEOUT_MS,
  );
  const budgetMs = getPositiveIntegerFromEnv(
    "CRAFT_API_TOTAL_BUDGET_MS",
    DEFAULT_TOTAL_BUDGET_MS,
  );
  const deadline = Date.now() + budgetMs;
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const startedAt = Date.now();

    try {
      return await requestCraftApi({
        graphql,
        timeoutMs: Math.min(timeoutMs, Math.max(deadline - startedAt, 0)),
        token,
        useFetchCache,
        revalidate,
        tags,
      });
    } catch (error) {
      if (isNextInternalError(error)) {
        throw error;
      }

      lastError = error;
      const remainingMs = deadline - Date.now() - RETRY_DELAY_MS;
      const willRetry =
        error.retryable &&
        attempt < MAX_ATTEMPTS &&
        remainingMs >= MIN_ATTEMPT_MS;

      console.warn("Craft API request issue", {
        operation,
        tags,
        attempt,
        durationMs: Date.now() - startedAt,
        code: error.code || "unknown",
        causeCode: error.causeCode,
        status: error.status,
        willRetry,
      });

      if (!willRetry) {
        break;
      }

      await wait(RETRY_DELAY_MS);
    }
  }

  throw lastError;
}

// Stale-if-error: only a valid Craft answer is stored in the Next.js data
// cache (shared by all serverless instances). When the stored copy is older
// than `revalidate`, Next.js serves it right away and refreshes it in the
// background. If that refresh fails, the last good copy stays in place
// instead of a 500. With a plain fetch, a 200 response with GraphQL errors
// would be cached for an hour as well.
async function loadWithLastKnownGood({
  graphql,
  cacheKey,
  operation,
  revalidate,
  tags,
}) {
  // Server only: this check keeps next/cache out of the browser bundle.
  if (typeof window === "undefined") {
    const { unstable_cache } = await import("next/cache");

    return unstable_cache(
      () =>
        loadFromCraft({
          graphql,
          operation,
          tags,
          useFetchCache: false,
        }),
      ["craft-graphql", cacheKey],
      { revalidate, tags },
    )();
  }

  return loadFromCraft({ graphql, operation, tags, useFetchCache: true });
}

export async function fetchData(
  graphql,
  options = { revalidate: REVALIDATE, tags: [] },
  token,
) {
  const { revalidate, tags } = getRequestOptions(options);
  const cacheKey = graphql.trim();
  const operation = getOperationName(graphql);
  const isServer = typeof window === "undefined";
  const canUseLastKnownGood = isServer && !token;

  try {
    const data =
      canUseLastKnownGood && revalidate !== 0
        ? await loadWithLastKnownGood({
            graphql,
            cacheKey,
            operation,
            revalidate,
            tags,
          })
        : await loadFromCraft({
            graphql,
            operation,
            tags,
            token,
            useFetchCache: true,
            revalidate,
          });

    if (canUseLastKnownGood) {
      rememberSuccessfulResponse(cacheKey, data);
    }

    return data;
  } catch (error) {
    if (isNextInternalError(error)) {
      throw error;
    }

    if (canUseLastKnownGood && lastSuccessfulResponses.has(cacheKey)) {
      console.warn("Serving the last successful Craft API response", {
        operation,
        tags,
        code: error?.code || "unknown",
        causeCode: error?.causeCode,
      });

      return lastSuccessfulResponses.get(cacheKey);
    }

    console.error("Craft API unavailable and no fallback is cached", {
      operation,
      tags,
      code: error?.code || "unknown",
      causeCode: error?.causeCode,
      status: error?.status,
    });

    throw error;
  }
}
