#!/usr/bin/env python3
"""
Avocadoria Branch Place ID Finder - Places API (New)
Run: python find_place_ids.py
Output: place_ids.json
"""
import requests, json, time

API_KEY = 'AIzaSyAXdqyl6E1cHvXuhvLI-kQnjIMOTjVe_o8'

BRANCHES = [
  {
    "id": 99,
    "name": "Bayombong Nueva Vizcaya",
    "address": "The Cornerstone Bldg., Capt. Dela Cruz St., Bayombong, Nueva Vizcaya",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 16.4843087,
    "lng": 121.1479126
  },
  {
    "id": 101,
    "name": "C. Raymundo Pasig",
    "address": "C. Raymundo Ave., Corner Narra St. Maybunga, Pasig City",
    "island": "Luzon",
    "region": "Luzon — Other Provinces",
    "lat": 14.5771149,
    "lng": 121.0826965
  },
  {
    "id": 242,
    "name": "Central Rama 9",
    "address": "Central Rama 9, 9/9 Rama IX Road, Huai Khwang, Bangkok 10310, Thailand",
    "island": "International",
    "region": "International — Thailand",
    "lat": 13.7585954,
    "lng": 100.5635971
  },
  {
    "id": 110,
    "name": "LCC CBD Terminal 2 Naga",
    "address": "Bicol Central Station, Brgy. Triangulo, Naga City",
    "island": "Luzon",
    "region": "Luzon — Bicol",
    "lat": 13.6192637,
    "lng": 123.1865186
  },
  {
    "id": 111,
    "name": "LCC Legazpi",
    "address": "LCC Food Court, LCC Mall Legazpi, Peñaranda St. Legazpi City, Albay",
    "island": "Luzon",
    "region": "Luzon — Bicol",
    "lat": 13.6199103,
    "lng": 123.1796419
  },
  {
    "id": 0,
    "name": "168 Mall - 5th Floor",
    "address": "168mall 5th Floor Foodcourt Binondo, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6053254,
    "lng": 120.9724268
  },
  {
    "id": 1,
    "name": "168 Mall - Ground Floor",
    "address": "Ground Flr. Entrance Soler St. Binondo, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6053254,
    "lng": 120.9724268
  },
  {
    "id": 2,
    "name": "999 Shopping Mall",
    "address": "Stall 6 Food World Express Isetann Recto, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6052895,
    "lng": 120.9726035
  },
  {
    "id": 241,
    "name": "Al Ghurair Centre",
    "address": "Al Ghurair Centre, Deira, Dubai, United Arab Emirates",
    "island": "International",
    "region": "International — UAE",
    "lat": 25.2670536,
    "lng": 55.3147539
  },
  {
    "id": 3,
    "name": "Alabang Town Center",
    "address": "Ground Level Entertainment Complex, Alabang Town Center, Muntinlupa",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.4229141,
    "lng": 121.0273546
  },
  {
    "id": 239,
    "name": "Ang Mo Kio Hub",
    "address": "53 Ang Mo Kio Ave 3, AMK Hub, Singapore 569933",
    "island": "International",
    "region": "International — Singapore",
    "lat": 1.3689164,
    "lng": 103.8469928
  },
  {
    "id": 93,
    "name": "Antipolo Triangle Mall",
    "address": "Antipolo Triangle Mall, Sen. Lorenzo Sumulong Memorial Circle, Antipolo",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.581982,
    "lng": 121.1791655
  },
  {
    "id": 189,
    "name": "Avocadoria Boracay Extension",
    "address": "Station 2 Front Beach, Boracay, Malay, Aklan",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 11.9590945,
    "lng": 121.9257139
  },
  {
    "id": 214,
    "name": "Ayala Malls Abreeza Davao",
    "address": "L2 Abreeza Mall, J.P. Laurel Ave, Poblacion District, Davao City",
    "island": "Mindanao",
    "region": "Mindanao — Davao Region",
    "lat": 7.0911957,
    "lng": 125.6087241
  },
  {
    "id": 190,
    "name": "Ayala Malls Bacolod",
    "address": "Ayala Malls Bacolod, Bacolod City, Negros Occidental",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.6765373,
    "lng": 122.9485048
  },
  {
    "id": 191,
    "name": "Ayala Malls Center Cebu",
    "address": "2L Ayala Center Cebu, Cebu Business Park, Archbishop Reyes Ave, Cebu City",
    "island": "Visayas",
    "region": "Visayas — Cebu / Bohol",
    "lat": 10.3182423,
    "lng": 123.9026546
  },
  {
    "id": 192,
    "name": "Ayala Malls Central Bloc IT Park",
    "address": "Ayala Malls Central Block, Padriga St, Cebu City",
    "island": "Visayas",
    "region": "Visayas — Cebu / Bohol",
    "lat": 10.3306864,
    "lng": 123.9047449
  },
  {
    "id": 215,
    "name": "Ayala Malls Centrio CDO",
    "address": "GF CV Roa Wing, Centrio Mall, C.M. Recto Cor. Corrales Ave, Cagayan De Oro",
    "island": "Mindanao",
    "region": "Mindanao — Northern Mindanao / Caraga",
    "lat": 8.4852647,
    "lng": 124.6488197
  },
  {
    "id": 6,
    "name": "Ayala Malls Fairview Terraces",
    "address": "LGF Ayala Mall Fairview Terraces Quirino Highway Novaliches Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.7359658,
    "lng": 121.0591207
  },
  {
    "id": 7,
    "name": "Ayala Malls Manila Bay",
    "address": "2nd Floor Building B Ayala Malls Manila Bay",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5224592,
    "lng": 120.9888656
  },
  {
    "id": 8,
    "name": "Ayala Malls Marikina",
    "address": "Liwasang Kalayaan, Marikina, 1800 Metro Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6490919,
    "lng": 121.1153759
  },
  {
    "id": 9,
    "name": "Ayala Malls Market Market",
    "address": "3rd Floor Market Market Mall BGC, Taguig",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.549905,
    "lng": 121.0498651
  },
  {
    "id": 95,
    "name": "Ayala Malls Serin",
    "address": "Lower Ground Level Ayala Malls Serin, Silang Junction North, Tagaytay",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.1126335,
    "lng": 120.9565681
  },
  {
    "id": 96,
    "name": "Ayala Malls Solenad",
    "address": "Building D Solenad, Nuvali Boulevard, Santa Rosa, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.240911,
    "lng": 121.0555524
  },
  {
    "id": 10,
    "name": "Ayala Malls The 30th",
    "address": "Lower Ground, Ayala Malls The 30th, 30 Meralco Ave, Ortigas Center, Pasig",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5804791,
    "lng": 121.0646005
  },
  {
    "id": 11,
    "name": "Ayala Malls Trinoma",
    "address": "2nd Level Food Choices, Trinoma, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6533,
    "lng": 121.0334
  },
  {
    "id": 97,
    "name": "Ayala Malls Vermosa",
    "address": "3rd Floor Ayala Malls Vermosa, Imus, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 4.3843055,
    "lng": 120.9572516
  },
  {
    "id": 98,
    "name": "Ayala Pavilion Mall",
    "address": "Foodcourt Greenfield Pavilion Edsa Cor United St, Mandaluyong",
    "island": "Luzon",
    "region": "Luzon — Other Provinces",
    "lat": 14.5793518,
    "lng": 121.0502357
  },
  {
    "id": 13,
    "name": "Batasan Hills",
    "address": "A-Plaza Bldg. 1st Floor, Batasan Hills, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6912146,
    "lng": 121.1010055
  },
  {
    "id": 237,
    "name": "Bedok Mall",
    "address": "311 New Upper Changi Road, Bedok Mall, Singapore 467360",
    "island": "International",
    "region": "International — Singapore",
    "lat": 1.3247216,
    "lng": 103.9244721
  },
  {
    "id": 100,
    "name": "Bicol International Airport",
    "address": "GF Arrival And Waiting Lounge, Bicol International Airport, Daraga, Albay",
    "island": "Luzon",
    "region": "Luzon — Bicol",
    "lat": 13.111577,
    "lng": 123.6816723
  },
  {
    "id": 193,
    "name": "Boracay DMall",
    "address": "DMall De Boracay, Malay, Aklan",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 11.9622495,
    "lng": 121.924086
  },
  {
    "id": 102,
    "name": "Central Mall Dasmarinas",
    "address": "Salitran, Dasmariñas, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.3496664,
    "lng": 120.9333693
  },
  {
    "id": 14,
    "name": "Centris Mall",
    "address": "2nd Floor, Centris Station, Eton Centris, Edsa Corner Quezon Avenue, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6436448,
    "lng": 121.036204
  },
  {
    "id": 216,
    "name": "City Mall Cotabato",
    "address": "Citymall Cotabato, Gov. Gutierrez Ave, Cotabato City, Maguindanao",
    "island": "Mindanao",
    "region": "Mindanao — SOCCSKSARGEN",
    "lat": 7.2007061,
    "lng": 124.2382476
  },
  {
    "id": 103,
    "name": "City Walk Tarlac",
    "address": "Zamora St, Tarlac City",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.4850383,
    "lng": 120.5865663
  },
  {
    "id": 104,
    "name": "Coron, Palawan",
    "address": "National Highway, Brgy. V, Coron, Palawan",
    "island": "Luzon",
    "region": "Luzon — MIMAROPA",
    "lat": 12.0013629,
    "lng": 120.1977967
  },
  {
    "id": 105,
    "name": "CSI The City Mall Dagupan",
    "address": "Lucao District, Dagupan City, Pangasinan",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 16.0235533,
    "lng": 120.3207603
  },
  {
    "id": 15,
    "name": "Double Dragon Plaza",
    "address": "Ground Floor Double Dragon Plaza DD Meridian Park, Pasay City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5364,
    "lng": 120.9913
  },
  {
    "id": 16,
    "name": "Drive and Dine - Meycauayan",
    "address": "Canumay West, Valenzuela, 1447 Metro Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.7192,
    "lng": 120.9866
  },
  {
    "id": 17,
    "name": "Estancia Mall",
    "address": "LG East Wing Estancia Mall, Pasig City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5763712,
    "lng": 121.0631392
  },
  {
    "id": 18,
    "name": "Ever Commonwealth",
    "address": "Ever Gotesco Avenue, Commonwealth Ave, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6781,
    "lng": 121.0854
  },
  {
    "id": 19,
    "name": "Evia Lifestyle Mall",
    "address": "2/F Bldg. C Evia Lifestyle Center, Daang Hari Road, Las Piñas City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.3766749,
    "lng": 121.0127222
  },
  {
    "id": 21,
    "name": "Festival Mall Alabang",
    "address": "Ground Floor Festival Mall, Alabang, Muntinlupa",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.4167701,
    "lng": 121.0393847
  },
  {
    "id": 194,
    "name": "Festive Walk Iloilo",
    "address": "Festive Walk, Mandurriao, Iloilo City",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.7133877,
    "lng": 122.5434636
  },
  {
    "id": 22,
    "name": "Fishermall Malabon",
    "address": "2F Fisher Mall Malabon",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6568,
    "lng": 120.9608
  },
  {
    "id": 23,
    "name": "Fishermall QC",
    "address": "2F Fisher Mall, Quezon Avenue, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6337,
    "lng": 121.0196
  },
  {
    "id": 24,
    "name": "Food District BGC",
    "address": "Kiosk 3, LG One Bonifacio High Street Mall, Taguig",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5510414,
    "lng": 121.046788
  },
  {
    "id": 106,
    "name": "Fora Mall Tagaytay",
    "address": "Emilio Aguinaldo Highway, Silang Junction South, Tagaytay City, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.1158604,
    "lng": 120.9617004
  },
  {
    "id": 25,
    "name": "FTI Hypermarket",
    "address": "GF Hypermarket, FTI Complex, Taguig",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.508342,
    "lng": 121.0502694
  },
  {
    "id": 107,
    "name": "Gaisano City Mall CDO",
    "address": "Ground Floor Gaisano Mall, Cagayan de Oro",
    "island": "Luzon",
    "region": "Luzon — Cagayan Valley",
    "lat": 8.4863646,
    "lng": 124.6473042
  },
  {
    "id": 217,
    "name": "Gaisano Grand City Gate Mall Davao",
    "address": "Buhangin, Davao City, Davao Del Sur",
    "island": "Mindanao",
    "region": "Mindanao — Davao Region",
    "lat": 7.109994,
    "lng": 125.610209
  },
  {
    "id": 195,
    "name": "Gaisano Mall Banilad Cebu",
    "address": "Gaisano Country Mall, Banilad, Cebu City",
    "island": "Visayas",
    "region": "Visayas — Cebu / Bohol",
    "lat": 10.3394189,
    "lng": 123.9082317
  },
  {
    "id": 218,
    "name": "Gaisano Mall Butuan",
    "address": "Gaisano Mall Butuan, Butuan City",
    "island": "Mindanao",
    "region": "Mindanao — Northern Mindanao / Caraga",
    "lat": 8.9442772,
    "lng": 125.5295141
  },
  {
    "id": 219,
    "name": "Gaisano Mall Cagayan de Oro",
    "address": "Ground Floor Gaisano Mall, Corrales, CM Recto, Cagayan De Oro",
    "island": "Mindanao",
    "region": "Mindanao — Northern Mindanao / Caraga",
    "lat": 8.4863646,
    "lng": 124.6473042
  },
  {
    "id": 220,
    "name": "Gaisano Mall Tagum",
    "address": "Upper GF GMall of Tagum, National Hwy, Tagum, Davao Del Norte",
    "island": "Mindanao",
    "region": "Mindanao — Davao Region",
    "lat": 7.4486496,
    "lng": 125.8046986
  },
  {
    "id": 221,
    "name": "Gaisano Mall Toril",
    "address": "UGF Gaisano Mall of Toril, Lim St, Toril, Davao City",
    "island": "Mindanao",
    "region": "Mindanao — Davao Region",
    "lat": 7.015076,
    "lng": 125.4899077
  },
  {
    "id": 26,
    "name": "Gateway Mall",
    "address": "Gateway Mall 1, Ground Floor, Cubao, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6210599,
    "lng": 121.0517374
  },
  {
    "id": 108,
    "name": "Gateway Mall Sta. Rosa",
    "address": "Old National Highway, Santa Rosa, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.6209,
    "lng": 121.0526
  },
  {
    "id": 27,
    "name": "Greenhills Unimart",
    "address": "Ground Floor Unimart Grocery Greenhills, San Juan City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6022272,
    "lng": 121.0478254
  },
  {
    "id": 28,
    "name": "Greenhills Virra Mall",
    "address": "2nd Floor VMall Greenhills, San Juan City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6022676,
    "lng": 121.0488951
  },
  {
    "id": 196,
    "name": "GT Mall Molo",
    "address": "Ground Floor GT Mall Molo, Poblacion, Molo, Iloilo City",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.6962005,
    "lng": 22.5430131
  },
  {
    "id": 197,
    "name": "GT Mall Pavia",
    "address": "Ground Floor GT Mall Pavia, Ungka 2, Pavia, Iloilo",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.7537126,
    "lng": 122.5354324
  },
  {
    "id": 109,
    "name": "Imall Antipolo",
    "address": "LGF Imall Antipolo, Sumulong St., San Roque, Antipolo, Rizal",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.5845383,
    "lng": 121.1738779
  },
  {
    "id": 30,
    "name": "Kai Mall",
    "address": "GF Stall 11 Kai Mall, Caloocan City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.7564257,
    "lng": 121.0435598
  },
  {
    "id": 222,
    "name": "KCC Mall Cotabato",
    "address": "Quezon Avenue, Cotabato City, Maguindanao",
    "island": "Mindanao",
    "region": "Mindanao — SOCCSKSARGEN",
    "lat": 7.2202188,
    "lng": 124.2433294
  },
  {
    "id": 223,
    "name": "KCC Mall de Zamboanga",
    "address": "Basement KCC Mall, Gov. Camins Rd, Zamboanga City",
    "island": "Mindanao",
    "region": "Mindanao — Zamboanga Peninsula",
    "lat": 6.9200552,
    "lng": 122.0708583
  },
  {
    "id": 224,
    "name": "Kidapawan City",
    "address": "Roxas St, Poblacion, Kidapawan, Cotabato",
    "island": "Mindanao",
    "region": "Mindanao — SOCCSKSARGEN",
    "lat": 7.0096486,
    "lng": 125.0846152
  },
  {
    "id": 33,
    "name": "Landmark Makati",
    "address": "Basement 1 Food Center, Ayala Center, Makati City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5521265,
    "lng": 121.0241628
  },
  {
    "id": 31,
    "name": "Landmark Manila Bay",
    "address": "Landmark Manila Bay Foodcourt, Basement 1, Paranaque City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5237619,
    "lng": 120.9897808
  },
  {
    "id": 32,
    "name": "Landmark Trinoma",
    "address": "Ground Floor Food Center Landmark Trinoma, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6511205,
    "lng": 121.0317003
  },
  {
    "id": 34,
    "name": "Lucky Chinatown Mall",
    "address": "Ground Floor, Lucky Chinatown, Binondo, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6033742,
    "lng": 120.9707659
  },
  {
    "id": 240,
    "name": "Lucky Plaza",
    "address": "304 Orchard Road, Lucky Plaza, Singapore 238863",
    "island": "International",
    "region": "International — Singapore",
    "lat": 1.304572,
    "lng": 103.8312149
  },
  {
    "id": 35,
    "name": "Moriones, Tondo",
    "address": "399 Moriones St. Tondo Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6100952,
    "lng": 120.9629538
  },
  {
    "id": 225,
    "name": "NCCC Mall Maa Davao",
    "address": "MacArthur Highway, Corner Don Julian Rodriguez Sr. Ave, Davao City",
    "island": "Mindanao",
    "region": "Mindanao — Davao Region",
    "lat": 7.0623633,
    "lng": 125.5911354
  },
  {
    "id": 36,
    "name": "One Ayala Mall",
    "address": "Kiosk G-005, Lower G/F One Ayala Cor. Edsa, Makati City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5505414,
    "lng": 121.0277908
  },
  {
    "id": 37,
    "name": "Paco Market Mall",
    "address": "Ground Floor, Paco Mall, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5793481,
    "lng": 120.9905568
  },
  {
    "id": 226,
    "name": "Pagadian City",
    "address": "61 Sabellano St, Pagadian City, Zamboanga del Sur",
    "island": "Mindanao",
    "region": "Mindanao — Zamboanga Peninsula",
    "lat": 7.8245531,
    "lng": 123.4409522
  },
  {
    "id": 227,
    "name": "Panabo, Davao City",
    "address": "G/F Gaisano Grand Mall Panabo City, Davao Del Norte",
    "island": "Mindanao",
    "region": "Mindanao — Davao Region",
    "lat": 7.3063629,
    "lng": 125.6817189
  },
  {
    "id": 198,
    "name": "Panglao, Bohol",
    "address": "Front of Panglao Regents Park Resort, Ester Lim Drive St. Tawala, Panglao, Bohol",
    "island": "Visayas",
    "region": "Visayas — Cebu / Bohol",
    "lat": 9.5525635,
    "lng": 123.771279
  },
  {
    "id": 38,
    "name": "Pasay Rotonda",
    "address": "Metro Point Mall, Edsa Corner Taft Ave, Pasay City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5381362,
    "lng": 120.9983915
  },
  {
    "id": 39,
    "name": "Paseo Center Makati",
    "address": "G/F Paseo Center, Paseo De Roxas, Makati City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5579494,
    "lng": 121.0221593
  },
  {
    "id": 40,
    "name": "PITX",
    "address": "Level 1 Paranaque Integrated Terminal Exchange, Kennedy Road, Parañaque",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5097276,
    "lng": 120.9887651
  },
  {
    "id": 112,
    "name": "Puregold Maunlad Malolos",
    "address": "L Valencia St, Malolos, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.8428002,
    "lng": 120.8109881
  },
  {
    "id": 41,
    "name": "R. Square",
    "address": "2622 Taft Ave, Malate, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5622999,
    "lng": 120.9930767
  },
  {
    "id": 113,
    "name": "Robinsons Antipolo",
    "address": "NK14 L1 Robinsons Place Antipolo, Sumulong Highway, Antipolo City",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.594579,
    "lng": 121.1697026
  },
  {
    "id": 199,
    "name": "Robinsons Bacolod",
    "address": "Lacson St, Bacolod City, Negros Occidental",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.6914441,
    "lng": 122.955896
  },
  {
    "id": 114,
    "name": "Robinsons Calasiao",
    "address": "Level 2, Robinsons Place Calasiao, Pangasinan",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 16.0226329,
    "lng": 120.3539214
  },
  {
    "id": 42,
    "name": "Robinsons Galleria Ortigas",
    "address": "Level 1 Robinsons Galleria, Edsa Cor. Ortigas Ave, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5910558,
    "lng": 121.057263
  },
  {
    "id": 115,
    "name": "Robinsons Galleria South San Pedro",
    "address": "Robinsons San Pedro, San Pedro, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.3521045,
    "lng": 121.0596233
  },
  {
    "id": 116,
    "name": "Robinsons General Trias",
    "address": "2nd Floor Robinsons Place, Brgy Tejero, General Trias, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.3955657,
    "lng": 120.8642896
  },
  {
    "id": 228,
    "name": "Robinsons Iligan",
    "address": "Robinsons Place, Iligan City, Lanao Del Norte",
    "island": "Mindanao",
    "region": "Mindanao — Northern Mindanao / Caraga",
    "lat": 8.2182056,
    "lng": 124.2377513
  },
  {
    "id": 117,
    "name": "Robinsons Ilocos",
    "address": "San Francisco, San Nicolas, Robinsons Ilocos, Ilocos Norte",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 18.1798657,
    "lng": 120.5901089
  },
  {
    "id": 200,
    "name": "Robinsons Iloilo",
    "address": "UGF Robinsons Iloilo, De Leon St cor. Quezon St, Iloilo City",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.6941504,
    "lng": 122.5636325
  },
  {
    "id": 118,
    "name": "Robinsons Imus",
    "address": "2nd Floor Food Court, Robinsons Place Imus, Aguinaldo Hwy, Imus, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.412979,
    "lng": 120.9392136
  },
  {
    "id": 201,
    "name": "Robinsons Jaro",
    "address": "Level 1 Robinsons Place Jaro, E. Lopez Jaena San Vicente, Jaro, Iloilo City",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.7194991,
    "lng": 122.5576658
  },
  {
    "id": 43,
    "name": "Robinsons Las Pinas",
    "address": "Level 1 Robinsons Place Las Piñas, Alabang-Zapote Rd., Las Piñas City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.4428208,
    "lng": 120.995255
  },
  {
    "id": 120,
    "name": "Robinsons Lipa",
    "address": "Level 1 Robinsons Lipa, President Jose P. Laurel Hwy, Lipa City, Batangas",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 13.9422765,
    "lng": 121.1485617
  },
  {
    "id": 44,
    "name": "Robinsons Malabon",
    "address": "Governor Pascual Avenue, Malabon",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.669187,
    "lng": 120.9670575
  },
  {
    "id": 45,
    "name": "Robinsons Manila",
    "address": "Level 2, Padre Faura Wing, Ermita, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.577073,
    "lng": 120.9844591
  },
  {
    "id": 46,
    "name": "Robinsons Metro East",
    "address": "Robinsons Metro East, Marcos Highway, Pasig City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6196217,
    "lng": 121.0973975
  },
  {
    "id": 121,
    "name": "Robinsons Naga",
    "address": "Robinsons Naga, Ground Floor, Naga City",
    "island": "Luzon",
    "region": "Luzon — Bicol",
    "lat": 13.615379,
    "lng": 123.1907812
  },
  {
    "id": 202,
    "name": "Robinsons North Tacloban",
    "address": "Ground Floor Robinsons North Tacloban, Tacloban City, Leyte",
    "island": "Visayas",
    "region": "Visayas — Eastern Visayas",
    "lat": 11.2398798,
    "lng": 124.9851579
  },
  {
    "id": 229,
    "name": "Robinsons Pagadian City",
    "address": "F.S. Pajares Ave Cor P.L. Urro St, Pagadian City, Zamboanga Del Sur",
    "island": "Mindanao",
    "region": "Mindanao — Zamboanga Peninsula",
    "lat": 7.8270393,
    "lng": 123.4372941
  },
  {
    "id": 203,
    "name": "Robinsons Pavia",
    "address": "Level 2 Robinsons Pavia, Ungka II, Pavia, Iloilo",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.7538453,
    "lng": 122.537142
  },
  {
    "id": 122,
    "name": "Robinsons Place Dasmarinas",
    "address": "2/F Robinsons Place Dasmarinas, Aguinaldo Hwy, Dasmariñas, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.2999244,
    "lng": 120.9514958
  },
  {
    "id": 123,
    "name": "Robinsons Santiago",
    "address": "G/F Robinsons Place, Mabini, Santiago City, Isabela",
    "island": "Luzon",
    "region": "Luzon — Cagayan Valley",
    "lat": 16.6968498,
    "lng": 121.5584501
  },
  {
    "id": 124,
    "name": "Robinsons Tuguegarao",
    "address": "Ground Floor Robinsons Place Tuguegarao, Cagayan",
    "island": "Luzon",
    "region": "Luzon — Cagayan Valley",
    "lat": 17.6272422,
    "lng": 121.7301095
  },
  {
    "id": 125,
    "name": "Shell Mamplasan",
    "address": "Shell SLEX Northbound, Santo Tomas, Biñan, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.3073587,
    "lng": 121.073607
  },
  {
    "id": 126,
    "name": "Shell NLEX Balagtas",
    "address": "North Luzon Expressway Shell Balagtas, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 4.831169,
    "lng": 120.9063607
  },
  {
    "id": 48,
    "name": "Shopwise Makati",
    "address": "GF Shopwise Makati, Chino Roces Ave., Makati",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5670141,
    "lng": 121.010926
  },
  {
    "id": 49,
    "name": "Shopwise Sucat",
    "address": "Ground Floor Shopwise Sucat, Paranaque",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.457534,
    "lng": 121.0328624
  },
  {
    "id": 50,
    "name": "SM Araneta City Cubao",
    "address": "SM Araneta City, Cubao, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6189227,
    "lng": 121.0504789
  },
  {
    "id": 128,
    "name": "SM Center Angono",
    "address": "Ground Floor SM Center Angono, Mla. East Rd., Angono, Rizal",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.5308199,
    "lng": 121.1547599
  },
  {
    "id": 129,
    "name": "SM Center Imus",
    "address": "Ground Floor SM Center Imus, Brgy Nia Road, Imus, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.4088838,
    "lng": 120.9197605
  },
  {
    "id": 51,
    "name": "SM Center Las Pinas",
    "address": "SM Hypermarket, SM Center, Alabang-Zapote Rd, Las Piñas",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.448849,
    "lng": 120.9805679
  },
  {
    "id": 52,
    "name": "SM Center Muntinlupa",
    "address": "SM Muntinlupa Ground Level, Muntinlupa City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.3777076,
    "lng": 121.0432465
  },
  {
    "id": 53,
    "name": "SM Center Pasig",
    "address": "SM Center Frontera Verde, E Rodriguez Jr Ave, Pasig City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.584014,
    "lng": 121.0748362
  },
  {
    "id": 130,
    "name": "SM Center Pulilan",
    "address": "SM Center Pulilan, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.8988703,
    "lng": 120.8679578
  },
  {
    "id": 131,
    "name": "SM Center Tuguegarao Downtown",
    "address": "GF SM Center Tuguegarao Downtown, Luna St. Cor. Mabini St., Tuguegarao City, Cagayan",
    "island": "Luzon",
    "region": "Luzon — Cagayan Valley",
    "lat": 17.6130901,
    "lng": 121.7211409
  },
  {
    "id": 204,
    "name": "SM City Bacolod",
    "address": "G/F SM City Bacolod, Rizal St, Reclamation Area, Bacolod City",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.6707922,
    "lng": 122.9378006
  },
  {
    "id": 205,
    "name": "SM City Bacolod North Bloc",
    "address": "G/F SM City Bacolod North Block, Bacolod City, Negros Occidental",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.6717834,
    "lng": 122.9414994
  },
  {
    "id": 132,
    "name": "SM City Bacoor",
    "address": "3rd Floor SM City Bacoor, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.4451032,
    "lng": 120.9485708
  },
  {
    "id": 133,
    "name": "SM City Baguio",
    "address": "Upper Ground Floor SM Baguio, Baguio City",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 16.4088567,
    "lng": 120.5972273
  },
  {
    "id": 134,
    "name": "SM City Baliwag",
    "address": "21 Doña Remedios Trinidad Hwy, Baliwag, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.9601739,
    "lng": 120.8877782
  },
  {
    "id": 135,
    "name": "SM City Bataan",
    "address": "2nd Floor SM City Bataan, Balanga",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.6831323,
    "lng": 120.537614
  },
  {
    "id": 54,
    "name": "SM City BF Paranaque",
    "address": "2F SM City BF Paranaque, Dr Arcadio Santos Ave, Parañaque",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.4577277,
    "lng": 121.0333063
  },
  {
    "id": 55,
    "name": "SM City Bicutan",
    "address": "SM City Bicutan, Taguig",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.4872652,
    "lng": 121.0442106
  },
  {
    "id": 230,
    "name": "SM City Butuan",
    "address": "2nd Floor SM City Butuan, Butuan City",
    "island": "Mindanao",
    "region": "Mindanao — Northern Mindanao / Caraga",
    "lat": 8.945412,
    "lng": 125.5309067
  },
  {
    "id": 136,
    "name": "SM City Cabanatuan",
    "address": "Level 3 SM Cabanatuan, Maharlika Highway, Cabanatuan City",
    "island": "Luzon",
    "region": "Luzon — Other Provinces",
    "lat": 15.4669243,
    "lng": 120.9518036
  },
  {
    "id": 137,
    "name": "SM City Calamba",
    "address": "National Road, Brgy Real, Calamba City, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.2041504,
    "lng": 121.1541711
  },
  {
    "id": 56,
    "name": "SM City Caloocan",
    "address": "SM City Caloocan Deparo Road, Caloocan City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.7513321,
    "lng": 121.0153479
  },
  {
    "id": 138,
    "name": "SM City Cauayan",
    "address": "SM City Cauayan, City Of Cauayan, Isabela",
    "island": "Luzon",
    "region": "Luzon — Cagayan Valley",
    "lat": 16.9371997,
    "lng": 121.7650084
  },
  {
    "id": 231,
    "name": "SM City CDO",
    "address": "Ground Floor SM City Cagayan De Oro",
    "island": "Mindanao",
    "region": "Mindanao — Northern Mindanao / Caraga",
    "lat": 8.4558,
    "lng": 124.6234
  },
  {
    "id": 232,
    "name": "SM City CDO Downtown",
    "address": "Claro M. Recto Ave, Cagayan De Oro City, Misamis Oriental",
    "island": "Mindanao",
    "region": "Mindanao — Northern Mindanao / Caraga",
    "lat": 8.4558,
    "lng": 124.6234
  },
  {
    "id": 206,
    "name": "SM City Cebu",
    "address": "Lower Ground Floor SM City Cebu",
    "island": "Visayas",
    "region": "Visayas — Cebu / Bohol",
    "lat": 10.3114,
    "lng": 123.9178
  },
  {
    "id": 139,
    "name": "SM City Clark",
    "address": "SM Ground Level, Manuel A. Roxas Hwy, Clark Freeport, Angeles, Pampanga",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.1673,
    "lng": 120.5801
  },
  {
    "id": 207,
    "name": "SM City Consolacion",
    "address": "2nd Floor SM Consolacion, Lamac, Consolacion, Cebu",
    "island": "Visayas",
    "region": "Visayas — Cebu / Bohol",
    "lat": 10.3796,
    "lng": 123.9649
  },
  {
    "id": 140,
    "name": "SM City Daet",
    "address": "3rd Floor SM City Daet, Daet, Camarines Norte",
    "island": "Luzon",
    "region": "Luzon — Bicol",
    "lat": 14.1215,
    "lng": 122.9458
  },
  {
    "id": 141,
    "name": "SM City Dasmarinas",
    "address": "Lower Ground Floor SM City Dasmarinas, Dasmariñas, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 12.8797,
    "lng": 121.774
  },
  {
    "id": 233,
    "name": "SM City Davao",
    "address": "2nd Level Main Building SM City Davao",
    "island": "Mindanao",
    "region": "Mindanao — Davao Region",
    "lat": 7.0506136,
    "lng": 125.5856774
  },
  {
    "id": 57,
    "name": "SM City East Ortigas",
    "address": "2F SM City East Ortigas, Pasig",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5883,
    "lng": 121.1061
  },
  {
    "id": 58,
    "name": "SM City Fairview",
    "address": "Lower Ground Level SM Fairview, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.7346043,
    "lng": 121.0553261
  },
  {
    "id": 234,
    "name": "SM City General Santos",
    "address": "Cor. Santiago Blvd, San Miguel St, General Santos City, South Cotabato",
    "island": "Mindanao",
    "region": "Mindanao — SOCCSKSARGEN",
    "lat": 6.1155,
    "lng": 125.181
  },
  {
    "id": 208,
    "name": "SM City Iloilo",
    "address": "Upper Ground Floor SM City Iloilo, Senator Benigno S. Aquino Jr. Ave, Mandurriao, Iloilo City",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.7144,
    "lng": 122.551
  },
  {
    "id": 142,
    "name": "SM City La Union",
    "address": "Along Diversion Road, Barangay Biday, San Fernando City, La Union",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 16.6255562,
    "lng": 120.32127
  },
  {
    "id": 143,
    "name": "SM City Laoag",
    "address": "Lower Ground Floor SM City Laoag, Laoag City, Ilocos Norte",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 18.1873947,
    "lng": 120.585015
  },
  {
    "id": 144,
    "name": "SM City Lemery",
    "address": "Ground Floor SM City Lemery, Batangas",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 13.8869024,
    "lng": 120.9094166
  },
  {
    "id": 145,
    "name": "SM City Lucena",
    "address": "2nd Level SM City Lucena, Maharlika Highway, Lucena City",
    "island": "Luzon",
    "region": "Luzon — Other Provinces",
    "lat": 13.9408018,
    "lng": 121.6217077
  },
  {
    "id": 59,
    "name": "SM City Manila",
    "address": "4th Floor SM City Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5896177,
    "lng": 120.9806083
  },
  {
    "id": 146,
    "name": "SM City Marilao",
    "address": "Ground Floor SM Marilao, 3019 Macarthur Hwy, Marilao, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.7541966,
    "lng": 120.9540167
  },
  {
    "id": 147,
    "name": "SM City Masinag",
    "address": "Upper Ground SM City Masinag, Antipolo, Rizal",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.6253692,
    "lng": 121.1173423
  },
  {
    "id": 235,
    "name": "SM City Mindpro",
    "address": "Ground Floor SM City Mindpro, La Purisima St, Zamboanga City",
    "island": "Mindanao",
    "region": "Mindanao — Zamboanga Peninsula",
    "lat": 6.9077096,
    "lng": 122.073485
  },
  {
    "id": 148,
    "name": "SM City Molino",
    "address": "Ground Floor SM Molino, Bacoor, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.3832,
    "lng": 120.9776
  },
  {
    "id": 60,
    "name": "SM City Novaliches",
    "address": "SM Novaliches Ground Level, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.7079547,
    "lng": 121.0354761
  },
  {
    "id": 149,
    "name": "SM City Olongapo Central",
    "address": "Level 4 SM City Olongapo Central, Rizal Avenue Extension, Olongapo City",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.8364953,
    "lng": 120.2829078
  },
  {
    "id": 209,
    "name": "SM City Ormoc",
    "address": "Ground Floor SM Center Ormoc, Ormoc City, Leyte",
    "island": "Visayas",
    "region": "Visayas — Eastern Visayas",
    "lat": 11.0102907,
    "lng": 124.605246
  },
  {
    "id": 150,
    "name": "SM City Pampanga",
    "address": "SM Pampanga, Jose Abad Santos Ave, Mexico, Pampanga",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.0538491,
    "lng": 120.6931742
  },
  {
    "id": 151,
    "name": "SM City Rosales",
    "address": "Ground Floor SM Rosales, Pangasinan",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 15.8778675,
    "lng": 120.602928
  },
  {
    "id": 152,
    "name": "SM City Rosario",
    "address": "General Trias Dr, Tejeros Convention, Rosario, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.4092,
    "lng": 120.8573
  },
  {
    "id": 210,
    "name": "SM City Roxas",
    "address": "Ground Floor SM City Roxas, Arnaldo Boulevard, Roxas City, Capiz",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 11.5957929,
    "lng": 122.7461282
  },
  {
    "id": 153,
    "name": "SM City San Jose Delmonte",
    "address": "Lower Ground Floor SM City Quirino Highway, San Jose Del Monte, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.7865005,
    "lng": 121.0725291
  },
  {
    "id": 61,
    "name": "SM City San Lazaro",
    "address": "Lower Ground Floor SM City San Lazaro, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6179234,
    "lng": 120.9828827
  },
  {
    "id": 154,
    "name": "SM City San Pablo",
    "address": "2F SM City San Pablo, San Pablo, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.0713685,
    "lng": 121.2989937
  },
  {
    "id": 62,
    "name": "SM City Sangandaan",
    "address": "SM Center Sangandaan, Samson Road, Caloocan City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6579405,
    "lng": 120.9715507
  },
  {
    "id": 155,
    "name": "SM City Sorsogon",
    "address": "2nd Floor Foodcourt, Maharlika Highway, Sorsogon City",
    "island": "Luzon",
    "region": "Luzon — Bicol",
    "lat": 12.9763704,
    "lng": 124.0167474
  },
  {
    "id": 63,
    "name": "SM City Sta. Mesa",
    "address": "Level 2 SM City Sta Mesa, R Magsaysay Blvd, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6040561,
    "lng": 121.0193409
  },
  {
    "id": 64,
    "name": "SM City Sucat",
    "address": "Ground Level Building B SM City Sucat, Paranaque",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.4847256,
    "lng": 120.9916384
  },
  {
    "id": 156,
    "name": "SM City Tanza",
    "address": "Ground Floor SM City Tanza, Antero Soriano Highway, Tanza, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.3924714,
    "lng": 120.8494247
  },
  {
    "id": 157,
    "name": "SM City Tarlac",
    "address": "SM City Tarlac, MacArthur Highway, Tarlac City",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.4770343,
    "lng": 120.5921083
  },
  {
    "id": 158,
    "name": "SM City Telabastagan",
    "address": "G/F SM City Telabastagan, San Fernando, Pampanga",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.1202512,
    "lng": 120.599302
  },
  {
    "id": 159,
    "name": "SM City Trece Martires",
    "address": "SM City Trece Martires, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.2820412,
    "lng": 120.8634097
  },
  {
    "id": 65,
    "name": "SM City Valenzuela",
    "address": "SM City Valenzuela, McArthur Highway, Valenzuela City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6858258,
    "lng": 120.9763199
  },
  {
    "id": 236,
    "name": "SM City Zamboanga",
    "address": "Lower Ground SM City Zamboanga, Mayor Vitaliano Agan Avenue, Zamboanga City",
    "island": "Mindanao",
    "region": "Mindanao — Zamboanga Peninsula",
    "lat": 6.9183182,
    "lng": 122.0733746
  },
  {
    "id": 66,
    "name": "SM Hypermarket Cubao",
    "address": "24 Main Ave Cubao, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6142875,
    "lng": 121.0519073
  },
  {
    "id": 67,
    "name": "SM Hypermarket Novaliches",
    "address": "402 Quirino Hwy, Novaliches, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6813374,
    "lng": 121.0187304
  },
  {
    "id": 211,
    "name": "SM Hypermarket Pavia",
    "address": "SM Hypermarket Pavia, Iloilo",
    "island": "Visayas",
    "region": "Visayas — Iloilo / Negros / W. Visayas",
    "lat": 10.7529175,
    "lng": 122.5194878
  },
  {
    "id": 161,
    "name": "SM Mega Center Cabanatuan",
    "address": "UG Level SM Mega Center, Gen. Tinio St., Cabanatuan City",
    "island": "Luzon",
    "region": "Luzon — Other Provinces",
    "lat": 15.4880106,
    "lng": 120.9651898
  },
  {
    "id": 68,
    "name": "SM Megamall",
    "address": "5/F SM Megamall, Ortigas Center, Pasig",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5856745,
    "lng": 121.0540334
  },
  {
    "id": 69,
    "name": "SM Retail HQ",
    "address": "6F SM Retail HQ Building A, J.W. Diokno Blvd, Pasay",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5411025,
    "lng": 120.9818628
  },
  {
    "id": 212,
    "name": "SM Seaside City Cebu",
    "address": "2nd Floor Cube Wing SM Seaside City Cebu, SRP, Cebu City",
    "island": "Visayas",
    "region": "Visayas — Cebu / Bohol",
    "lat": 10.2818909,
    "lng": 123.8787092
  },
  {
    "id": 70,
    "name": "SM Southmall",
    "address": "2F Food Hall, SM Southmall, Alabang-Zapote Rd, Las Piñas",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.4334532,
    "lng": 121.0081179
  },
  {
    "id": 71,
    "name": "SMDC Light Mall",
    "address": "Ground Floor SM Light Mall, Mandaluyong",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.573748,
    "lng": 121.0479435
  },
  {
    "id": 72,
    "name": "SMDC Mplace",
    "address": "Ground Floor SMDC Mplace, Panay Avenue, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5419593,
    "lng": 120.9746719
  },
  {
    "id": 73,
    "name": "SMDC Sun Mall",
    "address": "CT2 SMDC Sun Mall, España Blvd., Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6177702,
    "lng": 120.9986391
  },
  {
    "id": 74,
    "name": "Starmall Shaw Boulevard",
    "address": "G/F Starmall Edsa Shaw, Mandaluyong City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5822674,
    "lng": 121.0508985
  },
  {
    "id": 162,
    "name": "Tabaco City",
    "address": "High Point Bldg, Karangahan Blvd, Tabaco City, Albay",
    "island": "Luzon",
    "region": "Luzon — Bicol",
    "lat": 13.3602402,
    "lng": 123.7259228
  },
  {
    "id": 75,
    "name": "The Market Place Glorietta",
    "address": "G/F Marketplace Makati, Rustans Mall, Ayala Ave., Makati City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5519717,
    "lng": 121.0241588
  },
  {
    "id": 213,
    "name": "The Outlet Lapu Lapu City",
    "address": "The Outlets At Pueblo Verde, Mactan, Lapu-Lapu City, Cebu",
    "island": "Visayas",
    "region": "Visayas — Cebu / Bohol",
    "lat": 10.3011973,
    "lng": 123.9617279
  },
  {
    "id": 76,
    "name": "Tutuban Mall",
    "address": "Level 1 Main Station Tutuban Center Mall, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6069924,
    "lng": 120.9732409
  },
  {
    "id": 77,
    "name": "UP Shopping Center",
    "address": "2nd Floor UP Diliman Shopping Center, Diliman, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6596481,
    "lng": 121.0671519
  },
  {
    "id": 78,
    "name": "UPAD Hotel Taft",
    "address": "912 Pablo Ocampo Street, Malate, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.563133,
    "lng": 120.9940647
  },
  {
    "id": 79,
    "name": "Victory Mall Quiapo Underpass",
    "address": "Victory Lacson Underpass Plaza, Quezon Blvd, Quiapo, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5980192,
    "lng": 120.9815856
  },
  {
    "id": 163,
    "name": "Vigan City - Calle Crisologo",
    "address": "19 Crisologo, Vigan City, Ilocos Sur",
    "island": "Luzon",
    "region": "Luzon — Ilocos / Pangasinan / CAR",
    "lat": 17.5717093,
    "lng": 120.3863408
  },
  {
    "id": 80,
    "name": "Vista Mall Las Pinas",
    "address": "Ground Floor Vista Mall Las Pinas",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.450909,
    "lng": 120.9759558
  },
  {
    "id": 164,
    "name": "Vista Mall Malolos",
    "address": "4th Floor Vista Mall Malolos, MacArthur Hwy, Malolos, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.8750145,
    "lng": 120.7940803
  },
  {
    "id": 165,
    "name": "Vista Mall Sta. Rosa",
    "address": "Second Floor Vista Mall, Santa Rosa-Tagaytay Rd, Santa Rosa, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.2434182,
    "lng": 121.0554536
  },
  {
    "id": 81,
    "name": "Vista Mall Taguig",
    "address": "Ground Floor Vista Mall Taguig, Tuktukan, Taguig City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5298265,
    "lng": 121.0748196
  },
  {
    "id": 238,
    "name": "VivoCity",
    "address": "1 HarbourFront Walk, VivoCity, Singapore 098585",
    "island": "International",
    "region": "International — Singapore",
    "lat": 1.2647139,
    "lng": 103.8205855
  },
  {
    "id": 167,
    "name": "Waltermart Antipolo",
    "address": "L. Sumulong Memorial Circle, Antipolo, Rizal",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.5801,
    "lng": 121.173
  },
  {
    "id": 168,
    "name": "Waltermart Arayat",
    "address": "Waltermart, Jose Abad Santos, Arayat, Pampanga",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.1444,
    "lng": 120.7694
  },
  {
    "id": 169,
    "name": "Waltermart Bacoor",
    "address": "Waltermart Bacoor, Molino Boulevard, Bacoor, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.4142,
    "lng": 120.9675
  },
  {
    "id": 171,
    "name": "Waltermart Cabanatuan",
    "address": "Waltermart Cabanatuan, Maharlika Highway, Cabanatuan City, Nueva Ecija",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.4861,
    "lng": 120.972
  },
  {
    "id": 172,
    "name": "Waltermart Cabuyao",
    "address": "Km 47 San Cristobal Bridge, Cabuyao City, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.2326,
    "lng": 121.1346
  },
  {
    "id": 83,
    "name": "Waltermart Caloocan",
    "address": "1174 A. Mabini St, Maypajo, Caloocan",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6417,
    "lng": 120.9757
  },
  {
    "id": 173,
    "name": "Waltermart Dasmarinas",
    "address": "Km. 30, Brgy R-2, Dasmariñas, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.3255699,
    "lng": 120.9393339
  },
  {
    "id": 84,
    "name": "Waltermart E. Rodriguez",
    "address": "222 E. Rodriguez Ave., Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6213295,
    "lng": 121.0167606
  },
  {
    "id": 174,
    "name": "Waltermart Gapan",
    "address": "Waltermart Gapan, Maharlika National Highway, Gapan, Nueva Ecija",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.3036,
    "lng": 120.9465
  },
  {
    "id": 175,
    "name": "Waltermart Guiguinto",
    "address": "Waltermart, Macarthur Hwy, Guiguinto, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.8283,
    "lng": 120.8738
  },
  {
    "id": 176,
    "name": "Waltermart Mabalacat",
    "address": "MacArthur Hwy, Brgy. Dau, Mabalacat City, Pampanga",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.1861545,
    "lng": 120.5820044
  },
  {
    "id": 85,
    "name": "Waltermart Macapagal",
    "address": "GF Waltermart Macapagal, Diosdado Macapagal Ave., Pasay",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5321188,
    "lng": 120.986568
  },
  {
    "id": 86,
    "name": "Waltermart Makati",
    "address": "2F Waltermart Supermarket Chino Roces Avenue, Makati City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5519377,
    "lng": 121.0124204
  },
  {
    "id": 177,
    "name": "Waltermart Malolos",
    "address": "G/F Waltermart, Macarthur Hwy, Malolos, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.872,
    "lng": 120.799
  },
  {
    "id": 178,
    "name": "Waltermart Naic",
    "address": "Waltermart Naic, Governors Drive, Brgy. Sabang, Naic, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.3195,
    "lng": 120.7799
  },
  {
    "id": 87,
    "name": "Waltermart North Edsa",
    "address": "1F Waltermart North Edsa, 8001 Edsa, Project 7, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6570791,
    "lng": 121.0184863
  },
  {
    "id": 179,
    "name": "Waltermart Plaridel",
    "address": "Cagayan Valley Road, Banga 1, Plaridel, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.8816973,
    "lng": 120.8639139
  },
  {
    "id": 180,
    "name": "Waltermart San Jose NE",
    "address": "Ground Floor Waltermart San Jose, Nueva Ecija",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 15.7975467,
    "lng": 120.9914996
  },
  {
    "id": 181,
    "name": "Waltermart Silang",
    "address": "G/F Waltermart Silang, Gen. Aguinaldo Highway, Silang, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.2294242,
    "lng": 120.9676975
  },
  {
    "id": 182,
    "name": "Waltermart Sta. Maria",
    "address": "G/F Waltermart, Narra St., Sta. Clara, Sta. Maria, Bulacan",
    "island": "Luzon",
    "region": "Luzon — Central Luzon",
    "lat": 14.8223184,
    "lng": 120.9512453
  },
  {
    "id": 183,
    "name": "Waltermart Sta. Rosa Balibago",
    "address": "UGF Waltermart Center Balibago, Sta. Rosa, Laguna",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.2877443,
    "lng": 121.0921636
  },
  {
    "id": 88,
    "name": "Waltermart Sucat",
    "address": "Waltermart Sucat, Dr. A. Santos Ave, Parañaque",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.4714599,
    "lng": 121.0049032
  },
  {
    "id": 184,
    "name": "Waltermart Taytay",
    "address": "40 R-5, Taytay, Rizal",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.5795311,
    "lng": 121.1353887
  },
  {
    "id": 185,
    "name": "Waltermart Trece Martires",
    "address": "Waltermart Trece Martires, Governors Dr., Trece Martires City, Cavite",
    "island": "Luzon",
    "region": "Luzon — CALABARZON",
    "lat": 14.2804,
    "lng": 120.8706
  },
  {
    "id": 89,
    "name": "Wilcon City Center",
    "address": "Ground Level, 121 Visayas Ave, Project 8, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.6663856,
    "lng": 121.0400774
  },
  {
    "id": 90,
    "name": "Worldwide Corporate Center",
    "address": "G/F Shaw Center Mall, 360 Shaw Blvd, Mandaluyong City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5824629,
    "lng": 121.0489568
  },
  {
    "id": 186,
    "name": "Xentro Mall Antipolo",
    "address": "Ground Floor Xentro Mall Antipolo, Mambugan, Antipolo, Rizal",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.6166462,
    "lng": 121.1330731
  },
  {
    "id": 187,
    "name": "Xentro Mall Calapan",
    "address": "1F Xentromall Calapan, Roxas Drive, Lumang Bayan, Calapan, Oriental Mindoro",
    "island": "Luzon",
    "region": "Luzon — MIMAROPA",
    "lat": 13.4029582,
    "lng": 121.1811382
  },
  {
    "id": 188,
    "name": "Xentro Mall Montalban",
    "address": "Xentromall Montalban, Manggahan, Rodriguez, Rizal",
    "island": "Luzon",
    "region": "Luzon — Rizal",
    "lat": 14.7294448,
    "lng": 21.1394461
  },
  {
    "id": 91,
    "name": "Youniversity Suites Ubelt",
    "address": "GF La Village, 2118 Recto Ave, Binondo, Manila",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.601366,
    "lng": 120.987247
  },
  {
    "id": 92,
    "name": "Zuellig Building Makati",
    "address": "2F Zuellig Building, Makati Avenue Cor. Paseo De Roxas, Makati City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.5578427,
    "lng": 121.024081
  },
  {
    "id": 5,
    "name": "Ayala Malls Cloverleaf",
    "address": "4th Level Ayala Malls Cloverleaf, Quezon City",
    "island": "Luzon",
    "region": "Metro Manila",
    "lat": 14.655,
    "lng": 121.0011
  },
  {
    "id": 94,
    "name": "Ayala Malls Harbor Point",
    "address": "2nd Floor Ayala Malls Harbor Point, Subic Bay Freeport Zone",
    "island": "Luzon",
    "region": "Luzon — Other Provinces",
    "lat": 14.8249032,
    "lng": 120.2776441
  }
]

