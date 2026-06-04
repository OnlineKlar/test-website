export const config = { runtime: "edge" };
export default async function handler(req) {
  const token = process.env.GITHUB_TOKEN || "NICHT GESETZT";
  const owner = process.env.GITHUB_OWNER || "NICHT GESETZT";
  const repo = process.env.GITHUB_REPO || "NICHT GESETZT";
  return new Response(JSON.stringify({
    token_length: token.length,
    token_prefix: token.substring(0, 10),
    token_suffix: token.substring(token.length - 4),
    owner,
    repo
  }, null, 2), { status: 200, headers: { "Content-Type": "application/json" } });
}