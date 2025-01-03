export async function fetchData(graphql) {
  let craftUrl = "https://degoudenkooi.pluxit.be/web/api";

  const res = await fetch(craftUrl, {
    method: "post",
    body: graphql,
    cache: "no-store",
    maxDuration: 25,
    headers: {
      "Content-Type": "application/graphql",
      // Authorization: "Bearer JYZ6XcF_A15nBvbMC1SOiM14Zk-YxNE8",
    },
  });

  if (res.status !== 200) {
    throw new Error("Failed to fetch API");
  }

  const json = await res.json();

  if (json.errors) {
    console.error(json.errors, graphql);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}
