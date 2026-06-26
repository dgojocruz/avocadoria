import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import SEO from '@/components/ui/SEO'

// ─── BRANCH DATA ─────────────────────────────────────────────────────────────
// Source: avocadoria_branches_embed_urls.xlsx
// To add orderUrl later: find the branch by name and set orderUrl:'https://...'
// To add a new branch: copy any entry, give it a new id, and fill in details.
// ─────────────────────────────────────────────────────────────────────────────
const BRANCHES = [
  {id:239,name:'Ang Mo Kio Hub',address:'53 Ang Mo Kio Ave 3, AMK Hub, Singapore 569933',island:'International',region:'International — Singapore',lat:1.3689164,lng:103.8469928,embedUrl:'https://maps.google.com/maps?q=1.3689164,103.8469928&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=1.3699,103.8487',orderUrl:null},
  {id:237,name:'Bedok Mall',address:'311 New Upper Changi Road, Bedok Mall, Singapore 467360',island:'International',region:'International — Singapore',lat:1.3247216,lng:103.9244721,embedUrl:'https://maps.google.com/maps?q=1.3247216,103.9244721&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=1.3241,103.9300',orderUrl:null},
  {id:240,name:'Lucky Plaza',address:'304 Orchard Road, Lucky Plaza, Singapore 238863',island:'International',region:'International — Singapore',lat:1.304572,lng:103.8312149,embedUrl:'https://maps.google.com/maps?q=1.304572,103.8312149&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=1.3027,103.8321',orderUrl:null},
  {id:238,name:'VivoCity',address:'1 HarbourFront Walk, VivoCity, Singapore 098585',island:'International',region:'International — Singapore',lat:1.2647139,lng:103.8205855,embedUrl:'https://maps.google.com/maps?q=1.2647139,103.8205855&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=1.2644,103.8222',orderUrl:null},
  {id:242,name:'Central Rama 9',address:'Central Rama 9, 9/9 Rama IX Road, Huai Khwang, Bangkok 10310, Thailand',island:'International',region:'International — Thailand',lat:13.7585954,lng:100.5635971,embedUrl:'https://maps.google.com/maps?q=13.7585954,100.5635971&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.7577,100.5673',orderUrl:null},
  {id:241,name:'Al Ghurair Centre',address:'Al Ghurair Centre, Deira, Dubai, United Arab Emirates',island:'International',region:'International — UAE',lat:25.2670536,lng:55.3147539,embedUrl:'https://maps.google.com/maps?q=25.2670536,55.3147539&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=25.2653,55.3243',orderUrl:null},
  {id:100,name:'Bicol International Airport',address:'GF Arrival And Waiting Lounge, Bicol International Airport, Daraga, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.111577,lng:123.6816723,embedUrl:'https://maps.google.com/maps?q=13.111577,123.6816723&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.1116,123.6817',orderUrl:null},
  {id:110,name:'LCC CBD Terminal 2 Naga',address:'Bicol Central Station, Brgy. Triangulo, Naga City',island:'Luzon',region:'Luzon — Bicol',lat:13.6192637,lng:123.1865186,embedUrl:'https://maps.google.com/maps?q=13.6192637,123.1865186&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.1516,123.732',orderUrl:null},
  {id:111,name:'LCC Legazpi',address:'LCC Food Court, LCC Mall Legazpi, Peñaranda St. Legazpi City, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.6199103,lng:123.1796419,embedUrl:'https://maps.google.com/maps?q=13.6199103,123.1796419&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:121,name:'Robinsons Naga',address:'Robinsons Naga, Ground Floor, Naga City',island:'Luzon',region:'Luzon — Bicol',lat:13.615379,lng:123.1907812,embedUrl:'https://maps.google.com/maps?q=13.615379,123.1907812&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.6154,123.1934',orderUrl:null},
  {id:140,name:'SM City Daet',address:'3rd Floor SM City Daet, Daet, Camarines Norte',island:'Luzon',region:'Luzon — Bicol',lat:14.1215,lng:122.9458,embedUrl:'https://maps.google.com/maps?q=14.1215,122.9458&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.1215,122.9458',orderUrl:null},
  {id:155,name:'SM City Sorsogon',address:'2nd Floor Foodcourt, Maharlika Highway, Sorsogon City',island:'Luzon',region:'Luzon — Bicol',lat:12.9763704,lng:124.0167474,embedUrl:'https://maps.google.com/maps?q=12.9763704,124.0167474&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:162,name:'Tabaco City',address:'High Point Bldg, Karangahan Blvd, Tabaco City, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.3602402,lng:123.7259228,embedUrl:'https://maps.google.com/maps?q=13.3602402,123.7259228&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:95,name:'Ayala Malls Serin',address:'Lower Ground Level Ayala Malls Serin, Silang Junction North, Tagaytay',island:'Luzon',region:'Luzon — CALABARZON',lat:14.1126335,lng:120.9565681,embedUrl:'https://maps.google.com/maps?q=14.1126335,120.9565681&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.1126,120.9591',orderUrl:null},
  {id:96,name:'Ayala Malls Solenad',address:'Building D Solenad, Nuvali Boulevard, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.240911,lng:121.0555524,embedUrl:'https://maps.google.com/maps?q=14.240911,121.0555524&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:97,name:'Ayala Malls Vermosa',address:'3rd Floor Ayala Malls Vermosa, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:4.3843055,lng:120.9572516,embedUrl:'https://maps.google.com/maps?q=4.3843055,120.9572516&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:102,name:'Central Mall Dasmarinas',address:'Salitran, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3496664,lng:120.9333693,embedUrl:'https://maps.google.com/maps?q=14.3496664,120.9333693&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:106,name:'Fora Mall Tagaytay',address:'Emilio Aguinaldo Highway, Silang Junction South, Tagaytay City, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.1158604,lng:120.9617004,embedUrl:'https://maps.google.com/maps?q=14.1158604,120.9617004&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.1151,120.9619',orderUrl:null},
  {id:108,name:'Gateway Mall Sta. Rosa',address:'Old National Highway, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.6209,lng:121.0526,embedUrl:'https://maps.google.com/maps?q=14.6209,121.0526&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6209,121.0526',orderUrl:null},
  {id:115,name:'Robinsons Galleria South San Pedro',address:'Robinsons San Pedro, San Pedro, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3521045,lng:121.0596233,embedUrl:'https://maps.google.com/maps?q=14.3521045,121.0596233&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3521,121.0622',orderUrl:null},
  {id:116,name:'Robinsons General Trias',address:'2nd Floor Robinsons Place, Brgy Tejero, General Trias, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3955657,lng:120.8642896,embedUrl:'https://maps.google.com/maps?q=14.3955657,120.8642896&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3969,120.865',orderUrl:null},
  {id:118,name:'Robinsons Imus',address:'2nd Floor Food Court, Robinsons Place Imus, Aguinaldo Hwy, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.412979,lng:120.9392136,embedUrl:'https://maps.google.com/maps?q=14.412979,120.9392136&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4129,120.9417',orderUrl:null},
  {id:120,name:'Robinsons Lipa',address:'Level 1 Robinsons Lipa, President Jose P. Laurel Hwy, Lipa City, Batangas',island:'Luzon',region:'Luzon — CALABARZON',lat:13.9422765,lng:121.1485617,embedUrl:'https://maps.google.com/maps?q=13.9422765,121.1485617&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:122,name:'Robinsons Place Dasmarinas',address:'2/F Robinsons Place Dasmarinas, Aguinaldo Hwy, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2999244,lng:120.9514958,embedUrl:'https://maps.google.com/maps?q=14.2999244,120.9514958&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:129,name:'SM Center Imus',address:'Ground Floor SM Center Imus, Brgy Nia Road, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4088838,lng:120.9197605,embedUrl:'https://maps.google.com/maps?q=14.4088838,120.9197605&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4089,120.9246',orderUrl:null},
  {id:132,name:'SM City Bacoor',address:'3rd Floor SM City Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4451032,lng:120.9485708,embedUrl:'https://maps.google.com/maps?q=14.4451032,120.9485708&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4451,120.9512',orderUrl:null},
  {id:137,name:'SM City Calamba',address:'National Road, Brgy Real, Calamba City, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2041504,lng:121.1541711,embedUrl:'https://maps.google.com/maps?q=14.2041504,121.1541711&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2034,121.1551',orderUrl:null},
  {id:141,name:'SM City Dasmarinas',address:'Lower Ground Floor SM City Dasmarinas, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:12.8797,lng:121.774,embedUrl:'https://maps.google.com/maps?q=12.8797,121.774&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:144,name:'SM City Lemery',address:'Ground Floor SM City Lemery, Batangas',island:'Luzon',region:'Luzon — CALABARZON',lat:13.8869024,lng:120.9094166,embedUrl:'https://maps.google.com/maps?q=13.8869024,120.9094166&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:148,name:'SM City Molino',address:'Ground Floor SM Molino, Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3832,lng:120.9776,embedUrl:'https://maps.google.com/maps?q=14.3832,120.9776&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3832,120.9776',orderUrl:null},
  {id:152,name:'SM City Rosario',address:'General Trias Dr, Tejeros Convention, Rosario, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4092,lng:120.8573,embedUrl:'https://maps.google.com/maps?q=14.4092,120.8573&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4092,120.8573',orderUrl:null},
  {id:154,name:'SM City San Pablo',address:'2F SM City San Pablo, San Pablo, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.0713685,lng:121.2989937,embedUrl:'https://maps.google.com/maps?q=14.0713685,121.2989937&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:156,name:'SM City Tanza',address:'Ground Floor SM City Tanza, Antero Soriano Highway, Tanza, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3924714,lng:120.8494247,embedUrl:'https://maps.google.com/maps?q=14.3924714,120.8494247&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3926,120.8489',orderUrl:null},
  {id:159,name:'SM City Trece Martires',address:'SM City Trece Martires, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2820412,lng:120.8634097,embedUrl:'https://maps.google.com/maps?q=14.2820412,120.8634097&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:125,name:'Shell Mamplasan',address:'Shell SLEX Northbound, Santo Tomas, Biñan, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3073587,lng:121.073607,embedUrl:'https://maps.google.com/maps?q=14.3073587,121.073607&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3093,121.0738',orderUrl:null},
  {id:165,name:'Vista Mall Sta. Rosa',address:'Second Floor Vista Mall, Santa Rosa-Tagaytay Rd, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2434182,lng:121.0554536,embedUrl:'https://maps.google.com/maps?q=14.2434182,121.0554536&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:169,name:'Waltermart Bacoor',address:'Waltermart Bacoor, Molino Boulevard, Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4142,lng:120.9675,embedUrl:'https://maps.google.com/maps?q=14.4142,120.9675&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4142,120.9675',orderUrl:null},
  {id:172,name:'Waltermart Cabuyao',address:'Km 47 San Cristobal Bridge, Cabuyao City, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2326,lng:121.1346,embedUrl:'https://maps.google.com/maps?q=14.2326,121.1346&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2326,121.1346',orderUrl:null},
  {id:173,name:'Waltermart Dasmarinas',address:'Km. 30, Brgy R-2, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3255699,lng:120.9393339,embedUrl:'https://maps.google.com/maps?q=14.3255699,120.9393339&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:178,name:'Waltermart Naic',address:'Waltermart Naic, Governors Drive, Brgy. Sabang, Naic, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3195,lng:120.7799,embedUrl:'https://maps.google.com/maps?q=14.3195,120.7799&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.3195,120.7799',orderUrl:null},
  {id:181,name:'Waltermart Silang',address:'G/F Waltermart Silang, Gen. Aguinaldo Highway, Silang, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2294242,lng:120.9676975,embedUrl:'https://maps.google.com/maps?q=14.2294242,120.9676975&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2294,120.9703',orderUrl:null},
  {id:183,name:'Waltermart Sta. Rosa Balibago',address:'UGF Waltermart Center Balibago, Sta. Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2877443,lng:121.0921636,embedUrl:'https://maps.google.com/maps?q=14.2877443,121.0921636&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:185,name:'Waltermart Trece Martires',address:'Waltermart Trece Martires, Governors Dr., Trece Martires City, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2804,lng:120.8706,embedUrl:'https://maps.google.com/maps?q=14.2804,120.8706&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.2804,120.8706',orderUrl:null},
  {id:107,name:'Gaisano City Mall CDO',address:'Ground Floor Gaisano Mall, Cagayan de Oro',island:'Luzon',region:'Luzon — Cagayan Valley',lat:8.4863646,lng:124.6473042,embedUrl:'https://maps.google.com/maps?q=8.4863646,124.6473042&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:123,name:'Robinsons Santiago',address:'G/F Robinsons Place, Mabini, Santiago City, Isabela',island:'Luzon',region:'Luzon — Cagayan Valley',lat:16.6968498,lng:121.5584501,embedUrl:'https://maps.google.com/maps?q=16.6968498,121.5584501&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:124,name:'Robinsons Tuguegarao',address:'Ground Floor Robinsons Place Tuguegarao, Cagayan',island:'Luzon',region:'Luzon — Cagayan Valley',lat:17.6272422,lng:121.7301095,embedUrl:'https://maps.google.com/maps?q=17.6272422,121.7301095&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:131,name:'SM Center Tuguegarao Downtown',address:'GF SM Center Tuguegarao Downtown, Luna St. Cor. Mabini St., Tuguegarao City, Cagayan',island:'Luzon',region:'Luzon — Cagayan Valley',lat:17.6130901,lng:121.7211409,embedUrl:'https://maps.google.com/maps?q=17.6130901,121.7211409&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:138,name:'SM City Cauayan',address:'SM City Cauayan, City Of Cauayan, Isabela',island:'Luzon',region:'Luzon — Cagayan Valley',lat:16.9371997,lng:121.7650084,embedUrl:'https://maps.google.com/maps?q=16.9371997,121.7650084&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.9372,121.7676',orderUrl:null},
  {id:103,name:'City Walk Tarlac',address:'Zamora St, Tarlac City',island:'Luzon',region:'Luzon — Central Luzon',lat:15.4850383,lng:120.5865663,embedUrl:'https://maps.google.com/maps?q=15.4850383,120.5865663&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.485,120.5891',orderUrl:null},
  {id:112,name:'Puregold Maunlad Malolos',address:'L Valencia St, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8428002,lng:120.8109881,embedUrl:'https://maps.google.com/maps?q=14.8428002,120.8109881&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8428,120.8136',orderUrl:null},
  {id:130,name:'SM Center Pulilan',address:'SM Center Pulilan, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8988703,lng:120.8679578,embedUrl:'https://maps.google.com/maps?q=14.8988703,120.8679578&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:134,name:'SM City Baliwag',address:'21 Doña Remedios Trinidad Hwy, Baliwag, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.9601739,lng:120.8877782,embedUrl:'https://maps.google.com/maps?q=14.9601739,120.8877782&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:135,name:'SM City Bataan',address:'2nd Floor SM City Bataan, Balanga',island:'Luzon',region:'Luzon — Central Luzon',lat:14.6831323,lng:120.537614,embedUrl:'https://maps.google.com/maps?q=14.6831323,120.537614&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:139,name:'SM City Clark',address:'SM Ground Level, Manuel A. Roxas Hwy, Clark Freeport, Angeles, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.1673,lng:120.5801,embedUrl:'https://maps.google.com/maps?q=15.1673,120.5801&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.1673,120.5801',orderUrl:null},
  {id:146,name:'SM City Marilao',address:'Ground Floor SM Marilao, 3019 Macarthur Hwy, Marilao, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.7541966,lng:120.9540167,embedUrl:'https://maps.google.com/maps?q=14.7541966,120.9540167&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7544,120.9558',orderUrl:null},
  {id:149,name:'SM City Olongapo Central',address:'Level 4 SM City Olongapo Central, Rizal Avenue Extension, Olongapo City',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8364953,lng:120.2829078,embedUrl:'https://maps.google.com/maps?q=14.8364953,120.2829078&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:150,name:'SM City Pampanga',address:'SM Pampanga, Jose Abad Santos Ave, Mexico, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.0538491,lng:120.6931742,embedUrl:'https://maps.google.com/maps?q=15.0538491,120.6931742&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.0278,120.6935',orderUrl:null},
  {id:153,name:'SM City San Jose Delmonte',address:'Lower Ground Floor SM City Quirino Highway, San Jose Del Monte, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.7865005,lng:121.0725291,embedUrl:'https://maps.google.com/maps?q=14.7865005,121.0725291&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:157,name:'SM City Tarlac',address:'SM City Tarlac, MacArthur Highway, Tarlac City',island:'Luzon',region:'Luzon — Central Luzon',lat:15.4770343,lng:120.5921083,embedUrl:'https://maps.google.com/maps?q=15.4770343,120.5921083&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.4774,120.5949',orderUrl:null},
  {id:158,name:'SM City Telabastagan',address:'G/F SM City Telabastagan, San Fernando, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.1202512,lng:120.599302,embedUrl:'https://maps.google.com/maps?q=15.1202512,120.599302&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:126,name:'Shell NLEX Balagtas',address:'North Luzon Expressway Shell Balagtas, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:4.831169,lng:120.9063607,embedUrl:'https://maps.google.com/maps?q=4.831169,120.9063607&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.831,120.9086',orderUrl:null},
  {id:164,name:'Vista Mall Malolos',address:'4th Floor Vista Mall Malolos, MacArthur Hwy, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8750145,lng:120.7940803,embedUrl:'https://maps.google.com/maps?q=14.8750145,120.7940803&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.875,120.7967',orderUrl:null},
  {id:168,name:'Waltermart Arayat',address:'Waltermart, Jose Abad Santos, Arayat, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.1444,lng:120.7694,embedUrl:'https://maps.google.com/maps?q=15.1444,120.7694&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.1444,120.7694',orderUrl:null},
  {id:171,name:'Waltermart Cabanatuan',address:'Waltermart Cabanatuan, Maharlika Highway, Cabanatuan City, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.4861,lng:120.972,embedUrl:'https://maps.google.com/maps?q=15.4861,120.972&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.4861,120.972',orderUrl:null},
  {id:174,name:'Waltermart Gapan',address:'Waltermart Gapan, Maharlika National Highway, Gapan, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.3036,lng:120.9465,embedUrl:'https://maps.google.com/maps?q=15.3036,120.9465&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.3036,120.9465',orderUrl:null},
  {id:175,name:'Waltermart Guiguinto',address:'Waltermart, Macarthur Hwy, Guiguinto, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8283,lng:120.8738,embedUrl:'https://maps.google.com/maps?q=14.8283,120.8738&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.8283,120.8738',orderUrl:null},
  {id:176,name:'Waltermart Mabalacat',address:'MacArthur Hwy, Brgy. Dau, Mabalacat City, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.1861545,lng:120.5820044,embedUrl:'https://maps.google.com/maps?q=15.1861545,120.5820044&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:177,name:'Waltermart Malolos',address:'G/F Waltermart, Macarthur Hwy, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.872,lng:120.799,embedUrl:'https://maps.google.com/maps?q=14.872,120.799&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.872,120.799',orderUrl:null},
  {id:179,name:'Waltermart Plaridel',address:'Cagayan Valley Road, Banga 1, Plaridel, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8816973,lng:120.8639139,embedUrl:'https://maps.google.com/maps?q=14.8816973,120.8639139&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:180,name:'Waltermart San Jose NE',address:'Ground Floor Waltermart San Jose, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.7975467,lng:120.9914996,embedUrl:'https://maps.google.com/maps?q=15.7975467,120.9914996&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.7975,120.9941',orderUrl:null},
  {id:182,name:'Waltermart Sta. Maria',address:'G/F Waltermart, Narra St., Sta. Clara, Sta. Maria, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8223184,lng:120.9512453,embedUrl:'https://maps.google.com/maps?q=14.8223184,120.9512453&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:99,name:'Bayombong Nueva Vizcaya',address:'The Cornerstone Bldg., Capt. Dela Cruz St., Bayombong, Nueva Vizcaya',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.4843087,lng:121.1479126,embedUrl:'https://maps.google.com/maps?q=16.4843087,121.1479126&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.4829,121.1502',orderUrl:null},
  {id:105,name:'CSI The City Mall Dagupan',address:'Lucao District, Dagupan City, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.0235533,lng:120.3207603,embedUrl:'https://maps.google.com/maps?q=16.0235533,120.3207603&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:114,name:'Robinsons Calasiao',address:'Level 2, Robinsons Place Calasiao, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.0226329,lng:120.3539214,embedUrl:'https://maps.google.com/maps?q=16.0226329,120.3539214&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:117,name:'Robinsons Ilocos',address:'San Francisco, San Nicolas, Robinsons Ilocos, Ilocos Norte',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:18.1798657,lng:120.5901089,embedUrl:'https://maps.google.com/maps?q=18.1798657,120.5901089&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=18.1789,120.5917',orderUrl:null},
  {id:133,name:'SM City Baguio',address:'Upper Ground Floor SM Baguio, Baguio City',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.4088567,lng:120.5972273,embedUrl:'https://maps.google.com/maps?q=16.4088567,120.5972273&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=16.4089,120.5998',orderUrl:null},
  {id:142,name:'SM City La Union',address:'Along Diversion Road, Barangay Biday, San Fernando City, La Union',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.6255562,lng:120.32127,embedUrl:'https://maps.google.com/maps?q=16.6255562,120.32127&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:143,name:'SM City Laoag',address:'Lower Ground Floor SM City Laoag, Laoag City, Ilocos Norte',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:18.1873947,lng:120.585015,embedUrl:'https://maps.google.com/maps?q=18.1873947,120.585015&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=18.1874,120.585',orderUrl:null},
  {id:151,name:'SM City Rosales',address:'Ground Floor SM Rosales, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:15.8778675,lng:120.602928,embedUrl:'https://maps.google.com/maps?q=15.8778675,120.602928&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.8782,120.6026',orderUrl:null},
  {id:163,name:'Vigan City - Calle Crisologo',address:'19 Crisologo, Vigan City, Ilocos Sur',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:17.5717093,lng:120.3863408,embedUrl:'https://maps.google.com/maps?q=17.5717093,120.3863408&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=17.5649,120.3878',orderUrl:null},
  {id:104,name:'Coron, Palawan',address:'National Highway, Brgy. V, Coron, Palawan',island:'Luzon',region:'Luzon — MIMAROPA',lat:12.0013629,lng:120.1977967,embedUrl:'https://maps.google.com/maps?q=12.0013629,120.1977967&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:187,name:'Xentro Mall Calapan',address:'1F Xentromall Calapan, Roxas Drive, Lumang Bayan, Calapan, Oriental Mindoro',island:'Luzon',region:'Luzon — MIMAROPA',lat:13.4029582,lng:121.1811382,embedUrl:'https://maps.google.com/maps?q=13.4029582,121.1811382&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=13.403,121.1837',orderUrl:null},
  {id:94,name:'Ayala Malls Harbor Point',address:'2nd Floor Ayala Malls Harbor Point, Subic Bay Freeport Zone',island:'Luzon',region:'Luzon — Other Provinces',lat:14.8249032,lng:120.2776441,embedUrl:'https://maps.google.com/maps?q=14.8249032,120.2776441&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:98,name:'Ayala Pavilion Mall',address:'Foodcourt Greenfield Pavilion Edsa Cor United St, Mandaluyong',island:'Luzon',region:'Luzon — Other Provinces',lat:14.5793518,lng:121.0502357,embedUrl:'https://maps.google.com/maps?q=14.5793518,121.0502357&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:101,name:'C. Raymundo Pasig',address:'C. Raymundo Ave., Corner Narra St. Maybunga, Pasig City',island:'Luzon',region:'Luzon — Other Provinces',lat:14.5771149,lng:121.0826965,embedUrl:'https://maps.google.com/maps?q=14.5771149,121.0826965&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:136,name:'SM City Cabanatuan',address:'Level 3 SM Cabanatuan, Maharlika Highway, Cabanatuan City',island:'Luzon',region:'Luzon — Other Provinces',lat:15.4669243,lng:120.9518036,embedUrl:'https://maps.google.com/maps?q=15.4669243,120.9518036&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.4669,120.9544',orderUrl:null},
  {id:145,name:'SM City Lucena',address:'2nd Level SM City Lucena, Maharlika Highway, Lucena City',island:'Luzon',region:'Luzon — Other Provinces',lat:13.9408018,lng:121.6217077,embedUrl:'https://maps.google.com/maps?q=13.9408018,121.6217077&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:161,name:'SM Mega Center Cabanatuan',address:'UG Level SM Mega Center, Gen. Tinio St., Cabanatuan City',island:'Luzon',region:'Luzon — Other Provinces',lat:15.4880106,lng:120.9651898,embedUrl:'https://maps.google.com/maps?q=15.4880106,120.9651898&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=15.4878,120.9679',orderUrl:null},
  {id:93,name:'Antipolo Triangle Mall',address:'Antipolo Triangle Mall, Sen. Lorenzo Sumulong Memorial Circle, Antipolo',island:'Luzon',region:'Luzon — Rizal',lat:14.581982,lng:121.1791655,embedUrl:'https://maps.google.com/maps?q=14.581982,121.1791655&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.582,121.1817',orderUrl:null},
  {id:109,name:'Imall Antipolo',address:'LGF Imall Antipolo, Sumulong St., San Roque, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5845383,lng:121.1738779,embedUrl:'https://maps.google.com/maps?q=14.5845383,121.1738779&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:113,name:'Robinsons Antipolo',address:'NK14 L1 Robinsons Place Antipolo, Sumulong Highway, Antipolo City',island:'Luzon',region:'Luzon — Rizal',lat:14.594579,lng:121.1697026,embedUrl:'https://maps.google.com/maps?q=14.594579,121.1697026&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5784,121.1865',orderUrl:null},
  {id:128,name:'SM Center Angono',address:'Ground Floor SM Center Angono, Mla. East Rd., Angono, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5308199,lng:121.1547599,embedUrl:'https://maps.google.com/maps?q=14.5308199,121.1547599&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:147,name:'SM City Masinag',address:'Upper Ground SM City Masinag, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.6253692,lng:121.1173423,embedUrl:'https://maps.google.com/maps?q=14.6253692,121.1173423&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:167,name:'Waltermart Antipolo',address:'L. Sumulong Memorial Circle, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5801,lng:121.173,embedUrl:'https://maps.google.com/maps?q=14.5801,121.173&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5801,121.173',orderUrl:null},
  {id:184,name:'Waltermart Taytay',address:'40 R-5, Taytay, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5795311,lng:121.1353887,embedUrl:'https://maps.google.com/maps?q=14.5795311,121.1353887&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5795,121.138',orderUrl:null},
  {id:186,name:'Xentro Mall Antipolo',address:'Ground Floor Xentro Mall Antipolo, Mambugan, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.6166462,lng:121.1330731,embedUrl:'https://maps.google.com/maps?q=14.6166462,121.1330731&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.617,121.1357',orderUrl:null},
  {id:188,name:'Xentro Mall Montalban',address:'Xentromall Montalban, Manggahan, Rodriguez, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.7294448,lng:21.1394461,embedUrl:'https://maps.google.com/maps?q=14.7294448,21.1394461&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7294,121.142',orderUrl:null},
  {id:0,name:'168 Mall - 5th Floor',address:'168mall 5th Floor Foodcourt Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.6053254,lng:120.9724268,embedUrl:'https://maps.google.com/maps?q=14.6053254,120.9724268&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6065,120.9734',orderUrl:null},
  {id:1,name:'168 Mall - Ground Floor',address:'Ground Flr. Entrance Soler St. Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.6053254,lng:120.9724268,embedUrl:'https://maps.google.com/maps?q=14.6053254,120.9724268&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6065,120.9734',orderUrl:null},
  {id:2,name:'999 Shopping Mall',address:'Stall 6 Food World Express Isetann Recto, Manila',island:'Luzon',region:'Metro Manila',lat:14.6052895,lng:120.9726035,embedUrl:'https://maps.google.com/maps?q=14.6052895,120.9726035&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6032,120.9847',orderUrl:null},
  {id:3,name:'Alabang Town Center',address:'Ground Level Entertainment Complex, Alabang Town Center, Muntinlupa',island:'Luzon',region:'Metro Manila',lat:14.4229141,lng:121.0273546,embedUrl:'https://maps.google.com/maps?q=14.4229141,121.0273546&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4223,121.0402',orderUrl:null},
  {id:5,name:'Ayala Malls Cloverleaf',address:'4th Level Ayala Malls Cloverleaf, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.655,lng:121.0011,embedUrl:'https://maps.google.com/maps?q=14.655,121.0011&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.655,121.0011',orderUrl:null},
  {id:6,name:'Ayala Malls Fairview Terraces',address:'LGF Ayala Mall Fairview Terraces Quirino Highway Novaliches Quezon City',island:'Luzon',region:'Metro Manila',lat:14.7359658,lng:121.0591207,embedUrl:'https://maps.google.com/maps?q=14.7359658,121.0591207&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7353,121.059',orderUrl:null},
  {id:7,name:'Ayala Malls Manila Bay',address:'2nd Floor Building B Ayala Malls Manila Bay',island:'Luzon',region:'Metro Manila',lat:14.5224592,lng:120.9888656,embedUrl:'https://maps.google.com/maps?q=14.5224592,120.9888656&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5252,120.9901',orderUrl:null},
  {id:8,name:'Ayala Malls Marikina',address:'Liwasang Kalayaan, Marikina, 1800 Metro Manila',island:'Luzon',region:'Metro Manila',lat:14.6490919,lng:121.1153759,embedUrl:'https://maps.google.com/maps?q=14.6490919,121.1153759&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6488,121.1147',orderUrl:null},
  {id:9,name:'Ayala Malls Market Market',address:'3rd Floor Market Market Mall BGC, Taguig',island:'Luzon',region:'Metro Manila',lat:14.549905,lng:121.0498651,embedUrl:'https://maps.google.com/maps?q=14.549905,121.0498651&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5466,121.0495',orderUrl:null},
  {id:10,name:'Ayala Malls The 30th',address:'Lower Ground, Ayala Malls The 30th, 30 Meralco Ave, Ortigas Center, Pasig',island:'Luzon',region:'Metro Manila',lat:14.5804791,lng:121.0646005,embedUrl:'https://maps.google.com/maps?q=14.5804791,121.0646005&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5802,121.0642',orderUrl:null},
  {id:11,name:'Ayala Malls Trinoma',address:'2nd Level Food Choices, Trinoma, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6533,lng:121.0334,embedUrl:'https://maps.google.com/maps?q=14.6533,121.0334&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6533,121.0334',orderUrl:null},
  {id:13,name:'Batasan Hills',address:'A-Plaza Bldg. 1st Floor, Batasan Hills, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6912146,lng:121.1010055,embedUrl:'https://maps.google.com/maps?q=14.6912146,121.1010055&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6911,121.1012',orderUrl:null},
  {id:14,name:'Centris Mall',address:'2nd Floor, Centris Station, Eton Centris, Edsa Corner Quezon Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6436448,lng:121.036204,embedUrl:'https://maps.google.com/maps?q=14.6436448,121.036204&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6288,121.015',orderUrl:null},
  {id:15,name:'Double Dragon Plaza',address:'Ground Floor Double Dragon Plaza DD Meridian Park, Pasay City',island:'Luzon',region:'Metro Manila',lat:14.5364,lng:120.9913,embedUrl:'https://maps.google.com/maps?q=14.5364,120.9913&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5364,120.9913',orderUrl:null},
  {id:16,name:'Drive and Dine - Meycauayan',address:'Canumay West, Valenzuela, 1447 Metro Manila',island:'Luzon',region:'Metro Manila',lat:14.7192,lng:120.9866,embedUrl:'https://maps.google.com/maps?q=14.7192,120.9866&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7192,120.9866',orderUrl:null},
  {id:17,name:'Estancia Mall',address:'LG East Wing Estancia Mall, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.5763712,lng:121.0631392,embedUrl:'https://maps.google.com/maps?q=14.5763712,121.0631392&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5819,121.0636',orderUrl:null},
  {id:18,name:'Ever Commonwealth',address:'Ever Gotesco Avenue, Commonwealth Ave, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6781,lng:121.0854,embedUrl:'https://maps.google.com/maps?q=14.6781,121.0854&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6781,121.0854',orderUrl:null},
  {id:19,name:'Evia Lifestyle Mall',address:'2/F Bldg. C Evia Lifestyle Center, Daang Hari Road, Las Piñas City',island:'Luzon',region:'Metro Manila',lat:14.3766749,lng:121.0127222,embedUrl:'https://maps.google.com/maps?q=14.3766749,121.0127222&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4272,120.9928',orderUrl:null},
  {id:25,name:'FTI Hypermarket',address:'GF Hypermarket, FTI Complex, Taguig',island:'Luzon',region:'Metro Manila',lat:14.508342,lng:121.0502694,embedUrl:'https://maps.google.com/maps?q=14.508342,121.0502694&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5172,121.0364',orderUrl:null},
  {id:21,name:'Festival Mall Alabang',address:'Ground Floor Festival Mall, Alabang, Muntinlupa',island:'Luzon',region:'Metro Manila',lat:14.4167701,lng:121.0393847,embedUrl:'https://maps.google.com/maps?q=14.4167701,121.0393847&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4226,121.0269',orderUrl:null},
  {id:22,name:'Fishermall Malabon',address:'2F Fisher Mall Malabon',island:'Luzon',region:'Metro Manila',lat:14.6568,lng:120.9608,embedUrl:'https://maps.google.com/maps?q=14.6568,120.9608&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6568,120.9608',orderUrl:null},
  {id:23,name:'Fishermall QC',address:'2F Fisher Mall, Quezon Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6337,lng:121.0196,embedUrl:'https://maps.google.com/maps?q=14.6337,121.0196&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6337,121.0196',orderUrl:null},
  {id:24,name:'Food District BGC',address:'Kiosk 3, LG One Bonifacio High Street Mall, Taguig',island:'Luzon',region:'Metro Manila',lat:14.5510414,lng:121.046788,embedUrl:'https://maps.google.com/maps?q=14.5510414,121.046788&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5512,121.0469',orderUrl:null},
  {id:26,name:'Gateway Mall',address:'Gateway Mall 1, Ground Floor, Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6210599,lng:121.0517374,embedUrl:'https://maps.google.com/maps?q=14.6210599,121.0517374&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6209,121.0526',orderUrl:null},
  {id:27,name:'Greenhills Unimart',address:'Ground Floor Unimart Grocery Greenhills, San Juan City',island:'Luzon',region:'Metro Manila',lat:14.6022272,lng:121.0478254,embedUrl:'https://maps.google.com/maps?q=14.6022272,121.0478254&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6016,121.0516',orderUrl:null},
  {id:28,name:'Greenhills Virra Mall',address:'2nd Floor VMall Greenhills, San Juan City',island:'Luzon',region:'Metro Manila',lat:14.6022676,lng:121.0488951,embedUrl:'https://maps.google.com/maps?q=14.6022676,121.0488951&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.602,121.0498',orderUrl:null},
  {id:30,name:'Kai Mall',address:'GF Stall 11 Kai Mall, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.7564257,lng:121.0435598,embedUrl:'https://maps.google.com/maps?q=14.7564257,121.0435598&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7607,121.051',orderUrl:null},
  {id:33,name:'Landmark Makati',address:'Basement 1 Food Center, Ayala Center, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5521265,lng:121.0241628,embedUrl:'https://maps.google.com/maps?q=14.5521265,121.0241628&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5536,121.0222',orderUrl:null},
  {id:31,name:'Landmark Manila Bay',address:'Landmark Manila Bay Foodcourt, Basement 1, Paranaque City',island:'Luzon',region:'Metro Manila',lat:14.5237619,lng:120.9897808,embedUrl:'https://maps.google.com/maps?q=14.5237619,120.9897808&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5244,120.9901',orderUrl:null},
  {id:32,name:'Landmark Trinoma',address:'Ground Floor Food Center Landmark Trinoma, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6511205,lng:121.0317003,embedUrl:'https://maps.google.com/maps?q=14.6511205,121.0317003&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6533,121.0334',orderUrl:null},
  {id:34,name:'Lucky Chinatown Mall',address:'Ground Floor, Lucky Chinatown, Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.6033742,lng:120.9707659,embedUrl:'https://maps.google.com/maps?q=14.6033742,120.9707659&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6038,120.9742',orderUrl:null},
  {id:35,name:'Moriones, Tondo',address:'399 Moriones St. Tondo Manila',island:'Luzon',region:'Metro Manila',lat:14.6100952,lng:120.9629538,embedUrl:'https://maps.google.com/maps?q=14.6100952,120.9629538&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.61,120.9655',orderUrl:null},
  {id:36,name:'One Ayala Mall',address:'Kiosk G-005, Lower G/F One Ayala Cor. Edsa, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5505414,lng:121.0277908,embedUrl:'https://maps.google.com/maps?q=14.5505414,121.0277908&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5506,121.0283',orderUrl:null},
  {id:40,name:'PITX',address:'Level 1 Paranaque Integrated Terminal Exchange, Kennedy Road, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.5097276,lng:120.9887651,embedUrl:'https://maps.google.com/maps?q=14.5097276,120.9887651&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5101,120.9913',orderUrl:null},
  {id:37,name:'Paco Market Mall',address:'Ground Floor, Paco Mall, Manila',island:'Luzon',region:'Metro Manila',lat:14.5793481,lng:120.9905568,embedUrl:'https://maps.google.com/maps?q=14.5793481,120.9905568&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5788,120.9987',orderUrl:null},
  {id:38,name:'Pasay Rotonda',address:'Metro Point Mall, Edsa Corner Taft Ave, Pasay City',island:'Luzon',region:'Metro Manila',lat:14.5381362,lng:120.9983915,embedUrl:'https://maps.google.com/maps?q=14.5381362,120.9983915&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5488,120.9984',orderUrl:null},
  {id:39,name:'Paseo Center Makati',address:'G/F Paseo Center, Paseo De Roxas, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5579494,lng:121.0221593,embedUrl:'https://maps.google.com/maps?q=14.5579494,121.0221593&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5577,121.0229',orderUrl:null},
  {id:41,name:'R. Square',address:'2622 Taft Ave, Malate, Manila',island:'Luzon',region:'Metro Manila',lat:14.5622999,lng:120.9930767,embedUrl:'https://maps.google.com/maps?q=14.5622999,120.9930767&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:42,name:'Robinsons Galleria Ortigas',address:'Level 1 Robinsons Galleria, Edsa Cor. Ortigas Ave, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.5910558,lng:121.057263,embedUrl:'https://maps.google.com/maps?q=14.5910558,121.057263&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:43,name:'Robinsons Las Pinas',address:'Level 1 Robinsons Place Las Piñas, Alabang-Zapote Rd., Las Piñas City',island:'Luzon',region:'Metro Manila',lat:14.4428208,lng:120.995255,embedUrl:'https://maps.google.com/maps?q=14.4428208,120.995255&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4448,120.9936',orderUrl:null},
  {id:44,name:'Robinsons Malabon',address:'Governor Pascual Avenue, Malabon',island:'Luzon',region:'Metro Manila',lat:14.669187,lng:120.9670575,embedUrl:'https://maps.google.com/maps?q=14.669187,120.9670575&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6691,120.9667',orderUrl:null},
  {id:45,name:'Robinsons Manila',address:'Level 2, Padre Faura Wing, Ermita, Manila',island:'Luzon',region:'Metro Manila',lat:14.577073,lng:120.9844591,embedUrl:'https://maps.google.com/maps?q=14.577073,120.9844591&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:46,name:'Robinsons Metro East',address:'Robinsons Metro East, Marcos Highway, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.6196217,lng:121.0973975,embedUrl:'https://maps.google.com/maps?q=14.6196217,121.0973975&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:50,name:'SM Araneta City Cubao',address:'SM Araneta City, Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6189227,lng:121.0504789,embedUrl:'https://maps.google.com/maps?q=14.6189227,121.0504789&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6193,121.0577',orderUrl:null},
  {id:51,name:'SM Center Las Pinas',address:'SM Hypermarket, SM Center, Alabang-Zapote Rd, Las Piñas',island:'Luzon',region:'Metro Manila',lat:14.448849,lng:120.9805679,embedUrl:'https://maps.google.com/maps?q=14.448849,120.9805679&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:52,name:'SM Center Muntinlupa',address:'SM Muntinlupa Ground Level, Muntinlupa City',island:'Luzon',region:'Metro Manila',lat:14.3777076,lng:121.0432465,embedUrl:'https://maps.google.com/maps?q=14.3777076,121.0432465&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.378,121.0461',orderUrl:null},
  {id:53,name:'SM Center Pasig',address:'SM Center Frontera Verde, E Rodriguez Jr Ave, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.584014,lng:121.0748362,embedUrl:'https://maps.google.com/maps?q=14.584014,121.0748362&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:54,name:'SM City BF Paranaque',address:'2F SM City BF Paranaque, Dr Arcadio Santos Ave, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.4577277,lng:121.0333063,embedUrl:'https://maps.google.com/maps?q=14.4577277,121.0333063&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:55,name:'SM City Bicutan',address:'SM City Bicutan, Taguig',island:'Luzon',region:'Metro Manila',lat:14.4872652,lng:121.0442106,embedUrl:'https://maps.google.com/maps?q=14.4872652,121.0442106&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:56,name:'SM City Caloocan',address:'SM City Caloocan Deparo Road, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.7513321,lng:121.0153479,embedUrl:'https://maps.google.com/maps?q=14.7513321,121.0153479&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7501,121.0199',orderUrl:null},
  {id:57,name:'SM City East Ortigas',address:'2F SM City East Ortigas, Pasig',island:'Luzon',region:'Metro Manila',lat:14.5883,lng:121.1061,embedUrl:'https://maps.google.com/maps?q=14.5883,121.1061&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5883,121.1061',orderUrl:null},
  {id:58,name:'SM City Fairview',address:'Lower Ground Level SM Fairview, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.7346043,lng:121.0553261,embedUrl:'https://maps.google.com/maps?q=14.7346043,121.0553261&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:59,name:'SM City Manila',address:'4th Floor SM City Manila',island:'Luzon',region:'Metro Manila',lat:14.5896177,lng:120.9806083,embedUrl:'https://maps.google.com/maps?q=14.5896177,120.9806083&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:60,name:'SM City Novaliches',address:'SM Novaliches Ground Level, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.7079547,lng:121.0354761,embedUrl:'https://maps.google.com/maps?q=14.7079547,121.0354761&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.7192,121.0398',orderUrl:null},
  {id:61,name:'SM City San Lazaro',address:'Lower Ground Floor SM City San Lazaro, Manila',island:'Luzon',region:'Metro Manila',lat:14.6179234,lng:120.9828827,embedUrl:'https://maps.google.com/maps?q=14.6179234,120.9828827&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:62,name:'SM City Sangandaan',address:'SM Center Sangandaan, Samson Road, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.6579405,lng:120.9715507,embedUrl:'https://maps.google.com/maps?q=14.6579405,120.9715507&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6586,120.9692',orderUrl:null},
  {id:63,name:'SM City Sta. Mesa',address:'Level 2 SM City Sta Mesa, R Magsaysay Blvd, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6040561,lng:121.0193409,embedUrl:'https://maps.google.com/maps?q=14.6040561,121.0193409&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:64,name:'SM City Sucat',address:'Ground Level Building B SM City Sucat, Paranaque',island:'Luzon',region:'Metro Manila',lat:14.4847256,lng:120.9916384,embedUrl:'https://maps.google.com/maps?q=14.4847256,120.9916384&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:65,name:'SM City Valenzuela',address:'SM City Valenzuela, McArthur Highway, Valenzuela City',island:'Luzon',region:'Metro Manila',lat:14.6858258,lng:120.9763199,embedUrl:'https://maps.google.com/maps?q=14.6858258,120.9763199&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:66,name:'SM Hypermarket Cubao',address:'24 Main Ave Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6142875,lng:121.0519073,embedUrl:'https://maps.google.com/maps?q=14.6142875,121.0519073&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:67,name:'SM Hypermarket Novaliches',address:'402 Quirino Hwy, Novaliches, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6813374,lng:121.0187304,embedUrl:'https://maps.google.com/maps?q=14.6813374,121.0187304&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:68,name:'SM Megamall',address:'5/F SM Megamall, Ortigas Center, Pasig',island:'Luzon',region:'Metro Manila',lat:14.5856745,lng:121.0540334,embedUrl:'https://maps.google.com/maps?q=14.5856745,121.0540334&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:69,name:'SM Retail HQ',address:'6F SM Retail HQ Building A, J.W. Diokno Blvd, Pasay',island:'Luzon',region:'Metro Manila',lat:14.5411025,lng:120.9818628,embedUrl:'https://maps.google.com/maps?q=14.5411025,120.9818628&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5451,120.9824',orderUrl:null},
  {id:70,name:'SM Southmall',address:'2F Food Hall, SM Southmall, Alabang-Zapote Rd, Las Piñas',island:'Luzon',region:'Metro Manila',lat:14.4334532,lng:121.0081179,embedUrl:'https://maps.google.com/maps?q=14.4334532,121.0081179&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4284,121.0187',orderUrl:null},
  {id:71,name:'SMDC Light Mall',address:'Ground Floor SM Light Mall, Mandaluyong',island:'Luzon',region:'Metro Manila',lat:14.573748,lng:121.0479435,embedUrl:'https://maps.google.com/maps?q=14.573748,121.0479435&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5746,121.049',orderUrl:null},
  {id:72,name:'SMDC Mplace',address:'Ground Floor SMDC Mplace, Panay Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.5419593,lng:120.9746719,embedUrl:'https://maps.google.com/maps?q=14.5419593,120.9746719&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6319,121.0203',orderUrl:null},
  {id:73,name:'SMDC Sun Mall',address:'CT2 SMDC Sun Mall, España Blvd., Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6177702,lng:120.9986391,embedUrl:'https://maps.google.com/maps?q=14.6177702,120.9986391&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6041,121.0188',orderUrl:null},
  {id:48,name:'Shopwise Makati',address:'GF Shopwise Makati, Chino Roces Ave., Makati',island:'Luzon',region:'Metro Manila',lat:14.5670141,lng:121.010926,embedUrl:'https://maps.google.com/maps?q=14.5670141,121.010926&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5667,121.0129',orderUrl:null},
  {id:49,name:'Shopwise Sucat',address:'Ground Floor Shopwise Sucat, Paranaque',island:'Luzon',region:'Metro Manila',lat:14.457534,lng:121.0328624,embedUrl:'https://maps.google.com/maps?q=14.457534,121.0328624&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4565,121.0355',orderUrl:null},
  {id:74,name:'Starmall Shaw Boulevard',address:'G/F Starmall Edsa Shaw, Mandaluyong City',island:'Luzon',region:'Metro Manila',lat:14.5822674,lng:121.0508985,embedUrl:'https://maps.google.com/maps?q=14.5822674,121.0508985&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5828,121.0535',orderUrl:null},
  {id:75,name:'The Market Place Glorietta',address:'G/F Marketplace Makati, Rustans Mall, Ayala Ave., Makati City',island:'Luzon',region:'Metro Manila',lat:14.5519717,lng:121.0241588,embedUrl:'https://maps.google.com/maps?q=14.5519717,121.0241588&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.552,121.0267',orderUrl:null},
  {id:76,name:'Tutuban Mall',address:'Level 1 Main Station Tutuban Center Mall, Manila',island:'Luzon',region:'Metro Manila',lat:14.6069924,lng:120.9732409,embedUrl:'https://maps.google.com/maps?q=14.6069924,120.9732409&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6084,120.973',orderUrl:null},
  {id:77,name:'UP Shopping Center',address:'2nd Floor UP Diliman Shopping Center, Diliman, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6596481,lng:121.0671519,embedUrl:'https://maps.google.com/maps?q=14.6596481,121.0671519&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6488,121.0509',orderUrl:null},
  {id:78,name:'UPAD Hotel Taft',address:'912 Pablo Ocampo Street, Malate, Manila',island:'Luzon',region:'Metro Manila',lat:14.563133,lng:120.9940647,embedUrl:'https://maps.google.com/maps?q=14.563133,120.9940647&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5762,120.9819',orderUrl:null},
  {id:79,name:'Victory Mall Quiapo Underpass',address:'Victory Lacson Underpass Plaza, Quezon Blvd, Quiapo, Manila',island:'Luzon',region:'Metro Manila',lat:14.5980192,lng:120.9815856,embedUrl:'https://maps.google.com/maps?q=14.5980192,120.9815856&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.598,120.9842',orderUrl:null},
  {id:80,name:'Vista Mall Las Pinas',address:'Ground Floor Vista Mall Las Pinas',island:'Luzon',region:'Metro Manila',lat:14.450909,lng:120.9759558,embedUrl:'https://maps.google.com/maps?q=14.450909,120.9759558&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4432,120.9791',orderUrl:null},
  {id:81,name:'Vista Mall Taguig',address:'Ground Floor Vista Mall Taguig, Tuktukan, Taguig City',island:'Luzon',region:'Metro Manila',lat:14.5298265,lng:121.0748196,embedUrl:'https://maps.google.com/maps?q=14.5298265,121.0748196&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5327,121.0712',orderUrl:null},
  {id:83,name:'Waltermart Caloocan',address:'1174 A. Mabini St, Maypajo, Caloocan',island:'Luzon',region:'Metro Manila',lat:14.6417,lng:120.9757,embedUrl:'https://maps.google.com/maps?q=14.6417,120.9757&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.6417,120.9757',orderUrl:null},
  {id:84,name:'Waltermart E. Rodriguez',address:'222 E. Rodriguez Ave., Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6213295,lng:121.0167606,embedUrl:'https://maps.google.com/maps?q=14.6213295,121.0167606&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:85,name:'Waltermart Macapagal',address:'GF Waltermart Macapagal, Diosdado Macapagal Ave., Pasay',island:'Luzon',region:'Metro Manila',lat:14.5321188,lng:120.986568,embedUrl:'https://maps.google.com/maps?q=14.5321188,120.986568&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5416,120.9881',orderUrl:null},
  {id:86,name:'Waltermart Makati',address:'2F Waltermart Supermarket Chino Roces Avenue, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5519377,lng:121.0124204,embedUrl:'https://maps.google.com/maps?q=14.5519377,121.0124204&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5517,121.0134',orderUrl:null},
  {id:87,name:'Waltermart North Edsa',address:'1F Waltermart North Edsa, 8001 Edsa, Project 7, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6570791,lng:121.0184863,embedUrl:'https://maps.google.com/maps?q=14.6570791,121.0184863&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:88,name:'Waltermart Sucat',address:'Waltermart Sucat, Dr. A. Santos Ave, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.4714599,lng:121.0049032,embedUrl:'https://maps.google.com/maps?q=14.4714599,121.0049032&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.4691,121.0112',orderUrl:null},
  {id:89,name:'Wilcon City Center',address:'Ground Level, 121 Visayas Ave, Project 8, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6663856,lng:121.0400774,embedUrl:'https://maps.google.com/maps?q=14.6663856,121.0400774&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:90,name:'Worldwide Corporate Center',address:'G/F Shaw Center Mall, 360 Shaw Blvd, Mandaluyong City',island:'Luzon',region:'Metro Manila',lat:14.5824629,lng:121.0489568,embedUrl:'https://maps.google.com/maps?q=14.5824629,121.0489568&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.589,121.0371',orderUrl:null},
  {id:91,name:'Youniversity Suites Ubelt',address:'GF La Village, 2118 Recto Ave, Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.601366,lng:120.987247,embedUrl:'https://maps.google.com/maps?q=14.601366,120.987247&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5995,120.9842',orderUrl:null},
  {id:92,name:'Zuellig Building Makati',address:'2F Zuellig Building, Makati Avenue Cor. Paseo De Roxas, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5578427,lng:121.024081,embedUrl:'https://maps.google.com/maps?q=14.5578427,121.024081&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5578,121.0267',orderUrl:null},
  {id:214,name:'Ayala Malls Abreeza Davao',address:'L2 Abreeza Mall, J.P. Laurel Ave, Poblacion District, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0911957,lng:125.6087241,embedUrl:'https://maps.google.com/maps?q=7.0911957,125.6087241&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:217,name:'Gaisano Grand City Gate Mall Davao',address:'Buhangin, Davao City, Davao Del Sur',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.109994,lng:125.610209,embedUrl:'https://maps.google.com/maps?q=7.109994,125.610209&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:220,name:'Gaisano Mall Tagum',address:'Upper GF GMall of Tagum, National Hwy, Tagum, Davao Del Norte',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.4486496,lng:125.8046986,embedUrl:'https://maps.google.com/maps?q=7.4486496,125.8046986&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:221,name:'Gaisano Mall Toril',address:'UGF Gaisano Mall of Toril, Lim St, Toril, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.015076,lng:125.4899077,embedUrl:'https://maps.google.com/maps?q=7.015076,125.4899077&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:225,name:'NCCC Mall Maa Davao',address:'MacArthur Highway, Corner Don Julian Rodriguez Sr. Ave, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0623633,lng:125.5911354,embedUrl:'https://maps.google.com/maps?q=7.0623633,125.5911354&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:227,name:'Panabo, Davao City',address:'G/F Gaisano Grand Mall Panabo City, Davao Del Norte',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.3063629,lng:125.6817189,embedUrl:'https://maps.google.com/maps?q=7.3063629,125.6817189&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:233,name:'SM City Davao',address:'2nd Level Main Building SM City Davao',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0506136,lng:125.5856774,embedUrl:'https://maps.google.com/maps?q=7.0506136,125.5856774&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:215,name:'Ayala Malls Centrio CDO',address:'GF CV Roa Wing, Centrio Mall, C.M. Recto Cor. Corrales Ave, Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4852647,lng:124.6488197,embedUrl:'https://maps.google.com/maps?q=8.4852647,124.6488197&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:218,name:'Gaisano Mall Butuan',address:'Gaisano Mall Butuan, Butuan City',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.9442772,lng:125.5295141,embedUrl:'https://maps.google.com/maps?q=8.9442772,125.5295141&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:219,name:'Gaisano Mall Cagayan de Oro',address:'Ground Floor Gaisano Mall, Corrales, CM Recto, Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4863646,lng:124.6473042,embedUrl:'https://maps.google.com/maps?q=8.4863646,124.6473042&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:228,name:'Robinsons Iligan',address:'Robinsons Place, Iligan City, Lanao Del Norte',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.2182056,lng:124.2377513,embedUrl:'https://maps.google.com/maps?q=8.2182056,124.2377513&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.2182,124.2403',orderUrl:null},
  {id:230,name:'SM City Butuan',address:'2nd Floor SM City Butuan, Butuan City',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.945412,lng:125.5309067,embedUrl:'https://maps.google.com/maps?q=8.945412,125.5309067&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:231,name:'SM City CDO',address:'Ground Floor SM City Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4558,lng:124.6234,embedUrl:'https://maps.google.com/maps?q=8.4558,124.6234&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.4558,124.6234',orderUrl:null},
  {id:232,name:'SM City CDO Downtown',address:'Claro M. Recto Ave, Cagayan De Oro City, Misamis Oriental',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4558,lng:124.6234,embedUrl:'https://maps.google.com/maps?q=8.4558,124.6234&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=8.4558,124.6234',orderUrl:null},
  {id:216,name:'City Mall Cotabato',address:'Citymall Cotabato, Gov. Gutierrez Ave, Cotabato City, Maguindanao',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.2007061,lng:124.2382476,embedUrl:'https://maps.google.com/maps?q=7.2007061,124.2382476&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.2007,124.2408',orderUrl:null},
  {id:222,name:'KCC Mall Cotabato',address:'Quezon Avenue, Cotabato City, Maguindanao',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.2202188,lng:124.2433294,embedUrl:'https://maps.google.com/maps?q=7.2202188,124.2433294&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:224,name:'Kidapawan City',address:'Roxas St, Poblacion, Kidapawan, Cotabato',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.0096486,lng:125.0846152,embedUrl:'https://maps.google.com/maps?q=7.0096486,125.0846152&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.0213,125.0902',orderUrl:null},
  {id:234,name:'SM City General Santos',address:'Cor. Santiago Blvd, San Miguel St, General Santos City, South Cotabato',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:6.1155,lng:125.181,embedUrl:'https://maps.google.com/maps?q=6.1155,125.181&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=6.1155,125.181',orderUrl:null},
  {id:223,name:'KCC Mall de Zamboanga',address:'Basement KCC Mall, Gov. Camins Rd, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9200552,lng:122.0708583,embedUrl:'https://maps.google.com/maps?q=6.9200552,122.0708583&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=6.9201,122.0734',orderUrl:null},
  {id:226,name:'Pagadian City',address:'61 Sabellano St, Pagadian City, Zamboanga del Sur',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:7.8245531,lng:123.4409522,embedUrl:'https://maps.google.com/maps?q=7.8245531,123.4409522&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:229,name:'Robinsons Pagadian City',address:'F.S. Pajares Ave Cor P.L. Urro St, Pagadian City, Zamboanga Del Sur',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:7.8270393,lng:123.4372941,embedUrl:'https://maps.google.com/maps?q=7.8270393,123.4372941&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.8272,123.4378',orderUrl:null},
  {id:235,name:'SM City Mindpro',address:'Ground Floor SM City Mindpro, La Purisima St, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9077096,lng:122.073485,embedUrl:'https://maps.google.com/maps?q=6.9077096,122.073485&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=6.9077,122.0761',orderUrl:null},
  {id:236,name:'SM City Zamboanga',address:'Lower Ground SM City Zamboanga, Mayor Vitaliano Agan Avenue, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9183182,lng:122.0733746,embedUrl:'https://maps.google.com/maps?q=6.9183182,122.0733746&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=7.1907,125.4553',orderUrl:null},
  {id:191,name:'Ayala Malls Center Cebu',address:'2L Ayala Center Cebu, Cebu Business Park, Archbishop Reyes Ave, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3182423,lng:123.9026546,embedUrl:'https://maps.google.com/maps?q=10.3182423,123.9026546&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3182,123.9052',orderUrl:null},
  {id:192,name:'Ayala Malls Central Bloc IT Park',address:'Ayala Malls Central Block, Padriga St, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3306864,lng:123.9047449,embedUrl:'https://maps.google.com/maps?q=10.3306864,123.9047449&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7202,122.5621',orderUrl:null},
  {id:195,name:'Gaisano Mall Banilad Cebu',address:'Gaisano Country Mall, Banilad, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3394189,lng:123.9082317,embedUrl:'https://maps.google.com/maps?q=10.3394189,123.9082317&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7202,122.5621',orderUrl:null},
  {id:198,name:'Panglao, Bohol',address:'Front of Panglao Regents Park Resort, Ester Lim Drive St. Tawala, Panglao, Bohol',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:9.5525635,lng:123.771279,embedUrl:'https://maps.google.com/maps?q=9.5525635,123.771279&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7202,122.5621',orderUrl:null},
  {id:206,name:'SM City Cebu',address:'Lower Ground Floor SM City Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3114,lng:123.9178,embedUrl:'https://maps.google.com/maps?q=10.3114,123.9178&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3114,123.9178',orderUrl:null},
  {id:207,name:'SM City Consolacion',address:'2nd Floor SM Consolacion, Lamac, Consolacion, Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3796,lng:123.9649,embedUrl:'https://maps.google.com/maps?q=10.3796,123.9649&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3796,123.9649',orderUrl:null},
  {id:212,name:'SM Seaside City Cebu',address:'2nd Floor Cube Wing SM Seaside City Cebu, SRP, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.2818909,lng:123.8787092,embedUrl:'https://maps.google.com/maps?q=10.2818909,123.8787092&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7202,122.5621',orderUrl:null},
  {id:213,name:'The Outlet Lapu Lapu City',address:'The Outlets At Pueblo Verde, Mactan, Lapu-Lapu City, Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3011973,lng:123.9617279,embedUrl:'https://maps.google.com/maps?q=10.3011973,123.9617279&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.3018,123.9622',orderUrl:null},
  {id:202,name:'Robinsons North Tacloban',address:'Ground Floor Robinsons North Tacloban, Tacloban City, Leyte',island:'Visayas',region:'Visayas — Eastern Visayas',lat:11.2398798,lng:124.9851579,embedUrl:'https://maps.google.com/maps?q=11.2398798,124.9851579&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.2399,124.9877',orderUrl:null},
  {id:209,name:'SM City Ormoc',address:'Ground Floor SM Center Ormoc, Ormoc City, Leyte',island:'Visayas',region:'Visayas — Eastern Visayas',lat:11.0102907,lng:124.605246,embedUrl:'https://maps.google.com/maps?q=11.0102907,124.605246&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.0384,124.6193',orderUrl:null},
  {id:189,name:'Avocadoria Boracay Extension',address:'Station 2 Front Beach, Boracay, Malay, Aklan',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.9590945,lng:121.9257139,embedUrl:'https://maps.google.com/maps?q=11.9590945,121.9257139&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.9674,121.9248',orderUrl:null},
  {id:190,name:'Ayala Malls Bacolod',address:'Ayala Malls Bacolod, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6765373,lng:122.9485048,embedUrl:'https://maps.google.com/maps?q=10.6765373,122.9485048&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7202,122.5621',orderUrl:null},
  {id:193,name:'Boracay DMall',address:'DMall De Boracay, Malay, Aklan',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.9622495,lng:121.924086,embedUrl:'https://maps.google.com/maps?q=11.9622495,121.924086&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=11.9674,121.9248',orderUrl:null},
  {id:194,name:'Festive Walk Iloilo',address:'Festive Walk, Mandurriao, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7133877,lng:122.5434636,embedUrl:'https://maps.google.com/maps?q=10.7133877,122.5434636&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7154,122.5468',orderUrl:null},
  {id:196,name:'GT Mall Molo',address:'Ground Floor GT Mall Molo, Poblacion, Molo, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6962005,lng:22.5430131,embedUrl:'https://maps.google.com/maps?q=10.6962005,22.5430131&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.6962,122.5456',orderUrl:null},
  {id:197,name:'GT Mall Pavia',address:'Ground Floor GT Mall Pavia, Ungka 2, Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7537126,lng:122.5354324,embedUrl:'https://maps.google.com/maps?q=10.7537126,122.5354324&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7537,122.538',orderUrl:null},
  {id:199,name:'Robinsons Bacolod',address:'Lacson St, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6914441,lng:122.955896,embedUrl:'https://maps.google.com/maps?q=10.6914441,122.955896&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7202,122.5621',orderUrl:null},
  {id:200,name:'Robinsons Iloilo',address:'UGF Robinsons Iloilo, De Leon St cor. Quezon St, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6941504,lng:122.5636325,embedUrl:'https://maps.google.com/maps?q=10.6941504,122.5636325&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7202,122.5621',orderUrl:null},
  {id:201,name:'Robinsons Jaro',address:'Level 1 Robinsons Place Jaro, E. Lopez Jaena San Vicente, Jaro, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7194991,lng:122.5576658,embedUrl:'https://maps.google.com/maps?q=10.7194991,122.5576658&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7209,122.5581',orderUrl:null},
  {id:203,name:'Robinsons Pavia',address:'Level 2 Robinsons Pavia, Ungka II, Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7538453,lng:122.537142,embedUrl:'https://maps.google.com/maps?q=10.7538453,122.537142&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.753,122.5392',orderUrl:null},
  {id:204,name:'SM City Bacolod',address:'G/F SM City Bacolod, Rizal St, Reclamation Area, Bacolod City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6707922,lng:122.9378006,embedUrl:'https://maps.google.com/maps?q=10.6707922,122.9378006&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.6736,122.9449',orderUrl:null},
  {id:205,name:'SM City Bacolod North Bloc',address:'G/F SM City Bacolod North Block, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6717834,lng:122.9414994,embedUrl:'https://maps.google.com/maps?q=10.6717834,122.9414994&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.6736,122.9449',orderUrl:null},
  {id:208,name:'SM City Iloilo',address:'Upper Ground Floor SM City Iloilo, Senator Benigno S. Aquino Jr. Ave, Mandurriao, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7144,lng:122.551,embedUrl:'https://maps.google.com/maps?q=10.7144,122.551&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7144,122.551',orderUrl:null},
  {id:210,name:'SM City Roxas',address:'Ground Floor SM City Roxas, Arnaldo Boulevard, Roxas City, Capiz',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.5957929,lng:122.7461282,embedUrl:'https://maps.google.com/maps?q=11.5957929,122.7461282&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=12.8797,121.774',orderUrl:null},
  {id:211,name:'SM Hypermarket Pavia',address:'SM Hypermarket Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7529175,lng:122.5194878,embedUrl:'https://maps.google.com/maps?q=10.7529175,122.5194878&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=10.7202,122.5621',orderUrl:null},
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
              <a href="${b.mapsUrl}" target="_blank" rel="noopener noreferrer"
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
      if (activeMarkRef.current && activeMarkRef.current !== marker) {
        const prevId = Object.keys(markersRef.current).find(k => markersRef.current[k] === activeMarkRef.current)
        const prevBranch = BRANCHES.find(x => x.id === parseInt(prevId))
        const prevColor = ISLAND_COLORS[prevBranch?.island]?.pin || '#b6c548'
        activeMarkRef.current.setIcon({ url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="40" height="52" viewBox="0 0 40 52"><ellipse cx="20" cy="18" rx="14" ry="16" fill="${prevColor}" stroke="#fff" stroke-width="2"/><ellipse cx="20" cy="17" rx="7" ry="8" fill="#fff" opacity="0.3"/><circle cx="20" cy="17" r="4" fill="#3a6b35" opacity="0.7"/><path d="M20 34 L13 46 Q20 52 27 46 Z" fill="${prevColor}" stroke="#fff" stroke-width="2"/></svg>`)}`, scaledSize: new maps.Size(40, 52), anchor: new maps.Point(20, 52) })
      }
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
                        <a href={activeBranch.mapsUrl} target="_blank" rel="noopener noreferrer"
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
