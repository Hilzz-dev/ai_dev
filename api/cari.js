export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { query, mode = 'web', limit = '10' } = req.query;

  if (!query || !query.trim()) {
    return res.status(400).json({
      status: false,
      code: 400,
      error: 'Parameter "query" wajib diisi'
    });
  }

  try {
    const params = new URLSearchParams({
      query: query.trim(),
      mode,
      limit: String(limit)
    });

    const upstream = await fetch(
      `https://apixzz.my-website.eu.cc/api/v1/search/google-bing?${params.toString()}`
    );

    const data = await upstream.json();
    return res.status(upstream.status).json(data);
  } catch (err) {
    return res.status(500).json({
      status: false,
      code: 500,
      error: err.message
    });
  }
}
