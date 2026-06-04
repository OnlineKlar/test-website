export const config = { runtime: "edge" };

export default async function handler(req) {
  if (req.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  const GITHUB_OWNER = process.env.GITHUB_OWNER;
  const GITHUB_REPO = process.env.GITHUB_REPO;

  try {
    const { content } = await req.json();
    const fileRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content.json`,
      { headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "User-Agent": "CMS-Bot" } }
    );
    const fileData = await fileRes.json();
    const updateRes = await fetch(
      `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content.json`,
      {
        method: "PUT",
        headers: { Authorization: `Bearer ${GITHUB_TOKEN}`, "Content-Type": "application/json", "User-Agent": "CMS-Bot" },
        body: JSON.stringify({
          message: "CMS: content.json aktualisiert",
          content: btoa(unescape(encodeURIComponent(JSON.stringify(content, null, 2)))),
          sha: fileData.sha
        })
      }
    );
    if (!updateRes.ok) { const err = await updateRes.json(); return new Response(JSON.stringify(err), { status: 500 }); }
    return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (err) {
    return new Response(err.message, { status: 500 });
  }
}