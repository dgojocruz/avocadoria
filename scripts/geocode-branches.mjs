/**
 * geocode-branches.mjs
 * ─────────────────────────────────────────────────────────────────────────────
 * Reads all branches from OurStoresPage.jsx, geocodes each address using
 * Google Geocoding API, and writes updated lat/lng back to the file.
 *
 * HOW TO RUN:
 *   1. Make sure your .env file has VITE_GOOGLE_MAPS_API_KEY=AIzaSy...
 *   2. From your project root:
 *        node scripts/geocode-branches.mjs
 *   3. Review the console output — any LOW CONFIDENCE results need manual check
 *   4. Commit the updated OurStoresPage.jsx
 *
 * COST: ~243 Geocoding API calls = ~$1.22 one-time (likely covered by free tier)
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ── Load API key from .env ────────────────────────────────────────────────────
const envPath = path.join(__dirname, '../.env')
const envContent = fs.readFileSync(envPath, 'utf8')
const keyMatch = envContent.match(/(?:VITE_)?GOOGLE_MAPS_API_KEY=(.+)/)
if (!keyMatch) {
  console.error('❌  VITE_GOOGLE_MAPS_API_KEY not found in .env')
  process.exit(1)
}
const API_KEY = keyMatch[1].trim()
console.log(`✅  API key loaded (${API_KEY.slice(0, 12)}...)`)

// ── Read OurStoresPage.jsx ────────────────────────────────────────────────────
const filePath = path.join(__dirname, '../src/pages/OurStoresPage.jsx')
let content = fs.readFileSync(filePath, 'utf8')

// ── Extract all branches ──────────────────────────────────────────────────────
const branchRegex = /\{id:(\d+),name:'([^']+)',address:'([^']+)',[^}]*lat:([\d.-]+),lng:([\d.-]+)/g
const branches = []
let match
while ((match = branchRegex.exec(content)) !== null) {
  branches.push({
    id:      parseInt(match[1]),
    name:    match[2],
    address: match[3],
    oldLat:  parseFloat(match[4]),
    oldLng:  parseFloat(match[5]),
  })
}
console.log(`\n📍 Found ${branches.length} branches to geocode\n`)

// ── Geocode each branch ───────────────────────────────────────────────────────
async function geocode(address, name) {
  const query = `${address}, Philippines`
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}&key=${API_KEY}&region=ph&language=en`
  const res  = await fetch(url)
  const data = await res.json()

  if (data.status !== 'OK' || !data.results?.length) {
    return { lat: null, lng: null, confidence: 'FAILED', type: data.status }
  }

  const result   = data.results[0]
  const location = result.geometry.location
  const locType  = result.geometry.location_type // ROOFTOP > RANGE_INTERPOLATED > GEOMETRIC_CENTER > APPROXIMATE

  return {
    lat:        location.lat,
    lng:        location.lng,
    confidence: locType,
    formatted:  result.formatted_address,
  }
}

// Sleep to avoid hitting rate limits
const sleep = ms => new Promise(r => setTimeout(r, ms))

const results   = []
const failed    = []
const lowConf   = []

for (let i = 0; i < branches.length; i++) {
  const b = branches[i]
  process.stdout.write(`[${i + 1}/${branches.length}] ${b.name}... `)

  try {
    const geo = await geocode(b.address, b.name)

    if (!geo.lat) {
      console.log(`❌  FAILED (${geo.type})`)
      failed.push({ ...b, reason: geo.type })
      results.push({ ...b, newLat: b.oldLat, newLng: b.oldLng }) // keep old coords
    } else {
      const conf = geo.confidence
      const isLow = conf === 'APPROXIMATE' || conf === 'GEOMETRIC_CENTER'
      console.log(`${isLow ? '⚠️ ' : '✅'} ${conf} → ${geo.lat.toFixed(6)}, ${geo.lng.toFixed(6)}`)
      if (isLow) lowConf.push({ ...b, confidence: conf, formatted: geo.formatted })
      results.push({ ...b, newLat: geo.lat, newLng: geo.lng })
    }
  } catch (e) {
    console.log(`❌  ERROR: ${e.message}`)
    failed.push({ ...b, reason: e.message })
    results.push({ ...b, newLat: b.oldLat, newLng: b.oldLng })
  }

  // 50ms delay between requests to stay under rate limit
  await sleep(50)
}

// ── Update OurStoresPage.jsx ──────────────────────────────────────────────────
console.log('\n📝 Updating coordinates in OurStoresPage.jsx...')

let updated = content
let changeCount = 0

for (const r of results) {
  if (r.newLat === r.oldLat && r.newLng === r.oldLng) continue

  // Replace lat:OLD_LAT,lng:OLD_LNG for this specific branch (match by id+name+address)
  const escapedAddress = r.address.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const escapedName    = r.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

  const pattern = new RegExp(
    `(\\{id:${r.id},name:'${escapedName}',address:'${escapedAddress}'[^}]*?)lat:${r.oldLat},lng:${r.oldLng}`,
    'g'
  )

  const newContent = updated.replace(pattern, (full, prefix) => {
    return `${prefix}lat:${r.newLat},lng:${r.newLng}`
  })

  if (newContent !== updated) {
    updated = newContent
    changeCount++
  }
}

fs.writeFileSync(filePath, updated, 'utf8')
console.log(`✅  Updated ${changeCount} branch coordinates`)

// ── Summary ───────────────────────────────────────────────────────────────────
console.log('\n' + '─'.repeat(60))
console.log(`📊 SUMMARY`)
console.log(`─`.repeat(60))
console.log(`✅  Successfully geocoded: ${results.length - failed.length}/${branches.length}`)
console.log(`⚠️   Low confidence (review): ${lowConf.length}`)
console.log(`❌  Failed (kept old coords): ${failed.length}`)

if (lowConf.length) {
  console.log('\n⚠️  LOW CONFIDENCE — please verify these manually:')
  lowConf.forEach(b => console.log(`   - [${b.id}] ${b.name}\n     Address: ${b.address}\n     Google:  ${b.formatted}`))
}

if (failed.length) {
  console.log('\n❌  FAILED — kept original coordinates:')
  failed.forEach(b => console.log(`   - [${b.id}] ${b.name} (${b.reason})`))
}

console.log('\n🎉 Done! Review the changes then commit OurStoresPage.jsx\n')
