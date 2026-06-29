const BACKEND_URL = process.env.BACKEND_URL || 'http://127.0.0.1:5000';

async function backendGet(path) {
  const res = await fetch(`${BACKEND_URL}${path}`);
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

async function backendPost(path, body) {
  const res = await fetch(`${BACKEND_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

module.exports = { backendGet, backendPost };
