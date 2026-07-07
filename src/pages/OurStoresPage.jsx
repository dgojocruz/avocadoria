import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import SEO from '@/components/ui/SEO'
import { Helmet } from 'react-helmet-async'
// ─── BRANCH DATA ─────────────────────────────────────────────────────────────
// Source: avocadoria_branches_embed_urls.xlsx
// To add orderUrl later: find the branch by name and set orderUrl:'https://...'
// To add a new branch: copy any entry, give it a new id, and fill in details.
// ─────────────────────────────────────────────────────────────────────────────
// branches loaded from src/data/branches.js
import BRANCHES from '@/data/branches'

// ─── Config ───────────────────────────────────────────────────────────────────
// CUSTOM_PIN: swap to '/your-logo-pin.png' anytime — null uses built-in SVG
const CUSTOM_PIN = null

// ─── Avocadoria SVG pin ──────────────────────────────────────────────────────
function AvoPin({ size = 36, active = false }) {
  return (
    <svg width={size} height={Math.round(size * 1.3)} viewBox="0 0 48 64" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M24 1C12.4 1 3 10.4 3 22C3 37 24 63 24 63C24 63 45 37 45 22C45 10.4 35.6 1 24 1Z"
        fill={active ? '#3a6b35' : '#b6c548'}
        style={{ transition: 'fill .2s' }}
      />
      <ellipse cx="24" cy="24" rx="12" ry="15" fill="#c8e86a" />
      <ellipse cx="24" cy="27" rx="6" ry="7.5" fill="#8A5F3C" />
      <ellipse cx="22" cy="24" rx="2.5" ry="3" fill="#a8784f" opacity=".6" />
      <circle cx="30" cy="14" r="4" fill="white" opacity=".85" />
    </svg>
  )
}

// ─── Color palette ───────────────────────────────────────────────────────────
const C = {
  olive: '#b6c548', dark: '#3a6b35', brown: '#8A5F3C',
  cream: '#F4FAEC', pale: '#D0E8AF', pink: '#EF7ECB',
  yellow: '#DFD438',
}

// ─── Island group colors ─────────────────────────────────────────────────────
// ─── Maps internal island key → display country name + flag ──────────────────
const COUNTRY_LABELS = {
  'Luzon':        'Philippines',
  'Visayas':      'Philippines',
  'Mindanao':     'Philippines',
  'International — Singapore': 'Singapore',
  'International — UAE':       'UAE',
  'International — Thailand':  'Thailand',
}

const COUNTRY_FLAGS = {
  'Philippines': '🇵🇭',
  'Singapore':   '🇸🇬',
  'UAE':         '🇦🇪',
  'Thailand':    '🇹🇭',
}

const COUNTRY_COLORS = {
  'Philippines': { bg: 'rgba(182,197,72,.12)', text: '#3a6b35', border: 'rgba(182,197,72,.4)', pin: '#b6c548' },
  'Singapore':   { bg: 'rgba(220,40,40,.08)',  text: '#9b1a1a', border: 'rgba(220,40,40,.25)', pin: '#dc2828' },
  'UAE':         { bg: 'rgba(0,130,80,.08)',   text: '#005a38', border: 'rgba(0,130,80,.25)',  pin: '#008250' },
  'Thailand':    { bg: 'rgba(91,143,217,.1)',  text: '#1a4a8a', border: 'rgba(91,143,217,.3)', pin: '#5b8fd9' },
}

const ISLAND_COLORS = {
  'Luzon':         { bg: 'rgba(182,197,72,.12)',   text: '#3a6b35',  border: 'rgba(182,197,72,.4)',  pin: '#b6c548' },
  'Visayas':       { bg: 'rgba(239,126,203,.1)',   text: '#8b1f60',  border: 'rgba(239,126,203,.35)',pin: '#EF7ECB' },
  'Mindanao':      { bg: 'rgba(223,212,56,.12)',   text: '#6b5e00',  border: 'rgba(223,212,56,.4)',  pin: '#8A5F3C' },
  'International': { bg: 'rgba(91,143,217,.1)',    text: '#1a4a8a',  border: 'rgba(91,143,217,.35)', pin: '#5b8fd9' },
}

// ─── Haversine distance (km) ──────────────────────────────────────────────────
function haversine(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

// ─── Decode Google encoded polyline → array of [lat,lng] ──────────────────────
function decodePolyline(encoded) {
  const points = []
  let index = 0, lat = 0, lng = 0
  while (index < encoded.length) {
    let b, shift = 0, result = 0
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5 } while (b >= 0x20)
    lat += (result & 1) ? ~(result >> 1) : (result >> 1)
    shift = 0; result = 0
    do { b = encoded.charCodeAt(index++) - 63; result |= (b & 0x1f) << shift; shift += 5 } while (b >= 0x20)
    lng += (result & 1) ? ~(result >> 1) : (result >> 1)
    points.push([lat / 1e5, lng / 1e5])
  }
  return points
}

// ─── Fetch driving route from our serverless proxy (avoids browser CORS) ──────
// Returns { path: [[lat,lng]...], distanceText, durationText } or null on failure
async function fetchGoogleRoute(origin, dest) {
  const url = `/api/directions`
    + `?origin=${origin.lat},${origin.lng}`
    + `&destination=${dest.lat},${dest.lng}`
  try {
    const res = await fetch(url)
    const data = await res.json()
    if (!data.ok || !data.polyline) return null
    return {
      path: decodePolyline(data.polyline),
      distanceText: data.distanceText,
      durationText: data.durationText,
    }
  } catch {
    return null
  }
}

// ─── Build SVG pin as base64 data URL (used by Leaflet) ──────────────────────
// CUSTOM_PIN_URL: set to '/your-logo.png' to use an image instead of SVG
// null = use the built-in avocado SVG pin
const CUSTOM_PIN_URL = null

