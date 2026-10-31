const MODELS = {
  deepseek: {
    url: 'https://apixzz.my-website.eu.cc/api/v1/ai/deepseek',
    name: 'deepseek/deepseek-r1'
  },
  gemini: {
    url: 'https://apixzz.my-website.eu.cc/api/v1/ai/gemini',
    name: 'Gemini'
  },
  chatgpt: {
    url: 'https://apixzz.my-website.eu.cc/api/v1/ai/chatgpt',
    name: 'ChatGPT Anon'
  },
  l2d: {
    url: 'https://apixzz.my-website.eu.cc/api/v1/ai/l2dchat',
    name: 'L2D Chat'
  },
  pollinations: {
    url: 'https://apixzz.my-website.eu.cc/api/v1/ai/pollinations',
    name: 'Pollinations'
  }
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { message, system, model = 'deepseek' } = req.body;
  const selected = MODELS[model] || MODELS.deepseek;

  try {
    const upstream = await fetch(selected.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, system })
    });

    const data = await upstream.json();
    return res.status(upstream.status).json({
      ...data,
      model: selected.name
    });
  } catch (err) {
    return res.status(500).json({ error: err.message, model: selected.name });
  }
      }
