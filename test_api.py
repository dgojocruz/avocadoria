#!/usr/bin/env python3
"""
Quick API debug test - run this first to see what's happening
Run: python test_api.py
"""
import requests, json

API_KEY = 'AIzaSyAXdqyl6E1cHvXuhvLI-kQnjIMOTjVe_o8'

print("Testing Google Maps APIs...\n")

# Test 1: Geocoding API
print("=" * 50)
print("TEST 1: Geocoding API")
print("=" * 50)
r = requests.get('https://maps.googleapis.com/maps/api/geocode/json', params={
    'address': 'SM Mall of Asia, Pasay City, Philippines',
    'key': API_KEY
})
res = r.json()
print(f"Status: {res['status']}")
if res['status'] == 'OK':
    print(f"✅ Found: {res['results'][0]['formatted_address']}")
    print(f"   Coords: {res['results'][0]['geometry']['location']}")
    print(f"   Place ID: {res['results'][0].get('place_id')}")
elif res['status'] == 'REQUEST_DENIED':
    print(f"❌ DENIED: {res.get('error_message')}")
else:
    print(f"❌ Error: {res}")

# Test 2: Places Text Search
print("\n" + "=" * 50)
print("TEST 2: Places Text Search API")
print("=" * 50)
r = requests.get('https://maps.googleapis.com/maps/api/place/textsearch/json', params={
    'query': 'SM Mall of Asia Pasay Philippines',
    'key': API_KEY
})
res = r.json()
print(f"Status: {res['status']}")
if res['status'] == 'OK':
    print(f"✅ Found: {res['results'][0]['name']}")
    print(f"   Place ID: {res['results'][0]['place_id']}")
elif res['status'] == 'REQUEST_DENIED':
    print(f"❌ DENIED: {res.get('error_message')}")
else:
    print(f"❌ Error: {res}")

# Test 3: Places New API
print("\n" + "=" * 50)
print("TEST 3: Places API (New)")
print("=" * 50)
r = requests.post(
    'https://places.googleapis.com/v1/places:searchText',
    headers={
        'Content-Type': 'application/json',
        'X-Goog-Api-Key': API_KEY,
        'X-Goog-FieldMask': 'places.id,places.displayName,places.location'
    },
    json={'textQuery': 'SM Mall of Asia Pasay Philippines'}
)
res = r.json()
print(f"Response: {json.dumps(res, indent=2)[:300]}")
if 'places' in res:
    print(f"✅ Found: {res['places'][0]['displayName']['text']}")
    print(f"   Place ID: {res['places'][0]['id']}")
elif 'error' in res:
    print(f"❌ Error: {res['error']['message']}")

print("\n" + "=" * 50)
print("DONE - share results with Claude!")
print("=" * 50)
