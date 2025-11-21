export async function fetchData(
  graphql,
  options = { revalidate: 3600, tags: [] },
  token,
) {
  // let craftUrl = `https://degoudenkooi.pluxit.be/web/api${token ? `?token=${token}` : ""}`;
  let craftUrl = `https://degoudenkooi.pluxit.be/web/api`;

  const headers = {
    "Content-Type": "application/graphql",
    // Authorization: "Bearer JYZ6XcF_A15nBvbMC1SOiM14Zk-YxNE8",
  };

  if (token) {
    headers["X-Craft-Token"] = token;
  }

  const res = await fetch(craftUrl, {
    next: {
      tags: options.tags,
      revalidate: token ? 0 : options.revalidate, // 1 hour
    },
    method: "post",
    body: graphql,
    maxDuration: 25,
    headers,
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }
  // console.log("token", token, json.data);
  return json.data;
}
