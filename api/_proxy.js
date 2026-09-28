const API_BASE = 'https://hlj353g6ac.execute-api.us-east-1.amazonaws.com/prod';
module.exports = (path) => async (req, res) => {
  try {
    const r = await fetch(API_BASE + path, { headers: { Accept: 'application/json' } });
    const body = await r.text();
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    res.status(r.status).send(body);
  } catch (e) {
    res.status(502).json({ error: 'upstream unavailable' });
  }
};
