import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import SEO from '@/components/ui/SEO'

// ─── BRANCH DATA ─────────────────────────────────────────────────────────────
// Source: avocadoria_branches_embed_urls.xlsx
// To add orderUrl later: find the branch by name and set orderUrl:'https://...'
// To add a new branch: copy any entry, give it a new id, and fill in details.
// ─────────────────────────────────────────────────────────────────────────────
const BRANCHES = [
  {id:239,name:'Ang Mo Kio Hub',address:'53 Ang Mo Kio Ave 3, AMK Hub, Singapore 569933',island:'International',region:'International — Singapore',lat:1.3690023,lng:103.8481594,embedUrl:'https://maps.google.com/maps?q=1.3690023,103.8481594&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=1.3690023,103.8481594',orderUrl:null},
  {id:237,name:'Bedok Mall',address:'311 New Upper Changi Road, Bedok Mall, Singapore 467360',island:'International',region:'International — Singapore',lat:1.3247162,lng:103.929343,embedUrl:'https://maps.google.com/maps?q=1.3247162,103.929343&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=1.3247162,103.929343',orderUrl:null},
  {id:240,name:'Lucky Plaza',address:'304 Orchard Road, Lucky Plaza, Singapore 238863',island:'International',region:'International — Singapore',lat:1.304572,lng:103.8337952,embedUrl:'https://maps.google.com/maps?q=1.304572,103.8337952&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=1.304572,103.8337952',orderUrl:null},
  {id:238,name:'VivoCity',address:'1 HarbourFront Walk, VivoCity, Singapore 098585',island:'International',region:'International — Singapore',lat:1.2647139,lng:103.8231658,embedUrl:'https://maps.google.com/maps?q=1.2647139,103.8231658&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=1.2647139,103.8231658',orderUrl:null},
  {id:242,name:'Central Rama 9',address:'Central Rama 9, 9/9 Rama IX Road, Huai Khwang, Bangkok 10310, Thailand',island:'International',region:'International — Thailand',lat:13.7585954,lng:100.5661774,embedUrl:'https://maps.google.com/maps?q=13.7585954,100.5661774&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.7585954,100.5661774',orderUrl:null},
  {id:241,name:'Al Ghurair Centre',address:'Al Ghurair Centre, Deira, Dubai, United Arab Emirates',island:'International',region:'International — UAE',lat:25.2670488,lng:55.3173288,embedUrl:'https://maps.google.com/maps?q=25.2670488,55.3173288&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=25.2670488,55.3173288',orderUrl:null},
  {id:100,name:'Bicol International Airport',address:'GF Arrival And Waiting Lounge, Bicol International Airport, Daraga, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.111577,lng:123.6816723,embedUrl:'https://maps.google.com/maps?q=13.111577,123.6816723&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.111577,123.6816723',orderUrl:null},
  {id:110,name:'LCC CBD Terminal 2 Naga',address:'Bicol Central Station, Brgy. Triangulo, Naga City',island:'Luzon',region:'Luzon — Bicol',lat:13.6194154,lng:123.1892332,embedUrl:'https://maps.google.com/maps?q=13.6194154,123.1892332&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.6194154,123.1892332',orderUrl:null},
  {id:111,name:'LCC Legazpi',address:'LCC Food Court, LCC Mall Legazpi, Peñaranda St. Legazpi City, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.1471114,lng:123.753431,embedUrl:'https://maps.google.com/maps?q=13.1471114,123.753431&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.1471114,123.753431',orderUrl:null},
  {id:121,name:'Robinsons Naga',address:'Robinsons Naga, Ground Floor, Naga City',island:'Luzon',region:'Luzon — Bicol',lat:13.615379,lng:123.1933615,embedUrl:'https://maps.google.com/maps?q=13.615379,123.1933615&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.615379,123.1933615',orderUrl:null},
  {id:140,name:'SM City Daet',address:'3rd Floor SM City Daet, Daet, Camarines Norte',island:'Luzon',region:'Luzon — Bicol',lat:14.12164,lng:122.9458603,embedUrl:'https://maps.google.com/maps?q=14.12164,122.9458603&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.12164,122.9458603',orderUrl:null},
  {id:155,name:'SM City Sorsogon',address:'2nd Floor Foodcourt, Maharlika Highway, Sorsogon City',island:'Luzon',region:'Luzon — Bicol',lat:12.9820934,lng:123.9745496,embedUrl:'https://maps.google.com/maps?q=12.9820934,123.9745496&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.9820934,123.9745496',orderUrl:null},
  {id:162,name:'Tabaco City',address:'High Point Bldg, Karangahan Blvd, Tabaco City, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.3603556,lng:123.7258403,embedUrl:'https://maps.google.com/maps?q=13.3603556,123.7258403&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.3603556,123.7258403',orderUrl:null},
  {id:95,name:'Ayala Malls Serin',address:'Lower Ground Level Ayala Malls Serin, Silang Junction North, Tagaytay',island:'Luzon',region:'Luzon — CALABARZON',lat:14.1126283,lng:120.959143,embedUrl:'https://maps.google.com/maps?q=14.1126283,120.959143&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.1126283,120.959143',orderUrl:null},
  {id:96,name:'Ayala Malls Solenad',address:'Building D Solenad, Nuvali Boulevard, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.236516,lng:121.0576862,embedUrl:'https://maps.google.com/maps?q=14.236516,121.0576862&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.236516,121.0576862',orderUrl:null},
  {id:97,name:'Ayala Malls Vermosa',address:'3rd Floor Ayala Malls Vermosa, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3843003,lng:120.9598265,embedUrl:'https://maps.google.com/maps?q=14.3843003,120.9598265&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3843003,120.9598265',orderUrl:null},
  {id:102,name:'Central Mall Dasmarinas',address:'Salitran, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3539736,lng:120.9503435,embedUrl:'https://maps.google.com/maps?q=14.3539736,120.9503435&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3539736,120.9503435',orderUrl:null},
  {id:106,name:'Fora Mall Tagaytay',address:'Emilio Aguinaldo Highway, Silang Junction South, Tagaytay City, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.115731,lng:120.9618064,embedUrl:'https://maps.google.com/maps?q=14.115731,120.9618064&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.115731,120.9618064',orderUrl:null},
  {id:108,name:'Gateway Mall Sta. Rosa',address:'Old National Highway, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3054773,lng:121.1025073,embedUrl:'https://maps.google.com/maps?q=14.3054773,121.1025073&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3054773,121.1025073',orderUrl:null},
  {id:115,name:'Robinsons Galleria South San Pedro',address:'Robinsons San Pedro, San Pedro, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3644324,lng:121.0619214,embedUrl:'https://maps.google.com/maps?q=14.3644324,121.0619214&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3644324,121.0619214',orderUrl:null},
  {id:116,name:'Robinsons General Trias',address:'2nd Floor Robinsons Place, Brgy Tejero, General Trias, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3965922,lng:120.8649743,embedUrl:'https://maps.google.com/maps?q=14.3965922,120.8649743&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3965922,120.8649743',orderUrl:null},
  {id:118,name:'Robinsons Imus',address:'2nd Floor Food Court, Robinsons Place Imus, Aguinaldo Hwy, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.412979,lng:120.9417939,embedUrl:'https://maps.google.com/maps?q=14.412979,120.9417939&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.412979,120.9417939',orderUrl:null},
  {id:120,name:'Robinsons Lipa',address:'Level 1 Robinsons Lipa, President Jose P. Laurel Hwy, Lipa City, Batangas',island:'Luzon',region:'Luzon — CALABARZON',lat:13.9422765,lng:121.151142,embedUrl:'https://maps.google.com/maps?q=13.9422765,121.151142&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.9422765,121.151142',orderUrl:null},
  {id:122,name:'Robinsons Place Dasmarinas',address:'2/F Robinsons Place Dasmarinas, Aguinaldo Hwy, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3100893,lng:120.9501321,embedUrl:'https://maps.google.com/maps?q=14.3100893,120.9501321&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3100893,120.9501321',orderUrl:null},
  {id:129,name:'SM Center Imus',address:'Ground Floor SM Center Imus, Brgy Nia Road, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4088787,lng:120.9246314,embedUrl:'https://maps.google.com/maps?q=14.4088787,120.9246314&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4088787,120.9246314',orderUrl:null},
  {id:132,name:'SM City Bacoor',address:'3rd Floor SM City Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.445098,lng:120.9511457,embedUrl:'https://maps.google.com/maps?q=14.445098,120.9511457&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.445098,120.9511457',orderUrl:null},
  {id:137,name:'SM City Calamba',address:'National Road, Brgy Real, Calamba City, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2601624,lng:121.1335247,embedUrl:'https://maps.google.com/maps?q=14.2601624,121.1335247&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2601624,121.1335247',orderUrl:null},
  {id:141,name:'SM City Dasmarinas',address:'Lower Ground Floor SM City Dasmarinas, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.302658,lng:120.9561258,embedUrl:'https://maps.google.com/maps?q=14.302658,120.9561258&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.302658,120.9561258',orderUrl:null},
  {id:144,name:'SM City Lemery',address:'Ground Floor SM City Lemery, Batangas',island:'Luzon',region:'Luzon — CALABARZON',lat:13.8845062,lng:120.9131327,embedUrl:'https://maps.google.com/maps?q=13.8845062,120.9131327&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.8845062,120.9131327',orderUrl:null},
  {id:148,name:'SM City Molino',address:'Ground Floor SM Molino, Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3843339,lng:120.9773167,embedUrl:'https://maps.google.com/maps?q=14.3843339,120.9773167&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3843339,120.9773167',orderUrl:null},
  {id:152,name:'SM City Rosario',address:'General Trias Dr, Tejeros Convention, Rosario, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4066926,lng:120.8594531,embedUrl:'https://maps.google.com/maps?q=14.4066926,120.8594531&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4066926,120.8594531',orderUrl:null},
  {id:154,name:'SM City San Pablo',address:'2F SM City San Pablo, San Pablo, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.0713633,lng:121.3015686,embedUrl:'https://maps.google.com/maps?q=14.0713633,121.3015686&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.0713633,121.3015686',orderUrl:null},
  {id:156,name:'SM City Tanza',address:'Ground Floor SM City Tanza, Antero Soriano Highway, Tanza, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3911633,lng:120.8492795,embedUrl:'https://maps.google.com/maps?q=14.3911633,120.8492795&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3911633,120.8492795',orderUrl:null},
  {id:159,name:'SM City Trece Martires',address:'SM City Trece Martires, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.282271,lng:120.866011,embedUrl:'https://maps.google.com/maps?q=14.282271,120.866011&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.282271,120.866011',orderUrl:null},
  {id:125,name:'Shell Mamplasan',address:'Shell SLEX Northbound, Santo Tomas, Biñan, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3107,lng:121.0724,embedUrl:'https://maps.google.com/maps?q=14.3107,121.0724&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3107,121.0724',orderUrl:null},
  {id:165,name:'Vista Mall Sta. Rosa',address:'Second Floor Vista Mall, Santa Rosa-Tagaytay Rd, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2188293,lng:121.035723,embedUrl:'https://maps.google.com/maps?q=14.2188293,121.035723&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2188293,121.035723',orderUrl:null},
  {id:169,name:'Waltermart Bacoor',address:'Waltermart Bacoor, Molino Boulevard, Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4144838,lng:120.9670848,embedUrl:'https://maps.google.com/maps?q=14.4144838,120.9670848&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4144838,120.9670848',orderUrl:null},
  {id:172,name:'Waltermart Cabuyao',address:'Km 47 San Cristobal Bridge, Cabuyao City, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2204037,lng:121.1394372,embedUrl:'https://maps.google.com/maps?q=14.2204037,121.1394372&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2204037,121.1394372',orderUrl:null},
  {id:173,name:'Waltermart Dasmarinas',address:'Km. 30, Brgy R-2, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3100893,lng:120.9501321,embedUrl:'https://maps.google.com/maps?q=14.3100893,120.9501321&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3100893,120.9501321',orderUrl:null},
  {id:178,name:'Waltermart Naic',address:'Waltermart Naic, Governors Drive, Brgy. Sabang, Naic, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3195488,lng:120.7798596,embedUrl:'https://maps.google.com/maps?q=14.3195488,120.7798596&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3195488,120.7798596',orderUrl:null},
  {id:181,name:'Waltermart Silang',address:'G/F Waltermart Silang, Gen. Aguinaldo Highway, Silang, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2294242,lng:120.9702778,embedUrl:'https://maps.google.com/maps?q=14.2294242,120.9702778&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2294242,120.9702778',orderUrl:null},
  {id:183,name:'Waltermart Sta. Rosa Balibago',address:'UGF Waltermart Center Balibago, Sta. Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.28837,lng:121.094193,embedUrl:'https://maps.google.com/maps?q=14.28837,121.094193&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.28837,121.094193',orderUrl:null},
  {id:185,name:'Waltermart Trece Martires',address:'Waltermart Trece Martires, Governors Dr., Trece Martires City, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2804274,lng:120.8705923,embedUrl:'https://maps.google.com/maps?q=14.2804274,120.8705923&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2804274,120.8705923',orderUrl:null},
  {id:107,name:'Gaisano City Mall CDO',address:'Ground Floor Gaisano Mall, Cagayan de Oro',island:'Luzon',region:'Luzon — Cagayan Valley',lat:8.4863593,lng:124.6498791,embedUrl:'https://maps.google.com/maps?q=8.4863593,124.6498791&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.4863593,124.6498791',orderUrl:null},
  {id:123,name:'Robinsons Santiago',address:'G/F Robinsons Place, Mabini, Santiago City, Isabela',island:'Luzon',region:'Luzon — Cagayan Valley',lat:16.6968806,lng:121.5607041,embedUrl:'https://maps.google.com/maps?q=16.6968806,121.5607041&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.6968806,121.5607041',orderUrl:null},
  {id:124,name:'Robinsons Tuguegarao',address:'Ground Floor Robinsons Place Tuguegarao, Cagayan',island:'Luzon',region:'Luzon — Cagayan Valley',lat:17.6272422,lng:121.7326898,embedUrl:'https://maps.google.com/maps?q=17.6272422,121.7326898&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=17.6272422,121.7326898',orderUrl:null},
  {id:131,name:'SM Center Tuguegarao Downtown',address:'GF SM Center Tuguegarao Downtown, Luna St. Cor. Mabini St., Tuguegarao City, Cagayan',island:'Luzon',region:'Luzon — Cagayan Valley',lat:17.613085,lng:121.7237158,embedUrl:'https://maps.google.com/maps?q=17.613085,121.7237158&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=17.613085,121.7237158',orderUrl:null},
  {id:138,name:'SM City Cauayan',address:'SM City Cauayan, City Of Cauayan, Isabela',island:'Luzon',region:'Luzon — Cagayan Valley',lat:16.9371946,lng:121.7675833,embedUrl:'https://maps.google.com/maps?q=16.9371946,121.7675833&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.9371946,121.7675833',orderUrl:null},
  {id:103,name:'City Walk Tarlac',address:'Zamora St, Tarlac City',island:'Luzon',region:'Luzon — Central Luzon',lat:15.483365,lng:120.5913834,embedUrl:'https://maps.google.com/maps?q=15.483365,120.5913834&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.483365,120.5913834',orderUrl:null},
  {id:112,name:'Puregold Maunlad Malolos',address:'L Valencia St, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8428002,lng:120.8135684,embedUrl:'https://maps.google.com/maps?q=14.8428002,120.8135684&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8428002,120.8135684',orderUrl:null},
  {id:130,name:'SM Center Pulilan',address:'SM Center Pulilan, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.896682,lng:120.8727932,embedUrl:'https://maps.google.com/maps?q=14.896682,120.8727932&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.896682,120.8727932',orderUrl:null},
  {id:134,name:'SM City Baliwag',address:'21 Doña Remedios Trinidad Hwy, Baliwag, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.9607741,lng:120.8904427,embedUrl:'https://maps.google.com/maps?q=14.9607741,120.8904427&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.9607741,120.8904427',orderUrl:null},
  {id:135,name:'SM City Bataan',address:'2nd Floor SM City Bataan, Balanga',island:'Luzon',region:'Luzon — Central Luzon',lat:14.6824965,lng:120.5381408,embedUrl:'https://maps.google.com/maps?q=14.6824965,120.5381408&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6824965,120.5381408',orderUrl:null},
  {id:139,name:'SM City Clark',address:'SM Ground Level, Manuel A. Roxas Hwy, Clark Freeport, Angeles, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.1669382,lng:120.5858679,embedUrl:'https://maps.google.com/maps?q=15.1669382,120.5858679&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.1669382,120.5858679',orderUrl:null},
  {id:146,name:'SM City Marilao',address:'Ground Floor SM Marilao, 3019 Macarthur Hwy, Marilao, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.7541914,lng:120.9565916,embedUrl:'https://maps.google.com/maps?q=14.7541914,120.9565916&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7541914,120.9565916',orderUrl:null},
  {id:149,name:'SM City Olongapo Central',address:'Level 4 SM City Olongapo Central, Rizal Avenue Extension, Olongapo City',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8370173,lng:120.282813,embedUrl:'https://maps.google.com/maps?q=14.8370173,120.282813&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8370173,120.282813',orderUrl:null},
  {id:150,name:'SM City Pampanga',address:'SM Pampanga, Jose Abad Santos Ave, Mexico, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.052646,lng:120.698633,embedUrl:'https://maps.google.com/maps?q=15.052646,120.698633&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.052646,120.698633',orderUrl:null},
  {id:153,name:'SM City San Jose Delmonte',address:'Lower Ground Floor SM City Quirino Highway, San Jose Del Monte, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.7875394,lng:121.0750495,embedUrl:'https://maps.google.com/maps?q=14.7875394,121.0750495&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7875394,121.0750495',orderUrl:null},
  {id:157,name:'SM City Tarlac',address:'SM City Tarlac, MacArthur Highway, Tarlac City',island:'Luzon',region:'Luzon — Central Luzon',lat:15.4772881,lng:120.5940538,embedUrl:'https://maps.google.com/maps?q=15.4772881,120.5940538&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.4772881,120.5940538',orderUrl:null},
  {id:158,name:'SM City Telabastagan',address:'G/F SM City Telabastagan, San Fernando, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.120246,lng:120.6018769,embedUrl:'https://maps.google.com/maps?q=15.120246,120.6018769&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.120246,120.6018769',orderUrl:null},
  {id:126,name:'Shell NLEX Balagtas',address:'North Luzon Expressway Shell Balagtas, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8281761,lng:120.9125221,embedUrl:'https://maps.google.com/maps?q=14.8281761,120.9125221&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8281761,120.9125221',orderUrl:null},
  {id:164,name:'Vista Mall Malolos',address:'4th Floor Vista Mall Malolos, MacArthur Hwy, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8750145,lng:120.7966606,embedUrl:'https://maps.google.com/maps?q=14.8750145,120.7966606&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8750145,120.7966606',orderUrl:null},
  {id:168,name:'Waltermart Arayat',address:'Waltermart, Jose Abad Santos, Arayat, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.1443967,lng:120.7694466,embedUrl:'https://maps.google.com/maps?q=15.1443967,120.7694466&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.1443967,120.7694466',orderUrl:null},
  {id:171,name:'Waltermart Cabanatuan',address:'Waltermart Cabanatuan, Maharlika Highway, Cabanatuan City, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.4809619,lng:120.9604367,embedUrl:'https://maps.google.com/maps?q=15.4809619,120.9604367&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.4809619,120.9604367',orderUrl:null},
  {id:174,name:'Waltermart Gapan',address:'Waltermart Gapan, Maharlika National Highway, Gapan, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.3036103,lng:120.9465193,embedUrl:'https://maps.google.com/maps?q=15.3036103,120.9465193&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.3036103,120.9465193',orderUrl:null},
  {id:175,name:'Waltermart Guiguinto',address:'Waltermart, Macarthur Hwy, Guiguinto, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8283342,lng:120.8740052,embedUrl:'https://maps.google.com/maps?q=14.8283342,120.8740052&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8283342,120.8740052',orderUrl:null},
  {id:176,name:'Waltermart Mabalacat',address:'MacArthur Hwy, Brgy. Dau, Mabalacat City, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.1811405,lng:120.586447,embedUrl:'https://maps.google.com/maps?q=15.1811405,120.586447&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.1811405,120.586447',orderUrl:null},
  {id:177,name:'Waltermart Malolos',address:'G/F Waltermart, Macarthur Hwy, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8283342,lng:120.8740052,embedUrl:'https://maps.google.com/maps?q=14.8283342,120.8740052&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8283342,120.8740052',orderUrl:null},
  {id:179,name:'Waltermart Plaridel',address:'Cagayan Valley Road, Banga 1, Plaridel, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.9171764,lng:120.8853469,embedUrl:'https://maps.google.com/maps?q=14.9171764,120.8853469&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.9171764,120.8853469',orderUrl:null},
  {id:180,name:'Waltermart San Jose NE',address:'Ground Floor Waltermart San Jose, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.7975467,lng:120.9940799,embedUrl:'https://maps.google.com/maps?q=15.7975467,120.9940799&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.7975467,120.9940799',orderUrl:null},
  {id:182,name:'Waltermart Sta. Maria',address:'G/F Waltermart, Narra St., Sta. Clara, Sta. Maria, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8220471,lng:120.9501721,embedUrl:'https://maps.google.com/maps?q=14.8220471,120.9501721&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8220471,120.9501721',orderUrl:null},
  {id:99,name:'Bayombong Nueva Vizcaya',address:'The Cornerstone Bldg., Capt. Dela Cruz St., Bayombong, Nueva Vizcaya',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.4829176,lng:121.1501679,embedUrl:'https://maps.google.com/maps?q=16.4829176,121.1501679&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.4829176,121.1501679',orderUrl:null},
  {id:105,name:'CSI The City Mall Dagupan',address:'Lucao District, Dagupan City, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.045872,lng:120.343336,embedUrl:'https://maps.google.com/maps?q=16.045872,120.343336&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.045872,120.343336',orderUrl:null},
  {id:114,name:'Robinsons Calasiao',address:'Level 2, Robinsons Place Calasiao, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.0219598,lng:120.3588329,embedUrl:'https://maps.google.com/maps?q=16.0219598,120.3588329&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.0219598,120.3588329',orderUrl:null},
  {id:117,name:'Robinsons Ilocos',address:'San Francisco, San Nicolas, Robinsons Ilocos, Ilocos Norte',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:18.1788775,lng:120.591674,embedUrl:'https://maps.google.com/maps?q=18.1788775,120.591674&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=18.1788775,120.591674',orderUrl:null},
  {id:133,name:'SM City Baguio',address:'Upper Ground Floor SM Baguio, Baguio City',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.4086516,lng:120.5993133,embedUrl:'https://maps.google.com/maps?q=16.4086516,120.5993133&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.4086516,120.5993133',orderUrl:null},
  {id:142,name:'SM City La Union',address:'Along Diversion Road, Barangay Biday, San Fernando City, La Union',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.6246711,lng:120.3236138,embedUrl:'https://maps.google.com/maps?q=16.6246711,120.3236138&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.6246711,120.3236138',orderUrl:null},
  {id:143,name:'SM City Laoag',address:'Lower Ground Floor SM City Laoag, Laoag City, Ilocos Norte',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:18.1873857,lng:120.5850179,embedUrl:'https://maps.google.com/maps?q=18.1873857,120.5850179&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=18.1873857,120.5850179',orderUrl:null},
  {id:151,name:'SM City Rosales',address:'Ground Floor SM Rosales, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:15.8781997,lng:120.6025975,embedUrl:'https://maps.google.com/maps?q=15.8781997,120.6025975&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.8781997,120.6025975',orderUrl:null},
  {id:163,name:'Vigan City - Calle Crisologo',address:'19 Crisologo, Vigan City, Ilocos Sur',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:17.5722715,lng:120.3891315,embedUrl:'https://maps.google.com/maps?q=17.5722715,120.3891315&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=17.5722715,120.3891315',orderUrl:null},
  {id:104,name:'Coron, Palawan',address:'National Highway, Brgy. V, Coron, Palawan',island:'Luzon',region:'Luzon — MIMAROPA',lat:12.0060071,lng:120.1950093,embedUrl:'https://maps.google.com/maps?q=12.0060071,120.1950093&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.0060071,120.1950093',orderUrl:null},
  {id:187,name:'Xentro Mall Calapan',address:'1F Xentromall Calapan, Roxas Drive, Lumang Bayan, Calapan, Oriental Mindoro',island:'Luzon',region:'Luzon — MIMAROPA',lat:13.4029582,lng:121.1837185,embedUrl:'https://maps.google.com/maps?q=13.4029582,121.1837185&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.4029582,121.1837185',orderUrl:null},
  {id:94,name:'Ayala Malls Harbor Point',address:'2nd Floor Ayala Malls Harbor Point, Subic Bay Freeport Zone',island:'Luzon',region:'Luzon — Other Provinces',lat:14.824898,lng:120.280219,embedUrl:'https://maps.google.com/maps?q=14.824898,120.280219&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.824898,120.280219',orderUrl:null},
  {id:98,name:'Ayala Pavilion Mall',address:'Foodcourt Greenfield Pavilion Edsa Cor United St, Mandaluyong',island:'Luzon',region:'Luzon — Other Provinces',lat:14.5793466,lng:121.0528106,embedUrl:'https://maps.google.com/maps?q=14.5793466,121.0528106&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5793466,121.0528106',orderUrl:null},
  {id:101,name:'C. Raymundo Pasig',address:'C. Raymundo Ave., Corner Narra St. Maybunga, Pasig City',island:'Luzon',region:'Luzon — Other Provinces',lat:14.5769053,lng:121.0853763,embedUrl:'https://maps.google.com/maps?q=14.5769053,121.0853763&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5769053,121.0853763',orderUrl:null},
  {id:136,name:'SM City Cabanatuan',address:'Level 3 SM Cabanatuan, Maharlika Highway, Cabanatuan City',island:'Luzon',region:'Luzon — Other Provinces',lat:15.4669191,lng:120.9543785,embedUrl:'https://maps.google.com/maps?q=15.4669191,120.9543785&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.4669191,120.9543785',orderUrl:null},
  {id:145,name:'SM City Lucena',address:'2nd Level SM City Lucena, Maharlika Highway, Lucena City',island:'Luzon',region:'Luzon — Other Provinces',lat:13.9407966,lng:121.6242826,embedUrl:'https://maps.google.com/maps?q=13.9407966,121.6242826&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.9407966,121.6242826',orderUrl:null},
  {id:161,name:'SM Mega Center Cabanatuan',address:'UG Level SM Mega Center, Gen. Tinio St., Cabanatuan City',island:'Luzon',region:'Luzon — Other Provinces',lat:15.4880054,lng:120.9677647,embedUrl:'https://maps.google.com/maps?q=15.4880054,120.9677647&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.4880054,120.9677647',orderUrl:null},
  {id:93,name:'Antipolo Triangle Mall',address:'Antipolo Triangle Mall, Sen. Lorenzo Sumulong Memorial Circle, Antipolo',island:'Luzon',region:'Luzon — Rizal',lat:14.5819768,lng:121.1817404,embedUrl:'https://maps.google.com/maps?q=14.5819768,121.1817404&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5819768,121.1817404',orderUrl:null},
  {id:109,name:'Imall Antipolo',address:'LGF Imall Antipolo, Sumulong St., San Roque, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5841617,lng:121.1760221,embedUrl:'https://maps.google.com/maps?q=14.5841617,121.1760221&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5841617,121.1760221',orderUrl:null},
  {id:113,name:'Robinsons Antipolo',address:'NK14 L1 Robinsons Place Antipolo, Sumulong Highway, Antipolo City',island:'Luzon',region:'Luzon — Rizal',lat:14.5951779,lng:121.1727884,embedUrl:'https://maps.google.com/maps?q=14.5951779,121.1727884&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5951779,121.1727884',orderUrl:null},
  {id:128,name:'SM Center Angono',address:'Ground Floor SM Center Angono, Mla. East Rd., Angono, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5313532,lng:121.1535432,embedUrl:'https://maps.google.com/maps?q=14.5313532,121.1535432&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5313532,121.1535432',orderUrl:null},
  {id:147,name:'SM City Masinag',address:'Upper Ground SM City Masinag, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.6254721,lng:121.1217222,embedUrl:'https://maps.google.com/maps?q=14.6254721,121.1217222&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6254721,121.1217222',orderUrl:null},
  {id:167,name:'Waltermart Antipolo',address:'L. Sumulong Memorial Circle, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5915494,lng:121.1790108,embedUrl:'https://maps.google.com/maps?q=14.5915494,121.1790108&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5915494,121.1790108',orderUrl:null},
  {id:184,name:'Waltermart Taytay',address:'40 R-5, Taytay, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5794381,lng:121.1382625,embedUrl:'https://maps.google.com/maps?q=14.5794381,121.1382625&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5794381,121.1382625',orderUrl:null},
  {id:186,name:'Xentro Mall Antipolo',address:'Ground Floor Xentro Mall Antipolo, Mambugan, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.6166462,lng:121.1356534,embedUrl:'https://maps.google.com/maps?q=14.6166462,121.1356534&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6166462,121.1356534',orderUrl:null},
  {id:188,name:'Xentro Mall Montalban',address:'Xentromall Montalban, Manggahan, Rodriguez, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.7294448,lng:121.1420264,embedUrl:'https://maps.google.com/maps?q=14.7294448,121.1420264&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7294448,121.1420264',orderUrl:null},
  {id:0,name:'168 Mall - 5th Floor',address:'168mall 5th Floor Foodcourt Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.6056553,lng:120.9712623,embedUrl:'https://maps.google.com/maps?q=14.6056553,120.9712623&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6056553,120.9712623',orderUrl:null},
  {id:1,name:'168 Mall - Ground Floor',address:'Ground Flr. Entrance Soler St. Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.6048124,lng:120.9740937,embedUrl:'https://maps.google.com/maps?q=14.6048124,120.9740937&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6048124,120.9740937',orderUrl:null},
  {id:2,name:'999 Shopping Mall',address:'Stall 6 Food World Express Isetann Recto, Manila',island:'Luzon',region:'Metro Manila',lat:14.5995133,lng:120.984234,embedUrl:'https://maps.google.com/maps?q=14.5995133,120.984234&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995133,120.984234',orderUrl:null},
  {id:3,name:'Alabang Town Center',address:'Ground Level Entertainment Complex, Alabang Town Center, Muntinlupa',island:'Luzon',region:'Metro Manila',lat:14.4235683,lng:121.0295902,embedUrl:'https://maps.google.com/maps?q=14.4235683,121.0295902&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4235683,121.0295902',orderUrl:null},
  {id:5,name:'Ayala Malls Cloverleaf',address:'4th Level Ayala Malls Cloverleaf, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6544846,lng:121.001896,embedUrl:'https://maps.google.com/maps?q=14.6544846,121.001896&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6544846,121.001896',orderUrl:null},
  {id:6,name:'Ayala Malls Fairview Terraces',address:'LGF Ayala Mall Fairview Terraces Quirino Highway Novaliches Quezon City',island:'Luzon',region:'Metro Manila',lat:14.7989985,lng:121.068829,embedUrl:'https://maps.google.com/maps?q=14.7989985,121.068829&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7989985,121.068829',orderUrl:null},
  {id:7,name:'Ayala Malls Manila Bay',address:'2nd Floor Building B Ayala Malls Manila Bay',island:'Luzon',region:'Metro Manila',lat:14.5226661,lng:120.9894406,embedUrl:'https://maps.google.com/maps?q=14.5226661,120.9894406&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5226661,120.9894406',orderUrl:null},
  {id:8,name:'Ayala Malls Marikina',address:'Liwasang Kalayaan, Marikina, 1800 Metro Manila',island:'Luzon',region:'Metro Manila',lat:14.6487813,lng:121.1147008,embedUrl:'https://maps.google.com/maps?q=14.6487813,121.1147008&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6487813,121.1147008',orderUrl:null},
  {id:9,name:'Ayala Malls Market Market',address:'3rd Floor Market Market Mall BGC, Taguig',island:'Luzon',region:'Metro Manila',lat:14.5275159,lng:121.0264652,embedUrl:'https://maps.google.com/maps?q=14.5275159,121.0264652&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5275159,121.0264652',orderUrl:null},
  {id:10,name:'Ayala Malls The 30th',address:'Lower Ground, Ayala Malls The 30th, 30 Meralco Ave, Ortigas Center, Pasig',island:'Luzon',region:'Metro Manila',lat:14.5807015,lng:121.0657166,embedUrl:'https://maps.google.com/maps?q=14.5807015,121.0657166&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5807015,121.0657166',orderUrl:null},
  {id:11,name:'Ayala Malls Trinoma',address:'2nd Level Food Choices, Trinoma, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6517913,lng:121.0331526,embedUrl:'https://maps.google.com/maps?q=14.6517913,121.0331526&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6517913,121.0331526',orderUrl:null},
  {id:13,name:'Batasan Hills',address:'A-Plaza Bldg. 1st Floor, Batasan Hills, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6910793,lng:121.1011734,embedUrl:'https://maps.google.com/maps?q=14.6910793,121.1011734&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6910793,121.1011734',orderUrl:null},
  {id:14,name:'Centris Mall',address:'2nd Floor, Centris Station, Eton Centris, Edsa Corner Quezon Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6436396,lng:121.0387789,embedUrl:'https://maps.google.com/maps?q=14.6436396,121.0387789&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6436396,121.0387789',orderUrl:null},
  {id:15,name:'Double Dragon Plaza',address:'Ground Floor Double Dragon Plaza DD Meridian Park, Pasay City',island:'Luzon',region:'Metro Manila',lat:14.5359377,lng:120.9904686,embedUrl:'https://maps.google.com/maps?q=14.5359377,120.9904686&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5359377,120.9904686',orderUrl:null},
  {id:16,name:'Drive and Dine - Meycauayan',address:'Canumay West, Valenzuela, 1447 Metro Manila',island:'Luzon',region:'Metro Manila',lat:14.7113035,lng:120.9840996,embedUrl:'https://maps.google.com/maps?q=14.7113035,120.9840996&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7113035,120.9840996',orderUrl:null},
  {id:17,name:'Estancia Mall',address:'LG East Wing Estancia Mall, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.5775426,lng:121.0635464,embedUrl:'https://maps.google.com/maps?q=14.5775426,121.0635464&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5775426,121.0635464',orderUrl:null},
  {id:18,name:'Ever Commonwealth',address:'Ever Gotesco Avenue, Commonwealth Ave, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6780956,lng:121.0853515,embedUrl:'https://maps.google.com/maps?q=14.6780956,121.0853515&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6780956,121.0853515',orderUrl:null},
  {id:19,name:'Evia Lifestyle Mall',address:'2/F Bldg. C Evia Lifestyle Center, Daang Hari Road, Las Piñas City',island:'Luzon',region:'Metro Manila',lat:14.3767265,lng:121.0126091,embedUrl:'https://maps.google.com/maps?q=14.3767265,121.0126091&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3767265,121.0126091',orderUrl:null},
  {id:25,name:'FTI Hypermarket',address:'GF Hypermarket, FTI Complex, Taguig',island:'Luzon',region:'Metro Manila',lat:14.5041234,lng:121.0464101,embedUrl:'https://maps.google.com/maps?q=14.5041234,121.0464101&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5041234,121.0464101',orderUrl:null},
  {id:21,name:'Festival Mall Alabang',address:'Ground Floor Festival Mall, Alabang, Muntinlupa',island:'Luzon',region:'Metro Manila',lat:14.4181972,lng:121.0421102,embedUrl:'https://maps.google.com/maps?q=14.4181972,121.0421102&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4181972,121.0421102',orderUrl:null},
  {id:22,name:'Fishermall Malabon',address:'2F Fisher Mall Malabon',island:'Luzon',region:'Metro Manila',lat:14.6565475,lng:120.9606729,embedUrl:'https://maps.google.com/maps?q=14.6565475,120.9606729&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6565475,120.9606729',orderUrl:null},
  {id:23,name:'Fishermall QC',address:'2F Fisher Mall, Quezon Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6336657,lng:121.0195946,embedUrl:'https://maps.google.com/maps?q=14.6336657,121.0195946&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6336657,121.0195946',orderUrl:null},
  {id:24,name:'Food District BGC',address:'Kiosk 3, LG One Bonifacio High Street Mall, Taguig',island:'Luzon',region:'Metro Manila',lat:14.5507296,lng:121.0503969,embedUrl:'https://maps.google.com/maps?q=14.5507296,121.0503969&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5507296,121.0503969',orderUrl:null},
  {id:26,name:'Gateway Mall',address:'Gateway Mall 1, Ground Floor, Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6212221,lng:121.0537125,embedUrl:'https://maps.google.com/maps?q=14.6212221,121.0537125&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6212221,121.0537125',orderUrl:null},
  {id:27,name:'Greenhills Unimart',address:'Ground Floor Unimart Grocery Greenhills, San Juan City',island:'Luzon',region:'Metro Manila',lat:14.6025881,lng:121.0479277,embedUrl:'https://maps.google.com/maps?q=14.6025881,121.0479277&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6025881,121.0479277',orderUrl:null},
  {id:28,name:'Greenhills Virra Mall',address:'2nd Floor VMall Greenhills, San Juan City',island:'Luzon',region:'Metro Manila',lat:14.6022952,lng:121.0496743,embedUrl:'https://maps.google.com/maps?q=14.6022952,121.0496743&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6022952,121.0496743',orderUrl:null},
  {id:30,name:'Kai Mall',address:'GF Stall 11 Kai Mall, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.7565277,lng:121.0440045,embedUrl:'https://maps.google.com/maps?q=14.7565277,121.0440045&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7565277,121.0440045',orderUrl:null},
  {id:33,name:'Landmark Makati',address:'Basement 1 Food Center, Ayala Center, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5573752,lng:121.0227371,embedUrl:'https://maps.google.com/maps?q=14.5573752,121.0227371&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5573752,121.0227371',orderUrl:null},
  {id:31,name:'Landmark Manila Bay',address:'Landmark Manila Bay Foodcourt, Basement 1, Paranaque City',island:'Luzon',region:'Metro Manila',lat:14.5244311,lng:120.9901099,embedUrl:'https://maps.google.com/maps?q=14.5244311,120.9901099&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5244311,120.9901099',orderUrl:null},
  {id:32,name:'Landmark Trinoma',address:'Ground Floor Food Center Landmark Trinoma, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6529703,lng:121.0326363,embedUrl:'https://maps.google.com/maps?q=14.6529703,121.0326363&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6529703,121.0326363',orderUrl:null},
  {id:34,name:'Lucky Chinatown Mall',address:'Ground Floor, Lucky Chinatown, Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.603369,lng:120.9733408,embedUrl:'https://maps.google.com/maps?q=14.603369,120.9733408&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.603369,120.9733408',orderUrl:null},
  {id:35,name:'Moriones, Tondo',address:'399 Moriones St. Tondo Manila',island:'Luzon',region:'Metro Manila',lat:14.610109,lng:120.9655187,embedUrl:'https://maps.google.com/maps?q=14.610109,120.9655187&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.610109,120.9655187',orderUrl:null},
  {id:36,name:'One Ayala Mall',address:'Kiosk G-005, Lower G/F One Ayala Cor. Edsa, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5506776,lng:121.0288363,embedUrl:'https://maps.google.com/maps?q=14.5506776,121.0288363&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5506776,121.0288363',orderUrl:null},
  {id:40,name:'PITX',address:'Level 1 Paranaque Integrated Terminal Exchange, Kennedy Road, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.5091493,lng:120.9907732,embedUrl:'https://maps.google.com/maps?q=14.5091493,120.9907732&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5091493,120.9907732',orderUrl:null},
  {id:37,name:'Paco Market Mall',address:'Ground Floor, Paco Mall, Manila',island:'Luzon',region:'Metro Manila',lat:14.578521,lng:120.9934224,embedUrl:'https://maps.google.com/maps?q=14.578521,120.9934224&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.578521,120.9934224',orderUrl:null},
  {id:38,name:'Pasay Rotonda',address:'Metro Point Mall, Edsa Corner Taft Ave, Pasay City',island:'Luzon',region:'Metro Manila',lat:14.538131,lng:121.0009664,embedUrl:'https://maps.google.com/maps?q=14.538131,121.0009664&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.538131,121.0009664',orderUrl:null},
  {id:39,name:'Paseo Center Makati',address:'G/F Paseo Center, Paseo De Roxas, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5577038,lng:121.0231247,embedUrl:'https://maps.google.com/maps?q=14.5577038,121.0231247&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5577038,121.0231247',orderUrl:null},
  {id:41,name:'R. Square',address:'2622 Taft Ave, Malate, Manila',island:'Luzon',region:'Metro Manila',lat:14.5622947,lng:120.9956516,embedUrl:'https://maps.google.com/maps?q=14.5622947,120.9956516&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5622947,120.9956516',orderUrl:null},
  {id:42,name:'Robinsons Galleria Ortigas',address:'Level 1 Robinsons Galleria, Edsa Cor. Ortigas Ave, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.5910506,lng:121.0598379,embedUrl:'https://maps.google.com/maps?q=14.5910506,121.0598379&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5910506,121.0598379',orderUrl:null},
  {id:43,name:'Robinsons Las Pinas',address:'Level 1 Robinsons Place Las Piñas, Alabang-Zapote Rd., Las Piñas City',island:'Luzon',region:'Metro Manila',lat:14.4428156,lng:120.9978299,embedUrl:'https://maps.google.com/maps?q=14.4428156,120.9978299&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4428156,120.9978299',orderUrl:null},
  {id:44,name:'Robinsons Malabon',address:'Governor Pascual Avenue, Malabon',island:'Luzon',region:'Metro Manila',lat:14.6679535,lng:120.9650163,embedUrl:'https://maps.google.com/maps?q=14.6679535,120.9650163&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6679535,120.9650163',orderUrl:null},
  {id:45,name:'Robinsons Manila',address:'Level 2, Padre Faura Wing, Ermita, Manila',island:'Luzon',region:'Metro Manila',lat:14.5782688,lng:120.9838452,embedUrl:'https://maps.google.com/maps?q=14.5782688,120.9838452&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5782688,120.9838452',orderUrl:null},
  {id:46,name:'Robinsons Metro East',address:'Robinsons Metro East, Marcos Highway, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.6196165,lng:121.0999832,embedUrl:'https://maps.google.com/maps?q=14.6196165,121.0999832&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6196165,121.0999832',orderUrl:null},
  {id:50,name:'SM Araneta City Cubao',address:'SM Araneta City, Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6189176,lng:121.0553498,embedUrl:'https://maps.google.com/maps?q=14.6189176,121.0553498&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6189176,121.0553498',orderUrl:null},
  {id:51,name:'SM Center Las Pinas',address:'SM Hypermarket, SM Center, Alabang-Zapote Rd, Las Piñas',island:'Luzon',region:'Metro Manila',lat:14.4487295,lng:120.9808206,embedUrl:'https://maps.google.com/maps?q=14.4487295,120.9808206&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4487295,120.9808206',orderUrl:null},
  {id:52,name:'SM Center Muntinlupa',address:'SM Muntinlupa Ground Level, Muntinlupa City',island:'Luzon',region:'Metro Manila',lat:14.3777024,lng:121.0458214,embedUrl:'https://maps.google.com/maps?q=14.3777024,121.0458214&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3777024,121.0458214',orderUrl:null},
  {id:53,name:'SM Center Pasig',address:'SM Center Frontera Verde, E Rodriguez Jr Ave, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.5869379,lng:121.078992,embedUrl:'https://maps.google.com/maps?q=14.5869379,121.078992&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5869379,121.078992',orderUrl:null},
  {id:54,name:'SM City BF Paranaque',address:'2F SM City BF Paranaque, Dr Arcadio Santos Ave, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.4577604,lng:121.0327942,embedUrl:'https://maps.google.com/maps?q=14.4577604,121.0327942&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4577604,121.0327942',orderUrl:null},
  {id:55,name:'SM City Bicutan',address:'SM City Bicutan, Taguig',island:'Luzon',region:'Metro Manila',lat:14.4871893,lng:121.0440812,embedUrl:'https://maps.google.com/maps?q=14.4871893,121.0440812&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4871893,121.0440812',orderUrl:null},
  {id:56,name:'SM City Caloocan',address:'SM City Caloocan Deparo Road, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.751327,lng:121.0202188,embedUrl:'https://maps.google.com/maps?q=14.751327,121.0202188&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.751327,121.0202188',orderUrl:null},
  {id:57,name:'SM City East Ortigas',address:'2F SM City East Ortigas, Pasig',island:'Luzon',region:'Metro Manila',lat:14.5878272,lng:121.1052138,embedUrl:'https://maps.google.com/maps?q=14.5878272,121.1052138&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5878272,121.1052138',orderUrl:null},
  {id:58,name:'SM City Fairview',address:'Lower Ground Level SM Fairview, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.7345991,lng:121.057901,embedUrl:'https://maps.google.com/maps?q=14.7345991,121.057901&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7345991,121.057901',orderUrl:null},
  {id:59,name:'SM City Manila',address:'4th Floor SM City Manila',island:'Luzon',region:'Metro Manila',lat:14.581574,lng:121.0462789,embedUrl:'https://maps.google.com/maps?q=14.581574,121.0462789&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.581574,121.0462789',orderUrl:null},
  {id:60,name:'SM City Novaliches',address:'SM Novaliches Ground Level, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.7081718,lng:121.0374519,embedUrl:'https://maps.google.com/maps?q=14.7081718,121.0374519&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7081718,121.0374519',orderUrl:null},
  {id:61,name:'SM City San Lazaro',address:'Lower Ground Floor SM City San Lazaro, Manila',island:'Luzon',region:'Metro Manila',lat:14.618658,lng:120.984995,embedUrl:'https://maps.google.com/maps?q=14.618658,120.984995&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.618658,120.984995',orderUrl:null},
  {id:62,name:'SM City Sangandaan',address:'SM Center Sangandaan, Samson Road, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.6585595,lng:120.9717542,embedUrl:'https://maps.google.com/maps?q=14.6585595,120.9717542&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6585595,120.9717542',orderUrl:null},
  {id:63,name:'SM City Sta. Mesa',address:'Level 2 SM City Sta Mesa, R Magsaysay Blvd, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6046632,lng:121.0190613,embedUrl:'https://maps.google.com/maps?q=14.6046632,121.0190613&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6046632,121.0190613',orderUrl:null},
  {id:64,name:'SM City Sucat',address:'Ground Level Building B SM City Sucat, Paranaque',island:'Luzon',region:'Metro Manila',lat:14.483879,lng:120.993528,embedUrl:'https://maps.google.com/maps?q=14.483879,120.993528&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.483879,120.993528',orderUrl:null},
  {id:65,name:'SM City Valenzuela',address:'SM City Valenzuela, McArthur Highway, Valenzuela City',island:'Luzon',region:'Metro Manila',lat:14.6856445,lng:120.9771159,embedUrl:'https://maps.google.com/maps?q=14.6856445,120.9771159&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6856445,120.9771159',orderUrl:null},
  {id:66,name:'SM Hypermarket Cubao',address:'24 Main Ave Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6139108,lng:121.0545327,embedUrl:'https://maps.google.com/maps?q=14.6139108,121.0545327&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6139108,121.0545327',orderUrl:null},
  {id:67,name:'SM Hypermarket Novaliches',address:'402 Quirino Hwy, Novaliches, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.7190963,lng:121.0397678,embedUrl:'https://maps.google.com/maps?q=14.7190963,121.0397678&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7190963,121.0397678',orderUrl:null},
  {id:68,name:'SM Megamall',address:'5/F SM Megamall, Ortigas Center, Pasig',island:'Luzon',region:'Metro Manila',lat:14.5856693,lng:121.0566083,embedUrl:'https://maps.google.com/maps?q=14.5856693,121.0566083&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5856693,121.0566083',orderUrl:null},
  {id:69,name:'SM Retail HQ',address:'6F SM Retail HQ Building A, J.W. Diokno Blvd, Pasay',island:'Luzon',region:'Metro Manila',lat:14.5410973,lng:120.9844377,embedUrl:'https://maps.google.com/maps?q=14.5410973,120.9844377&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5410973,120.9844377',orderUrl:null},
  {id:70,name:'SM Southmall',address:'2F Food Hall, SM Southmall, Alabang-Zapote Rd, Las Piñas',island:'Luzon',region:'Metro Manila',lat:14.433448,lng:121.0106928,embedUrl:'https://maps.google.com/maps?q=14.433448,121.0106928&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.433448,121.0106928',orderUrl:null},
  {id:71,name:'SMDC Light Mall',address:'Ground Floor SM Light Mall, Mandaluyong',island:'Luzon',region:'Metro Manila',lat:14.5739427,lng:121.0491908,embedUrl:'https://maps.google.com/maps?q=14.5739427,121.0491908&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5739427,121.0491908',orderUrl:null},
  {id:72,name:'SMDC Mplace',address:'Ground Floor SMDC Mplace, Panay Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6388424,lng:121.0332169,embedUrl:'https://maps.google.com/maps?q=14.6388424,121.0332169&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6388424,121.0332169',orderUrl:null},
  {id:73,name:'SMDC Sun Mall',address:'CT2 SMDC Sun Mall, España Blvd., Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6183503,lng:121.0003169,embedUrl:'https://maps.google.com/maps?q=14.6183503,121.0003169&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6183503,121.0003169',orderUrl:null},
  {id:48,name:'Shopwise Makati',address:'GF Shopwise Makati, Chino Roces Ave., Makati',island:'Luzon',region:'Metro Manila',lat:14.5730194,lng:121.0180176,embedUrl:'https://maps.google.com/maps?q=14.5730194,121.0180176&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5730194,121.0180176',orderUrl:null},
  {id:49,name:'Shopwise Sucat',address:'Ground Floor Shopwise Sucat, Paranaque',island:'Luzon',region:'Metro Manila',lat:14.4575288,lng:121.0354373,embedUrl:'https://maps.google.com/maps?q=14.4575288,121.0354373&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4575288,121.0354373',orderUrl:null},
  {id:74,name:'Starmall Shaw Boulevard',address:'G/F Starmall Edsa Shaw, Mandaluyong City',island:'Luzon',region:'Metro Manila',lat:14.5828291,lng:121.0535414,embedUrl:'https://maps.google.com/maps?q=14.5828291,121.0535414&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5828291,121.0535414',orderUrl:null},
  {id:75,name:'The Market Place Glorietta',address:'G/F Marketplace Makati, Rustans Mall, Ayala Ave., Makati City',island:'Luzon',region:'Metro Manila',lat:14.5519717,lng:121.0267391,embedUrl:'https://maps.google.com/maps?q=14.5519717,121.0267391&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5519717,121.0267391',orderUrl:null},
  {id:76,name:'Tutuban Mall',address:'Level 1 Main Station Tutuban Center Mall, Manila',island:'Luzon',region:'Metro Manila',lat:14.608581,lng:120.9726643,embedUrl:'https://maps.google.com/maps?q=14.608581,120.9726643&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.608581,120.9726643',orderUrl:null},
  {id:77,name:'UP Shopping Center',address:'2nd Floor UP Diliman Shopping Center, Diliman, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6538783,lng:121.0684573,embedUrl:'https://maps.google.com/maps?q=14.6538783,121.0684573&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6538783,121.0684573',orderUrl:null},
  {id:78,name:'UPAD Hotel Taft',address:'912 Pablo Ocampo Street, Malate, Manila',island:'Luzon',region:'Metro Manila',lat:14.5631641,lng:120.9966612,embedUrl:'https://maps.google.com/maps?q=14.5631641,120.9966612&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5631641,120.9966612',orderUrl:null},
  {id:79,name:'Victory Mall Quiapo Underpass',address:'Victory Lacson Underpass Plaza, Quezon Blvd, Quiapo, Manila',island:'Luzon',region:'Metro Manila',lat:14.5980192,lng:120.9841659,embedUrl:'https://maps.google.com/maps?q=14.5980192,120.9841659&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5980192,120.9841659',orderUrl:null},
  {id:80,name:'Vista Mall Las Pinas',address:'Ground Floor Vista Mall Las Pinas',island:'Luzon',region:'Metro Manila',lat:14.4484276,lng:120.983291,embedUrl:'https://maps.google.com/maps?q=14.4484276,120.983291&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4484276,120.983291',orderUrl:null},
  {id:81,name:'Vista Mall Taguig',address:'Ground Floor Vista Mall Taguig, Tuktukan, Taguig City',island:'Luzon',region:'Metro Manila',lat:14.5316656,lng:121.0725608,embedUrl:'https://maps.google.com/maps?q=14.5316656,121.0725608&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5316656,121.0725608',orderUrl:null},
  {id:83,name:'Waltermart Caloocan',address:'1174 A. Mabini St, Maypajo, Caloocan',island:'Luzon',region:'Metro Manila',lat:14.641675,lng:120.9756949,embedUrl:'https://maps.google.com/maps?q=14.641675,120.9756949&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.641675,120.9756949',orderUrl:null},
  {id:84,name:'Waltermart E. Rodriguez',address:'222 E. Rodriguez Ave., Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6213838,lng:121.0193543,embedUrl:'https://maps.google.com/maps?q=14.6213838,121.0193543&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6213838,121.0193543',orderUrl:null},
  {id:85,name:'Waltermart Macapagal',address:'GF Waltermart Macapagal, Diosdado Macapagal Ave., Pasay',island:'Luzon',region:'Metro Manila',lat:14.5321188,lng:120.9891483,embedUrl:'https://maps.google.com/maps?q=14.5321188,120.9891483&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5321188,120.9891483',orderUrl:null},
  {id:86,name:'Waltermart Makati',address:'2F Waltermart Supermarket Chino Roces Avenue, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5511047,lng:121.0133658,embedUrl:'https://maps.google.com/maps?q=14.5511047,121.0133658&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5511047,121.0133658',orderUrl:null},
  {id:87,name:'Waltermart North Edsa',address:'1F Waltermart North Edsa, 8001 Edsa, Project 7, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6570791,lng:121.0210666,embedUrl:'https://maps.google.com/maps?q=14.6570791,121.0210666&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6570791,121.0210666',orderUrl:null},
  {id:88,name:'Waltermart Sucat',address:'Waltermart Sucat, Dr. A. Santos Ave, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.4714599,lng:121.0074835,embedUrl:'https://maps.google.com/maps?q=14.4714599,121.0074835&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4714599,121.0074835',orderUrl:null},
  {id:89,name:'Wilcon City Center',address:'Ground Level, 121 Visayas Ave, Project 8, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.666705,lng:121.042396,embedUrl:'https://maps.google.com/maps?q=14.666705,121.042396&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.666705,121.042396',orderUrl:null},
  {id:90,name:'Worldwide Corporate Center',address:'G/F Shaw Center Mall, 360 Shaw Blvd, Mandaluyong City',island:'Luzon',region:'Metro Manila',lat:14.5890273,lng:121.037123,embedUrl:'https://maps.google.com/maps?q=14.5890273,121.037123&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5890273,121.037123',orderUrl:null},
  {id:91,name:'Youniversity Suites Ubelt',address:'GF La Village, 2118 Recto Ave, Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.6006251,lng:120.9900281,embedUrl:'https://maps.google.com/maps?q=14.6006251,120.9900281&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6006251,120.9900281',orderUrl:null},
  {id:92,name:'Zuellig Building Makati',address:'2F Zuellig Building, Makati Avenue Cor. Paseo De Roxas, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5578427,lng:121.0266613,embedUrl:'https://maps.google.com/maps?q=14.5578427,121.0266613&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5578427,121.0266613',orderUrl:null},
  {id:214,name:'Ayala Malls Abreeza Davao',address:'L2 Abreeza Mall, J.P. Laurel Ave, Poblacion District, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0911904,lng:125.611299,embedUrl:'https://maps.google.com/maps?q=7.0911904,125.611299&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.0911904,125.611299',orderUrl:null},
  {id:217,name:'Gaisano Grand City Gate Mall Davao',address:'Buhangin, Davao City, Davao Del Sur',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.1590395,lng:125.5986093,embedUrl:'https://maps.google.com/maps?q=7.1590395,125.5986093&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1590395,125.5986093',orderUrl:null},
  {id:220,name:'Gaisano Mall Tagum',address:'Upper GF GMall of Tagum, National Hwy, Tagum, Davao Del Norte',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.449246,lng:125.8115664,embedUrl:'https://maps.google.com/maps?q=7.449246,125.8115664&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.449246,125.8115664',orderUrl:null},
  {id:221,name:'Gaisano Mall Toril',address:'UGF Gaisano Mall of Toril, Lim St, Toril, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.017305,lng:125.4942726,embedUrl:'https://maps.google.com/maps?q=7.017305,125.4942726&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.017305,125.4942726',orderUrl:null},
  {id:225,name:'NCCC Mall Maa Davao',address:'MacArthur Highway, Corner Don Julian Rodriguez Sr. Ave, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0617298,lng:125.5929379,embedUrl:'https://maps.google.com/maps?q=7.0617298,125.5929379&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.0617298,125.5929379',orderUrl:null},
  {id:227,name:'Panabo, Davao City',address:'G/F Gaisano Grand Mall Panabo City, Davao Del Norte',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.3063629,lng:125.6865845,embedUrl:'https://maps.google.com/maps?q=7.3063629,125.6865845&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.3063629,125.6865845',orderUrl:null},
  {id:233,name:'SM City Davao',address:'2nd Level Main Building SM City Davao',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0506083,lng:125.5882523,embedUrl:'https://maps.google.com/maps?q=7.0506083,125.5882523&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.0506083,125.5882523',orderUrl:null},
  {id:215,name:'Ayala Malls Centrio CDO',address:'GF CV Roa Wing, Centrio Mall, C.M. Recto Cor. Corrales Ave, Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4852594,lng:124.6513946,embedUrl:'https://maps.google.com/maps?q=8.4852594,124.6513946&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.4852594,124.6513946',orderUrl:null},
  {id:218,name:'Gaisano Mall Butuan',address:'Gaisano Mall Butuan, Butuan City',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.9442772,lng:125.5320944,embedUrl:'https://maps.google.com/maps?q=8.9442772,125.5320944&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.9442772,125.5320944',orderUrl:null},
  {id:219,name:'Gaisano Mall Cagayan de Oro',address:'Ground Floor Gaisano Mall, Corrales, CM Recto, Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4863593,lng:124.6498791,embedUrl:'https://maps.google.com/maps?q=8.4863593,124.6498791&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.4863593,124.6498791',orderUrl:null},
  {id:228,name:'Robinsons Iligan',address:'Robinsons Place, Iligan City, Lanao Del Norte',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.2185243,lng:124.2410095,embedUrl:'https://maps.google.com/maps?q=8.2185243,124.2410095&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.2185243,124.2410095',orderUrl:null},
  {id:230,name:'SM City Butuan',address:'2nd Floor SM City Butuan, Butuan City',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.9454067,lng:125.5334816,embedUrl:'https://maps.google.com/maps?q=8.9454067,125.5334816&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.9454067,125.5334816',orderUrl:null},
  {id:231,name:'SM City CDO',address:'Ground Floor SM City Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4558491,lng:124.6234008,embedUrl:'https://maps.google.com/maps?q=8.4558491,124.6234008&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.4558491,124.6234008',orderUrl:null},
  {id:232,name:'SM City CDO Downtown',address:'Claro M. Recto Ave, Cagayan De Oro City, Misamis Oriental',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4774312,lng:124.6766477,embedUrl:'https://maps.google.com/maps?q=8.4774312,124.6766477&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.4774312,124.6766477',orderUrl:null},
  {id:216,name:'City Mall Cotabato',address:'Citymall Cotabato, Gov. Gutierrez Ave, Cotabato City, Maguindanao',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.2007008,lng:124.2408225,embedUrl:'https://maps.google.com/maps?q=7.2007008,124.2408225&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.2007008,124.2408225',orderUrl:null},
  {id:222,name:'KCC Mall Cotabato',address:'Quezon Avenue, Cotabato City, Maguindanao',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.2273539,lng:124.2550001,embedUrl:'https://maps.google.com/maps?q=7.2273539,124.2550001&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.2273539,124.2550001',orderUrl:null},
  {id:224,name:'Kidapawan City',address:'Roxas St, Poblacion, Kidapawan, Cotabato',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.0094276,lng:125.0874664,embedUrl:'https://maps.google.com/maps?q=7.0094276,125.0874664&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.0094276,125.0874664',orderUrl:null},
  {id:234,name:'SM City General Santos',address:'Cor. Santiago Blvd, San Miguel St, General Santos City, South Cotabato',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:6.1151661,lng:125.1794457,embedUrl:'https://maps.google.com/maps?q=6.1151661,125.1794457&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=6.1151661,125.1794457',orderUrl:null},
  {id:223,name:'KCC Mall de Zamboanga',address:'Basement KCC Mall, Gov. Camins Rd, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9200552,lng:122.0734386,embedUrl:'https://maps.google.com/maps?q=6.9200552,122.0734386&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=6.9200552,122.0734386',orderUrl:null},
  {id:226,name:'Pagadian City',address:'61 Sabellano St, Pagadian City, Zamboanga del Sur',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:7.824597,lng:123.4435965,embedUrl:'https://maps.google.com/maps?q=7.824597,123.4435965&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.824597,123.4435965',orderUrl:null},
  {id:229,name:'Robinsons Pagadian City',address:'F.S. Pajares Ave Cor P.L. Urro St, Pagadian City, Zamboanga Del Sur',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:7.8283758,lng:123.4364075,embedUrl:'https://maps.google.com/maps?q=7.8283758,123.4364075&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.8283758,123.4364075',orderUrl:null},
  {id:235,name:'SM City Mindpro',address:'Ground Floor SM City Mindpro, La Purisima St, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9079042,lng:122.0761916,embedUrl:'https://maps.google.com/maps?q=6.9079042,122.0761916&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=6.9079042,122.0761916',orderUrl:null},
  {id:236,name:'SM City Zamboanga',address:'Lower Ground SM City Zamboanga, Mayor Vitaliano Agan Avenue, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9183129,lng:122.0759495,embedUrl:'https://maps.google.com/maps?q=6.9183129,122.0759495&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=6.9183129,122.0759495',orderUrl:null},
  {id:191,name:'Ayala Malls Center Cebu',address:'2L Ayala Center Cebu, Cebu Business Park, Archbishop Reyes Ave, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.318237,lng:123.9052295,embedUrl:'https://maps.google.com/maps?q=10.318237,123.9052295&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.318237,123.9052295',orderUrl:null},
  {id:192,name:'Ayala Malls Central Bloc IT Park',address:'Ayala Malls Central Block, Padriga St, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3306811,lng:123.9073198,embedUrl:'https://maps.google.com/maps?q=10.3306811,123.9073198&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3306811,123.9073198',orderUrl:null},
  {id:195,name:'Gaisano Mall Banilad Cebu',address:'Gaisano Country Mall, Banilad, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3384748,lng:123.9113027,embedUrl:'https://maps.google.com/maps?q=10.3384748,123.9113027&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3384748,123.9113027',orderUrl:null},
  {id:198,name:'Panglao, Bohol',address:'Front of Panglao Regents Park Resort, Ester Lim Drive St. Tawala, Panglao, Bohol',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:9.551728,lng:123.7744899,embedUrl:'https://maps.google.com/maps?q=9.551728,123.7744899&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=9.551728,123.7744899',orderUrl:null},
  {id:206,name:'SM City Cebu',address:'Lower Ground Floor SM City Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3114191,lng:123.9178164,embedUrl:'https://maps.google.com/maps?q=10.3114191,123.9178164&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3114191,123.9178164',orderUrl:null},
  {id:207,name:'SM City Consolacion',address:'2nd Floor SM Consolacion, Lamac, Consolacion, Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3798371,lng:123.964057,embedUrl:'https://maps.google.com/maps?q=10.3798371,123.964057&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3798371,123.964057',orderUrl:null},
  {id:212,name:'SM Seaside City Cebu',address:'2nd Floor Cube Wing SM Seaside City Cebu, SRP, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.2818796,lng:123.8827949,embedUrl:'https://maps.google.com/maps?q=10.2818796,123.8827949&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.2818796,123.8827949',orderUrl:null},
  {id:213,name:'The Outlet Lapu Lapu City',address:'The Outlets At Pueblo Verde, Mactan, Lapu-Lapu City, Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3010546,lng:123.9623019,embedUrl:'https://maps.google.com/maps?q=10.3010546,123.9623019&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3010546,123.9623019',orderUrl:null},
  {id:202,name:'Robinsons North Tacloban',address:'Ground Floor Robinsons North Tacloban, Tacloban City, Leyte',island:'Visayas',region:'Visayas — Eastern Visayas',lat:11.2398798,lng:124.9877382,embedUrl:'https://maps.google.com/maps?q=11.2398798,124.9877382&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.2398798,124.9877382',orderUrl:null},
  {id:209,name:'SM City Ormoc',address:'Ground Floor SM Center Ormoc, Ormoc City, Leyte',island:'Visayas',region:'Visayas — Eastern Visayas',lat:11.0102854,lng:124.6078209,embedUrl:'https://maps.google.com/maps?q=11.0102854,124.6078209&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.0102854,124.6078209',orderUrl:null},
  {id:189,name:'Avocadoria Boracay Extension',address:'Station 2 Front Beach, Boracay, Malay, Aklan',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.9609959,lng:121.9246445,embedUrl:'https://maps.google.com/maps?q=11.9609959,121.9246445&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.9609959,121.9246445',orderUrl:null},
  {id:190,name:'Ayala Malls Bacolod',address:'Ayala Malls Bacolod, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6763488,lng:122.9494879,embedUrl:'https://maps.google.com/maps?q=10.6763488,122.9494879&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.6763488,122.9494879',orderUrl:null},
  {id:193,name:'Boracay DMall',address:'DMall De Boracay, Malay, Aklan',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.9624662,lng:121.9253359,embedUrl:'https://maps.google.com/maps?q=11.9624662,121.9253359&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.9624662,121.9253359',orderUrl:null},
  {id:194,name:'Festive Walk Iloilo',address:'Festive Walk, Mandurriao, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7133824,lng:122.5460385,embedUrl:'https://maps.google.com/maps?q=10.7133824,122.5460385&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7133824,122.5460385',orderUrl:null},
  {id:196,name:'GT Mall Molo',address:'Ground Floor GT Mall Molo, Poblacion, Molo, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6962005,lng:122.5455934,embedUrl:'https://maps.google.com/maps?q=10.6962005,122.5455934&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.6962005,122.5455934',orderUrl:null},
  {id:197,name:'GT Mall Pavia',address:'Ground Floor GT Mall Pavia, Ungka 2, Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7537126,lng:122.5380127,embedUrl:'https://maps.google.com/maps?q=10.7537126,122.5380127&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7537126,122.5380127',orderUrl:null},
  {id:199,name:'Robinsons Bacolod',address:'Lacson St, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6815324,lng:122.9553003,embedUrl:'https://maps.google.com/maps?q=10.6815324,122.9553003&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.6815324,122.9553003',orderUrl:null},
  {id:200,name:'Robinsons Iloilo',address:'UGF Robinsons Iloilo, De Leon St cor. Quezon St, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6941504,lng:122.5662128,embedUrl:'https://maps.google.com/maps?q=10.6941504,122.5662128&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.6941504,122.5662128',orderUrl:null},
  {id:201,name:'Robinsons Jaro',address:'Level 1 Robinsons Place Jaro, E. Lopez Jaena San Vicente, Jaro, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7194991,lng:122.5602461,embedUrl:'https://maps.google.com/maps?q=10.7194991,122.5602461&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7194991,122.5602461',orderUrl:null},
  {id:203,name:'Robinsons Pavia',address:'Level 2 Robinsons Pavia, Ungka II, Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7529836,lng:122.5391968,embedUrl:'https://maps.google.com/maps?q=10.7529836,122.5391968&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7529836,122.5391968',orderUrl:null},
  {id:204,name:'SM City Bacolod',address:'G/F SM City Bacolod, Rizal St, Reclamation Area, Bacolod City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.670787,lng:122.9426715,embedUrl:'https://maps.google.com/maps?q=10.670787,122.9426715&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.670787,122.9426715',orderUrl:null},
  {id:205,name:'SM City Bacolod North Bloc',address:'G/F SM City Bacolod North Block, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6735546,lng:122.9449363,embedUrl:'https://maps.google.com/maps?q=10.6735546,122.9449363&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.6735546,122.9449363',orderUrl:null},
  {id:208,name:'SM City Iloilo',address:'Upper Ground Floor SM City Iloilo, Senator Benigno S. Aquino Jr. Ave, Mandurriao, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7143716,lng:122.5510023,embedUrl:'https://maps.google.com/maps?q=10.7143716,122.5510023&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7143716,122.5510023',orderUrl:null},
  {id:210,name:'SM City Roxas',address:'Ground Floor SM City Roxas, Arnaldo Boulevard, Roxas City, Capiz',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.5988923,lng:122.7454743,embedUrl:'https://maps.google.com/maps?q=11.5988923,122.7454743&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.5988923,122.7454743',orderUrl:null},
  {id:211,name:'SM Hypermarket Pavia',address:'SM Hypermarket Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7748048,lng:122.5426133,embedUrl:'https://maps.google.com/maps?q=10.7748048,122.5426133&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7748048,122.5426133',orderUrl:null},
]

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

  useEffect(() => {
    if (!mapReady || !showMap || !mapRef.current || leafletRef.current) return
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
        const distHtml = d !== null ? `<div style="display:inline-flex;align-items:center;gap:5px;background:rgba(182,197,72,.15);border:1.5px solid rgba(182,197,72,.4);border-radius:999px;padding:5px 12px;margin:0 0 10px"><span style="font-size:12px;font-weight:800;color:#3a6b35">📍 ${d < 1 ? Math.round(d*1000)+' m' : d.toFixed(1)+' km'} away</span></div>` : ''

        infoWindow.setContent(`
          <div style="font-family:Poppins,sans-serif;min-width:220px">
            <div style="background:#b6c548;padding:12px 14px;margin:-8px -8px 10px;border-radius:4px 4px 0 0">
              <div style="font-size:14px;font-weight:700;color:#fff;margin:0 0 2px">${b.name}</div>
              <div style="font-size:11px;color:rgba(255,255,255,.85)">${b.island}</div>
            </div>
            <p style="font-size:12px;color:#8A5F3C;margin:0 0 8px;line-height:1.5">${b.address}</p>
            ${distHtml}
            <div style="display:flex;flex-direction:column;gap:6px">
              <a href="https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(b.name + ', ' + b.address)}" target="_blank" rel="noopener noreferrer"
                style="display:inline-flex;align-items:center;gap:5px;background:#3a6b35;color:#fff;border-radius:999px;padding:7px 14px;font-size:12px;font-weight:700;text-decoration:none">
                📍 Get Directions
              </a>
              <a href="https://food.grab.com/ph/en/restaurants?search=avocadoria" target="_blank" rel="noopener noreferrer"
                style="display:inline-flex;align-items:center;gap:6px;background:#00B14F;color:#fff;border-radius:999px;padding:6px 14px;font-size:11px;font-weight:700;text-decoration:none">
                🟢 Order on Grab
              </a>
              <a href="https://foodpanda.ph/chain/cy2uf/avocadoria-ph" target="_blank" rel="noopener noreferrer"
                style="display:inline-flex;align-items:center;gap:6px;background:#d70f64;color:#fff;border-radius:999px;padding:6px 14px;font-size:11px;font-weight:700;text-decoration:none">
                🐼 Order on foodpanda
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

  return (
    <>
      <SEO
        title="Our Stores"
        description={`Find 233+ Avocadoria branches across the Philippines. Get directions and order online.`}
        path="/our-stores"
      />
      <div className="page-enter" style={{ fontFamily: "'Poppins','Segoe UI',sans-serif" }}>

        {/* ══════════════════════════════════════════════════════════
            HERO — discovery state (shown until user searches/locates)
        ══════════════════════════════════════════════════════════ */}
        {!showResults && (
          <section style={{
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
              fontSize: '24px', color: `${C.brown}cc`,
              maxWidth: '400px', margin: '0 auto 36px',
              lineHeight: '1.7',
            }}>
              233+ branches across the Philippines.<br />
              Find the nearest one and order fresh avocado desserts.
            </p>

            {/* Stats pills — Countries → Regions → Branches */}
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '40px' }}>
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
                  <span className="pill-n" style={{ fontSize: '28px', fontWeight: '800', color: C.dark, transition: 'color 0.2s' }}>{s.n}</span>
                  <span className="pill-l" style={{ fontSize: '18px', color: `${C.brown}99`, marginLeft: '6px', fontWeight: '600', transition: 'color 0.2s' }}>{s.l}</span>
                </button>
              ))}
            </div>

            {/* Primary action — GPS */}
            <button
              onClick={handleLocate}
              disabled={phase === 'locating'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '10px',
                background: phase === 'locating' ? `${C.olive}80` : C.olive,
                color: '#fff', border: 'none', borderRadius: '999px',
                padding: '15px 36px', fontSize: '28px', fontWeight: '800',
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

              {/* Radius slider — only when GPS active */}
              {userLoc && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0, background: 'rgba(182,197,72,.1)', border: '1.5px solid rgba(182,197,72,.3)', borderRadius: '10px', padding: '6px 12px' }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.olive} strokeWidth="2.5" aria-hidden="true">
                    <circle cx="12" cy="12" r="3"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2"/>
                  </svg>
                  <input
                    type="range" min="1" max="50" step="1" value={radiusKm}
                    onChange={e => setRadiusKm(Number(e.target.value))}
                    style={{ width: '90px', accentColor: C.olive, cursor: 'pointer' }}
                    aria-label="Search radius in kilometers"
                  />
                  <span style={{ fontFamily: "'Poppins',sans-serif", fontSize: '12px', fontWeight: '700', color: C.dark, minWidth: '38px' }}>
                    {radiusKm} km
                  </span>
                </div>
              )}

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
            </div>

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
                        <div style={{ fontSize: '36px', marginBottom: '12px' }}>🥑</div>
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
                  <div style={{
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
                          fontSize: '24px', fontWeight: 'normal',
                          color: C.dark, textShadow: '-2px -2px 0 #fff, 2px -2px 0 #fff, -2px 2px 0 #fff, 2px 2px 0 #fff', margin: 0, lineHeight: '1.2',
                        }}>
                          {activeBranch.name}
                        </h2>
                      </div>
                      <p style={{ fontSize: '18px', color: `${C.brown}99`, margin: '0 0 14px', lineHeight: '1.5', fontFamily: "'Poppins',sans-serif" }}>
                        📍 {activeBranch.address}
                      </p>
                      {/* Distance from user */}
                      {userLoc && activeBranch.lat && activeBranch.lng && (() => {
                        const dist = haversine(userLoc.lat, userLoc.lng, activeBranch.lat, activeBranch.lng)
                        const distLabel = dist < 1 ? `${Math.round(dist * 1000)} m` : `${dist.toFixed(1)} km`
                        return (
                          <div style={{
                            display: 'inline-flex', alignItems: 'center', gap: '7px',
                            padding: '7px 14px', borderRadius: '999px',
                            background: 'rgba(182,197,72,.15)',
                            border: `1.5px solid rgba(182,197,72,.4)`,
                            margin: '0 0 14px',
                          }}>
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.olive} strokeWidth="2.5" aria-hidden="true">
                              <circle cx="12" cy="10" r="3" /><path d="M12 2a8 8 0 0 0-8 8c0 5.4 8 12 8 12s8-6.6 8-12a8 8 0 0 0-8-8z" />
                            </svg>
                            <span style={{ fontSize: '13px', fontWeight: '800', color: C.dark, fontFamily: "'Poppins',sans-serif" }}>
                              {distLabel} away
                            </span>
                            <span style={{ fontSize: '11px', color: `${C.brown}90`, fontWeight: '600', fontFamily: "'Poppins',sans-serif" }}>
                              from your location
                            </span>
                          </div>
                        )
                      })()}
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <a href={`https://www.google.com/maps/dir/?api=1&origin=My+Location&destination=${encodeURIComponent(activeBranch.name + ', ' + activeBranch.address)}&destination_place_id=`} target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '5px',
                            padding: '9px 18px', borderRadius: '999px',
                            background: C.olive, color: '#fff',
                            fontSize: '13px', fontWeight: '700',
                            textDecoration: 'none', fontFamily: "'Poppins',sans-serif",
                            boxShadow: `0 3px 12px rgba(182,197,72,.4)`, transition: 'all .2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = C.dark}
                          onMouseLeave={e => e.currentTarget.style.background = C.olive}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                            <path d="M3 11l19-9-9 19-2-8-8-2z" />
                          </svg>
                          Get Directions
                        </a>
                        {/* Grab + FoodPanda order buttons */}
                        <a href="https://food.grab.com/ph/en/restaurants?search=avocadoria" target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '9px 18px', borderRadius: '999px',
                            background: '#00B14F', color: '#fff',
                            fontSize: '13px', fontWeight: '700',
                            textDecoration: 'none', fontFamily: "'Poppins',sans-serif",
                            boxShadow: '0 3px 12px rgba(0,177,79,.3)', transition: 'background .2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#009640'}
                          onMouseLeave={e => e.currentTarget.style.background = '#00B14F'}
                        >
                          🟢 Grab
                        </a>
                        <a href="https://foodpanda.ph/chain/cy2uf/avocadoria-ph" target="_blank" rel="noopener noreferrer"
                          style={{
                            display: 'inline-flex', alignItems: 'center', gap: '6px',
                            padding: '9px 18px', borderRadius: '999px',
                            background: '#d70f64', color: '#fff',
                            fontSize: '13px', fontWeight: '700',
                            textDecoration: 'none', fontFamily: "'Poppins',sans-serif",
                            boxShadow: '0 3px 12px rgba(215,15,100,.3)', transition: 'background .2s',
                          }}
                          onMouseEnter={e => e.currentTarget.style.background = '#b50d55'}
                          onMouseLeave={e => e.currentTarget.style.background = '#d70f64'}
                        >
                          🐼 foodpanda
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