HEADERS = {
    'Content-Type': 'application/json',
    'X-Goog-Api-Key': API_KEY,
    'X-Goog-FieldMask': 'places.id,places.displayName,places.location'
}

def search_places(query, lat, lng):
    try:
        r = requests.post(
            'https://places.googleapis.com/v1/places:searchText',
            headers=HEADERS,
            json={
                'textQuery': query,
                'locationBias': {
                    'circle': {
                        'center': {'latitude': lat, 'longitude': lng},
                        'radius': 50000.0
                    }
                },
                'maxResultCount': 1
            },
            timeout=10
        )
        res = r.json()
        if res.get('places'):
            p = res['places'][0]
            return p['id'], p['displayName']['text'], p['location']['latitude'], p['location']['longitude']
    except Exception as e:
        print(f"    Error: {e}")
    return None, None, None, None

def find_best(name, address, lat, lng):
    for query, source in [
        (f"{name} {address}", 'building'),
        (f"Avocadoria {name}",  'avocadoria'),
        (address,                  'address'),
    ]:
        if not query.strip(): continue
        pid, pname, nlat, nlng = search_places(query, lat, lng)
        if pid:
            return pid, pname, source, nlat, nlng
        time.sleep(0.1)
    return None, None, 'not_found', lat, lng

results = []
found = not_found = 0
total = len(BRANCHES)
print(f"\nSearching {total} branches using Places API (New)...\n")

for i, b in enumerate(BRANCHES):
    print(f"[{i+1}/{total}] {b['name']}")
    pid, pname, source, nlat, nlng = find_best(b['name'], b['address'], b['lat'], b['lng'])
    if pid:
        found += 1
        print(f"  ✅ [{source}] {pname} -> {pid}")
    else:
        not_found += 1
        print(f"  ⚠️  Not found - keeping original")
    results.append({
        **b,
        'lat': nlat if nlat else b['lat'],
        'lng': nlng if nlng else b['lng'],
        'place_id': pid,
        'place_name': pname,
        'source': source
    })
    time.sleep(0.2)

with open('place_ids.json', 'w', encoding='utf-8') as f:
    json.dump(results, f, indent=2, ensure_ascii=False)

print(f"\nDone! {found} found, {not_found} kept original.")
print("Upload place_ids.json to Claude!")
