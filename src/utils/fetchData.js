const DEFAULT_CRAFT_API_URL = "https://degoudenkooi.pluxit.be/web/api";
const DEFAULT_REVALIDATE_SECONDS = 3600;
const DEFAULT_TIMEOUT_MS = 6000;
const MAX_ATTEMPTS = 2;
const MAX_MEMORY_ENTRIES = 60;
const RETRY_DELAY_MS = 150;

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

function getTimeoutMs() {
  const configuredTimeout = Number.parseInt(
    process.env.CRAFT_API_TIMEOUT_MS || "",
    10,
  );

  return Number.isFinite(configuredTimeout) && configuredTimeout > 0
    ? configuredTimeout
    : DEFAULT_TIMEOUT_MS;
}

function getOperationName(graphql) {
  return (
    graphql.match(/\b(?:query|mutation)\s+([A-Za-z0-9_]+)/)?.[1] || "anonymous"
  );
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

async function requestCraftApi({ graphql, revalidate, tags, token }) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), getTimeoutMs());
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

  if (typeof window === "undefined") {
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

export async function fetchData(
  graphql,
  options = { revalidate: REVALIDATE, tags: [] },
  token,
) {
  const { revalidate, tags } = getRequestOptions(options);
  const cacheKey = graphql.trim();
  const operation = getOperationName(graphql);
  let lastError;

  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    const startedAt = Date.now();

    try {
      const data = await requestCraftApi({
        graphql,
        revalidate,
        tags,
        token,
      });

      if (!token) {
        rememberSuccessfulResponse(cacheKey, data);
      }

      return data;
    } catch (error) {
      lastError = error;
      const willRetry = error.retryable && attempt < MAX_ATTEMPTS;

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

  if (!token && lastSuccessfulResponses.has(cacheKey)) {
    console.warn("Serving the last successful Craft API response", {
      operation,
      tags,
      code: lastError?.code || "unknown",
      causeCode: lastError?.causeCode,
    });

    return lastSuccessfulResponses.get(cacheKey);
  }

  console.error("Craft API unavailable and no fallback is cached", {
    operation,
    tags,
    code: lastError?.code || "unknown",
    causeCode: lastError?.causeCode,
    status: lastError?.status,
  });

  throw lastError;
}
