import { useState, useMemo, useRef, useEffect, useCallback } from 'react'
import SEO from '@/components/ui/SEO'

// ─── BRANCH DATA ─────────────────────────────────────────────────────────────
// Source: avocadoria_branches_embed_urls.xlsx
// To add orderUrl later: find the branch by name and set orderUrl:'https://...'
// To add a new branch: copy any entry, give it a new id, and fill in details.
// ─────────────────────────────────────────────────────────────────────────────
const BRANCHES = [
  {id:239,name:'Ang Mo Kio Hub',address:'53 Ang Mo Kio Ave 3, AMK Hub, Singapore 569933',island:'International',region:'International — Singapore',lat:1.3690023,lng:103.8481594,embedUrl:'https://maps.google.com/maps?q=1.3690023,103.8481594&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJT80kwuYW2jERhogn4ZW0fG4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJT80kwuYW2jERhogn4ZW0fG4&travelmode=driving',placeId:'ChIJT80kwuYW2jERhogn4ZW0fG4',orderUrl:null},
  {id:237,name:'Bedok Mall',address:'311 New Upper Changi Road, Bedok Mall, Singapore 467360',island:'International',region:'International — Singapore',lat:1.3247162,lng:103.92934299999999,embedUrl:'https://maps.google.com/maps?q=1.3247162,103.92934299999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJR80Wwcoi2jER8yMuAZodQFk',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJR80Wwcoi2jER8yMuAZodQFk&travelmode=driving',placeId:'ChIJR80Wwcoi2jER8yMuAZodQFk',orderUrl:null},
  {id:240,name:'Lucky Plaza',address:'304 Orchard Road, Lucky Plaza, Singapore 238863',island:'International',region:'International — Singapore',lat:1.3045719999999998,lng:103.8337952,embedUrl:'https://maps.google.com/maps?q=1.3045719999999998,103.8337952&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ6xFibZIZ2jERlMTu3Bo6a9c',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ6xFibZIZ2jERlMTu3Bo6a9c&travelmode=driving',placeId:'ChIJ6xFibZIZ2jERlMTu3Bo6a9c',orderUrl:null},
  {id:238,name:'VivoCity',address:'1 HarbourFront Walk, VivoCity, Singapore 098585',island:'International',region:'International — Singapore',lat:1.2647138999999998,lng:103.8231658,embedUrl:'https://maps.google.com/maps?q=1.2647138999999998,103.8231658&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJK7xLl1gZ2jERP_GdUY9XNLo',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJK7xLl1gZ2jERP_GdUY9XNLo&travelmode=driving',placeId:'ChIJK7xLl1gZ2jERP_GdUY9XNLo',orderUrl:null},
  {id:242,name:'Central Rama 9',address:'Central Rama 9, 9/9 Rama IX Road, Huai Khwang, Bangkok 10310, Thailand',island:'International',region:'International — Thailand',lat:13.758595399999999,lng:100.5661774,embedUrl:'https://maps.google.com/maps?q=13.758595399999999,100.5661774&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJt4AYHY2e4jARP0jJFXncXCE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJt4AYHY2e4jARP0jJFXncXCE&travelmode=driving',placeId:'ChIJt4AYHY2e4jARP0jJFXncXCE',orderUrl:null},
  {id:241,name:'Al Ghurair Centre',address:'Al Ghurair Centre, Deira, Dubai, United Arab Emirates',island:'International',region:'International — UAE',lat:25.267048799999998,lng:55.3173288,embedUrl:'https://maps.google.com/maps?q=25.267048799999998,55.3173288&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJKQlXustcXz4RVQSpDZuDfNg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJKQlXustcXz4RVQSpDZuDfNg&travelmode=driving',placeId:'ChIJKQlXustcXz4RVQSpDZuDfNg',orderUrl:null},
  {id:100,name:'Bicol International Airport',address:'GF Arrival And Waiting Lounge, Bicol International Airport, Daraga, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.111576999999999,lng:123.68167229999997,embedUrl:'https://maps.google.com/maps?q=13.111576999999999,123.68167229999997&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJIavUAvUEoTMRcpleE4aJL1I',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJIavUAvUEoTMRcpleE4aJL1I&travelmode=driving',placeId:'ChIJIavUAvUEoTMRcpleE4aJL1I',orderUrl:null},
  {id:110,name:'LCC CBD Terminal 2 Naga',address:'Bicol Central Station, Brgy. Triangulo, Naga City',island:'Luzon',region:'Luzon — Bicol',lat:13.6198288,lng:123.1893085,embedUrl:'https://maps.google.com/maps?q=13.6198288,123.1893085&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJiSyXpRiNoTMRtkzHM5jI7VU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJiSyXpRiNoTMRtkzHM5jI7VU&travelmode=driving',placeId:'ChIJiSyXpRiNoTMRtkzHM5jI7VU',orderUrl:null},
  {id:111,name:'LCC Legazpi',address:'LCC Food Court, LCC Mall Legazpi, Peñaranda St. Legazpi City, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.147680500000002,lng:123.75362529999998,embedUrl:'https://maps.google.com/maps?q=13.147680500000002,123.75362529999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJHdeYu4EBoTMRs4zDA1H23gE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJHdeYu4EBoTMRs4zDA1H23gE&travelmode=driving',placeId:'ChIJHdeYu4EBoTMRs4zDA1H23gE',orderUrl:null},
  {id:121,name:'Robinsons Naga',address:'Robinsons Naga, Ground Floor, Naga City',island:'Luzon',region:'Luzon — Bicol',lat:13.615378999999999,lng:123.1933615,embedUrl:'https://maps.google.com/maps?q=13.615378999999999,123.1933615&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJS-4tvaGNoTMRgimzKFAWCoo',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJS-4tvaGNoTMRgimzKFAWCoo&travelmode=driving',placeId:'ChIJS-4tvaGNoTMRgimzKFAWCoo',orderUrl:null},
  {id:140,name:'SM City Daet',address:'3rd Floor SM City Daet, Daet, Camarines Norte',island:'Luzon',region:'Luzon — Bicol',lat:14.12164,lng:122.94586029999999,embedUrl:'https://maps.google.com/maps?q=14.12164,122.94586029999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJS2lvaHqvmDMR2NJ4hg4pB2M',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJS2lvaHqvmDMR2NJ4hg4pB2M&travelmode=driving',placeId:'ChIJS2lvaHqvmDMR2NJ4hg4pB2M',orderUrl:null},
  {id:155,name:'SM City Sorsogon',address:'2nd Floor Foodcourt, Maharlika Highway, Sorsogon City',island:'Luzon',region:'Luzon — Bicol',lat:12.976439099999999,lng:124.0188891,embedUrl:'https://maps.google.com/maps?q=12.976439099999999,124.0188891&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJgdaS60_voDMRccXIPC4Mg-4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJgdaS60_voDMRccXIPC4Mg-4&travelmode=driving',placeId:'ChIJgdaS60_voDMRccXIPC4Mg-4',orderUrl:null},
  {id:162,name:'Tabaco City',address:'High Point Bldg, Karangahan Blvd, Tabaco City, Albay',island:'Luzon',region:'Luzon — Bicol',lat:13.3603556,lng:123.7258403,embedUrl:'https://maps.google.com/maps?q=13.3603556,123.7258403&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ_0boVTqtoTMR-0o6alCIKDg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ_0boVTqtoTMR-0o6alCIKDg&travelmode=driving',placeId:'ChIJ_0boVTqtoTMR-0o6alCIKDg',orderUrl:null},
  {id:95,name:'Ayala Malls Serin',address:'Lower Ground Level Ayala Malls Serin, Silang Junction North, Tagaytay',island:'Luzon',region:'Luzon — CALABARZON',lat:14.112628299999999,lng:120.959143,embedUrl:'https://maps.google.com/maps?q=14.112628299999999,120.959143&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJMxyRPCh3vTMR4y3iGeGojxI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJMxyRPCh3vTMR4y3iGeGojxI&travelmode=driving',placeId:'ChIJMxyRPCh3vTMR4y3iGeGojxI',orderUrl:null},
  {id:96,name:'Ayala Malls Solenad',address:'Building D Solenad, Nuvali Boulevard, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2409061,lng:121.0581273,embedUrl:'https://maps.google.com/maps?q=14.2409061,121.0581273&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJLdDcqrvZlzMRoRAI3FdV8Ic',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJLdDcqrvZlzMRoRAI3FdV8Ic&travelmode=driving',placeId:'ChIJLdDcqrvZlzMRoRAI3FdV8Ic',orderUrl:null},
  {id:97,name:'Ayala Malls Vermosa',address:'3rd Floor Ayala Malls Vermosa, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.384300300000001,lng:120.95982649999999,embedUrl:'https://maps.google.com/maps?q=14.384300300000001,120.95982649999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ-Q9L8PPTlzMRcoVVObR0C-0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ-Q9L8PPTlzMRcoVVObR0C-0&travelmode=driving',placeId:'ChIJ-Q9L8PPTlzMRcoVVObR0C-0',orderUrl:null},
  {id:102,name:'Central Mall Dasmarinas',address:'Salitran, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3496613,lng:120.9382402,embedUrl:'https://maps.google.com/maps?q=14.3496613,120.9382402&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJvzJCGovUlzMRKW4fkrM0cCY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJvzJCGovUlzMRKW4fkrM0cCY&travelmode=driving',placeId:'ChIJvzJCGovUlzMRKW4fkrM0cCY',orderUrl:null},
  {id:106,name:'Fora Mall Tagaytay',address:'Emilio Aguinaldo Highway, Silang Junction South, Tagaytay City, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.1155932,lng:120.9613844,embedUrl:'https://maps.google.com/maps?q=14.1155932,120.9613844&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJS9mnfKt3vTMRLQZNPWr7_wo',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJS9mnfKt3vTMRLQZNPWr7_wo&travelmode=driving',placeId:'ChIJS9mnfKt3vTMRLQZNPWr7_wo',orderUrl:null},
  {id:108,name:'Gateway Mall Sta. Rosa',address:'Old National Highway, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.298198099999999,lng:121.10533210000001,embedUrl:'https://maps.google.com/maps?q=14.298198099999999,121.10533210000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ7UX8NyvZlzMRmKgSkJk-3oM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ7UX8NyvZlzMRmKgSkJk-3oM&travelmode=driving',placeId:'ChIJ7UX8NyvZlzMRmKgSkJk-3oM',orderUrl:null},
  {id:115,name:'Robinsons Galleria South San Pedro',address:'Robinsons San Pedro, San Pedro, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3521045,lng:121.0622036,embedUrl:'https://maps.google.com/maps?q=14.3521045,121.0622036&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJCdvhnrTQlzMR7JZLXvBlulA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJCdvhnrTQlzMR7JZLXvBlulA&travelmode=driving',placeId:'ChIJCdvhnrTQlzMR7JZLXvBlulA',orderUrl:null},
  {id:116,name:'Robinsons General Trias',address:'2nd Floor Robinsons Place, Brgy Tejero, General Trias, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3969353,lng:120.8650337,embedUrl:'https://maps.google.com/maps?q=14.3969353,120.8650337&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJE_jp5RYtljMRp1W-A_JAhPc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJE_jp5RYtljMRp1W-A_JAhPc&travelmode=driving',placeId:'ChIJE_jp5RYtljMRp1W-A_JAhPc',orderUrl:null},
  {id:118,name:'Robinsons Imus',address:'2nd Floor Food Court, Robinsons Place Imus, Aguinaldo Hwy, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.412978999999998,lng:120.94179390000001,embedUrl:'https://maps.google.com/maps?q=14.412978999999998,120.94179390000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJM51jb__SlzMRnklOKnov1uw',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJM51jb__SlzMRnklOKnov1uw&travelmode=driving',placeId:'ChIJM51jb__SlzMRnklOKnov1uw',orderUrl:null},
  {id:120,name:'Robinsons Lipa',address:'Level 1 Robinsons Lipa, President Jose P. Laurel Hwy, Lipa City, Batangas',island:'Luzon',region:'Luzon — CALABARZON',lat:13.9422765,lng:121.15114200000001,embedUrl:'https://maps.google.com/maps?q=13.9422765,121.15114200000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJd0LurL9svTMRxGODMhIWcAc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJd0LurL9svTMRxGODMhIWcAc&travelmode=driving',placeId:'ChIJd0LurL9svTMRxGODMhIWcAc',orderUrl:null},
  {id:122,name:'Robinsons Place Dasmarinas',address:'2/F Robinsons Place Dasmarinas, Aguinaldo Hwy, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2999244,lng:120.9540761,embedUrl:'https://maps.google.com/maps?q=14.2999244,120.9540761&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJPyz1WpfVlzMRnJpABnvxxc4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJPyz1WpfVlzMRnJpABnvxxc4&travelmode=driving',placeId:'ChIJPyz1WpfVlzMRnJpABnvxxc4',orderUrl:null},
  {id:129,name:'SM Center Imus',address:'Ground Floor SM Center Imus, Brgy Nia Road, Imus, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.408878699999999,lng:120.9246314,embedUrl:'https://maps.google.com/maps?q=14.408878699999999,120.9246314&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJWQHvgR7TlzMRLCTkiewqyW8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJWQHvgR7TlzMRLCTkiewqyW8&travelmode=driving',placeId:'ChIJWQHvgR7TlzMRLCTkiewqyW8',orderUrl:null},
  {id:132,name:'SM City Bacoor',address:'3rd Floor SM City Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.445098000000002,lng:120.9511457,embedUrl:'https://maps.google.com/maps?q=14.445098000000002,120.9511457&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJT6joMZLNlzMR84GLp5__TsU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJT6joMZLNlzMR84GLp5__TsU&travelmode=driving',placeId:'ChIJT6joMZLNlzMR84GLp5__TsU',orderUrl:null},
  {id:137,name:'SM City Calamba',address:'National Road, Brgy Real, Calamba City, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.204184900000001,lng:121.15458559999999,embedUrl:'https://maps.google.com/maps?q=14.204184900000001,121.15458559999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJIfqGAgBjvTMR2OJHhWji0Bg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJIfqGAgBjvTMR2OJHhWji0Bg&travelmode=driving',placeId:'ChIJIfqGAgBjvTMR2OJHhWji0Bg',orderUrl:null},
  {id:141,name:'SM City Dasmarinas',address:'Lower Ground Floor SM City Dasmarinas, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.302658,lng:120.95612579999998,embedUrl:'https://maps.google.com/maps?q=14.302658,120.95612579999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJq6raSpbVlzMRAGCE_RchkJE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJq6raSpbVlzMRAGCE_RchkJE&travelmode=driving',placeId:'ChIJq6raSpbVlzMRAGCE_RchkJE',orderUrl:null},
  {id:144,name:'SM City Lemery',address:'Ground Floor SM City Lemery, Batangas',island:'Luzon',region:'Luzon — CALABARZON',lat:13.8868972,lng:120.91199150000001,embedUrl:'https://maps.google.com/maps?q=13.8868972,120.91199150000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJP4-eKp4LvTMRDgY4MsC5ML0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJP4-eKp4LvTMRDgY4MsC5ML0&travelmode=driving',placeId:'ChIJP4-eKp4LvTMRDgY4MsC5ML0',orderUrl:null},
  {id:148,name:'SM City Molino',address:'Ground Floor SM Molino, Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.383164100000002,lng:120.97759269999999,embedUrl:'https://maps.google.com/maps?q=14.383164100000002,120.97759269999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ1UGfWd3TlzMRXHOysHIrTc8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ1UGfWd3TlzMRXHOysHIrTc8&travelmode=driving',placeId:'ChIJ1UGfWd3TlzMRXHOysHIrTc8',orderUrl:null},
  {id:152,name:'SM City Rosario',address:'General Trias Dr, Tejeros Convention, Rosario, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4095704,lng:120.85792439999999,embedUrl:'https://maps.google.com/maps?q=14.4095704,120.85792439999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ382I8fAsljMRbM2mdufSGzs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ382I8fAsljMRbM2mdufSGzs&travelmode=driving',placeId:'ChIJ382I8fAsljMRbM2mdufSGzs',orderUrl:null},
  {id:154,name:'SM City San Pablo',address:'2F SM City San Pablo, San Pablo, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.071363300000002,lng:121.3015686,embedUrl:'https://maps.google.com/maps?q=14.071363300000002,121.3015686&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJfcNG2SxdvTMRr9M-DBD4aNE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJfcNG2SxdvTMRr9M-DBD4aNE&travelmode=driving',placeId:'ChIJfcNG2SxdvTMRr9M-DBD4aNE',orderUrl:null},
  {id:156,name:'SM City Tanza',address:'Ground Floor SM City Tanza, Antero Soriano Highway, Tanza, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3921908,lng:120.8505451,embedUrl:'https://maps.google.com/maps?q=14.3921908,120.8505451&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ-wG6xHQtljMRHHPy7v0nXfw',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ-wG6xHQtljMRHHPy7v0nXfw&travelmode=driving',placeId:'ChIJ-wG6xHQtljMRHHPy7v0nXfw',orderUrl:null},
  {id:159,name:'SM City Trece Martires',address:'SM City Trece Martires, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.282036,lng:120.8659846,embedUrl:'https://maps.google.com/maps?q=14.282036,120.8659846&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJHR_u-zuBvTMRykaEUf_eVbs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJHR_u-zuBvTMRykaEUf_eVbs&travelmode=driving',placeId:'ChIJHR_u-zuBvTMRykaEUf_eVbs',orderUrl:null},
  {id:125,name:'Shell Mamplasan',address:'Shell SLEX Northbound, Santo Tomas, Biñan, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.310699999999999,lng:121.0724,embedUrl:'https://maps.google.com/maps?q=14.310699999999999,121.0724&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ7335Kv7XlzMRBnyMRmuH9vA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ7335Kv7XlzMRBnyMRmuH9vA&travelmode=driving',placeId:'ChIJ7335Kv7XlzMRBnyMRmuH9vA',orderUrl:null},
  {id:165,name:'Vista Mall Sta. Rosa',address:'Second Floor Vista Mall, Santa Rosa-Tagaytay Rd, Santa Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.243418199999999,lng:121.05803389999998,embedUrl:'https://maps.google.com/maps?q=14.243418199999999,121.05803389999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJg6acdD59vTMRiKvbjMT_r1E',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJg6acdD59vTMRiKvbjMT_r1E&travelmode=driving',placeId:'ChIJg6acdD59vTMRiKvbjMT_r1E',orderUrl:null},
  {id:169,name:'Waltermart Bacoor',address:'Waltermart Bacoor, Molino Boulevard, Bacoor, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.4144838,lng:120.96708479999998,embedUrl:'https://maps.google.com/maps?q=14.4144838,120.96708479999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJfw4NAs7TlzMRn-kLAjtrQEY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJfw4NAs7TlzMRn-kLAjtrQEY&travelmode=driving',placeId:'ChIJfw4NAs7TlzMRn-kLAjtrQEY',orderUrl:null},
  {id:172,name:'Waltermart Cabuyao',address:'Km 47 San Cristobal Bridge, Cabuyao City, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.232574699999999,lng:121.13463730000001,embedUrl:'https://maps.google.com/maps?q=14.232574699999999,121.13463730000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJwXYG-lxivTMRDvS36XxI3yo',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJwXYG-lxivTMRDvS36XxI3yo&travelmode=driving',placeId:'ChIJwXYG-lxivTMRDvS36XxI3yo',orderUrl:null},
  {id:173,name:'Waltermart Dasmarinas',address:'Km. 30, Brgy R-2, Dasmariñas, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.324744800000001,lng:120.94148679999999,embedUrl:'https://maps.google.com/maps?q=14.324744800000001,120.94148679999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJDbNzu_bUlzMRpVPNWUXDVL8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJDbNzu_bUlzMRpVPNWUXDVL8&travelmode=driving',placeId:'ChIJDbNzu_bUlzMRpVPNWUXDVL8',orderUrl:null},
  {id:178,name:'Waltermart Naic',address:'Waltermart Naic, Governors Drive, Brgy. Sabang, Naic, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.3195488,lng:120.77985960000001,embedUrl:'https://maps.google.com/maps?q=14.3195488,120.77985960000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJn39G_KQpljMRyNn4ZJIOLl8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJn39G_KQpljMRyNn4ZJIOLl8&travelmode=driving',placeId:'ChIJn39G_KQpljMRyNn4ZJIOLl8',orderUrl:null},
  {id:181,name:'Waltermart Silang',address:'G/F Waltermart Silang, Gen. Aguinaldo Highway, Silang, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.229424199999999,lng:120.97027779999999,embedUrl:'https://maps.google.com/maps?q=14.229424199999999,120.97027779999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJfwF2VgB_vTMR1h4S-Ishje0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJfwF2VgB_vTMR1h4S-Ishje0&travelmode=driving',placeId:'ChIJfwF2VgB_vTMR1h4S-Ishje0',orderUrl:null},
  {id:183,name:'Waltermart Sta. Rosa Balibago',address:'UGF Waltermart Center Balibago, Sta. Rosa, Laguna',island:'Luzon',region:'Luzon — CALABARZON',lat:14.2881921,lng:121.0945041,embedUrl:'https://maps.google.com/maps?q=14.2881921,121.0945041&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJrT8ccTzYlzMRGCRrSiSAiV8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJrT8ccTzYlzMRGCRrSiSAiV8&travelmode=driving',placeId:'ChIJrT8ccTzYlzMRGCRrSiSAiV8',orderUrl:null},
  {id:185,name:'Waltermart Trece Martires',address:'Waltermart Trece Martires, Governors Dr., Trece Martires City, Cavite',island:'Luzon',region:'Luzon — CALABARZON',lat:14.280427399999999,lng:120.87059230000001,embedUrl:'https://maps.google.com/maps?q=14.280427399999999,120.87059230000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJt4-ojmyAvTMRoy3qFVUehx4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJt4-ojmyAvTMRoy3qFVUehx4&travelmode=driving',placeId:'ChIJt4-ojmyAvTMRoy3qFVUehx4',orderUrl:null},
  {id:107,name:'Gaisano City Mall CDO',address:'Ground Floor Gaisano Mall, Cagayan de Oro',island:'Luzon',region:'Luzon — Cagayan Valley',lat:8.4863593,lng:124.64987909999998,embedUrl:'https://maps.google.com/maps?q=8.4863593,124.64987909999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJHaMyCd3y_zIRuyMC_3lnmFQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJHaMyCd3y_zIRuyMC_3lnmFQ&travelmode=driving',placeId:'ChIJHaMyCd3y_zIRuyMC_3lnmFQ',orderUrl:null},
  {id:123,name:'Robinsons Santiago',address:'G/F Robinsons Place, Mabini, Santiago City, Isabela',island:'Luzon',region:'Luzon — Cagayan Valley',lat:16.6968498,lng:121.56103039999999,embedUrl:'https://maps.google.com/maps?q=16.6968498,121.56103039999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJWXUCbD0GkDMRnXlhJhncz5U',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJWXUCbD0GkDMRnXlhJhncz5U&travelmode=driving',placeId:'ChIJWXUCbD0GkDMRnXlhJhncz5U',orderUrl:null},
  {id:124,name:'Robinsons Tuguegarao',address:'Ground Floor Robinsons Place Tuguegarao, Cagayan',island:'Luzon',region:'Luzon — Cagayan Valley',lat:17.627242199999998,lng:121.73268979999999,embedUrl:'https://maps.google.com/maps?q=17.627242199999998,121.73268979999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJN1UP68-FhTMR7KGPi6-6Xjc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJN1UP68-FhTMR7KGPi6-6Xjc&travelmode=driving',placeId:'ChIJN1UP68-FhTMR7KGPi6-6Xjc',orderUrl:null},
  {id:131,name:'SM Center Tuguegarao Downtown',address:'GF SM Center Tuguegarao Downtown, Luna St. Cor. Mabini St., Tuguegarao City, Cagayan',island:'Luzon',region:'Luzon — Cagayan Valley',lat:17.613084999999998,lng:121.72371580000001,embedUrl:'https://maps.google.com/maps?q=17.613084999999998,121.72371580000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJlWKb3KeFhTMRTjMvtzAKfks',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJlWKb3KeFhTMRTjMvtzAKfks&travelmode=driving',placeId:'ChIJlWKb3KeFhTMRTjMvtzAKfks',orderUrl:null},
  {id:138,name:'SM City Cauayan',address:'SM City Cauayan, City Of Cauayan, Isabela',island:'Luzon',region:'Luzon — Cagayan Valley',lat:16.937194599999998,lng:121.76758330000001,embedUrl:'https://maps.google.com/maps?q=16.937194599999998,121.76758330000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ8xf7-jtRhTMRF5Z4VpMIgvY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ8xf7-jtRhTMRF5Z4VpMIgvY&travelmode=driving',placeId:'ChIJ8xf7-jtRhTMRF5Z4VpMIgvY',orderUrl:null},
  {id:103,name:'City Walk Tarlac',address:'Zamora St, Tarlac City',island:'Luzon',region:'Luzon — Central Luzon',lat:15.485033099999999,lng:120.58914120000001,embedUrl:'https://maps.google.com/maps?q=15.485033099999999,120.58914120000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ2-y2cznGljMRwppFaEkJWQI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ2-y2cznGljMRwppFaEkJWQI&travelmode=driving',placeId:'ChIJ2-y2cznGljMRwppFaEkJWQI',orderUrl:null},
  {id:112,name:'Puregold Maunlad Malolos',address:'L Valencia St, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.842800200000001,lng:120.8135684,embedUrl:'https://maps.google.com/maps?q=14.842800200000001,120.8135684&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJA_CNMABTljMRzpQAexlHXL0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJA_CNMABTljMRzpQAexlHXL0&travelmode=driving',placeId:'ChIJA_CNMABTljMRzpQAexlHXL0',orderUrl:null},
  {id:130,name:'SM Center Pulilan',address:'SM Center Pulilan, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8988651,lng:120.87053269999998,embedUrl:'https://maps.google.com/maps?q=14.8988651,120.87053269999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ6xxK3yVVljMRiqIhvX6dCNU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ6xxK3yVVljMRiqIhvX6dCNU&travelmode=driving',placeId:'ChIJ6xxK3yVVljMRiqIhvX6dCNU',orderUrl:null},
  {id:134,name:'SM City Baliwag',address:'21 Doña Remedios Trinidad Hwy, Baliwag, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.960168699999999,lng:120.89035310000001,embedUrl:'https://maps.google.com/maps?q=14.960168699999999,120.89035310000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJc2N0Pvz_ljMR9Zh9dqbs_PQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJc2N0Pvz_ljMR9Zh9dqbs_PQ&travelmode=driving',placeId:'ChIJc2N0Pvz_ljMR9Zh9dqbs_PQ',orderUrl:null},
  {id:135,name:'SM City Bataan',address:'2nd Floor SM City Bataan, Balanga',island:'Luzon',region:'Luzon — Central Luzon',lat:14.6824965,lng:120.5381408,embedUrl:'https://maps.google.com/maps?q=14.6824965,120.5381408&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ30XhI5lBljMRLhODERpQI68',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ30XhI5lBljMRLhODERpQI68&travelmode=driving',placeId:'ChIJ30XhI5lBljMRLhODERpQI68',orderUrl:null},
  {id:139,name:'SM City Clark',address:'SM Ground Level, Manuel A. Roxas Hwy, Clark Freeport, Angeles, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.1672708,lng:120.58011339999999,embedUrl:'https://maps.google.com/maps?q=15.1672708,120.58011339999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJjb6v037yljMRlxPfd8AmrgY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJjb6v037yljMRlxPfd8AmrgY&travelmode=driving',placeId:'ChIJjb6v037yljMRlxPfd8AmrgY',orderUrl:null},
  {id:146,name:'SM City Marilao',address:'Ground Floor SM Marilao, 3019 Macarthur Hwy, Marilao, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.7541914,lng:120.9565916,embedUrl:'https://maps.google.com/maps?q=14.7541914,120.9565916&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ_fpDWq2zlzMRl_MzpZd7tYg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ_fpDWq2zlzMRl_MzpZd7tYg&travelmode=driving',placeId:'ChIJ_fpDWq2zlzMRl_MzpZd7tYg',orderUrl:null},
  {id:149,name:'SM City Olongapo Central',address:'Level 4 SM City Olongapo Central, Rizal Avenue Extension, Olongapo City',island:'Luzon',region:'Luzon — Central Luzon',lat:14.837017300000001,lng:120.282813,embedUrl:'https://maps.google.com/maps?q=14.837017300000001,120.282813&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJsUd8gx1xljMR9s07pZUSCPQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJsUd8gx1xljMR9s07pZUSCPQ&travelmode=driving',placeId:'ChIJsUd8gx1xljMR9s07pZUSCPQ',orderUrl:null},
  {id:150,name:'SM City Pampanga',address:'SM Pampanga, Jose Abad Santos Ave, Mexico, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.0530811,lng:120.6993088,embedUrl:'https://maps.google.com/maps?q=15.0530811,120.6993088&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ3dgelUT3ljMRBXhit1v4JWQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ3dgelUT3ljMRBXhit1v4JWQ&travelmode=driving',placeId:'ChIJ3dgelUT3ljMRBXhit1v4JWQ',orderUrl:null},
  {id:153,name:'SM City San Jose Delmonte',address:'Lower Ground Floor SM City Quirino Highway, San Jose Del Monte, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.786495299999999,lng:121.07510400000001,embedUrl:'https://maps.google.com/maps?q=14.786495299999999,121.07510400000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJKSi3o4uvlzMRkj79IPcPLGc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJKSi3o4uvlzMRkj79IPcPLGc&travelmode=driving',placeId:'ChIJKSi3o4uvlzMRkj79IPcPLGc',orderUrl:null},
  {id:157,name:'SM City Tarlac',address:'SM City Tarlac, MacArthur Highway, Tarlac City',island:'Luzon',region:'Luzon — Central Luzon',lat:15.4774417,lng:120.5948595,embedUrl:'https://maps.google.com/maps?q=15.4774417,120.5948595&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJP4oDW0DGljMRZU9R1-5Ode4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJP4oDW0DGljMRZU9R1-5Ode4&travelmode=driving',placeId:'ChIJP4oDW0DGljMRZU9R1-5Ode4',orderUrl:null},
  {id:158,name:'SM City Telabastagan',address:'G/F SM City Telabastagan, San Fernando, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.120246,lng:120.6018769,embedUrl:'https://maps.google.com/maps?q=15.120246,120.6018769&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJbf6LfG7zljMRN1nCZEIhmmA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJbf6LfG7zljMRN1nCZEIhmmA&travelmode=driving',placeId:'ChIJbf6LfG7zljMRN1nCZEIhmmA',orderUrl:null},
  {id:126,name:'Shell NLEX Balagtas',address:'North Luzon Expressway Shell Balagtas, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.831169000000001,lng:120.908941,embedUrl:'https://maps.google.com/maps?q=14.831169000000001,120.908941&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJiz2XiimtlzMRHi_9SikE6Tg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJiz2XiimtlzMRHi_9SikE6Tg&travelmode=driving',placeId:'ChIJiz2XiimtlzMRHi_9SikE6Tg',orderUrl:null},
  {id:164,name:'Vista Mall Malolos',address:'4th Floor Vista Mall Malolos, MacArthur Hwy, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8750145,lng:120.79666060000001,embedUrl:'https://maps.google.com/maps?q=14.8750145,120.79666060000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJZR2KE1pRljMRoBfvvStmELk',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJZR2KE1pRljMRoBfvvStmELk&travelmode=driving',placeId:'ChIJZR2KE1pRljMRoBfvvStmELk',orderUrl:null},
  {id:168,name:'Waltermart Arayat',address:'Waltermart, Jose Abad Santos, Arayat, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.144396700000001,lng:120.76944660000001,embedUrl:'https://maps.google.com/maps?q=15.144396700000001,120.76944660000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJy3Nm0RnlljMRRzy5TUEqxAI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJy3Nm0RnlljMRRzy5TUEqxAI&travelmode=driving',placeId:'ChIJy3Nm0RnlljMRRzy5TUEqxAI',orderUrl:null},
  {id:171,name:'Waltermart Cabanatuan',address:'Waltermart Cabanatuan, Maharlika Highway, Cabanatuan City, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.486094300000001,lng:120.97202199999998,embedUrl:'https://maps.google.com/maps?q=15.486094300000001,120.97202199999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ5c65IycplzMROhH0cTPLwiI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ5c65IycplzMROhH0cTPLwiI&travelmode=driving',placeId:'ChIJ5c65IycplzMROhH0cTPLwiI',orderUrl:null},
  {id:174,name:'Waltermart Gapan',address:'Waltermart Gapan, Maharlika National Highway, Gapan, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.303610299999999,lng:120.9465193,embedUrl:'https://maps.google.com/maps?q=15.303610299999999,120.9465193&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJExDxt7UhlzMRLzhaKH_kZc0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJExDxt7UhlzMRLzhaKH_kZc0&travelmode=driving',placeId:'ChIJExDxt7UhlzMRLzhaKH_kZc0',orderUrl:null},
  {id:175,name:'Waltermart Guiguinto',address:'Waltermart, Macarthur Hwy, Guiguinto, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.8283245,lng:120.87378179999999,embedUrl:'https://maps.google.com/maps?q=14.8283245,120.87378179999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ7w247t1SljMRv7_zY0zzD5M',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ7w247t1SljMRv7_zY0zzD5M&travelmode=driving',placeId:'ChIJ7w247t1SljMRv7_zY0zzD5M',orderUrl:null},
  {id:176,name:'Waltermart Mabalacat',address:'MacArthur Hwy, Brgy. Dau, Mabalacat City, Pampanga',island:'Luzon',region:'Luzon — Central Luzon',lat:15.186154499999997,lng:120.5845847,embedUrl:'https://maps.google.com/maps?q=15.186154499999997,120.5845847&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJoS2TeADtljMRfw9jNgVxIaM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJoS2TeADtljMRfw9jNgVxIaM&travelmode=driving',placeId:'ChIJoS2TeADtljMRfw9jNgVxIaM',orderUrl:null},
  {id:177,name:'Waltermart Malolos',address:'G/F Waltermart, Macarthur Hwy, Malolos, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.872519899999999,lng:120.79914559999999,embedUrl:'https://maps.google.com/maps?q=14.872519899999999,120.79914559999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJN9Q4dTJRljMRrsNkNviWYbY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJN9Q4dTJRljMRrsNkNviWYbY&travelmode=driving',placeId:'ChIJN9Q4dTJRljMRrsNkNviWYbY',orderUrl:null},
  {id:179,name:'Waltermart Plaridel',address:'Cagayan Valley Road, Banga 1, Plaridel, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.881697299999999,lng:120.86649419999999,embedUrl:'https://maps.google.com/maps?q=14.881697299999999,120.86649419999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJxckz8JtUljMRxbNMf6KKfOY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJxckz8JtUljMRxbNMf6KKfOY&travelmode=driving',placeId:'ChIJxckz8JtUljMRxbNMf6KKfOY',orderUrl:null},
  {id:180,name:'Waltermart San Jose NE',address:'Ground Floor Waltermart San Jose, Nueva Ecija',island:'Luzon',region:'Luzon — Central Luzon',lat:15.797546700000002,lng:120.99407989999999,embedUrl:'https://maps.google.com/maps?q=15.797546700000002,120.99407989999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJwfH72iPakDMRjYhn-YbC1XU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJwfH72iPakDMRjYhn-YbC1XU&travelmode=driving',placeId:'ChIJwfH72iPakDMRjYhn-YbC1XU',orderUrl:null},
  {id:182,name:'Waltermart Sta. Maria',address:'G/F Waltermart, Narra St., Sta. Clara, Sta. Maria, Bulacan',island:'Luzon',region:'Luzon — Central Luzon',lat:14.822318399999997,lng:120.95382559999997,embedUrl:'https://maps.google.com/maps?q=14.822318399999997,120.95382559999997&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJRcUROaWtlzMRy2z_3BUi3AM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJRcUROaWtlzMRy2z_3BUi3AM&travelmode=driving',placeId:'ChIJRcUROaWtlzMRy2z_3BUi3AM',orderUrl:null},
  {id:99,name:'Bayombong Nueva Vizcaya',address:'The Cornerstone Bldg., Capt. Dela Cruz St., Bayombong, Nueva Vizcaya',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.4842708,lng:121.15045729999999,embedUrl:'https://maps.google.com/maps?q=16.4842708,121.15045729999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJUzbPAgBFkDMRq4y6I-ryjo8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJUzbPAgBFkDMRq4y6I-ryjo8&travelmode=driving',placeId:'ChIJUzbPAgBFkDMRq4y6I-ryjo8',orderUrl:null},
  {id:105,name:'CSI The City Mall Dagupan',address:'Lucao District, Dagupan City, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.0235482,lng:120.3233352,embedUrl:'https://maps.google.com/maps?q=16.0235482,120.3233352&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJiTWRdT9dkTMRFH7jFpZw7og',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJiTWRdT9dkTMRFH7jFpZw7og&travelmode=driving',placeId:'ChIJiTWRdT9dkTMRFH7jFpZw7og',orderUrl:null},
  {id:114,name:'Robinsons Calasiao',address:'Level 2, Robinsons Place Calasiao, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.021959799999998,lng:120.35883289999998,embedUrl:'https://maps.google.com/maps?q=16.021959799999998,120.35883289999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ2yq5ErlCkTMRw3s7A9fG0Qs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ2yq5ErlCkTMRw3s7A9fG0Qs&travelmode=driving',placeId:'ChIJ2yq5ErlCkTMRw3s7A9fG0Qs',orderUrl:null},
  {id:117,name:'Robinsons Ilocos',address:'San Francisco, San Nicolas, Robinsons Ilocos, Ilocos Norte',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:18.1798657,lng:120.5926892,embedUrl:'https://maps.google.com/maps?q=18.1798657,120.5926892&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJR68PdxnHjjMRGKnaQZPKEXU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJR68PdxnHjjMRGKnaQZPKEXU&travelmode=driving',placeId:'ChIJR68PdxnHjjMRGKnaQZPKEXU',orderUrl:null},
  {id:133,name:'SM City Baguio',address:'Upper Ground Floor SM Baguio, Baguio City',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.4088516,lng:120.5998022,embedUrl:'https://maps.google.com/maps?q=16.4088516,120.5998022&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJd5wuUEKhkTMR2M1ll8O2f1U',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJd5wuUEKhkTMR2M1ll8O2f1U&travelmode=driving',placeId:'ChIJd5wuUEKhkTMR2M1ll8O2f1U',orderUrl:null},
  {id:142,name:'SM City La Union',address:'Along Diversion Road, Barangay Biday, San Fernando City, La Union',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:16.6255511,lng:120.32384579999999,embedUrl:'https://maps.google.com/maps?q=16.6255511,120.32384579999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJA3ygETqPkTMRqTkWB26X-aE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJA3ygETqPkTMRqTkWB26X-aE&travelmode=driving',placeId:'ChIJA3ygETqPkTMRqTkWB26X-aE',orderUrl:null},
  {id:143,name:'SM City Laoag',address:'Lower Ground Floor SM City Laoag, Laoag City, Ilocos Norte',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:18.187385700000004,lng:120.5850179,embedUrl:'https://maps.google.com/maps?q=18.187385700000004,120.5850179&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ_2NwHpnHjjMROmBBttdzRv0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ_2NwHpnHjjMROmBBttdzRv0&travelmode=driving',placeId:'ChIJ_2NwHpnHjjMROmBBttdzRv0',orderUrl:null},
  {id:151,name:'SM City Rosales',address:'Ground Floor SM Rosales, Pangasinan',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:15.8781997,lng:120.60259749999999,embedUrl:'https://maps.google.com/maps?q=15.8781997,120.60259749999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJKxcHMXQ5kTMRuC9X8itv0VY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJKxcHMXQ5kTMRuC9X8itv0VY&travelmode=driving',placeId:'ChIJKxcHMXQ5kTMRuC9X8itv0VY',orderUrl:null},
  {id:163,name:'Vigan City - Calle Crisologo',address:'19 Crisologo, Vigan City, Ilocos Sur',island:'Luzon',region:'Luzon — Ilocos / Pangasinan / CAR',lat:17.5722715,lng:120.38913149999998,embedUrl:'https://maps.google.com/maps?q=17.5722715,120.38913149999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJH5HJ-nVljjMRwWLlzOVM_yQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJH5HJ-nVljjMRwWLlzOVM_yQ&travelmode=driving',placeId:'ChIJH5HJ-nVljjMRwWLlzOVM_yQ',orderUrl:null},
  {id:104,name:'Coron, Palawan',address:'National Highway, Brgy. V, Coron, Palawan',island:'Luzon',region:'Luzon — MIMAROPA',lat:11.997420499999999,lng:120.2123548,embedUrl:'https://maps.google.com/maps?q=11.997420499999999,120.2123548&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJXwFf_5sdujMREu8JbvYA8eQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJXwFf_5sdujMREu8JbvYA8eQ&travelmode=driving',placeId:'ChIJXwFf_5sdujMREu8JbvYA8eQ',orderUrl:null},
  {id:187,name:'Xentro Mall Calapan',address:'1F Xentromall Calapan, Roxas Drive, Lumang Bayan, Calapan, Oriental Mindoro',island:'Luzon',region:'Luzon — MIMAROPA',lat:13.4029582,lng:121.1837185,embedUrl:'https://maps.google.com/maps?q=13.4029582,121.1837185&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJa3ho3sXovDMR-STKi79zyyQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJa3ho3sXovDMR-STKi79zyyQ&travelmode=driving',placeId:'ChIJa3ho3sXovDMR-STKi79zyyQ',orderUrl:null},
  {id:94,name:'Ayala Malls Harbor Point',address:'2nd Floor Ayala Malls Harbor Point, Subic Bay Freeport Zone',island:'Luzon',region:'Luzon — Other Provinces',lat:14.824722999999999,lng:120.27982039999999,embedUrl:'https://maps.google.com/maps?q=14.824722999999999,120.27982039999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJNcGVxBBxljMRr7cqdbfnOYs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJNcGVxBBxljMRr7cqdbfnOYs&travelmode=driving',placeId:'ChIJNcGVxBBxljMRr7cqdbfnOYs',orderUrl:null},
  {id:98,name:'Ayala Pavilion Mall',address:'Foodcourt Greenfield Pavilion Edsa Cor United St, Mandaluyong',island:'Luzon',region:'Luzon — Other Provinces',lat:14.5793466,lng:121.0528106,embedUrl:'https://maps.google.com/maps?q=14.5793466,121.0528106&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJFyFanUDIlzMR5_kbCTdZycU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJFyFanUDIlzMR5_kbCTdZycU&travelmode=driving',placeId:'ChIJFyFanUDIlzMR5_kbCTdZycU',orderUrl:null},
  {id:101,name:'C. Raymundo Pasig',address:'C. Raymundo Ave., Corner Narra St. Maybunga, Pasig City',island:'Luzon',region:'Luzon — Other Provinces',lat:14.5769053,lng:121.08537630000001,embedUrl:'https://maps.google.com/maps?q=14.5769053,121.08537630000001&output=embed',mapsUrl:'https://www.google.com/maps/search/?api=1&query=14.5769053,121.08537630000001',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination=14.5769053,121.08537630000001&travelmode=driving',placeId:null,orderUrl:null},
  {id:136,name:'SM City Cabanatuan',address:'Level 3 SM Cabanatuan, Maharlika Highway, Cabanatuan City',island:'Luzon',region:'Luzon — Other Provinces',lat:15.466919100000002,lng:120.95437849999998,embedUrl:'https://maps.google.com/maps?q=15.466919100000002,120.95437849999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJVThm25XXljMRzqZeqwDbSgc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJVThm25XXljMRzqZeqwDbSgc&travelmode=driving',placeId:'ChIJVThm25XXljMRzqZeqwDbSgc',orderUrl:null},
  {id:145,name:'SM City Lucena',address:'2nd Level SM City Lucena, Maharlika Highway, Lucena City',island:'Luzon',region:'Luzon — Other Provinces',lat:13.9407966,lng:121.62428260000002,embedUrl:'https://maps.google.com/maps?q=13.9407966,121.62428260000002&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJfbeyfqpMvTMRwsLPqO6ilOU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJfbeyfqpMvTMRwsLPqO6ilOU&travelmode=driving',placeId:'ChIJfbeyfqpMvTMRwsLPqO6ilOU',orderUrl:null},
  {id:161,name:'SM Mega Center Cabanatuan',address:'UG Level SM Mega Center, Gen. Tinio St., Cabanatuan City',island:'Luzon',region:'Luzon — Other Provinces',lat:15.488005399999997,lng:120.96776469999998,embedUrl:'https://maps.google.com/maps?q=15.488005399999997,120.96776469999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJLXmV3rEplzMRZG65dGfmdCg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJLXmV3rEplzMRZG65dGfmdCg&travelmode=driving',placeId:'ChIJLXmV3rEplzMRZG65dGfmdCg',orderUrl:null},
  {id:93,name:'Antipolo Triangle Mall',address:'Antipolo Triangle Mall, Sen. Lorenzo Sumulong Memorial Circle, Antipolo',island:'Luzon',region:'Luzon — Rizal',lat:14.5819768,lng:121.1817404,embedUrl:'https://maps.google.com/maps?q=14.5819768,121.1817404&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJecN99Fe_lzMRZsWUg8xOvGQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJecN99Fe_lzMRZsWUg8xOvGQ&travelmode=driving',placeId:'ChIJecN99Fe_lzMRZsWUg8xOvGQ',orderUrl:null},
  {id:109,name:'Imall Antipolo',address:'LGF Imall Antipolo, Sumulong St., San Roque, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5841617,lng:121.17602209999998,embedUrl:'https://maps.google.com/maps?q=14.5841617,121.17602209999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ0f3W01W_lzMRzDtm2KacUXg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ0f3W01W_lzMRzDtm2KacUXg&travelmode=driving',placeId:'ChIJ0f3W01W_lzMRzDtm2KacUXg',orderUrl:null},
  {id:113,name:'Robinsons Antipolo',address:'NK14 L1 Robinsons Place Antipolo, Sumulong Highway, Antipolo City',island:'Luzon',region:'Luzon — Rizal',lat:14.595177899999998,lng:121.17278839999999,embedUrl:'https://maps.google.com/maps?q=14.595177899999998,121.17278839999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJnbr8HU2_lzMRZVUPqTM0gXY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJnbr8HU2_lzMRZVUPqTM0gXY&travelmode=driving',placeId:'ChIJnbr8HU2_lzMRZVUPqTM0gXY',orderUrl:null},
  {id:128,name:'SM Center Angono',address:'Ground Floor SM Center Angono, Mla. East Rd., Angono, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.530914099999999,lng:121.15473410000001,embedUrl:'https://maps.google.com/maps?q=14.530914099999999,121.15473410000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJH06EgV3HlzMR0zXMh0R29WU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJH06EgV3HlzMR0zXMh0R29WU&travelmode=driving',placeId:'ChIJH06EgV3HlzMR0zXMh0R29WU',orderUrl:null},
  {id:147,name:'SM City Masinag',address:'Upper Ground SM City Masinag, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.625363999999998,lng:121.11991719999999,embedUrl:'https://maps.google.com/maps?q=14.625363999999998,121.11991719999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ_zR4mla4lzMR8qtUHF_HhxM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ_zR4mla4lzMR8qtUHF_HhxM&travelmode=driving',placeId:'ChIJ_zR4mla4lzMR8qtUHF_HhxM',orderUrl:null},
  {id:167,name:'Waltermart Antipolo',address:'L. Sumulong Memorial Circle, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.580121,lng:121.17297409999999,embedUrl:'https://maps.google.com/maps?q=14.580121,121.17297409999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ-18oz-bBlzMR6J2YGV7x62U',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ-18oz-bBlzMR6J2YGV7x62U&travelmode=driving',placeId:'ChIJ-18oz-bBlzMR6J2YGV7x62U',orderUrl:null},
  {id:184,name:'Waltermart Taytay',address:'40 R-5, Taytay, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.5795311,lng:121.13796900000001,embedUrl:'https://maps.google.com/maps?q=14.5795311,121.13796900000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJm3YiS9_HlzMRatUQ-pKWYKE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJm3YiS9_HlzMRatUQ-pKWYKE&travelmode=driving',placeId:'ChIJm3YiS9_HlzMRatUQ-pKWYKE',orderUrl:null},
  {id:186,name:'Xentro Mall Antipolo',address:'Ground Floor Xentro Mall Antipolo, Mambugan, Antipolo, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.6169598,lng:121.135663,embedUrl:'https://maps.google.com/maps?q=14.6169598,121.135663&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJt2GkQgC5lzMRXnQAZXyKRJc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJt2GkQgC5lzMRXnQAZXyKRJc&travelmode=driving',placeId:'ChIJt2GkQgC5lzMRXnQAZXyKRJc',orderUrl:null},
  {id:188,name:'Xentro Mall Montalban',address:'Xentromall Montalban, Manggahan, Rodriguez, Rizal',island:'Luzon',region:'Luzon — Rizal',lat:14.729444800000001,lng:121.14202639999998,embedUrl:'https://maps.google.com/maps?q=14.729444800000001,121.14202639999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJkSroMQC7lzMRX_JhJgLbxnw',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJkSroMQC7lzMRX_JhJgLbxnw&travelmode=driving',placeId:'ChIJkSroMQC7lzMRX_JhJgLbxnw',orderUrl:null},
  {id:0,name:'168 Mall - 5th Floor',address:'168mall 5th Floor Foodcourt Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.605140500000001,lng:120.97213470000001,embedUrl:'https://maps.google.com/maps?q=14.605140500000001,120.97213470000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJk62Rww7KlzMRuDL8xKvVD1E',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJk62Rww7KlzMRuDL8xKvVD1E&travelmode=driving',placeId:'ChIJk62Rww7KlzMRuDL8xKvVD1E',orderUrl:null},
  {id:1,name:'168 Mall - Ground Floor',address:'Ground Flr. Entrance Soler St. Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.605140500000001,lng:120.97213470000001,embedUrl:'https://maps.google.com/maps?q=14.605140500000001,120.97213470000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJk62Rww7KlzMRuDL8xKvVD1E',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJk62Rww7KlzMRuDL8xKvVD1E&travelmode=driving',placeId:'ChIJk62Rww7KlzMRuDL8xKvVD1E',orderUrl:null},
  {id:2,name:'999 Shopping Mall',address:'Stall 6 Food World Express Isetann Recto, Manila',island:'Luzon',region:'Metro Manila',lat:14.603213899999998,lng:120.9838304,embedUrl:'https://maps.google.com/maps?q=14.603213899999998,120.9838304&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ-RsVuwPKlzMRv9xLvoekQlQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ-RsVuwPKlzMRv9xLvoekQlQ&travelmode=driving',placeId:'ChIJ-RsVuwPKlzMRv9xLvoekQlQ',orderUrl:null},
  {id:3,name:'Alabang Town Center',address:'Ground Level Entertainment Complex, Alabang Town Center, Muntinlupa',island:'Luzon',region:'Metro Manila',lat:14.4229446,lng:121.02944450000001,embedUrl:'https://maps.google.com/maps?q=14.4229446,121.02944450000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJrbUBl43RlzMRev1sgFfo060',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJrbUBl43RlzMRev1sgFfo060&travelmode=driving',placeId:'ChIJrbUBl43RlzMRev1sgFfo060',orderUrl:null},
  {id:5,name:'Ayala Malls Cloverleaf',address:'4th Level Ayala Malls Cloverleaf, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6550443,lng:121.0011214,embedUrl:'https://maps.google.com/maps?q=14.6550443,121.0011214&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJH7JzJRC3lzMRp3T_8M7odw8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJH7JzJRC3lzMRp3T_8M7odw8&travelmode=driving',placeId:'ChIJH7JzJRC3lzMRp3T_8M7odw8',orderUrl:null},
  {id:6,name:'Ayala Malls Fairview Terraces',address:'LGF Ayala Mall Fairview Terraces Quirino Highway Novaliches Quezon City',island:'Luzon',region:'Metro Manila',lat:14.736385600000002,lng:121.06015319999999,embedUrl:'https://maps.google.com/maps?q=14.736385600000002,121.06015319999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJFUbI-2iwlzMRkB5yB-PVczs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJFUbI-2iwlzMRkB5yB-PVczs&travelmode=driving',placeId:'ChIJFUbI-2iwlzMRkB5yB-PVczs',orderUrl:null},
  {id:7,name:'Ayala Malls Manila Bay',address:'2nd Floor Building B Ayala Malls Manila Bay',island:'Luzon',region:'Metro Manila',lat:14.522666099999999,lng:120.9894406,embedUrl:'https://maps.google.com/maps?q=14.522666099999999,120.9894406&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ_Y8tLsvPlzMRX7xM-hyqfZw',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ_Y8tLsvPlzMRX7xM-hyqfZw&travelmode=driving',placeId:'ChIJ_Y8tLsvPlzMRX7xM-hyqfZw',orderUrl:null},
  {id:8,name:'Ayala Malls Marikina',address:'Liwasang Kalayaan, Marikina, 1800 Metro Manila',island:'Luzon',region:'Metro Manila',lat:14.649611499999999,lng:121.11572739999998,embedUrl:'https://maps.google.com/maps?q=14.649611499999999,121.11572739999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJaZGDcKO5lzMRDEkG1NmusXY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJaZGDcKO5lzMRDEkG1NmusXY&travelmode=driving',placeId:'ChIJaZGDcKO5lzMRDEkG1NmusXY',orderUrl:null},
  {id:9,name:'Ayala Malls Market Market',address:'3rd Floor Market Market Mall BGC, Taguig',island:'Luzon',region:'Metro Manila',lat:14.5502545,lng:121.0561214,embedUrl:'https://maps.google.com/maps?q=14.5502545,121.0561214&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJgyxlyvLIlzMRLma-ahwByGI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJgyxlyvLIlzMRLma-ahwByGI&travelmode=driving',placeId:'ChIJgyxlyvLIlzMRLma-ahwByGI',orderUrl:null},
  {id:10,name:'Ayala Malls The 30th',address:'Lower Ground, Ayala Malls The 30th, 30 Meralco Ave, Ortigas Center, Pasig',island:'Luzon',region:'Metro Manila',lat:14.5807015,lng:121.0657166,embedUrl:'https://maps.google.com/maps?q=14.5807015,121.0657166&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJUxe9qRPIlzMRQghu9dJIBQY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJUxe9qRPIlzMRQghu9dJIBQY&travelmode=driving',placeId:'ChIJUxe9qRPIlzMRQghu9dJIBQY',orderUrl:null},
  {id:11,name:'Ayala Malls Trinoma',address:'2nd Level Food Choices, Trinoma, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6517913,lng:121.03315259999998,embedUrl:'https://maps.google.com/maps?q=14.6517913,121.03315259999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJmXaPhgK3lzMR759yOd9HKKY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJmXaPhgK3lzMR759yOd9HKKY&travelmode=driving',placeId:'ChIJmXaPhgK3lzMR759yOd9HKKY',orderUrl:null},
  {id:13,name:'Batasan Hills',address:'A-Plaza Bldg. 1st Floor, Batasan Hills, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6819014,lng:121.08553470000001,embedUrl:'https://maps.google.com/maps?q=14.6819014,121.08553470000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ_8OW3QO6lzMRnPl5XgDiAP4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ_8OW3QO6lzMRnPl5XgDiAP4&travelmode=driving',placeId:'ChIJ_8OW3QO6lzMRnPl5XgDiAP4',orderUrl:null},
  {id:14,name:'Centris Mall',address:'2nd Floor, Centris Station, Eton Centris, Edsa Corner Quezon Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6425584,lng:121.0399339,embedUrl:'https://maps.google.com/maps?q=14.6425584,121.0399339&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJfVrM-qm3lzMRbGOpE7fW8Qg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJfVrM-qm3lzMRbGOpE7fW8Qg&travelmode=driving',placeId:'ChIJfVrM-qm3lzMRbGOpE7fW8Qg',orderUrl:null},
  {id:15,name:'Double Dragon Plaza',address:'Ground Floor Double Dragon Plaza DD Meridian Park, Pasay City',island:'Luzon',region:'Metro Manila',lat:14.5359377,lng:120.99046860000001,embedUrl:'https://maps.google.com/maps?q=14.5359377,120.99046860000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJtU15k1fJlzMReeI8czwOros',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJtU15k1fJlzMReeI8czwOros&travelmode=driving',placeId:'ChIJtU15k1fJlzMReeI8czwOros',orderUrl:null},
  {id:16,name:'Drive and Dine - Meycauayan',address:'Canumay West, Valenzuela, 1447 Metro Manila',island:'Luzon',region:'Metro Manila',lat:14.7191727,lng:120.9865843,embedUrl:'https://maps.google.com/maps?q=14.7191727,120.9865843&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ9R8Gl0ezlzMR17xo0BpcsKs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ9R8Gl0ezlzMR17xo0BpcsKs&travelmode=driving',placeId:'ChIJ9R8Gl0ezlzMR17xo0BpcsKs',orderUrl:null},
  {id:17,name:'Estancia Mall',address:'LG East Wing Estancia Mall, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.576339599999999,lng:121.0631469,embedUrl:'https://maps.google.com/maps?q=14.576339599999999,121.0631469&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJg0vGgmzIlzMRJLrpq6prXec',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJg0vGgmzIlzMRJLrpq6prXec&travelmode=driving',placeId:'ChIJg0vGgmzIlzMRJLrpq6prXec',orderUrl:null},
  {id:18,name:'Ever Commonwealth',address:'Ever Gotesco Avenue, Commonwealth Ave, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.677921900000001,lng:121.0856441,embedUrl:'https://maps.google.com/maps?q=14.677921900000001,121.0856441&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJlx-zhea7lzMRP6eRisqmVZ0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJlx-zhea7lzMRP6eRisqmVZ0&travelmode=driving',placeId:'ChIJlx-zhea7lzMRP6eRisqmVZ0',orderUrl:null},
  {id:19,name:'Evia Lifestyle Mall',address:'2/F Bldg. C Evia Lifestyle Center, Daang Hari Road, Las Piñas City',island:'Luzon',region:'Metro Manila',lat:14.3767265,lng:121.01260909999999,embedUrl:'https://maps.google.com/maps?q=14.3767265,121.01260909999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJp5KMRcDRlzMRnkR10UKp-wI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJp5KMRcDRlzMRnkR10UKp-wI&travelmode=driving',placeId:'ChIJp5KMRcDRlzMRnkR10UKp-wI',orderUrl:null},
  {id:25,name:'FTI Hypermarket',address:'GF Hypermarket, FTI Complex, Taguig',island:'Luzon',region:'Metro Manila',lat:14.508271899999999,lng:121.0506191,embedUrl:'https://maps.google.com/maps?q=14.508271899999999,121.0506191&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJK0JjuBzPlzMRjr6K13u6M_I',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJK0JjuBzPlzMRjr6K13u6M_I&travelmode=driving',placeId:'ChIJK0JjuBzPlzMRjr6K13u6M_I',orderUrl:null},
  {id:21,name:'Festival Mall Alabang',address:'Ground Floor Festival Mall, Alabang, Muntinlupa',island:'Luzon',region:'Metro Manila',lat:14.417381400000002,lng:121.04032040000001,embedUrl:'https://maps.google.com/maps?q=14.417381400000002,121.04032040000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJEXR2bDbQlzMRb74LgEPGORA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJEXR2bDbQlzMRb74LgEPGORA&travelmode=driving',placeId:'ChIJEXR2bDbQlzMRb74LgEPGORA',orderUrl:null},
  {id:22,name:'Fishermall Malabon',address:'2F Fisher Mall Malabon',island:'Luzon',region:'Metro Manila',lat:14.656547499999997,lng:120.9606729,embedUrl:'https://maps.google.com/maps?q=14.656547499999997,120.9606729&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ4ZKZn3q1lzMRtSWpROLmzxY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ4ZKZn3q1lzMRtSWpROLmzxY&travelmode=driving',placeId:'ChIJ4ZKZn3q1lzMRtSWpROLmzxY',orderUrl:null},
  {id:23,name:'Fishermall QC',address:'2F Fisher Mall, Quezon Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.633665700000002,lng:121.01959459999999,embedUrl:'https://maps.google.com/maps?q=14.633665700000002,121.01959459999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJb5qJBkW2lzMRRockcz7_rXA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJb5qJBkW2lzMRRockcz7_rXA&travelmode=driving',placeId:'ChIJb5qJBkW2lzMRRockcz7_rXA',orderUrl:null},
  {id:24,name:'Food District BGC',address:'Kiosk 3, LG One Bonifacio High Street Mall, Taguig',island:'Luzon',region:'Metro Manila',lat:14.551420199999997,lng:121.0473327,embedUrl:'https://maps.google.com/maps?q=14.551420199999997,121.0473327&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ39ZazxrJlzMRJ864lbRu-0c',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ39ZazxrJlzMRJ864lbRu-0c&travelmode=driving',placeId:'ChIJ39ZazxrJlzMRJ864lbRu-0c',orderUrl:null},
  {id:26,name:'Gateway Mall',address:'Gateway Mall 1, Ground Floor, Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.621222099999999,lng:121.05371249999999,embedUrl:'https://maps.google.com/maps?q=14.621222099999999,121.05371249999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJpZDxdgC3lzMRYW9AfGBtuNE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJpZDxdgC3lzMRYW9AfGBtuNE&travelmode=driving',placeId:'ChIJpZDxdgC3lzMRYW9AfGBtuNE',orderUrl:null},
  {id:27,name:'Greenhills Unimart',address:'Ground Floor Unimart Grocery Greenhills, San Juan City',island:'Luzon',region:'Metro Manila',lat:14.6025881,lng:121.04792769999999,embedUrl:'https://maps.google.com/maps?q=14.6025881,121.04792769999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJh90yjdi3lzMRO3GcR9AokbA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJh90yjdi3lzMRO3GcR9AokbA&travelmode=driving',placeId:'ChIJh90yjdi3lzMRO3GcR9AokbA',orderUrl:null},
  {id:28,name:'Greenhills Virra Mall',address:'2nd Floor VMall Greenhills, San Juan City',island:'Luzon',region:'Metro Manila',lat:14.602576,lng:121.04993200000001,embedUrl:'https://maps.google.com/maps?q=14.602576,121.04993200000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJPbi92ti3lzMRiDhEwv2KK4o',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJPbi92ti3lzMRiDhEwv2KK4o&travelmode=driving',placeId:'ChIJPbi92ti3lzMRiDhEwv2KK4o',orderUrl:null},
  {id:30,name:'Kai Mall',address:'GF Stall 11 Kai Mall, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.7565277,lng:121.0440045,embedUrl:'https://maps.google.com/maps?q=14.7565277,121.0440045&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJSebTYACxlzMR58oKGFbLcX8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJSebTYACxlzMR58oKGFbLcX8&travelmode=driving',placeId:'ChIJSebTYACxlzMR58oKGFbLcX8',orderUrl:null},
  {id:33,name:'Landmark Makati',address:'Basement 1 Food Center, Ayala Center, Makati City',island:'Luzon',region:'Metro Manila',lat:14.551997700000001,lng:121.02383549999999,embedUrl:'https://maps.google.com/maps?q=14.551997700000001,121.02383549999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJqUbsxRrJlzMRCy-Fuc_VHHs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJqUbsxRrJlzMRCy-Fuc_VHHs&travelmode=driving',placeId:'ChIJqUbsxRrJlzMRCy-Fuc_VHHs',orderUrl:null},
  {id:31,name:'Landmark Manila Bay',address:'Landmark Manila Bay Foodcourt, Basement 1, Paranaque City',island:'Luzon',region:'Metro Manila',lat:14.5244311,lng:120.99010989999998,embedUrl:'https://maps.google.com/maps?q=14.5244311,120.99010989999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJlX0ZAyHPlzMRuG9FXxJHeGA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJlX0ZAyHPlzMRuG9FXxJHeGA&travelmode=driving',placeId:'ChIJlX0ZAyHPlzMRuG9FXxJHeGA',orderUrl:null},
  {id:32,name:'Landmark Trinoma',address:'Ground Floor Food Center Landmark Trinoma, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6529703,lng:121.0326363,embedUrl:'https://maps.google.com/maps?q=14.6529703,121.0326363&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJV-alYv22lzMRo0yq2q7ztWw',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJV-alYv22lzMRo0yq2q7ztWw&travelmode=driving',placeId:'ChIJV-alYv22lzMRo0yq2q7ztWw',orderUrl:null},
  {id:34,name:'Lucky Chinatown Mall',address:'Ground Floor, Lucky Chinatown, Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.60314,lng:120.97342760000001,embedUrl:'https://maps.google.com/maps?q=14.60314,120.97342760000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJL9uKYsPLlzMROrGvrClyZR4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJL9uKYsPLlzMROrGvrClyZR4&travelmode=driving',placeId:'ChIJL9uKYsPLlzMROrGvrClyZR4',orderUrl:null},
  {id:35,name:'Moriones, Tondo',address:'399 Moriones St. Tondo Manila',island:'Luzon',region:'Metro Manila',lat:14.6096971,lng:120.96774320000002,embedUrl:'https://maps.google.com/maps?q=14.6096971,120.96774320000002&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJOevcRF7LlzMRQaqtyRCUQmg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJOevcRF7LlzMRQaqtyRCUQmg&travelmode=driving',placeId:'ChIJOevcRF7LlzMRQaqtyRCUQmg',orderUrl:null},
  {id:36,name:'One Ayala Mall',address:'Kiosk G-005, Lower G/F One Ayala Cor. Edsa, Makati City',island:'Luzon',region:'Metro Manila',lat:14.550449299999999,lng:121.0278251,embedUrl:'https://maps.google.com/maps?q=14.550449299999999,121.0278251&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJz_iUBFvJlzMRd4u78NiwvDg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJz_iUBFvJlzMRd4u78NiwvDg&travelmode=driving',placeId:'ChIJz_iUBFvJlzMRd4u78NiwvDg',orderUrl:null},
  {id:40,name:'PITX',address:'Level 1 Paranaque Integrated Terminal Exchange, Kennedy Road, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.510062600000001,lng:120.9912565,embedUrl:'https://maps.google.com/maps?q=14.510062600000001,120.9912565&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJRda7xxHPlzMRrxJorylkRko',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJRda7xxHPlzMRrxJorylkRko&travelmode=driving',placeId:'ChIJRda7xxHPlzMRrxJorylkRko',orderUrl:null},
  {id:37,name:'Paco Market Mall',address:'Ground Floor, Paco Mall, Manila',island:'Luzon',region:'Metro Manila',lat:14.578520999999997,lng:120.99342239999999,embedUrl:'https://maps.google.com/maps?q=14.578520999999997,120.99342239999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ4ZqBTgXJlzMRxBQSHz_G1rU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ4ZqBTgXJlzMRxBQSHz_G1rU&travelmode=driving',placeId:'ChIJ4ZqBTgXJlzMRxBQSHz_G1rU',orderUrl:null},
  {id:38,name:'Pasay Rotonda',address:'Metro Point Mall, Edsa Corner Taft Ave, Pasay City',island:'Luzon',region:'Metro Manila',lat:14.538131,lng:121.0009664,embedUrl:'https://maps.google.com/maps?q=14.538131,121.0009664&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJkdZ4bbfJlzMR3_xHozWpO8Y',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJkdZ4bbfJlzMR3_xHozWpO8Y&travelmode=driving',placeId:'ChIJkdZ4bbfJlzMR3_xHozWpO8Y',orderUrl:null},
  {id:39,name:'Paseo Center Makati',address:'G/F Paseo Center, Paseo De Roxas, Makati City',island:'Luzon',region:'Metro Manila',lat:14.557703799999997,lng:121.0231247,embedUrl:'https://maps.google.com/maps?q=14.557703799999997,121.0231247&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ614T4wXJlzMRlEC84NCgHSY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ614T4wXJlzMRlEC84NCgHSY&travelmode=driving',placeId:'ChIJ614T4wXJlzMRlEC84NCgHSY',orderUrl:null},
  {id:41,name:'R. Square',address:'2622 Taft Ave, Malate, Manila',island:'Luzon',region:'Metro Manila',lat:14.562294699999997,lng:120.9956516,embedUrl:'https://maps.google.com/maps?q=14.562294699999997,120.9956516&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJj5t6WADJlzMRA7K-6T64ZN4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJj5t6WADJlzMRA7K-6T64ZN4&travelmode=driving',placeId:'ChIJj5t6WADJlzMRA7K-6T64ZN4',orderUrl:null},
  {id:42,name:'Robinsons Galleria Ortigas',address:'Level 1 Robinsons Galleria, Edsa Cor. Ortigas Ave, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.591050599999999,lng:121.0598379,embedUrl:'https://maps.google.com/maps?q=14.591050599999999,121.0598379&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJD_r5qxnIlzMR4X64T9Ra3tY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJD_r5qxnIlzMR4X64T9Ra3tY&travelmode=driving',placeId:'ChIJD_r5qxnIlzMR4X64T9Ra3tY',orderUrl:null},
  {id:43,name:'Robinsons Las Pinas',address:'Level 1 Robinsons Place Las Piñas, Alabang-Zapote Rd., Las Piñas City',island:'Luzon',region:'Metro Manila',lat:14.442815600000001,lng:120.9978299,embedUrl:'https://maps.google.com/maps?q=14.442815600000001,120.9978299&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJCUC07T3RlzMRMZi_KBIrvG0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJCUC07T3RlzMRMZi_KBIrvG0&travelmode=driving',placeId:'ChIJCUC07T3RlzMRMZi_KBIrvG0',orderUrl:null},
  {id:44,name:'Robinsons Malabon',address:'Governor Pascual Avenue, Malabon',island:'Luzon',region:'Metro Manila',lat:14.669137699999999,lng:120.9667834,embedUrl:'https://maps.google.com/maps?q=14.669137699999999,120.9667834&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ7Qoczzi0lzMRsD3ijqeKr6I',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ7Qoczzi0lzMRsD3ijqeKr6I&travelmode=driving',placeId:'ChIJ7Qoczzi0lzMRsD3ijqeKr6I',orderUrl:null},
  {id:45,name:'Robinsons Manila',address:'Level 2, Padre Faura Wing, Ermita, Manila',island:'Luzon',region:'Metro Manila',lat:14.5783399,lng:120.9835087,embedUrl:'https://maps.google.com/maps?q=14.5783399,120.9835087&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJM6xbX9HLlzMR-mPt3NVnzrU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJM6xbX9HLlzMR-mPt3NVnzrU&travelmode=driving',placeId:'ChIJM6xbX9HLlzMR-mPt3NVnzrU',orderUrl:null},
  {id:46,name:'Robinsons Metro East',address:'Robinsons Metro East, Marcos Highway, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.619616500000001,lng:121.0999832,embedUrl:'https://maps.google.com/maps?q=14.619616500000001,121.0999832&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJr8DH0zi4lzMR_3cW0SPVQAY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJr8DH0zi4lzMR_3cW0SPVQAY&travelmode=driving',placeId:'ChIJr8DH0zi4lzMR_3cW0SPVQAY',orderUrl:null},
  {id:50,name:'SM Araneta City Cubao',address:'SM Araneta City, Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6189176,lng:121.05534979999999,embedUrl:'https://maps.google.com/maps?q=14.6189176,121.05534979999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ6ZduPcC3lzMRI7nAHZo1bG4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ6ZduPcC3lzMRI7nAHZo1bG4&travelmode=driving',placeId:'ChIJ6ZduPcC3lzMRI7nAHZo1bG4',orderUrl:null},
  {id:51,name:'SM Center Las Pinas',address:'SM Hypermarket, SM Center, Alabang-Zapote Rd, Las Piñas',island:'Luzon',region:'Metro Manila',lat:14.4488636,lng:120.9810306,embedUrl:'https://maps.google.com/maps?q=14.4488636,120.9810306&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJSUWhYQTNlzMR_MMePaI0bLM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJSUWhYQTNlzMR_MMePaI0bLM&travelmode=driving',placeId:'ChIJSUWhYQTNlzMR_MMePaI0bLM',orderUrl:null},
  {id:52,name:'SM Center Muntinlupa',address:'SM Muntinlupa Ground Level, Muntinlupa City',island:'Luzon',region:'Metro Manila',lat:14.377702399999997,lng:121.04582140000001,embedUrl:'https://maps.google.com/maps?q=14.377702399999997,121.04582140000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJPYrrl-jQlzMRAYkzI57Rhc8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJPYrrl-jQlzMRAYkzI57Rhc8&travelmode=driving',placeId:'ChIJPYrrl-jQlzMRAYkzI57Rhc8',orderUrl:null},
  {id:53,name:'SM Center Pasig',address:'SM Center Frontera Verde, E Rodriguez Jr Ave, Pasig City',island:'Luzon',region:'Metro Manila',lat:14.584008800000001,lng:121.07741109999999,embedUrl:'https://maps.google.com/maps?q=14.584008800000001,121.07741109999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJTVQHoXPIlzMRxBAdDvbxT_I',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJTVQHoXPIlzMRxBAdDvbxT_I&travelmode=driving',placeId:'ChIJTVQHoXPIlzMRxBAdDvbxT_I',orderUrl:null},
  {id:54,name:'SM City BF Paranaque',address:'2F SM City BF Paranaque, Dr Arcadio Santos Ave, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.4577604,lng:121.0327942,embedUrl:'https://maps.google.com/maps?q=14.4577604,121.0327942&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJQdV0uqvPlzMRvY3XAjcuVEQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJQdV0uqvPlzMRvY3XAjcuVEQ&travelmode=driving',placeId:'ChIJQdV0uqvPlzMRvY3XAjcuVEQ',orderUrl:null},
  {id:55,name:'SM City Bicutan',address:'SM City Bicutan, Taguig',island:'Luzon',region:'Metro Manila',lat:14.4871893,lng:121.04408120000001,embedUrl:'https://maps.google.com/maps?q=14.4871893,121.04408120000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJte9wFAXPlzMRaP6smmOPacU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJte9wFAXPlzMRaP6smmOPacU&travelmode=driving',placeId:'ChIJte9wFAXPlzMRaP6smmOPacU',orderUrl:null},
  {id:56,name:'SM City Caloocan',address:'SM City Caloocan Deparo Road, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.751327000000002,lng:121.02021880000001,embedUrl:'https://maps.google.com/maps?q=14.751327000000002,121.02021880000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJt0DN5HexlzMRW65SzjfjMpI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJt0DN5HexlzMRW65SzjfjMpI&travelmode=driving',placeId:'ChIJt0DN5HexlzMRW65SzjfjMpI',orderUrl:null},
  {id:57,name:'SM City East Ortigas',address:'2F SM City East Ortigas, Pasig',island:'Luzon',region:'Metro Manila',lat:14.5878272,lng:121.10521380000002,embedUrl:'https://maps.google.com/maps?q=14.5878272,121.10521380000002&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ7aXIcovHlzMR_4dkcKbZFOY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ7aXIcovHlzMR_4dkcKbZFOY&travelmode=driving',placeId:'ChIJ7aXIcovHlzMR_4dkcKbZFOY',orderUrl:null},
  {id:58,name:'SM City Fairview',address:'Lower Ground Level SM Fairview, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.734599099999999,lng:121.057901,embedUrl:'https://maps.google.com/maps?q=14.734599099999999,121.057901&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJTY26M12wlzMRD_9-SbLU2eU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJTY26M12wlzMRD_9-SbLU2eU&travelmode=driving',placeId:'ChIJTY26M12wlzMRD_9-SbLU2eU',orderUrl:null},
  {id:59,name:'SM City Manila',address:'4th Floor SM City Manila',island:'Luzon',region:'Metro Manila',lat:14.5901469,lng:120.98309160000001,embedUrl:'https://maps.google.com/maps?q=14.5901469,120.98309160000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJEap5lCDLlzMRZ7Mbe0i0LYc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJEap5lCDLlzMRZ7Mbe0i0LYc&travelmode=driving',placeId:'ChIJEap5lCDLlzMRZ7Mbe0i0LYc',orderUrl:null},
  {id:60,name:'SM City Novaliches',address:'SM Novaliches Ground Level, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.7081659,lng:121.0381529,embedUrl:'https://maps.google.com/maps?q=14.7081659,121.0381529&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJJ2Si1-CwlzMRns0mpFXV7m0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJJ2Si1-CwlzMRns0mpFXV7m0&travelmode=driving',placeId:'ChIJJ2Si1-CwlzMRns0mpFXV7m0',orderUrl:null},
  {id:61,name:'SM City San Lazaro',address:'Lower Ground Floor SM City San Lazaro, Manila',island:'Luzon',region:'Metro Manila',lat:14.617793699999998,lng:120.98674839999998,embedUrl:'https://maps.google.com/maps?q=14.617793699999998,120.98674839999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJRU3StaS1lzMRmlB7mbgAhsA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJRU3StaS1lzMRmlB7mbgAhsA&travelmode=driving',placeId:'ChIJRU3StaS1lzMRmlB7mbgAhsA',orderUrl:null},
  {id:62,name:'SM City Sangandaan',address:'SM Center Sangandaan, Samson Road, Caloocan City',island:'Luzon',region:'Metro Manila',lat:14.658559499999999,lng:120.97175419999999,embedUrl:'https://maps.google.com/maps?q=14.658559499999999,120.97175419999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJj9f6UtC1lzMRQl44UAzrzIg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJj9f6UtC1lzMRQl44UAzrzIg&travelmode=driving',placeId:'ChIJj9f6UtC1lzMRQl44UAzrzIg',orderUrl:null},
  {id:63,name:'SM City Sta. Mesa',address:'Level 2 SM City Sta Mesa, R Magsaysay Blvd, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.604663200000001,lng:121.0190613,embedUrl:'https://maps.google.com/maps?q=14.604663200000001,121.0190613&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJy6omj9jJlzMRkNv4uh0y8r4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJy6omj9jJlzMRkNv4uh0y8r4&travelmode=driving',placeId:'ChIJy6omj9jJlzMRkNv4uh0y8r4',orderUrl:null},
  {id:64,name:'SM City Sucat',address:'Ground Level Building B SM City Sucat, Paranaque',island:'Luzon',region:'Metro Manila',lat:14.482692300000002,lng:120.99353239999999,embedUrl:'https://maps.google.com/maps?q=14.482692300000002,120.99353239999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJedkqGX7OlzMRcUVTkyg2jJA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJedkqGX7OlzMRcUVTkyg2jJA&travelmode=driving',placeId:'ChIJedkqGX7OlzMRcUVTkyg2jJA',orderUrl:null},
  {id:65,name:'SM City Valenzuela',address:'SM City Valenzuela, McArthur Highway, Valenzuela City',island:'Luzon',region:'Metro Manila',lat:14.6856445,lng:120.9771159,embedUrl:'https://maps.google.com/maps?q=14.6856445,120.9771159&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJe3QNaAW0lzMRKb8qYMoI-38',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJe3QNaAW0lzMRKb8qYMoI-38&travelmode=driving',placeId:'ChIJe3QNaAW0lzMRKb8qYMoI-38',orderUrl:null},
  {id:66,name:'SM Hypermarket Cubao',address:'24 Main Ave Cubao, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.614574,lng:121.0554844,embedUrl:'https://maps.google.com/maps?q=14.614574,121.0554844&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJAWgGsuG3lzMR0Ni3jqKxI9k',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJAWgGsuG3lzMR0Ni3jqKxI9k&travelmode=driving',placeId:'ChIJAWgGsuG3lzMR0Ni3jqKxI9k',orderUrl:null},
  {id:67,name:'SM Hypermarket Novaliches',address:'402 Quirino Hwy, Novaliches, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.681332200000002,lng:121.0213053,embedUrl:'https://maps.google.com/maps?q=14.681332200000002,121.0213053&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJiZgLUi23lzMRr9NyUCQoWco',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJiZgLUi23lzMRr9NyUCQoWco&travelmode=driving',placeId:'ChIJiZgLUi23lzMRr9NyUCQoWco',orderUrl:null},
  {id:68,name:'SM Megamall',address:'5/F SM Megamall, Ortigas Center, Pasig',island:'Luzon',region:'Metro Manila',lat:14.585669299999998,lng:121.0566083,embedUrl:'https://maps.google.com/maps?q=14.585669299999998,121.0566083&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJZ-Br6r3JlzMR_SUY37SQK7c',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJZ-Br6r3JlzMR_SUY37SQK7c&travelmode=driving',placeId:'ChIJZ-Br6r3JlzMR_SUY37SQK7c',orderUrl:null},
  {id:69,name:'SM Retail HQ',address:'6F SM Retail HQ Building A, J.W. Diokno Blvd, Pasay',island:'Luzon',region:'Metro Manila',lat:14.541097299999999,lng:120.9844377,embedUrl:'https://maps.google.com/maps?q=14.541097299999999,120.9844377&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJGYZNdp3LlzMRGrZ6tY8CDU8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJGYZNdp3LlzMRGrZ6tY8CDU8&travelmode=driving',placeId:'ChIJGYZNdp3LlzMRGrZ6tY8CDU8',orderUrl:null},
  {id:70,name:'SM Southmall',address:'2F Food Hall, SM Southmall, Alabang-Zapote Rd, Las Piñas',island:'Luzon',region:'Metro Manila',lat:14.432560999999998,lng:121.01024199999999,embedUrl:'https://maps.google.com/maps?q=14.432560999999998,121.01024199999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJMdwOhufRlzMRC1R_qjAj5b4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJMdwOhufRlzMRC1R_qjAj5b4&travelmode=driving',placeId:'ChIJMdwOhufRlzMRC1R_qjAj5b4',orderUrl:null},
  {id:71,name:'SMDC Light Mall',address:'Ground Floor SM Light Mall, Mandaluyong',island:'Luzon',region:'Metro Manila',lat:14.574314600000001,lng:121.04924009999999,embedUrl:'https://maps.google.com/maps?q=14.574314600000001,121.04924009999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ1_qYPUTIlzMR_-1L1xGIPc4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ1_qYPUTIlzMR_-1L1xGIPc4&travelmode=driving',placeId:'ChIJ1_qYPUTIlzMR_-1L1xGIPc4',orderUrl:null},
  {id:72,name:'SMDC Mplace',address:'Ground Floor SMDC Mplace, Panay Avenue, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.639805,lng:121.0330963,embedUrl:'https://maps.google.com/maps?q=14.639805,121.0330963&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJE8TirVS2lzMRd2W_GHeo3uc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJE8TirVS2lzMRd2W_GHeo3uc&travelmode=driving',placeId:'ChIJE8TirVS2lzMRd2W_GHeo3uc',orderUrl:null},
  {id:73,name:'SMDC Sun Mall',address:'CT2 SMDC Sun Mall, España Blvd., Quezon City',island:'Luzon',region:'Metro Manila',lat:14.617764999999999,lng:121.00121399999999,embedUrl:'https://maps.google.com/maps?q=14.617764999999999,121.00121399999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ-2EWnRq2lzMRmNZ2LY7jmi0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ-2EWnRq2lzMRmNZ2LY7jmi0&travelmode=driving',placeId:'ChIJ-2EWnRq2lzMRmNZ2LY7jmi0',orderUrl:null},
  {id:48,name:'Shopwise Makati',address:'GF Shopwise Makati, Chino Roces Ave., Makati',island:'Luzon',region:'Metro Manila',lat:14.567008900000001,lng:121.01350090000001,embedUrl:'https://maps.google.com/maps?q=14.567008900000001,121.01350090000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ6WPsAKHJlzMR0AZEoOXkUG8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ6WPsAKHJlzMR0AZEoOXkUG8&travelmode=driving',placeId:'ChIJ6WPsAKHJlzMR0AZEoOXkUG8',orderUrl:null},
  {id:49,name:'Shopwise Sucat',address:'Ground Floor Shopwise Sucat, Paranaque',island:'Luzon',region:'Metro Manila',lat:14.457528799999999,lng:121.0354373,embedUrl:'https://maps.google.com/maps?q=14.457528799999999,121.0354373&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ-8ynkMrPlzMRUC4-f6HAE6Q',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ-8ynkMrPlzMRUC4-f6HAE6Q&travelmode=driving',placeId:'ChIJ-8ynkMrPlzMRUC4-f6HAE6Q',orderUrl:null},
  {id:74,name:'Starmall Shaw Boulevard',address:'G/F Starmall Edsa Shaw, Mandaluyong City',island:'Luzon',region:'Metro Manila',lat:14.5828291,lng:121.0535414,embedUrl:'https://maps.google.com/maps?q=14.5828291,121.0535414&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJJQtY_z7IlzMRcwAbaQrDyWk',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJJQtY_z7IlzMRcwAbaQrDyWk&travelmode=driving',placeId:'ChIJJQtY_z7IlzMRcwAbaQrDyWk',orderUrl:null},
  {id:75,name:'The Market Place Glorietta',address:'G/F Marketplace Makati, Rustans Mall, Ayala Ave., Makati City',island:'Luzon',region:'Metro Manila',lat:14.5519717,lng:121.0267391,embedUrl:'https://maps.google.com/maps?q=14.5519717,121.0267391&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJWXZaswTJlzMRVSFW1z4_F1U',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJWXZaswTJlzMRVSFW1z4_F1U&travelmode=driving',placeId:'ChIJWXZaswTJlzMRVSFW1z4_F1U',orderUrl:null},
  {id:76,name:'Tutuban Mall',address:'Level 1 Main Station Tutuban Center Mall, Manila',island:'Luzon',region:'Metro Manila',lat:14.606992400000001,lng:120.9732409,embedUrl:'https://maps.google.com/maps?q=14.606992400000001,120.9732409&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJXei3vC7IlzMRryfRMuFDYdE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJXei3vC7IlzMRryfRMuFDYdE&travelmode=driving',placeId:'ChIJXei3vC7IlzMRryfRMuFDYdE',orderUrl:null},
  {id:77,name:'UP Shopping Center',address:'2nd Floor UP Diliman Shopping Center, Diliman, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6596423,lng:121.06993310000001,embedUrl:'https://maps.google.com/maps?q=14.6596423,121.06993310000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJPSwH7FW3lzMRDtohxzK3h3U',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJPSwH7FW3lzMRDtohxzK3h3U&travelmode=driving',placeId:'ChIJPSwH7FW3lzMRDtohxzK3h3U',orderUrl:null},
  {id:78,name:'UPAD Hotel Taft',address:'912 Pablo Ocampo Street, Malate, Manila',island:'Luzon',region:'Metro Manila',lat:14.563133,lng:120.996645,embedUrl:'https://maps.google.com/maps?q=14.563133,120.996645&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJSTBnbwDJlzMRnMtD9IwsxcM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJSTBnbwDJlzMRnMtD9IwsxcM&travelmode=driving',placeId:'ChIJSTBnbwDJlzMRnMtD9IwsxcM',orderUrl:null},
  {id:79,name:'Victory Mall Quiapo Underpass',address:'Victory Lacson Underpass Plaza, Quezon Blvd, Quiapo, Manila',island:'Luzon',region:'Metro Manila',lat:14.598019200000001,lng:120.9841659,embedUrl:'https://maps.google.com/maps?q=14.598019200000001,120.9841659&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJBxUR6RzKlzMRsi35Yk-QiZQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJBxUR6RzKlzMRsi35Yk-QiZQ&travelmode=driving',placeId:'ChIJBxUR6RzKlzMRsi35Yk-QiZQ',orderUrl:null},
  {id:80,name:'Vista Mall Las Pinas',address:'Ground Floor Vista Mall Las Pinas',island:'Luzon',region:'Metro Manila',lat:14.450908999999998,lng:120.97853609999999,embedUrl:'https://maps.google.com/maps?q=14.450908999999998,120.97853609999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJuQtj7fTNlzMRAtyflNRajXM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJuQtj7fTNlzMRAtyflNRajXM&travelmode=driving',placeId:'ChIJuQtj7fTNlzMRAtyflNRajXM',orderUrl:null},
  {id:81,name:'Vista Mall Taguig',address:'Ground Floor Vista Mall Taguig, Tuktukan, Taguig City',island:'Luzon',region:'Metro Manila',lat:14.5301403,lng:121.0746722,embedUrl:'https://maps.google.com/maps?q=14.5301403,121.0746722&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJo8m226PIlzMR-qeufYKuoWM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJo8m226PIlzMR-qeufYKuoWM&travelmode=driving',placeId:'ChIJo8m226PIlzMR-qeufYKuoWM',orderUrl:null},
  {id:83,name:'Waltermart Caloocan',address:'1174 A. Mabini St, Maypajo, Caloocan',island:'Luzon',region:'Metro Manila',lat:14.6416518,lng:120.97585289999999,embedUrl:'https://maps.google.com/maps?q=14.6416518,120.97585289999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJJ4wpNAK1lzMRbkmyzHjRq0Y',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJJ4wpNAK1lzMRbkmyzHjRq0Y&travelmode=driving',placeId:'ChIJJ4wpNAK1lzMRbkmyzHjRq0Y',orderUrl:null},
  {id:84,name:'Waltermart E. Rodriguez',address:'222 E. Rodriguez Ave., Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6213295,lng:121.01934089999999,embedUrl:'https://maps.google.com/maps?q=14.6213295,121.01934089999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJQQGibhe2lzMRu-avD_NhQbM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJQQGibhe2lzMRu-avD_NhQbM&travelmode=driving',placeId:'ChIJQQGibhe2lzMRu-avD_NhQbM',orderUrl:null},
  {id:85,name:'Waltermart Macapagal',address:'GF Waltermart Macapagal, Diosdado Macapagal Ave., Pasay',island:'Luzon',region:'Metro Manila',lat:14.532813299999999,lng:120.98897360000001,embedUrl:'https://maps.google.com/maps?q=14.532813299999999,120.98897360000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ94FVJIfJlzMR1GwAw1mUgw8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ94FVJIfJlzMR1GwAw1mUgw8&travelmode=driving',placeId:'ChIJ94FVJIfJlzMR1GwAw1mUgw8',orderUrl:null},
  {id:86,name:'Waltermart Makati',address:'2F Waltermart Supermarket Chino Roces Avenue, Makati City',island:'Luzon',region:'Metro Manila',lat:14.5511047,lng:121.01336579999999,embedUrl:'https://maps.google.com/maps?q=14.5511047,121.01336579999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJAR-MCBPJlzMRnOx4Tza1GkM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJAR-MCBPJlzMRnOx4Tza1GkM&travelmode=driving',placeId:'ChIJAR-MCBPJlzMRnOx4Tza1GkM',orderUrl:null},
  {id:87,name:'Waltermart North Edsa',address:'1F Waltermart North Edsa, 8001 Edsa, Project 7, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.657079099999997,lng:121.02106660000001,embedUrl:'https://maps.google.com/maps?q=14.657079099999997,121.02106660000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ85FH4e-2lzMRNfOsNML9zEE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ85FH4e-2lzMRNfOsNML9zEE&travelmode=driving',placeId:'ChIJ85FH4e-2lzMRNfOsNML9zEE',orderUrl:null},
  {id:88,name:'Waltermart Sucat',address:'Waltermart Sucat, Dr. A. Santos Ave, Parañaque',island:'Luzon',region:'Metro Manila',lat:14.4714599,lng:121.00748349999999,embedUrl:'https://maps.google.com/maps?q=14.4714599,121.00748349999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJZYfG1GfOlzMRU_XHpGEraQo',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJZYfG1GfOlzMRU_XHpGEraQo&travelmode=driving',placeId:'ChIJZYfG1GfOlzMRU_XHpGEraQo',orderUrl:null},
  {id:89,name:'Wilcon City Center',address:'Ground Level, 121 Visayas Ave, Project 8, Quezon City',island:'Luzon',region:'Metro Manila',lat:14.6666138,lng:121.04261249999999,embedUrl:'https://maps.google.com/maps?q=14.6666138,121.04261249999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJu66FAyO3lzMR62zEgbSdbCU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJu66FAyO3lzMR62zEgbSdbCU&travelmode=driving',placeId:'ChIJu66FAyO3lzMR62zEgbSdbCU',orderUrl:null},
  {id:90,name:'Worldwide Corporate Center',address:'G/F Shaw Center Mall, 360 Shaw Blvd, Mandaluyong City',island:'Luzon',region:'Metro Manila',lat:14.582462899999998,lng:121.05153709999999,embedUrl:'https://maps.google.com/maps?q=14.582462899999998,121.05153709999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJXRA31z7IlzMRQX6VENyFt5k',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJXRA31z7IlzMRQX6VENyFt5k&travelmode=driving',placeId:'ChIJXRA31z7IlzMRQX6VENyFt5k',orderUrl:null},
  {id:91,name:'Youniversity Suites Ubelt',address:'GF La Village, 2118 Recto Ave, Binondo, Manila',island:'Luzon',region:'Metro Manila',lat:14.601365999999999,lng:120.9898273,embedUrl:'https://maps.google.com/maps?q=14.601365999999999,120.9898273&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJVVXJTvjJlzMR7YOjLctoLx8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJVVXJTvjJlzMR7YOjLctoLx8&travelmode=driving',placeId:'ChIJVVXJTvjJlzMR7YOjLctoLx8',orderUrl:null},
  {id:92,name:'Zuellig Building Makati',address:'2F Zuellig Building, Makati Avenue Cor. Paseo De Roxas, Makati City',island:'Luzon',region:'Metro Manila',lat:14.557842699999998,lng:121.0266613,embedUrl:'https://maps.google.com/maps?q=14.557842699999998,121.0266613&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJfUDsogbJlzMRVDxN8Tv41q4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJfUDsogbJlzMRVDxN8Tv41q4&travelmode=driving',placeId:'ChIJfUDsogbJlzMRVDxN8Tv41q4',orderUrl:null},
  {id:214,name:'Ayala Malls Abreeza Davao',address:'L2 Abreeza Mall, J.P. Laurel Ave, Poblacion District, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0911903999999994,lng:125.61129899999999,embedUrl:'https://maps.google.com/maps?q=7.0911903999999994,125.61129899999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJRYYDQKpt-TIRVQK7Z3vbCoc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJRYYDQKpt-TIRVQK7Z3vbCoc&travelmode=driving',placeId:'ChIJRYYDQKpt-TIRVQK7Z3vbCoc',orderUrl:null},
  {id:217,name:'Gaisano Grand City Gate Mall Davao',address:'Buhangin, Davao City, Davao Del Sur',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.109988700000001,lng:125.6127839,embedUrl:'https://maps.google.com/maps?q=7.109988700000001,125.6127839&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJB0PRfqNr-TIRyMFPJCA9B08',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJB0PRfqNr-TIRyMFPJCA9B08&travelmode=driving',placeId:'ChIJB0PRfqNr-TIRyMFPJCA9B08',orderUrl:null},
  {id:220,name:'Gaisano Mall Tagum',address:'Upper GF GMall of Tagum, National Hwy, Tagum, Davao Del Norte',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.449246,lng:125.81156639999999,embedUrl:'https://maps.google.com/maps?q=7.449246,125.81156639999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJdwco1m1T-TIR5eAPSPejkMk',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJdwco1m1T-TIR5eAPSPejkMk&travelmode=driving',placeId:'ChIJdwco1m1T-TIR5eAPSPejkMk',orderUrl:null},
  {id:221,name:'Gaisano Mall Toril',address:'UGF Gaisano Mall of Toril, Lim St, Toril, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0173049999999995,lng:125.49427259999999,embedUrl:'https://maps.google.com/maps?q=7.0173049999999995,125.49427259999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJJxo1KTwM-TIRKVS2T0iWlro',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJJxo1KTwM-TIRKVS2T0iWlro&travelmode=driving',placeId:'ChIJJxo1KTwM-TIRKVS2T0iWlro',orderUrl:null},
  {id:225,name:'NCCC Mall Maa Davao',address:'MacArthur Highway, Corner Don Julian Rodriguez Sr. Ave, Davao City',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0623632999999995,lng:125.59371569999999,embedUrl:'https://maps.google.com/maps?q=7.0623632999999995,125.59371569999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ_1BkiMBt-TIRv3lLEvEGrzM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ_1BkiMBt-TIRv3lLEvEGrzM&travelmode=driving',placeId:'ChIJ_1BkiMBt-TIRv3lLEvEGrzM',orderUrl:null},
  {id:227,name:'Panabo, Davao City',address:'G/F Gaisano Grand Mall Panabo City, Davao Del Norte',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.3064095,lng:125.68626959999999,embedUrl:'https://maps.google.com/maps?q=7.3064095,125.68626959999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJVQr_0YlF-TIRdGbLGu06MeY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJVQr_0YlF-TIRdGbLGu06MeY&travelmode=driving',placeId:'ChIJVQr_0YlF-TIRdGbLGu06MeY',orderUrl:null},
  {id:233,name:'SM City Davao',address:'2nd Level Main Building SM City Davao',island:'Mindanao',region:'Mindanao — Davao Region',lat:7.0506082999999995,lng:125.58825230000001,embedUrl:'https://maps.google.com/maps?q=7.0506082999999995,125.58825230000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJIXMxOoZz-TIRzSaCsk22DVo',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJIXMxOoZz-TIRzSaCsk22DVo&travelmode=driving',placeId:'ChIJIXMxOoZz-TIRzSaCsk22DVo',orderUrl:null},
  {id:215,name:'Ayala Malls Centrio CDO',address:'GF CV Roa Wing, Centrio Mall, C.M. Recto Cor. Corrales Ave, Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4852594,lng:124.65139459999999,embedUrl:'https://maps.google.com/maps?q=8.4852594,124.65139459999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJJ-F_4dzy_zIRP8Q_gyWz37c',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJJ-F_4dzy_zIRP8Q_gyWz37c&travelmode=driving',placeId:'ChIJJ-F_4dzy_zIRP8Q_gyWz37c',orderUrl:null},
  {id:218,name:'Gaisano Mall Butuan',address:'Gaisano Mall Butuan, Butuan City',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.9442082,lng:125.53208329999998,embedUrl:'https://maps.google.com/maps?q=8.9442082,125.53208329999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJiUEtOVDAATMRuhuzZDB6fxw',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJiUEtOVDAATMRuhuzZDB6fxw&travelmode=driving',placeId:'ChIJiUEtOVDAATMRuhuzZDB6fxw',orderUrl:null},
  {id:219,name:'Gaisano Mall Cagayan de Oro',address:'Ground Floor Gaisano Mall, Corrales, CM Recto, Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4863593,lng:124.64987909999998,embedUrl:'https://maps.google.com/maps?q=8.4863593,124.64987909999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJHaMyCd3y_zIRuyMC_3lnmFQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJHaMyCd3y_zIRuyMC_3lnmFQ&travelmode=driving',placeId:'ChIJHaMyCd3y_zIRuyMC_3lnmFQ',orderUrl:null},
  {id:228,name:'Robinsons Iligan',address:'Robinsons Place, Iligan City, Lanao Del Norte',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.2182056,lng:124.24033159999998,embedUrl:'https://maps.google.com/maps?q=8.2182056,124.24033159999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJWzgbqP11VTIRO7jhQ_COAas',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJWzgbqP11VTIRO7jhQ_COAas&travelmode=driving',placeId:'ChIJWzgbqP11VTIRO7jhQ_COAas',orderUrl:null},
  {id:230,name:'SM City Butuan',address:'2nd Floor SM City Butuan, Butuan City',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.9454067,lng:125.53348159999999,embedUrl:'https://maps.google.com/maps?q=8.9454067,125.53348159999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJb5ZDPtnBATMREFrLmbvvOiI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJb5ZDPtnBATMREFrLmbvvOiI&travelmode=driving',placeId:'ChIJb5ZDPtnBATMREFrLmbvvOiI',orderUrl:null},
  {id:231,name:'SM City CDO',address:'Ground Floor SM City Cagayan De Oro',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4558491,lng:124.6234008,embedUrl:'https://maps.google.com/maps?q=8.4558491,124.6234008&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJj20nNzuN_zIR1mpv_ar54zU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJj20nNzuN_zIR1mpv_ar54zU&travelmode=driving',placeId:'ChIJj20nNzuN_zIR1mpv_ar54zU',orderUrl:null},
  {id:232,name:'SM City CDO Downtown',address:'Claro M. Recto Ave, Cagayan De Oro City, Misamis Oriental',island:'Mindanao',region:'Mindanao — Northern Mindanao / Caraga',lat:8.4843206,lng:124.6549106,embedUrl:'https://maps.google.com/maps?q=8.4843206,124.6549106&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJsSwPbDfz_zIR3XLnrsKaCpQ',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJsSwPbDfz_zIR3XLnrsKaCpQ&travelmode=driving',placeId:'ChIJsSwPbDfz_zIR3XLnrsKaCpQ',orderUrl:null},
  {id:216,name:'City Mall Cotabato',address:'Citymall Cotabato, Gov. Gutierrez Ave, Cotabato City, Maguindanao',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.2007008,lng:124.2408225,embedUrl:'https://maps.google.com/maps?q=7.2007008,124.2408225&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ4QUKx4k5VjIRg9VHoJip8N8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ4QUKx4k5VjIRg9VHoJip8N8&travelmode=driving',placeId:'ChIJ4QUKx4k5VjIRg9VHoJip8N8',orderUrl:null},
  {id:222,name:'KCC Mall Cotabato',address:'Quezon Avenue, Cotabato City, Maguindanao',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.2202188,lng:124.248195,embedUrl:'https://maps.google.com/maps?q=7.2202188,124.248195&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJn-C-dAA7VjIRujNuj45S8wk',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJn-C-dAA7VjIRujNuj45S8wk&travelmode=driving',placeId:'ChIJn-C-dAA7VjIRujNuj45S8wk',orderUrl:null},
  {id:224,name:'Kidapawan City',address:'Roxas St, Poblacion, Kidapawan, Cotabato',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:7.0094276,lng:125.0874664,embedUrl:'https://maps.google.com/maps?q=7.0094276,125.0874664&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJEWYrqA75-DIR06t5VE2j1l4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJEWYrqA75-DIR06t5VE2j1l4&travelmode=driving',placeId:'ChIJEWYrqA75-DIR06t5VE2j1l4',orderUrl:null},
  {id:234,name:'SM City General Santos',address:'Cor. Santiago Blvd, San Miguel St, General Santos City, South Cotabato',island:'Mindanao',region:'Mindanao — SOCCSKSARGEN',lat:6.1154774,lng:125.1810148,embedUrl:'https://maps.google.com/maps?q=6.1154774,125.1810148&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJqXhLT6Wf9zIRdYYhucNjXF0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJqXhLT6Wf9zIRdYYhucNjXF0&travelmode=driving',placeId:'ChIJqXhLT6Wf9zIRdYYhucNjXF0',orderUrl:null},
  {id:223,name:'KCC Mall de Zamboanga',address:'Basement KCC Mall, Gov. Camins Rd, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9200552,lng:122.07343859999999,embedUrl:'https://maps.google.com/maps?q=6.9200552,122.07343859999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ_ZJcJPJBUDIRQArAMwveQIM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ_ZJcJPJBUDIRQArAMwveQIM&travelmode=driving',placeId:'ChIJ_ZJcJPJBUDIRQArAMwveQIM',orderUrl:null},
  {id:226,name:'Pagadian City',address:'61 Sabellano St, Pagadian City, Zamboanga del Sur',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:7.824597,lng:123.44359649999998,embedUrl:'https://maps.google.com/maps?q=7.824597,123.44359649999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJF4seoqYiVDIR9G5FQU82Dh4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJF4seoqYiVDIR9G5FQU82Dh4&travelmode=driving',placeId:'ChIJF4seoqYiVDIR9G5FQU82Dh4',orderUrl:null},
  {id:229,name:'Robinsons Pagadian City',address:'F.S. Pajares Ave Cor P.L. Urro St, Pagadian City, Zamboanga Del Sur',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:7.8272998000000005,lng:123.4378573,embedUrl:'https://maps.google.com/maps?q=7.8272998000000005,123.4378573&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJK-yEYAAZVDIRgO8JHFpw80o',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJK-yEYAAZVDIRgO8JHFpw80o&travelmode=driving',placeId:'ChIJK-yEYAAZVDIRgO8JHFpw80o',orderUrl:null},
  {id:235,name:'SM City Mindpro',address:'Ground Floor SM City Mindpro, La Purisima St, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9079042,lng:122.0761916,embedUrl:'https://maps.google.com/maps?q=6.9079042,122.0761916&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ687qTvxBUDIRuX6XXqe2cDA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ687qTvxBUDIRuX6XXqe2cDA&travelmode=driving',placeId:'ChIJ687qTvxBUDIRuX6XXqe2cDA',orderUrl:null},
  {id:236,name:'SM City Zamboanga',address:'Lower Ground SM City Zamboanga, Mayor Vitaliano Agan Avenue, Zamboanga City',island:'Mindanao',region:'Mindanao — Zamboanga Peninsula',lat:6.9183129,lng:122.0759495,embedUrl:'https://maps.google.com/maps?q=6.9183129,122.0759495&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJwRN1GQBBUDIRUJMPXvB7ihM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJwRN1GQBBUDIRUJMPXvB7ihM&travelmode=driving',placeId:'ChIJwRN1GQBBUDIRUJMPXvB7ihM',orderUrl:null},
  {id:191,name:'Ayala Malls Center Cebu',address:'2L Ayala Center Cebu, Cebu Business Park, Archbishop Reyes Ave, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3185144,lng:123.90409389999998,embedUrl:'https://maps.google.com/maps?q=10.3185144,123.90409389999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ4zUe6T6ZqTMRBfKPpU9VNLc',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ4zUe6T6ZqTMRBfKPpU9VNLc&travelmode=driving',placeId:'ChIJ4zUe6T6ZqTMRBfKPpU9VNLc',orderUrl:null},
  {id:192,name:'Ayala Malls Central Bloc IT Park',address:'Ayala Malls Central Block, Padriga St, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3306811,lng:123.9073198,embedUrl:'https://maps.google.com/maps?q=10.3306811,123.9073198&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ1eEahvuZqTMRV7eLdWBr00s',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ1eEahvuZqTMRV7eLdWBr00s&travelmode=driving',placeId:'ChIJ1eEahvuZqTMRV7eLdWBr00s',orderUrl:null},
  {id:195,name:'Gaisano Mall Banilad Cebu',address:'Gaisano Country Mall, Banilad, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3394189,lng:123.910812,embedUrl:'https://maps.google.com/maps?q=10.3394189,123.910812&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJVVVVKOeYqTMRvdB49Te35vM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJVVVVKOeYqTMRvdB49Te35vM&travelmode=driving',placeId:'ChIJVVVVKOeYqTMRvdB49Te35vM',orderUrl:null},
  {id:198,name:'Panglao, Bohol',address:'Front of Panglao Regents Park Resort, Ester Lim Drive St. Tawala, Panglao, Bohol',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:9.5524019,lng:123.77383699999999,embedUrl:'https://maps.google.com/maps?q=9.5524019,123.77383699999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJO2F9npisqzMR-eVTcULKDLs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJO2F9npisqzMR-eVTcULKDLs&travelmode=driving',placeId:'ChIJO2F9npisqzMR-eVTcULKDLs',orderUrl:null},
  {id:206,name:'SM City Cebu',address:'Lower Ground Floor SM City Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3120113,lng:123.91818560000002,embedUrl:'https://maps.google.com/maps?q=10.3120113,123.91818560000002&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJUdBPd22ZqTMRsZHjIBnbPVg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJUdBPd22ZqTMRsZHjIBnbPVg&travelmode=driving',placeId:'ChIJUdBPd22ZqTMRsZHjIBnbPVg',orderUrl:null},
  {id:207,name:'SM City Consolacion',address:'2nd Floor SM Consolacion, Lamac, Consolacion, Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3798371,lng:123.96405700000001,embedUrl:'https://maps.google.com/maps?q=10.3798371,123.96405700000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJIyrzr7CiqTMRGBfZFBAgTjg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJIyrzr7CiqTMRGBfZFBAgTjg&travelmode=driving',placeId:'ChIJIyrzr7CiqTMRGBfZFBAgTjg',orderUrl:null},
  {id:212,name:'SM Seaside City Cebu',address:'2nd Floor Cube Wing SM Seaside City Cebu, SRP, Cebu City',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.2818796,lng:123.8827949,embedUrl:'https://maps.google.com/maps?q=10.2818796,123.8827949&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJefV0AQucqTMRk_gksDI9lnU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJefV0AQucqTMRk_gksDI9lnU&travelmode=driving',placeId:'ChIJefV0AQucqTMRk_gksDI9lnU',orderUrl:null},
  {id:213,name:'The Outlet Lapu Lapu City',address:'The Outlets At Pueblo Verde, Mactan, Lapu-Lapu City, Cebu',island:'Visayas',region:'Visayas — Cebu / Bohol',lat:10.3016791,lng:123.96289619999999,embedUrl:'https://maps.google.com/maps?q=10.3016791,123.96289619999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJj9AcD--ZqTMRW-O3BUltvK0',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJj9AcD--ZqTMRW-O3BUltvK0&travelmode=driving',placeId:'ChIJj9AcD--ZqTMRW-O3BUltvK0',orderUrl:null},
  {id:202,name:'Robinsons North Tacloban',address:'Ground Floor Robinsons North Tacloban, Tacloban City, Leyte',island:'Visayas',region:'Visayas — Eastern Visayas',lat:11.239879799999999,lng:124.9877382,embedUrl:'https://maps.google.com/maps?q=11.239879799999999,124.9877382&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJO-KZH9N2CDMRlcB0SLnEpHg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJO-KZH9N2CDMRlcB0SLnEpHg&travelmode=driving',placeId:'ChIJO-KZH9N2CDMRlcB0SLnEpHg',orderUrl:null},
  {id:209,name:'SM City Ormoc',address:'Ground Floor SM Center Ormoc, Ormoc City, Leyte',island:'Visayas',region:'Visayas — Eastern Visayas',lat:11.010285399999999,lng:124.6078209,embedUrl:'https://maps.google.com/maps?q=11.010285399999999,124.6078209&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJM0oJYPHxBzMRseoqurW8_9A',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJM0oJYPHxBzMRseoqurW8_9A&travelmode=driving',placeId:'ChIJM0oJYPHxBzMRseoqurW8_9A',orderUrl:null},
  {id:189,name:'Avocadoria Boracay Extension',address:'Station 2 Front Beach, Boracay, Malay, Aklan',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.959216699999999,lng:121.92592769999999,embedUrl:'https://maps.google.com/maps?q=11.959216699999999,121.92592769999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJd7E_e_E9pTMR3Xbi7pPny0M',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJd7E_e_E9pTMR3Xbi7pPny0M&travelmode=driving',placeId:'ChIJd7E_e_E9pTMR3Xbi7pPny0M',orderUrl:null},
  {id:190,name:'Ayala Malls Bacolod',address:'Ayala Malls Bacolod, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6767825,lng:122.95025079999999,embedUrl:'https://maps.google.com/maps?q=10.6767825,122.95025079999999&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJI62tVoLRrjMRa74B9KHtfU8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJI62tVoLRrjMRa74B9KHtfU8&travelmode=driving',placeId:'ChIJI62tVoLRrjMRa74B9KHtfU8',orderUrl:null},
  {id:193,name:'Boracay DMall',address:'DMall De Boracay, Malay, Aklan',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.9624662,lng:121.9253359,embedUrl:'https://maps.google.com/maps?q=11.9624662,121.9253359&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJnz4bkiI8pTMRx54EI36lYJg',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJnz4bkiI8pTMRx54EI36lYJg&travelmode=driving',placeId:'ChIJnz4bkiI8pTMRx54EI36lYJg',orderUrl:null},
  {id:194,name:'Festive Walk Iloilo',address:'Festive Walk, Mandurriao, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7133824,lng:122.5460385,embedUrl:'https://maps.google.com/maps?q=10.7133824,122.5460385&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJi0AdBTDlrjMRB1_7sNZtvLA',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJi0AdBTDlrjMRB1_7sNZtvLA&travelmode=driving',placeId:'ChIJi0AdBTDlrjMRB1_7sNZtvLA',orderUrl:null},
  {id:196,name:'GT Mall Molo',address:'Ground Floor GT Mall Molo, Poblacion, Molo, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6962005,lng:122.5455934,embedUrl:'https://maps.google.com/maps?q=10.6962005,122.5455934&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJtcYPA1HlrjMR9TfOy8gE_L4',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJtcYPA1HlrjMR9TfOy8gE_L4&travelmode=driving',placeId:'ChIJtcYPA1HlrjMR9TfOy8gE_L4',orderUrl:null},
  {id:197,name:'GT Mall Pavia',address:'Ground Floor GT Mall Pavia, Ungka 2, Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7537126,lng:122.5380127,embedUrl:'https://maps.google.com/maps?q=10.7537126,122.5380127&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJFyw7pbTkrjMRqh_jy90WhWk',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJFyw7pbTkrjMRqh_jy90WhWk&travelmode=driving',placeId:'ChIJFyw7pbTkrjMRqh_jy90WhWk',orderUrl:null},
  {id:199,name:'Robinsons Bacolod',address:'Lacson St, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6914441,lng:122.95847630000002,embedUrl:'https://maps.google.com/maps?q=10.6914441,122.95847630000002&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJXWNHthHRrjMRwgqwC6ysWS8',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJXWNHthHRrjMRwgqwC6ysWS8&travelmode=driving',placeId:'ChIJXWNHthHRrjMRwgqwC6ysWS8',orderUrl:null},
  {id:200,name:'Robinsons Iloilo',address:'UGF Robinsons Iloilo, De Leon St cor. Quezon St, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.6941504,lng:122.5662128,embedUrl:'https://maps.google.com/maps?q=10.6941504,122.5662128&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJvb-3KWTlrjMRuIL9uw-gaZM',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJvb-3KWTlrjMRuIL9uw-gaZM&travelmode=driving',placeId:'ChIJvb-3KWTlrjMRuIL9uw-gaZM',orderUrl:null},
  {id:201,name:'Robinsons Jaro',address:'Level 1 Robinsons Place Jaro, E. Lopez Jaena San Vicente, Jaro, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.719499100000002,lng:122.56024610000001,embedUrl:'https://maps.google.com/maps?q=10.719499100000002,122.56024610000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJJ5qhPyLlrjMRKlSGy5BuQ7o',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJJ5qhPyLlrjMRKlSGy5BuQ7o&travelmode=driving',placeId:'ChIJJ5qhPyLlrjMRKlSGy5BuQ7o',orderUrl:null},
  {id:203,name:'Robinsons Pavia',address:'Level 2 Robinsons Pavia, Ungka II, Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7538453,lng:122.5397223,embedUrl:'https://maps.google.com/maps?q=10.7538453,122.5397223&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJjVOh74blrjMRH3MWCjC6xbs',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJjVOh74blrjMRH3MWCjC6xbs&travelmode=driving',placeId:'ChIJjVOh74blrjMRH3MWCjC6xbs',orderUrl:null},
  {id:204,name:'SM City Bacolod',address:'G/F SM City Bacolod, Rizal St, Reclamation Area, Bacolod City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.670786999999999,lng:122.9426715,embedUrl:'https://maps.google.com/maps?q=10.670786999999999,122.9426715&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJkSEm49XRrjMR3XpCr_Z4euI',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJkSEm49XRrjMR3XpCr_Z4euI&travelmode=driving',placeId:'ChIJkSEm49XRrjMR3XpCr_Z4euI',orderUrl:null},
  {id:205,name:'SM City Bacolod North Bloc',address:'G/F SM City Bacolod North Block, Bacolod City, Negros Occidental',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.673554600000001,lng:122.94493630000001,embedUrl:'https://maps.google.com/maps?q=10.673554600000001,122.94493630000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJkbAHGgDRrjMRI0k639SL1QY',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJkbAHGgDRrjMRI0k639SL1QY&travelmode=driving',placeId:'ChIJkbAHGgDRrjMRI0k639SL1QY',orderUrl:null},
  {id:208,name:'SM City Iloilo',address:'Upper Ground Floor SM City Iloilo, Senator Benigno S. Aquino Jr. Ave, Mandurriao, Iloilo City',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.7143716,lng:122.5510023,embedUrl:'https://maps.google.com/maps?q=10.7143716,122.5510023&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJTyIENDrlrjMRrYuTwx6PpXE',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJTyIENDrlrjMRrYuTwx6PpXE&travelmode=driving',placeId:'ChIJTyIENDrlrjMRrYuTwx6PpXE',orderUrl:null},
  {id:210,name:'SM City Roxas',address:'Ground Floor SM City Roxas, Arnaldo Boulevard, Roxas City, Capiz',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:11.595787699999999,lng:122.74870310000001,embedUrl:'https://maps.google.com/maps?q=11.595787699999999,122.74870310000001&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJCUag7JPypTMRePmD2_t9yhU',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJCUag7JPypTMRePmD2_t9yhU&travelmode=driving',placeId:'ChIJCUag7JPypTMRePmD2_t9yhU',orderUrl:null},
  {id:211,name:'SM Hypermarket Pavia',address:'SM Hypermarket Pavia, Iloilo',island:'Visayas',region:'Visayas — Iloilo / Negros / W. Visayas',lat:10.752912199999999,lng:122.52206269999998,embedUrl:'https://maps.google.com/maps?q=10.752912199999999,122.52206269999998&output=embed',mapsUrl:'https://www.google.com/maps/place/?q=place_id:ChIJ68zecAD7rjMRi9cEtVQKnVw',directionsUrl:'https://www.google.com/maps/dir/?api=1&destination_place_id=ChIJ68zecAD7rjMRi9cEtVQKnVw&travelmode=driving',placeId:'ChIJ68zecAD7rjMRi9cEtVQKnVw',orderUrl:null},
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
        const dLabel = d !== null ? (d < 1 ? Math.round(d * 1000) + ' m' : d.toFixed(1) + ' km') : null
        const mins = d !== null ? Math.max(1, Math.round((d / 25) * 60)) : null
        const timeLabel = mins !== null ? (mins < 60 ? `~${mins} min drive` : `~${Math.round(mins/60)}h ${mins%60}m`) : null
        const distHtml = dLabel ? `<div style="display:inline-flex;align-items:center;gap:6px;background:rgba(182,197,72,.12);border:1.5px solid rgba(182,197,72,.35);border-radius:999px;padding:5px 12px;margin:0 0 10px;user-select:none"><span style="font-size:12px;font-weight:800;color:#3a6b35">📍 ${dLabel} away</span><span style="font-size:10px;color:#8A5F3C;font-weight:600">· ${timeLabel}</span></div>` : ''
        const dirUrl = b.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination_place_id=${b.placeId}&travelmode=driving`

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
                          const dirUrl = activeBranch.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination_place_id=${activeBranch.placeId}&travelmode=driving`
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
