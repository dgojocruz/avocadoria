// Vercel serverless function — proxies Google Directions API (avoids browser CORS)
// Browser calls /api/directions?origin=LAT,LNG&destination=LAT,LNG
// The Google API key stays server-side and is never exposed to the browser.

export default async function handler(req, res) {
  const { origin, destination } = req.query

  if (!origin || !destination) {
    return res.status(400).json({ error: 'Missing origin or destination' })
  }

  const KEY = process.env.GOOGLE_MAPS_API_KEY
  if (!KEY) {
    return res.status(500).json({ error: 'Server API key not configured' })
  }

  const url = `https://maps.googleapis.com/maps/api/directions/json`
    + `?origin=${encodeURIComponent(origin)}`
    + `&destination=${encodeURIComponent(destination)}`
    + `&mode=driving&key=${KEY}`

  try {
    const r = await fetch(url)
    const data = await r.json()

    if (data.status !== 'OK' || !data.routes?.length) {
      return res.status(200).json({ ok: false })
    }

    const route = data.routes[0]
    const leg = route.legs[0]
    return res.status(200).json({
      ok: true,
      polyline: route.overview_polyline.points,
      distanceText: leg.distance.text,
      durationText: leg.duration.text,
    })
  } catch (e) {
    return res.status(200).json({ ok: false })
  }
}
