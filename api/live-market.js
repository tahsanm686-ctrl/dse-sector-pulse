export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=30, stale-while-revalidate=30');
  try {
    const r = await fetch('https://www.dse.com.bd/api/live/market', { headers: { 'User-Agent': 'DSE-Sector-Pulse/1.0', 'Accept': 'application/json' } });
    if (!r.ok) return res.status(r.status).json({ error: 'DSE market unavailable', status: r.status });
    const data = await r.json();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: 'DSE market fetch failed' });
  }
}