function makePinUrl(color = '#b6c548', active = false) {
  if (CUSTOM_PIN_URL) return CUSTOM_PIN_URL
  const stroke = active ? '#fff' : '#fff'
  const sw     = active ? 3 : 2
  const scale  = active ? 1.15 : 1
  const w = Math.round(40 * scale), h = Math.round(52 * scale)
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 48 64">
    <path d="M24 1C12.4 1 3 10.4 3 22C3 37 24 63 24 63S45 37 45 22C45 10.4 35.6 1 24 1Z" fill="${color}" stroke="${stroke}" stroke-width="${sw}"/>
    <ellipse cx="24" cy="24" rx="12" ry="15" fill="#c8e86a"/>
    <ellipse cx="24" cy="27" rx="6" ry="7.5" fill="#8A5F3C"/>
    <ellipse cx="21.5" cy="23.5" rx="2.5" ry="3" fill="#a8784f" opacity=".6"/>
    <circle cx="29.5" cy="14" r="3.5" fill="white" opacity=".85"/>
  </svg>`
  return 'data:image/svg+xml;base64,' + btoa(svg)
}

// ─── Main page ────────────────────────────────────────────────────────────────
export default function OurStoresPage() {
  const [phase,          setPhase]          = useState('idle')
  const [search,         setSearch]         = useState('')
  const [userLoc,        setUserLoc]        = useState(null)
  const [locError,       setLocError]       = useState(null)
  const [activeId,       setActiveId]       = useState(null)
  const [nearestId,      setNearestId]      = useState(null)
  const [nearbyRadius,   setNearbyRadius]   = useState(5)   // km radius for Near Me
  const [nearbyMessage,  setNearbyMessage]  = useState(null) // message when no branches within radius
  const [radiusKm,       setRadiusKm]       = useState(10)  // user-adjustable km radius filter
  const [mapReady,       setMapReady]       = useState(false)
  const [drillLevel,     setDrillLevel]     = useState('branches') // 'countries' | 'regions' | 'branches'
  const [selectedCountry,setSelectedCountry]= useState(null)
  const [selectedRegion, setSelectedRegion] = useState(null)

  const searchRef  = useRef(null)
  const listRef    = useRef(null)
  const detailRef  = useRef(null)   // detail card — scroll target on mobile branch select
  const mapRef     = useRef(null)   // DOM node for Leaflet
  const leafletRef = useRef(null)   // Leaflet map instance
  const markersRef = useRef({})     // id → Leaflet marker
  const activeMarkRef = useRef(null)
  const userMarkRef = useRef(null)  // user location marker
  const routeLineRef = useRef(null) // route line
  const infoWindowRef = useRef(null) // track open info window

  // ── Load Google Maps JS API once ──────────────────────────────────────────
  useEffect(() => {
    if (window.google?.maps) { setMapReady(true); return }
    if (window.__gmapsLoading) {
      const check = setInterval(() => { if (window.google?.maps) { setMapReady(true); clearInterval(check) } }, 100)
      return
    }
    window.__gmapsLoading = true
    window.__gmapsCallback = () => { setMapReady(true) }
    const script = document.createElement('script')
    const KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
    script.src = `https://maps.googleapis.com/maps/api/js?key=${KEY}&callback=__gmapsCallback&loading=async`
    script.async = true; script.defer = true
    document.head.appendChild(script)
  }, [])

  // ── Build Google Map once API is ready ─────────────────────────────────────
  const showResults = phase === 'results' || search.length > 0
  const showMap = showResults

  // The hero search input and the results search input are separate DOM nodes.
  // The instant showResults flips true (first keystroke), React swaps one
  // input for the other and the new node isn't focused — so every keystroke
  // after the first silently drops until the user clicks back into the field.
  // Refocus the (new) input and put the caret at the end whenever we land on
  // the results view, so typing feels continuous instead of "jumping".
  useEffect(() => {
    if (!showResults) return
    const el = searchRef.current
    if (!el) return
    el.focus()
    const len = el.value.length
    el.setSelectionRange(len, len)
  }, [showResults])

  useEffect(() => {
    // The results section (and the map DOM node inside it) unmounts whenever
    // showMap goes false (e.g. hitting "Back"). When that happens, clear the
    // stale map-instance refs so the guard below doesn't block re-initializing
    // a fresh map against the new DOM node on the next search.
    if (!showMap) {
      if (leafletRef.current) {
        leafletRef.current = null
        markersRef.current = {}
        activeMarkRef.current = null
        userMarkRef.current = null
        routeLineRef.current = null
        infoWindowRef.current = null
      }
      return
    }
    if (!mapReady || !mapRef.current || leafletRef.current) return
    if (!window.google?.maps) return

    // Wait for the container to have actual dimensions before initializing
    const initMap = () => {
      if (!mapRef.current) return
      const rect = mapRef.current.getBoundingClientRect()
      if (rect.width === 0 || rect.height === 0) {
        setTimeout(initMap, 100)
        return
      }

    const { maps } = window.google
    const map = new maps.Map(mapRef.current, {
      center: { lat: 14.5995, lng: 120.9842 }, // Metro Manila default
      zoom: 11,
      mapTypeControl: false,
      streetViewControl: false,
      fullscreenControl: false,
      styles: [
        { featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] },
        { featureType: 'transit', stylers: [{ visibility: 'off' }] },
      ],
    })
    leafletRef.current = map

    // Custom avocado SVG pin
    const makeSvgPin = (color = '#b6c548', active = false) => ({
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${active ? 46 : 40}" height="${active ? 60 : 52}" viewBox="0 0 40 52">
          <ellipse cx="20" cy="18" rx="14" ry="16" fill="${color}" stroke="#fff" stroke-width="${active ? 3 : 2}"/>
          <ellipse cx="20" cy="17" rx="7" ry="8" fill="#fff" opacity="0.3"/>
          <circle cx="20" cy="17" r="4" fill="#3a6b35" opacity="0.7"/>
          <path d="M20 34 L13 46 Q20 52 27 46 Z" fill="${color}" stroke="#fff" stroke-width="${active ? 3 : 2}"/>
        </svg>`)}`,
      scaledSize: new maps.Size(active ? 46 : 40, active ? 60 : 52),
      anchor: new maps.Point(active ? 23 : 20, active ? 60 : 52),
    })

    // Shared info window (single instance — prevents stacking)
    const infoWindow = new maps.InfoWindow({ maxWidth: 260 })
    infoWindowRef.current = infoWindow

    // Add markers for all branches
    BRANCHES.forEach(b => {
      if (!b.lat || !b.lng) return
      const pinColor = ISLAND_COLORS[b.island]?.pin || '#b6c548'
      const marker = new maps.Marker({
        position: { lat: b.lat, lng: b.lng },
        map,
        icon: makeSvgPin(pinColor, false),
        title: b.name,
      })

      marker.addListener('click', () => {
        // Reset prev active
        if (activeMarkRef.current && activeMarkRef.current !== marker) {
          const prevId = Object.keys(markersRef.current).find(k => markersRef.current[k] === activeMarkRef.current)
          const prevBranch = BRANCHES.find(x => x.id === parseInt(prevId))
          const prevColor = ISLAND_COLORS[prevBranch?.island]?.pin || '#b6c548'
          activeMarkRef.current.setIcon(makeSvgPin(prevColor, false))
        }
        marker.setIcon(makeSvgPin('#3a6b35', true))
        activeMarkRef.current = marker

        const d = userLoc ? haversine(userLoc.lat, userLoc.lng, b.lat, b.lng) : null
        const dLabel = d !== null ? (d < 1 ? Math.round(d * 1000) + ' m' : d.toFixed(1) + ' km') : null
        const mins = d !== null ? Math.max(1, Math.round((d / 25) * 60)) : null
        const timeLabel = mins !== null ? (mins < 60 ? `~${mins} min drive` : `~${Math.round(mins/60)}h ${mins%60}m`) : null
        const distHtml = dLabel ? `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(182,197,72,.12);border:1.5px solid rgba(182,197,72,.35);border-radius:999px;padding:5px 12px;margin:0 0 10px;user-select:none"><span style="font-size:12px;font-weight:800;color:#3a6b35">📍 ${dLabel} away</span><span style="font-size:10px;color:#8A5F3C;font-weight:600">· ${timeLabel}</span></div>` : ''
        const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(b.name + ', ' + b.address)}&travelmode=driving`

        infoWindow.setContent(`
          <div style="font-family:Poppins,sans-serif;min-width:220px">
            <div style="background:#b6c548;padding:12px 14px;margin:-8px -8px 10px;border-radius:4px 4px 0 0">
              <div style="font-size:14px;font-weight:700;color:#fff;margin:0 0 2px">${b.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.85)">${b.island}</div>
            </div>
            <p style="font-size:12px;color:#8A5F3C;margin:0 0 8px;line-height:1.5">${b.address}</p>
            ${distHtml}
            <div style="display:flex;flex-direction:column;gap:6px">
              <a href="${dirUrl}" target="_blank" rel="noopener noreferrer"
                style="display:inline-flex;align-items:center;gap:6px;background:#3a6b35;color:#fff;border-radius:999px;padding:7px 14px;font-size:12px;font-weight:700;text-decoration:none">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" style="flex-shrink:0"><path d="M3 11l19-9-9 19-2-8-8-2z"/></svg>
                Get Directions
              </a>
              <a href="https://food.grab.com/ph/en/restaurants?search=avocadoria&location=${b.lat},${b.lng}" target="_blank" rel="noopener noreferrer"
                style="display:inline-flex;align-items:center;gap:6px;background:#00B14F;color:#fff;border-radius:999px;padding:6px 14px;font-size:11px;font-weight:700;text-decoration:none">
                <svg width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
                  <circle cx="30" cy="30" r="30" fill="#00B14F"/>
                  <path d="M30 14C21.2 14 14 21.2 14 30s7.2 16 16 16 16-7.2 16-16H30V26h16.8c.8 2.3 1.2 4.7 1.2 7.3 0 12.2-9.8 22-22 22S8 45.5 8 33.3 17.8 11 30 11v3z" fill="#fff"/>
                  <path d="M30 14v12h16.8C45.1 19.7 38.1 14 30 14z" fill="#fff" opacity=".7"/>
                </svg>
                Order on Grab
              </a>
              <a href="https://foodpanda.ph/chain/cy2uf/avocadoria-ph" target="_blank" rel="noopener noreferrer"
                style="display:inline-flex;align-items:center;gap:6px;background:#d70f64;color:#fff;border-radius:999px;padding:6px 14px;font-size:11px;font-weight:700;text-decoration:none">
                <svg width="16" height="16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" style="flex-shrink:0">
                  <circle cx="30" cy="30" r="30" fill="#d70f64"/>
                  <ellipse cx="30" cy="28" rx="10" ry="9" fill="#fff"/>
                  <circle cx="25" cy="26" r="2.5" fill="#d70f64"/>
                  <circle cx="35" cy="26" r="2.5" fill="#d70f64"/>
                  <path d="M22 34 Q30 40 38 34" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>
                  <path d="M24 18 Q20 12 16 14" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                  <path d="M36 18 Q40 12 44 14" stroke="#fff" stroke-width="2.5" fill="none" stroke-linecap="round"/>
                </svg>
                foodpanda
              </a>
            </div>
          </div>`)
        infoWindow.open(map, marker)
        setActiveId(b.id)
      })

      markersRef.current[b.id] = marker
    })

    // Legend
    const legendDiv = document.createElement('div')
    legendDiv.style.cssText = 'background:#fff;padding:8px 12px;border-radius:10px;font-size:11px;font-family:Poppins,sans-serif;box-shadow:0 2px 10px rgba(0,0,0,.1);line-height:1.9;margin:0 10px 10px'
    legendDiv.innerHTML = Object.entries(ISLAND_COLORS).map(([name, col]) =>
      `<div style="display:flex;align-items:center;gap:7px"><span style="width:10px;height:10px;border-radius:50%;background:${col.pin};display:inline-block;flex-shrink:0"></span><span style="color:#444">${name}</span></div>`
    ).join('')
    map.controls[maps.ControlPosition.BOTTOM_LEFT].push(legendDiv)

    } // end initMap
    setTimeout(initMap, 200)
  }, [mapReady, showMap])

  // ── Fly map to active branch ───────────────────────────────────────────────
  useEffect(() => {
    if (!leafletRef.current || activeId === null) return
    if (!window.google?.maps) return
    const branch = BRANCHES.find(b => b.id === activeId)
    if (!branch?.lat) return
    const map = leafletRef.current
    const { maps } = window.google

    map.panTo({ lat: branch.lat, lng: branch.lng })
    map.setZoom(16)
    // Trigger resize in case the map container was hidden/zero-size on init
    setTimeout(() => {
      window.google.maps.event.trigger(map, 'resize')
      map.setCenter({ lat: branch.lat, lng: branch.lng })
      map.setZoom(16)
    }, 150)

    const marker = markersRef.current[activeId]
    if (marker) {
      // Hide ALL markers first
      Object.values(markersRef.current).forEach(m => m.setMap(null))
      // Show only the selected marker
      marker.setMap(map)
      marker.setIcon({ url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="46" height="60" viewBox="0 0 40 52"><ellipse cx="20" cy="18" rx="14" ry="16" fill="#3a6b35" stroke="#fff" stroke-width="3"/><ellipse cx="20" cy="17" rx="7" ry="8" fill="#fff" opacity="0.3"/><circle cx="20" cy="17" r="4" fill="#b6c548" opacity="0.9"/><path d="M20 34 L13 46 Q20 52 27 46 Z" fill="#3a6b35" stroke="#fff" stroke-width="3"/></svg>`)}`, scaledSize: new maps.Size(46, 60), anchor: new maps.Point(23, 60) })
      activeMarkRef.current = marker
    }

    // Draw route if user location active
    if (userLoc && branch.lat && branch.lng) {
      if (routeLineRef.current) { routeLineRef.current.setMap(null); routeLineRef.current = null }
      if (userMarkRef.current)  { userMarkRef.current.setMap(null);  userMarkRef.current  = null }

      userMarkRef.current = new maps.Marker({
        position: { lat: userLoc.lat, lng: userLoc.lng },
        map,
        icon: { path: maps.SymbolPath.CIRCLE, scale: 10, fillColor: '#2d7dd2', fillOpacity: 1, strokeColor: '#fff', strokeWeight: 3 },
        title: 'Your location',
        zIndex: 999,
      })

      const straightDist = haversine(userLoc.lat, userLoc.lng, branch.lat, branch.lng)
      const straightLabel = straightDist < 1 ? `${Math.round(straightDist * 1000)} m` : `${straightDist.toFixed(1)} km`

      routeLineRef.current = new maps.Polyline({
        path: [{ lat: userLoc.lat, lng: userLoc.lng }, { lat: branch.lat, lng: branch.lng }],
        map, strokeColor: '#3a6b35', strokeOpacity: 0.7, strokeWeight: 3,
        icons: [{ icon: { path: 'M 0,-1 0,1', strokeOpacity: 1, scale: 4 }, offset: '0', repeat: '20px' }],
      })

      const reqId = branch.id
      fetchGoogleRoute(userLoc, { lat: branch.lat, lng: branch.lng }).then(route => {
        if (route && reqId === activeId) {
          if (routeLineRef.current) { routeLineRef.current.setMap(null) }
          const path = route.path.map(([lat, lng]) => ({ lat, lng }))
          routeLineRef.current = new maps.Polyline({
            path, map, strokeColor: '#3a6b35', strokeOpacity: 0.85, strokeWeight: 5,
          })
          // Fit bounds to show both user and branch
          const bounds = new maps.LatLngBounds()
          bounds.extend({ lat: userLoc.lat, lng: userLoc.lng })
          bounds.extend({ lat: branch.lat, lng: branch.lng })
          map.fitBounds(bounds, 80)

          // Show distance + time in the shared info window on the route midpoint
          if (infoWindowRef.current) {
            infoWindowRef.current.setContent(`<div style="font-family:Poppins,sans-serif;font-size:13px;font-weight:700;color:#3a6b35;padding:4px 8px">${route.distanceText} · ${route.durationText}</div>`)
            infoWindowRef.current.setPosition(path[Math.floor(path.length / 2)])
            infoWindowRef.current.open(map)
          }
        }
      })

      map.fitBounds(new maps.LatLngBounds(
        { lat: Math.min(userLoc.lat, branch.lat) - 0.01, lng: Math.min(userLoc.lng, branch.lng) - 0.01 },
        { lat: Math.max(userLoc.lat, branch.lat) + 0.01, lng: Math.max(userLoc.lng, branch.lng) + 0.01 }
      ))
    }
  }, [activeId])

  // ── Mobile: auto-scroll to the detail card when a branch is selected ───────
  // On desktop the detail card + map sit beside the list, so no scroll needed.
  // Breakpoint matches the page's own @media (max-width: 767px) mobile layout.
  useEffect(() => {
    if (activeId === null) return
    if (window.innerWidth > 767) return
    // Small delay lets the detail card actually render/expand first
    const t = setTimeout(() => {
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
    return () => clearTimeout(t)
  }, [activeId])

  // ── Fly map based on drill level ───────────────────────────────────────────
  useEffect(() => {
    if (!leafletRef.current || !window.google?.maps) return
    const map = leafletRef.current
    const { maps } = window.google

    if (drillLevel === 'countries' || (!selectedCountry && !selectedRegion)) {
      const branches = BRANCHES.filter(b => b.lat && b.lng)
      if (branches.length) {
        const bounds = new maps.LatLngBounds()
        branches.forEach(b => bounds.extend({ lat: b.lat, lng: b.lng }))
        map.fitBounds(bounds, 40)
      }
    } else if (drillLevel === 'regions' && selectedCountry) {
      const countryBranches = BRANCHES.filter(b => {
        if (selectedCountry === 'Philippines') return ['Luzon','Visayas','Mindanao'].includes(b.island)
        return b.region === `International — ${selectedCountry}`
      }).filter(b => b.lat && b.lng)
      if (countryBranches.length) {
        const bounds = new maps.LatLngBounds()
        countryBranches.forEach(b => bounds.extend({ lat: b.lat, lng: b.lng }))
        map.fitBounds(bounds, 60)
      }
    } else if (drillLevel === 'branches' && selectedRegion) {
      const regionBranches = BRANCHES.filter(b => b.island === selectedRegion || b.region === selectedRegion).filter(b => b.lat && b.lng)
      if (regionBranches.length) {
        const bounds = new maps.LatLngBounds()
        // If user location active, center on user + nearby branches only
        if (userLoc) {
          bounds.extend({ lat: userLoc.lat, lng: userLoc.lng })
          const nearby = regionBranches.filter(b => haversine(userLoc.lat, userLoc.lng, b.lat, b.lng) <= 15)
          const toShow = nearby.length > 0 ? nearby : regionBranches.slice(0, 5)
          toShow.forEach(b => bounds.extend({ lat: b.lat, lng: b.lng }))
        } else {
          regionBranches.forEach(b => bounds.extend({ lat: b.lat, lng: b.lng }))
        }
        map.fitBounds(bounds, 80)
      }
    }
  }, [drillLevel, selectedCountry, selectedRegion])

  // ── GPS locate ─────────────────────────────────────────────────────────────
  const handleLocate = () => {
    if (!navigator.geolocation) { setLocError('Geolocation not supported by your browser.'); return }
    setPhase('locating')
    setLocError(null)
    setNearbyMessage(null)
    navigator.geolocation.getCurrentPosition(
      pos => {
        const { latitude: lat, longitude: lng } = pos.coords
        setUserLoc({ lat, lng })
        setPhase('results')
        setSearch('')
        setDrillLevel('branches')
        setSelectedCountry(null)
        setSelectedRegion(null)

        // Sort all branches by distance
        const sorted = BRANCHES
          .filter(b => b.lat && b.lng)
          .map(b => ({ ...b, dist: haversine(lat, lng, b.lat, b.lng) }))
          .sort((a, b) => a.dist - b.dist)

        const nearest = sorted[0]
        if (!nearest) return

        setNearestId(nearest.id)

        // Check if nearest is within 5km
        const within5km = sorted.filter(b => b.dist <= 5)
        if (within5km.length > 0) {
          // Show branches within 5km
          setNearbyRadius(5)
          setNearbyMessage(null)
          setActiveId(within5km[0].id)
        } else {
          // No branches within 5km — show nearest with message
          setNearbyRadius(nearest.dist + 1) // expand to include nearest
          setNearbyMessage(`The nearest Avocadoria branch to your location is ${nearest.dist.toFixed(1)} km away — ${nearest.name}.`)
          setActiveId(nearest.id)
        }

        // Auto-drill to nearest branch's region
        const isPhBranch = ['Luzon','Visayas','Mindanao'].includes(nearest.island)
        if (isPhBranch) {
          setSelectedCountry('Philippines')
          setSelectedRegion(nearest.island)
        } else {
          setSelectedCountry(nearest.region.replace('International — ', ''))
        }

        setTimeout(() => searchRef.current?.focus(), 300)
      },
      err => {
        setPhase('idle')
        if (err.code === 1) setLocError('Location access denied. Please allow location in your browser settings.')
        else if (err.code === 2) setLocError('Could not detect your position. Check your device GPS.')
        else setLocError('Location request timed out. Please try again.')
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    )
  }

  // ── Filter + sort branches ─────────────────────────────────────────────────
  const { filtered, grouped, islands } = useMemo(() => {
    const q = search.toLowerCase().trim()

    let list = BRANCHES.filter(b => {
      const matchesSearch = !q ||
        b.name.toLowerCase().includes(q) ||
        b.address.toLowerCase().includes(q) ||
        b.region.toLowerCase().includes(q) ||
        b.island.toLowerCase().includes(q)
      // Country filter using real country names
      let matchesCountry = true
      if (selectedCountry) {
        if (selectedCountry === 'Philippines') matchesCountry = ['Luzon','Visayas','Mindanao'].includes(b.island)
        else matchesCountry = b.region === `International — ${selectedCountry}`
      }
      // Region filter: for PH, selectedRegion is the island group; for intl, skip
      const matchesRegion = !selectedRegion || b.island === selectedRegion || b.region === selectedRegion
      return matchesSearch && matchesCountry && matchesRegion
    }).map(b => ({
      ...b,
      distance: (userLoc && b.lat && b.lng)
        ? haversine(userLoc.lat, userLoc.lng, b.lat, b.lng)
        : null,
    }))

    // Filter by radius when GPS is active
    if (userLoc) {
      list = list.filter(b => b.distance === null || b.distance <= radiusKm)
    }

    // Sort nearest-first when GPS is active
    if (userLoc) {
      list.sort((a, b) => (a.distance ?? 9999) - (b.distance ?? 9999))
    }

    // Group by island then region
    const byIsland = {}
    list.forEach(b => {
      if (!byIsland[b.island]) byIsland[b.island] = {}
      if (!byIsland[b.island][b.region]) byIsland[b.island][b.region] = []
      byIsland[b.island][b.region].push(b)
    })

    return {
      filtered: list,
      grouped:  byIsland,
      islands:  Object.keys(byIsland),
    }
  }, [search, userLoc, selectedCountry, selectedRegion, radiusKm])

  // ── Country / Region derived data ──────────────────────────────────────────
  const allCountries = useMemo(() => {
    // Group branches by real country name
    const countryMap = {}
    BRANCHES.forEach(b => {
      // Determine real country: international branches use their region key
      const country = ['Luzon','Visayas','Mindanao'].includes(b.island)
        ? 'Philippines'
        : b.region.replace('International — ', '')
      if (!countryMap[country]) countryMap[country] = 0
      countryMap[country]++
    })
    return Object.entries(countryMap).map(([name, count]) => ({
      name,
      count,
      flag:   COUNTRY_FLAGS[name]  || '🌐',
      colors: COUNTRY_COLORS[name] || { bg: 'rgba(182,197,72,.1)', text: '#3a6b35', border: 'rgba(182,197,72,.3)', pin: '#b6c548' },
    }))
  }, [])

  const regionsForCountry = useMemo(() => {
    if (!selectedCountry) return []
    if (selectedCountry === 'Philippines') {
      // Sub-group by island group for PH
      const islandMap = {}
      BRANCHES.filter(b => ['Luzon','Visayas','Mindanao'].includes(b.island))
        .forEach(b => {
          if (!islandMap[b.island]) islandMap[b.island] = 0
          islandMap[b.island]++
        })
      return Object.entries(islandMap).map(([name, count]) => ({ name, count, isIsland: true }))
    } else {
      // For international — show individual branches directly (skip region level)
      return []
    }
  }, [selectedCountry])

  // ── Filter branches by selected country/region ─────────────────────────────
  const countryFilter = (b) => {
    if (!selectedCountry) return true
    if (selectedCountry === 'Philippines') return ['Luzon','Visayas','Mindanao'].includes(b.island)
    // International: match by region suffix
    return b.region === `International — ${selectedCountry}`
  }

  const activeBranch = BRANCHES.find(b => b.id === activeId)

  // auto-select first result when search changes
  useEffect(() => {
    if (filtered.length > 0 && showResults) {
      if (!filtered.find(b => b.id === activeId)) {
        setActiveId(filtered[0].id)
      }
    }
  }, [filtered, showResults])

  const totalRegions   = useMemo(() => new Set(BRANCHES.map(b => b.region)).size, [])
  const totalCountries = useMemo(() => {
    const countries = new Set(BRANCHES.map(b =>
      ['Luzon','Visayas','Mindanao'].includes(b.island)
        ? 'Philippines'
        : b.region.replace('International — ', '')
    ))
    return countries.size
  }, [])
const branchSchema = useMemo(() => ({
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: BRANCHES.map((b, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    item: {
      '@type': 'FoodEstablishment',
      '@id': `https://avocadoria.com/our-stores#branch-${b.id}`,
      name: `Avocadoria — ${b.name}`,
      branchCode: String(b.id),
      address: {
        '@type': 'PostalAddress',
        streetAddress: b.address,
        addressCountry: b.region.includes('Singapore') ? 'SG'
          : b.region.includes('UAE') ? 'AE'
          : b.region.includes('Thailand') ? 'TH'
          : 'PH',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: b.lat,
        longitude: b.lng,
      },
      url: b.mapsUrl,
      hasMap: b.mapsUrl,
      servesCuisine: 'Avocado Desserts',
      parentOrganization: {
        '@type': 'Organization',
        name: 'Avocadoria',
        url: 'https://avocadoria.com',
      },
    },
  })),
}), [])
  return (
    <>
      <SEO
        title="Our Stores"
        description={`Find 233+ Avocadoria branches across the Philippines. Get directions and order online.`}
        path="/our-stores"
      />
      <Helmet>
  <script type="application/ld+json">
    {JSON.stringify(branchSchema)}
  </script>
</Helmet>
      <div className="page-enter" style={{ fontFamily: "'Poppins','Segoe UI',sans-serif" }}>

        {/* ══════════════════════════════════════════════════════════
            HERO — discovery state (shown until user searches/locates)
        ══════════════════════════════════════════════════════════ */}
        {!showResults && (
          <section className="stores-hero-section" style={{
            position: 'relative', overflow: 'hidden', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '100px 24px 60px',
            textAlign: 'center',
          }}>

            <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
            {/* Floating brand icon */}
            <div style={{
              position: 'relative', zIndex: 1,
              marginBottom: '32px',
              animation: 'pin-float 3s ease-in-out infinite',
            }}>
              <img src="/avopin-icon.png" alt="Avocadoria" style={{ width: '120px', height: 'auto', objectFit: 'contain' }}
                    loading="lazy" decoding="async"
                  />
            </div>

            {/* Headline */}
            <h1 style={{
              position: 'relative', zIndex: 1,
              fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
              fontWeight: 'normal',
              fontSize: 'clamp(2.4rem,5vw,4.2rem)',
              color: 'var(--c-olive)',
              textShadow: '-2px -2px 0 #fff,2px -2px 0 #fff,-2px 2px 0 #fff,2px 2px 0 #fff',
              margin: '0 0 8px',
              lineHeight: 1.1,
            }}>
              Find Your Avocadoria
            </h1>
            <p style={{
              fontSize: 'clamp(15px,2vw,24px)', color: `${C.brown}cc`,
              maxWidth: '400px', margin: '0 auto 36px',
              lineHeight: '1.7',
            }}>
              233+ branches across the Philippines.<br />
              Find the nearest one and order fresh avocado desserts.
            </p>

            {/* Stats pills — Countries → Regions → Branches */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '24px' }}>
              {[
                { n: totalCountries, l: 'Countries', drill: 'countries' },
                { n: totalRegions,   l: 'Regions',   drill: 'countries'  },
                { n: "233+",            l: 'Branches',  drill: 'branches'  },
              ].map(s => (
                <button
                  key={s.l}
                  onClick={() => {
                    setDrillLevel(s.drill)
                    setSelectedCountry(null)
                    setSelectedRegion(null)
                    setSearch('')
                    setPhase('results')
                  }}
                  style={{
                    background: 'rgba(255,255,255,.7)',
                    backdropFilter: 'blur(8px)',
                    border: '1.5px solid rgba(255,255,255,.9)',
                    borderRadius: '999px',
                    padding: '8px 20px',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    fontFamily: "'Poppins',sans-serif",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = C.olive; e.currentTarget.style.borderColor = C.olive; e.currentTarget.querySelector('.pill-n').style.color = '#fff'; e.currentTarget.querySelector('.pill-l').style.color = 'rgba(255,255,255,0.85)' }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.7)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.9)'; e.currentTarget.querySelector('.pill-n').style.color = C.dark; e.currentTarget.querySelector('.pill-l').style.color = `${C.brown}99` }}
                >
                  <span className="pill-n" style={{ fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: '800', color: C.dark, transition: 'color 0.2s' }}>{s.n}</span>
                  <span className="pill-l" style={{ fontSize: '18px', color: `${C.brown}99`, marginLeft: '6px', fontWeight: '600', transition: 'color 0.2s' }}>{s.l}</span>
                </button>
              ))}
            </div>

            {/* Primary action — GPS */}
            <style>{`
              @media (max-width: 767px) {
                .stores-hero-cta { order: -1; margin-bottom: 20px !important; font-size: 20px !important; padding: 13px 28px !important; }
                .stores-hero-pills { order: 0; }
                .stores-hero-section { padding-bottom: 100px !important; }
              }
            `}</style>
            <button
              className="stores-hero-cta"
              onClick={handleLocate}
              disabled={phase === 'locating'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: phase === 'locating' ? `${C.olive}80` : C.olive,
                color: '#fff', border: 'none', borderRadius: '999px',
                padding: 'clamp(10px,2vw,15px) clamp(18px,3vw,36px)', fontSize: 'clamp(18px,2.5vw,28px)', fontWeight: '800',
                cursor: phase === 'locating' ? 'not-allowed' : 'pointer',
                fontFamily: "'Poppins',sans-serif",
                boxShadow: `0 8px 28px rgba(182,197,72,.45)`,
                transition: 'all .2s', marginBottom: '16px',
              }}
              onMouseEnter={e => { if (phase !== 'locating') e.currentTarget.style.background = C.dark }}
              onMouseLeave={e => { if (phase !== 'locating') e.currentTarget.style.background = C.olive }}
            >
              {phase === 'locating' ? (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                    style={{ animation: 'spin 1s linear infinite' }} aria-hidden="true">
                    <path d="M12 2a10 10 0 0 1 10 10" /><circle cx="12" cy="12" r="1" fill="currentColor" />
                  </svg>
                  <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
                  Detecting your location...
                </>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                    <circle cx="12" cy="12" r="9" strokeOpacity=".3" />
                  </svg>
                  Find Nearest Store
                </>
              )}
            </button>

            {locError && (
              <p style={{ fontSize: '13px', color: C.pink, maxWidth: '360px', margin: '0 auto 12px', lineHeight: '1.5' }}>
                {locError}
              </p>
            )}

            {/* Secondary — search */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '420px', margin: '0 auto' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                <div style={{ flex: 1, height: '1px', background: 'rgba(138,95,60,.2)' }} />
                <span style={{ fontSize: '18px', color: `${C.brown}80`, fontWeight: '600' }}>or search manually</span>
                <div style={{ flex: 1, height: '1px', background: 'rgba(138,95,60,.2)' }} />
              </div>
              <div style={{ position: 'relative' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.olive} strokeWidth="2.2"
                  style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={searchRef}
                  type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search by branch name, city, or region..."
                  style={{
                    width: '100%', padding: '13px 16px 13px 40px',
                    border: `1.5px solid rgba(182,197,72,.4)`,
                    borderRadius: '12px', background: 'rgba(255,255,255,.85)',
                    fontFamily: "'Poppins',sans-serif", fontSize: '18px', color: C.brown,
                    outline: 'none', boxSizing: 'border-box', transition: 'border-color .2s',
                    backdropFilter: 'blur(6px)',
                  }}
                  onFocus={e => e.target.style.borderColor = C.olive}
                  onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,.4)'}
                  aria-label="Search branches"
                />
              </div>
            </div>

          </section>
        )}

        {/* ══════════════════════════════════════════════════════════
            RESULTS — split: left list / right map
            ── LAYOUT CONFIG ─────────────────────────────────────
            Edit these values to adjust the layout at any time.
        ══════════════════════════════════════════════════════════ */}
        {showResults && (() => {
          const LAYOUT = {
            // ── Overall container ────────────────────────────────
            navbarHeight:    88,    // px — must match your navbar height
            containerMaxW:   1280,  // px — max width of the whole panel
            containerPadX:   16,    // px — left/right page margin (mobile-friendly)

            // ── Left panel (branch list) ─────────────────────────
            listWidth:       340,   // px — width of the branch list column
            listMaxH:        400,   // px — max height on mobile; CSS overrides for desktop
            listBg:          C.cream,

            // ── Right panel (map) ────────────────────────────────
            mapHeight:       320,   // px — mobile map height; CSS overrides for desktop
            mapBorderRadius: 16,    // px — rounded corners on the map
            mapShadow:       '0 8px 32px rgba(58,107,53,.15)',

            // ── Detail card (shown above map) ────────────────────
            detailBg:        '#fff',
            detailBorderR:   16,    // px — border radius of detail card

            // ── Spacing ──────────────────────────────────────────
            gapBetween:      24,    // px — gap between list and map columns
            sectionPaddingT: 48,    // px — top padding below search bar (mobile); more on desktop via CSS
            sectionPaddingB: 48,    // px — bottom padding of results section
          }

          return (
          <div style={{
            position: 'relative', overflow: 'hidden', backgroundImage: "url('/website_layer_1.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: '#F3F2EE',
            minHeight: `calc(100vh - ${LAYOUT.navbarHeight}px)`,
            paddingTop: `${LAYOUT.navbarHeight}px`,
          }}>

            {/* ── Wave divider below search bar ── */}
            <div style={{ width: '100%', lineHeight: 0, marginBottom: '-2px' }}>
              <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '60px' }}>
                <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,0 L0,0 Z" fill="#b6c548" opacity="0.25"/>
                <path d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,0 L0,0 Z" fill="#d9e29e" opacity="0.3"/>
              </svg>
            </div>
            <div style={{ position:'absolute', inset:0, zIndex:0, pointerEvents:'none', backgroundColor:'#b6c548', opacity:0.25 }} />
            <div style={{ position:'relative', zIndex:1 }}>
            {/* ── Top search + back bar — full width, clear of navbar ── */}
            <div style={{
              background: 'rgba(255,255,255,0.95)',
              borderBottom: `1px solid rgba(182,197,72,.2)`,
              padding: '10px 16px',
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '8px',
              position: 'sticky',
              top: `${LAYOUT.navbarHeight}px`,
              zIndex: 20,
              boxShadow: '0 2px 12px rgba(58,107,53,.06)',
            }}>
              {/* Back button */}
              <button
                onClick={() => { setPhase('idle'); setSearch(''); setActiveId(null); setUserLoc(null); setNearestId(null); setNearbyRadius(5); setNearbyMessage(null); setDrillLevel('branches'); setSelectedCountry(null); setSelectedRegion(null) }}
                style={{
                  flexShrink: 0, background: 'none', border: `1.5px solid rgba(182,197,72,.4)`,
                  borderRadius: '10px', cursor: 'pointer', color: C.olive,
                  padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '6px',
                  fontFamily: "'Poppins',sans-serif", fontSize: '13px', fontWeight: '700',
                  transition: 'all .15s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.olive; e.currentTarget.style.color = '#fff' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = C.olive }}
                aria-label="Go back"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M19 12H5M12 5l-7 7 7 7" />
                </svg>
                Back
              </button>

              {/* Search input */}
              <div style={{ flex: 1, maxWidth: '520px', position: 'relative' }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={C.olive} strokeWidth="2.2"
                  style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                  aria-hidden="true">
                  <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                </svg>
                <input
                  ref={searchRef}
                  type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder={`Search 233+ branches by name or city...`}
                  style={{
                    width: '100%', padding: '10px 36px 10px 36px',
                    border: `1.5px solid rgba(182,197,72,.35)`, borderRadius: '10px',
                    background: C.cream, fontFamily: "'Poppins',sans-serif",
                    fontSize: '14px', color: C.brown, outline: 'none',
                    boxSizing: 'border-box', transition: 'border-color .2s',
                  }}
                  onFocus={e => e.target.style.borderColor = C.olive}
                  onBlur={e => e.target.style.borderColor = 'rgba(182,197,72,.35)'}
                  aria-label="Search branches"
                />
                {search && (
                  <button onClick={() => setSearch('')}
                    style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: `${C.brown}60`, fontSize: '15px' }}
                    aria-label="Clear search">✕</button>
                )}
              </div>

              {/* Result count */}
              <span style={{ fontSize: '12px', color: `${C.brown}70`, fontWeight: '600', flexShrink: 0, whiteSpace: 'nowrap' }}>
                {filtered.length} branch{filtered.length !== 1 ? 'es' : ''}
                {userLoc ? ' · by distance' : ''}
              </span>

              {/* GPS button */}
              <button onClick={handleLocate}
                style={{
                  flexShrink: 0, display: 'inline-flex', alignItems: 'center', gap: '6px',
                  background: userLoc ? `rgba(182,197,72,.12)` : C.olive,
                  color: userLoc ? C.dark : '#fff',
                  border: 'none', borderRadius: '10px', padding: '9px 16px',
                  fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: '700',
                  cursor: 'pointer', transition: 'all .2s', whiteSpace: 'nowrap',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '.85' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <circle cx="12" cy="12" r="3" /><path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                </svg>
                {userLoc ? 'Location active' : 'Near me'}
              </button>

              {/* Radius slider — inline in toolbar when GPS active */}
              {userLoc && (
                <>
                  <div style={{ width: '1px', height: '24px', background: 'rgba(182,197,72,.3)', flexShrink: 0 }} />
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.olive} strokeWidth="2.5" flexShrink="0" aria-hidden="true">
                    <circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
                  </svg>
                  <input
                    type="range" min="1" max="50" step="1" value={radiusKm}
                    onChange={e => setRadiusKm(Number(e.target.value))}
                    style={{ width: '100px', accentColor: C.olive, cursor: 'pointer', flexShrink: 0 }}
                    aria-label="Search radius in kilometers"
                  />
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: '800', color: C.dark, flexShrink: 0 }}>
                    {radiusKm} km
                  </span>
                </>
              )}
            </div>

            {/* Remove old slider row below toolbar */}

            {/* ── Main content — centered, max-width container ── */}
            <div className="stores-layout" style={{
              maxWidth: `${LAYOUT.containerMaxW}px`,
              margin: '0 auto',
              padding: `${LAYOUT.sectionPaddingT}px ${LAYOUT.containerPadX}px ${LAYOUT.sectionPaddingB}px`,
            }}>

              {/* ── LEFT: drill-down list ── */}
              <div className="list-panel" style={{
                background: '#fff',
                borderRadius: '16px',
                border: `1px solid rgba(182,197,72,.2)`,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(58,107,53,.08)',
              }}>

                {/* ── Nearby message banner ── */}
                {nearbyMessage && (
                  <div style={{
                    background: 'rgba(182,197,72,.12)', borderBottom: '1px solid rgba(182,197,72,.25)',
                    padding: '10px 14px', display: 'flex', alignItems: 'flex-start', gap: '8px',
                  }}>
                    <span style={{ fontSize: '16px', flexShrink: 0 }}>📍</span>
                    <p style={{ fontFamily: 'Poppins,sans-serif', fontSize: '15px', color: '#3a6b35', fontWeight: '600', margin: 0, lineHeight: 1.5 }}>
                      {nearbyMessage}
                    </p>
                  </div>
                )}

                {/* ── Breadcrumb nav ── */}
                {(drillLevel === 'regions' || drillLevel === 'branches') && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 14px', borderBottom: '1px solid rgba(182,197,72,.15)', background: 'rgba(244,250,236,.6)', flexWrap: 'wrap' }}>
                    <button onClick={() => { setDrillLevel('countries'); setSelectedCountry(null); setSelectedRegion(null) }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: '700', color: C.olive, padding: '2px 4px' }}>
                      Countries
                    </button>
                    {selectedCountry && (
                      <>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={`${C.brown}60`} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                        <button onClick={() => { setDrillLevel('regions'); setSelectedRegion(null) }}
                          style={{ background: 'none', border: 'none', cursor: drillLevel === 'branches' ? 'pointer' : 'default', fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: drillLevel === 'regions' ? '800' : '700', color: drillLevel === 'regions' ? C.brown : C.olive, padding: '2px 4px' }}>
                          {selectedCountry}
                        </button>
                      </>
                    )}
                    {selectedRegion && (
                      <>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke={`${C.brown}60`} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                        <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '11px', fontWeight: '800', color: C.brown, padding: '2px 4px' }}>
                          {selectedRegion}
                        </span>
                      </>
                    )}
                  </div>
                )}

                <div className="list-panel" style={{ overflowY: 'auto' }}>

                  {/* ── LEVEL 1: Countries ── */}
                  {drillLevel === 'countries' && (
                    <div>
                      {allCountries.map(country => (
                        <button key={country.name}
                          onClick={() => {
                            setSelectedCountry(country.name)
                            setSelectedRegion(null)
                            // Philippines has sub-regions; international goes straight to branches
                            if (country.name === 'Philippines') setDrillLevel('regions')
                            else setDrillLevel('branches')
                          }}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '14px 16px', background: 'transparent', border: 'none',
                            borderBottom: '1px solid rgba(182,197,72,.08)', cursor: 'pointer',
                            fontFamily: "'Poppins',sans-serif", transition: 'background .12s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(182,197,72,.06)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{ fontSize: '20px', lineHeight: 1 }}>{country.flag}</span>
                            <span style={{ fontSize: '14px', fontWeight: '700', color: C.brown }}>{country.name}</span>
                          </div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '12px', color: country.colors.text, fontWeight: '700', background: country.colors.bg, padding: '2px 10px', borderRadius: '999px', border: `1px solid ${country.colors.border}` }}>{country.count} branches</span>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={`${C.brown}40`} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── LEVEL 2: Regions ── */}
                  {drillLevel === 'regions' && selectedCountry && (
                    <div>
                      <button
                        onClick={() => { setSelectedRegion(null); setDrillLevel('branches') }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                          padding: '12px 16px', background: 'rgba(182,197,72,.07)', border: 'none',
                          borderBottom: '1px solid rgba(182,197,72,.15)', cursor: 'pointer',
                          fontFamily: "'Poppins',sans-serif", transition: 'background .12s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.background = 'rgba(182,197,72,.13)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'rgba(182,197,72,.07)'}
                      >
                        <span style={{ fontSize: '12px', fontWeight: '700', color: C.olive }}>All branches in {selectedCountry}</span>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.olive} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                      </button>
                      {regionsForCountry.map(region => (
                        <button key={region.name}
                          onClick={() => { setSelectedRegion(region.name); setDrillLevel('branches') }}
                          style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            padding: '13px 16px', background: 'transparent', border: 'none',
                            borderBottom: '1px solid rgba(182,197,72,.08)', cursor: 'pointer',
                            fontFamily: "'Poppins',sans-serif", transition: 'background .12s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = 'rgba(182,197,72,.06)'}
                          onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                        >
                          <span style={{ fontSize: '13px', fontWeight: '600', color: C.brown }}>
                            {region.name.replace(/^.*?—\s*/, '')}
                          </span>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{ fontSize: '11px', color: C.olive, fontWeight: '700' }}>{region.count}</span>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={`${C.brown}40`} strokeWidth="2.5"><polyline points="9 18 15 12 9 6"/></svg>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {/* ── LEVEL 3: Branches ── */}
                  {drillLevel === 'branches' && (
                    filtered.length === 0 ? (
                      <div style={{ padding: '48px 24px', textAlign: 'center' }}>
                        <div style={{ fontSize: 'clamp(22px,3.5vw,36px)', marginBottom: '12px' }}>🥑</div>
                        <p style={{ fontSize: '13px', color: `${C.brown}80`, fontFamily: "'Poppins',sans-serif" }}>
                          No branches found{search ? ` for "${search}"` : ''}
                        </p>
                      </div>
                    ) : (
                      <div>
                        {islands.map(island => (
                          <div key={island}>
                            <div style={{
                              padding: '9px 16px 7px',
                              background: ISLAND_COLORS[island]?.bg || 'rgba(182,197,72,.08)',
                              borderBottom: `1px solid ${ISLAND_COLORS[island]?.border || 'rgba(182,197,72,.2)'}`,
                              position: 'sticky', top: 0, zIndex: 2,
                            }}>
                              <span style={{
                                fontSize: '11px', fontWeight: '800',
                                color: ISLAND_COLORS[island]?.text || C.dark,
                                textTransform: 'uppercase', letterSpacing: '.06em',
                                fontFamily: "'Poppins',sans-serif",
                              }}>
                                {island} · {Object.values(grouped[island]).reduce((s, a) => s + a.length, 0)} branches
                              </span>
                            </div>
                            {Object.entries(grouped[island]).map(([region, branches]) => (
                              <div key={region}>
                                {island !== 'Luzon' && (
                                  <div style={{
                                    padding: '5px 16px 4px 22px', fontSize: '10px', fontWeight: '700',
                                    color: `${C.brown}70`, letterSpacing: '.04em', textTransform: 'uppercase',
                                    background: `rgba(244,250,236,.8)`, borderBottom: '1px solid rgba(182,197,72,.08)',
                                    fontFamily: "'Poppins',sans-serif",
                                  }}>
                                    {region.replace(/^.*?—\s*/, '')} · {branches.length}
                                  </div>
                                )}
                                {branches.map(b => {
                                  const isActive  = b.id === activeId
                                  const isNearest = b.id === nearestId
                                  return (
                                    <div key={b.id} onClick={() => setActiveId(b.id)}
                                      role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && setActiveId(b.id)}
                                      style={{
                                        display: 'flex', alignItems: 'center', gap: '10px', padding: '11px 16px',
                                        background: isActive ? `rgba(182,197,72,.1)` : 'transparent',
                                        borderLeft: `3px solid ${isActive ? C.olive : 'transparent'}`,
                                        borderBottom: '1px solid rgba(182,197,72,.07)',
                                        cursor: 'pointer', transition: 'all .12s',
                                      }}
                                      onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = `rgba(182,197,72,.05)` }}
                                      onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'transparent' }}
                                    >
                                      <div style={{ flexShrink: 0 }}>
                                        {CUSTOM_PIN ? <img src={CUSTOM_PIN} alt="" style={{ width: '22px' }} aria-hidden="true"  loading="lazy" decoding="async"/> : <AvoPin size={22} active={isActive} />}
                                      </div>
                                      <div style={{ flex: 1, minWidth: 0 }}>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', flexWrap: 'wrap' }}>
                                          <span style={{ fontSize: '16px', fontWeight: isActive ? '700' : '600', color: isActive ? C.dark : C.brown, fontFamily: "'Poppins',sans-serif", lineHeight: '1.35' }}>
                                            {b.name}
                                          </span>
                                          {isNearest && <span style={{ fontSize: '9px', background: C.olive, color: '#fff', padding: '2px 6px', borderRadius: '99px', fontWeight: '700', flexShrink: 0 }}>Nearest</span>}
                                          {b.distance !== null && <span style={{ fontSize: '10px', color: C.olive, fontWeight: '600', flexShrink: 0 }}>{b.distance < 1 ? `${Math.round(b.distance * 1000)}m` : `${b.distance.toFixed(1)}km`}</span>}
                                        </div>
                                      </div>
                                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={isActive ? C.olive : `${C.brown}35`} strokeWidth="2.5" style={{ flexShrink: 0 }} aria-hidden="true">
                                        <polyline points="9 18 15 12 9 6" />
                                      </svg>
                                    </div>
                                  )
                                })}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    )
                  )}

                </div>
              </div>

              {/* ── RIGHT: detail card + Leaflet map ── */}
              {/* ── RIGHT: detail card + Leaflet map ── */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Detail card — shown when a branch is selected */}
                {activeBranch && (
                  <div ref={detailRef} style={{
                    background: LAYOUT.detailBg,
                    borderRadius: `${LAYOUT.detailBorderR}px`,
                    border: `1px solid rgba(182,197,72,.2)`,
                    padding: '20px 24px',
                    boxShadow: '0 4px 20px rgba(58,107,53,.08)',
                    display: 'flex', alignItems: 'flex-start',
                    justifyContent: 'space-between', gap: '16px',
                    flexWrap: 'wrap',
                  }}>
                    <div style={{ flex: 1, minWidth: '200px' }}>
                      <span style={{
                        display: 'inline-block', fontSize: '10px', fontWeight: '700',
                        padding: '2px 10px', borderRadius: '99px', marginBottom: '8px',
                        background: ISLAND_COLORS[activeBranch.island]?.bg || 'rgba(182,197,72,.12)',
                        color: ISLAND_COLORS[activeBranch.island]?.text || C.dark,
                        textTransform: 'uppercase', letterSpacing: '.05em',
                        fontFamily: "'Poppins',sans-serif",
                      }}>
                        {activeBranch.island}
                      </span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                        {CUSTOM_PIN
                          ? <img src={CUSTOM_PIN} alt="" style={{ width: '26px' }} aria-hidden="true"  loading="lazy" decoding="async"/>
                          : <AvoPin size={26} active />
                        }
                        <h2 style={{
                          fontFamily: "'BubbleboddyNeue-ExtraBold','Poppins',sans-serif",
                          fontSize: 'var(--fs-h3)', fontWeight: 'normal',
                          color: C.dark, textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', margin: 0, lineHeight: '1.2',
                        }}>
                          {activeBranch.name}
                        </h2>
                      </div>
                      <p style={{ fontSize: '18px', color: `${C.brown}99`, margin: '0 0 14px', lineHeight: '1.5', fontFamily: "'Poppins',sans-serif" }}>
                        📍 {activeBranch.address}
                      </p>
                      {/* Distance info pill — informational only, no link */}
                      {userLoc && activeBranch.lat && activeBranch.lng && (() => {
                        const dist = haversine(userLoc.lat, userLoc.lng, activeBranch.lat, activeBranch.lng)
                        const distLabel = dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`
                        // rough drive time: avg 25 km/h in PH urban traffic
                        const mins = Math.max(1, Math.round((dist / 25) * 60))
                        const timeLabel = mins < 60 ? `~${mins} min drive` : `~${Math.round(mins/60)}h ${mins%60}m drive`
                        return (
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '7px 14px', borderRadius: '999px',
                            background: 'rgba(182,197,72,.12)',
                            border: '1.5px solid rgba(182,197,72,.35)',
                            margin: '0 0 12px',
                            userSelect: 'none',
                          }}>
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.olive} strokeWidth="2.5" aria-hidden="true">
                              <circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z" />
                            </svg>
                            <span style={{ fontSize: '13px', fontWeight: '800', color: C.dark, fontFamily: "'Poppins',sans-serif" }}>
                              {distLabel} away
                            </span>
                            <span style={{ fontSize: '11px', color: `${C.brown}80`, fontWeight: '600', fontFamily: "'Poppins',sans-serif" }}>
                              · {timeLabel}
                            </span>
                          </div>
                        )
                      })()}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '0' }}>
                        {/* Get Directions button */}
                        {(() => {
                          const dirUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(activeBranch.name + ', ' + activeBranch.address)}&travelmode=driving`
                          return (
                            <a href={dirUrl} target="_blank" rel="noopener noreferrer"
                              style={{
                                display: 'inline-flex', alignItems: 'center', gap: '7px',
                                padding: '9px 18px', borderRadius: '999px',
                                background: C.dark, color: '#fff',
                                fontSize: '13px', fontWeight: '700',
                                textDecoration: 'none', fontFamily: "'Poppins',sans-serif",
                                boxShadow: '0 3px 12px rgba(58,107,53,.35)', transition: 'background .2s',
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = '#2a4f28'}
                              onMouseLeave={e => e.currentTarget.style.background = C.dark}
                            >
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" aria-hidden="true" style={{ flexShrink: 0 }}>
                                <path d="M3 11l19-9-9 19-2-8-8-2z" />
                              </svg>
                              Get Directions
                            </a>
                          )
                        })()}
                        {/* Grab + FoodPanda order buttons */}
                        {/* Grab — branch-specific lat/lng search */}
                        <a
                          href={`https://food.grab.com/ph/en/restaurants?search=avocadoria&location=${activeBranch.lat},${activeBranch.lng}`}
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '7px',
                            padding: '9px 18px', borderRadius: '999px',
                            background: '#00B14F', color: '#fff',
                            fontSize: '13px', fontWeight: '700',
                            textDecoration: 'none', fontFamily: "'Poppins',sans-serif",
                            boxShadow: '0 3px 12px rgba(0,177,79,.3)', transition: 'background .2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#009640'}
                          onMouseLeave={e => e.currentTarget.style.background = '#00B14F'}
                        >
                          {/* Grab logo SVG */}
                          <svg width="18" height="18" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                            <circle cx="30" cy="30" r="30" fill="#00B14F"/>
                            <path d="M30 14C21.2 14 14 21.2 14 30s7.2 16 16 16 16-7.2 16-16H30V26h16.8c.8 2.3 1.2 4.7 1.2 7.3 0 12.2-9.8 22-22 22S8 45.5 8 33.3 17.8 11 30 11v3z" fill="#fff"/>
                            <path d="M30 14v12h16.8C45.1 19.7 38.1 14 30 14z" fill="#fff" opacity=".6"/>
                          </svg>
                          Grab
                        </a>
                        {/* FoodPanda — chain-level URL (auto-detects location) */}
                        <a
                          href="https://foodpanda.ph/chain/cy2uf/avocadoria-ph"
                          target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '7px',
                            padding: '9px 18px', borderRadius: '999px',
                            background: '#d70f64', color: '#fff',
                            fontSize: '13px', fontWeight: '700',
                            textDecoration: 'none', fontFamily: "'Poppins',sans-serif",
                            boxShadow: '0 3px 12px rgba(215,15,100,.3)', transition: 'background .2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#b50d55'}
                          onMouseLeave={e => e.currentTarget.style.background = '#d70f64'}
                        >
                          {/* FoodPanda panda face SVG */}
                          <svg width="18" height="18" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style={{ flexShrink: 0 }}>
                            <circle cx="30" cy="30" r="30" fill="#d70f64"/>
                            <ellipse cx="30" cy="28" rx="12" ry="11" fill="#fff"/>
                            <circle cx="24" cy="26" r="3" fill="#d70f64"/>
                            <circle cx="36" cy="26" r="3" fill="#d70f64"/>
                            <path d="M23 34 Q30 40 37 34" stroke="#d70f64" strokeWidth="2" fill="none" strokeLinecap="round"/>
                            <path d="M22 18 Q17 11 13 13" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/>
                            <path d="M38 18 Q43 11 47 13" stroke="#fff" strokeWidth="3" fill="none" strokeLinecap="round"/>
                          </svg>
                          foodpanda
                        </a>
                      </div>
                    </div>
                  </div>
                )}

                {/* Leaflet map — always rendered so the map DOM node is always available */}
                <div style={{
                  borderRadius: `${LAYOUT.mapBorderRadius}px`,
                  overflow: 'hidden',
                  boxShadow: LAYOUT.mapShadow,
                  border: `1px solid rgba(182,197,72,.2)`,
                  position: 'relative',
                }}>
                  {/* Empty state overlay before any branch selected */}
                  {!activeBranch && (
                    <div style={{
                      position: 'absolute', inset: 0, zIndex: 10,
                      background: 'rgba(244,250,236,.92)',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center', gap: '12px',
                      borderRadius: `${LAYOUT.mapBorderRadius}px`,
                    }}>
                      <AvoPin size={52} />
                      <p style={{ fontSize: '14px', color: `${C.brown}70`, fontFamily: "'Poppins',sans-serif" }}>
                        Select a branch to fly to its location
                      </p>
                    </div>
                  )}
                  <div ref={mapRef} className="map-panel" style={{ width: '100%', height: '500px', minHeight: '400px' }} />
                </div>

              </div>

            </div>
            </div>{/* end zIndex:1 */}
          </div>
          )
        })()}

        {/* Footer only shown in idle state */}


      </div>
    </>
  )
}
