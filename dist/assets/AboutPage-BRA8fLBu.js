import{j as e}from"./index-CW9Oztzp.js";import{u as y,c as n}from"./vendor-Bsz0z0Mx.js";import{S as v}from"./SEO-DLIFSPVU.js";const d={tagline:'"Happiness in Avocado"',headline:"The Story of Avocadoria",sub:"From a single kitchen to the Philippines' No. 1 avocado dessert brand — this is how it all began.",stats:[{num:"2019",label:"Year Founded",icon:"🌱"},{num:"7+",label:"Years of Happiness",icon:"🥑"},{num:"50+",label:"Branches Nationwide",icon:"📍"},{num:"100K+",label:"Happy Cups Served",icon:"☕"}]},w=[{id:"beginning",badge:"How It All Began",title:"A Simple Love for Avocado",body:"Founded in 2019, Avocadoria was built on a simple belief — desserts can be both indulgent and nourishing. Led by Chef Czarina Sevilla, the brand pioneered an avocado-based dessert concept designed for modern, health-conscious consumers worldwide.",icon:"🌱",color:"var(--c-olive)"},{id:"mission",badge:"Our Mission",title:"Happiness in Every Cup",body:"We are on a mission to bring happiness through avocado — one cup at a time. Every product we serve is crafted with real avocado, no artificial flavors, and a whole lot of love. We believe indulgence and health can coexist, and that every Filipino deserves a treat that is both delicious and nourishing.",icon:"💚",color:"var(--c-dark)"},{id:"vision",badge:"Our Vision",title:"The No. 1 Avocado Brand in Asia",body:"We dream big — to become the most recognized avocado dessert brand not just in the Philippines, but across Asia. We are building a brand rooted in authenticity, community, and the joy of sharing something truly delicious with the people you love.",icon:"🌏",color:"var(--c-pink)"},{id:"farmers",badge:"Locally Sourced",title:"Supporting Filipino Farmers",body:"We proudly partner with local avocado farmers across the Philippines. Every cup you enjoy directly supports Filipino farming communities and helps grow a sustainable, local supply chain. From Benguet to Davao, real farmers grow the real avocados behind every Avocadoria product.",icon:"🤝",color:"#DFD438"}],j=[{id:"award-001",icon:"🏆",featured:!0,title:"Best Dessert Brand — Food & Beverage PH Awards 2024",issuer:"Food & Beverage Philippines",date:"2024-11-15",category:"Award",excerpt:"Recognized as the Best Dessert Brand at the 2024 F&B PH Awards."},{id:"award-002",icon:"📰",featured:!1,title:"Top 10 Filipino Food Brands to Watch — 2024",issuer:"BusinessWorld Philippines",date:"2024-08-01",category:"Feature",excerpt:"Named one of the Top 10 Filipino Food Brands to Watch in 2024."},{id:"award-003",icon:"⭐",featured:!1,title:"Franchise Excellence Award — Franchise Asia Philippines 2023",issuer:"Franchise Asia Philippines",date:"2023-09-10",category:"Award",excerpt:"Honored for outstanding franchise growth and support systems."}],S=[{id:"news-001",featured:!0,title:"Avocadoria Opens in SM Mall of Asia!",date:"2025-05-20",category:"Store Opening",excerpt:"We are thrilled to announce our newest branch at SM Mall of Asia — bringing happiness to the Bay Area!",image:null},{id:"news-002",featured:!1,title:"New Product Alert: Biscoff Lover is here!",date:"2025-04-10",category:"New Product",excerpt:"Meet our newest creation — layers of creamy avocado, Biscoff drizzle, and our signature crumble base.",image:null},{id:"news-003",featured:!1,title:"Avocadoria Hits 50 Branches!",date:"2025-02-01",category:"Milestone",excerpt:"We just opened our 50th branch! Thank you to every customer, franchisee, and avocado farmer who made this possible.",image:null}],N=[{id:"cares-001",icon:"🌱",featured:!0,title:"Rooted in Growth — Planting 1,000 Avocado Trees",date:"2025-03-15",category:"Environment",excerpt:"Avocadoria partnered with local farmers to plant 1,000 avocado trees across Benguet — investing in the future of Filipino agriculture and the planet.",image:"/avo-cares-planting.webp"},{id:"cares-002",icon:"🌿",featured:!1,title:"Every Cup Grows a Tree",date:"2025-03-15",category:"Environment",excerpt:'"Rooted in Growth" — our commitment to sustainability. Every tree planted is a promise to our farmers, our community, and the next generation of avocado lovers.',image:"/avo-cares-rooted.webp"}],g=["-3px -3px 0 #fff"," 3px -3px 0 #fff","-3px  3px 0 #fff"," 3px  3px 0 #fff","-3px  0   0 #fff"," 3px  0   0 #fff"," 0   -3px 0 #fff"," 0    3px 0 #fff","-2px -2px 0 #fff"," 2px -2px 0 #fff","-2px  2px 0 #fff"," 2px  2px 0 #fff"].join(", ");function f(o){return new Date(o).toLocaleDateString("en-PH",{year:"numeric",month:"long",day:"numeric"})}function l({fromColor:o,toColor:r,height:i=56,flip:s=!1}){const a=s?`M0,${i} C360,0 1080,${i} 1440,${Math.round(i*.4)} L1440,0 L0,0 Z`:`M0,0 C360,${i} 1080,0 1440,${Math.round(i*.6)} L1440,${i} L0,${i} Z`;return e.jsx("div",{style:{background:o,lineHeight:0},children:e.jsx("svg",{viewBox:`0 0 1440 ${i}`,xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",style:{display:"block",width:"100%",height:`${i}px`},children:e.jsx("path",{d:a,fill:r})})})}function F(o,r=1800,i=!0){const[s,a]=n.useState(0);return n.useEffect(()=>{if(!i)return;const t=parseInt(o.replace(/\D/g,""))||0;if(!t){a(o);return}const p=o.replace(/[\d]/g,"");let c=null;const u=m=>{c||(c=m);const h=Math.min((m-c)/r,1),b=1-Math.pow(1-h,3);a(Math.floor(b*t)+p),h<1?requestAnimationFrame(u):a(o)};requestAnimationFrame(u)},[i,o]),s}function k({stat:o,trigger:r}){const i=F(o.num,1600,r);return e.jsxs("div",{className:"about-stat-card",children:[e.jsx("div",{style:{fontSize:"32px",marginBottom:"8px"},children:o.icon}),e.jsx("div",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(2rem, 4vw, 3rem)",color:"var(--c-olive)",lineHeight:1,textShadow:g},children:i||o.num}),e.jsx("div",{style:{fontFamily:"Nunito, sans-serif",fontSize:"12px",color:"rgba(255,255,255,0.8)",marginTop:"6px",letterSpacing:"0.04em",textTransform:"uppercase"},children:o.label})]})}function x({text:o,color:r="var(--c-pink)"}){return e.jsx("span",{style:{display:"inline-block",marginBottom:"12px",background:r,color:"#fff",fontFamily:"Nunito, sans-serif",fontSize:"11px",fontWeight:"800",letterSpacing:"0.08em",textTransform:"uppercase",padding:"5px 18px",borderRadius:"999px"},children:o})}function z({post:o}){const[r,i]=n.useState(!1);return e.jsxs("div",{onMouseEnter:()=>i(!0),onMouseLeave:()=>i(!1),style:{background:"rgba(255,255,255,0.92)",border:`1.5px solid ${r?"var(--c-olive)":"rgba(182,197,72,0.2)"}`,borderRadius:"20px",overflow:"hidden",transition:"all 0.25s ease",boxShadow:r?"0 12px 32px rgba(58,107,53,0.14)":"0 2px 12px rgba(58,107,53,0.06)",transform:r?"translateY(-4px)":"none",display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{width:"100%",height:"160px",overflow:"hidden",background:"linear-gradient(135deg, rgba(182,197,72,0.15), rgba(58,107,53,0.08))",display:"flex",alignItems:"center",justifyContent:"center"},children:o.image?e.jsx("img",{src:o.image,alt:o.title,style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("span",{style:{fontSize:"48px"},children:"🥑"})}),e.jsxs("div",{style:{padding:"20px",flex:1,display:"flex",flexDirection:"column",gap:"8px"},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center",flexWrap:"wrap"},children:[e.jsx("span",{style:{background:o.featured?"var(--c-olive)":"rgba(182,197,72,0.15)",color:o.featured?"#fff":"var(--c-dark)",fontFamily:"Nunito, sans-serif",fontSize:"10px",fontWeight:"800",letterSpacing:"0.06em",textTransform:"uppercase",padding:"3px 10px",borderRadius:"999px"},children:o.featured?"Featured":o.category}),e.jsx("span",{style:{fontFamily:"Nunito, sans-serif",fontSize:"11px",color:"rgba(138,95,60,0.5)"},children:f(o.date)})]}),e.jsx("h3",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(14px, 1.5vw, 17px)",fontWeight:"normal",color:"var(--c-dark)",margin:0,lineHeight:1.3},children:o.title}),e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"13px",color:"rgba(138,95,60,0.8)",lineHeight:1.65,margin:0,flex:1},children:o.excerpt})]})]})}function W(){const o=y(),r=n.useRef(null),[i,s]=n.useState(!1);return n.useEffect(()=>{const a=r.current;if(!a)return;const t=new IntersectionObserver(([p])=>{p.isIntersecting&&s(!0)},{threshold:.3});return t.observe(a),()=>t.disconnect()},[]),n.useEffect(()=>{if(o.hash){const a=o.hash.replace("#","");setTimeout(()=>{const t=document.getElementById(a);t&&t.scrollIntoView({behavior:"smooth",block:"start"})},100)}},[o.hash]),e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"Our Story",description:"From a bazaar stall to the Philippines' No. 1 avocado dessert brand. Discover the story, mission, and vision of Avocadoria.",path:"/about"}),e.jsx("style",{children:`
        @font-face {
          font-family: 'BubbleboddyNeue';
          src: url('/fonts/bubbleboddyneueinline-extrabold.ttf') format('truetype');
          font-weight: normal; font-style: normal; font-display: swap;
        }

        @keyframes about-fade-up {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes about-fade-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        .about-hero-text  { opacity: 0; animation: about-fade-up 0.8s ease 0.1s forwards; }
        .about-hero-sub   { opacity: 0; animation: about-fade-up 0.8s ease 0.3s forwards; }
        .about-hero-stats { opacity: 0; animation: about-fade-up 0.8s ease 0.5s forwards; }

        .about-stat-card {
          text-align: center;
          padding: 24px 16px;
          background: rgba(255,255,255,0.55);
          border: 1.5px solid rgba(58,107,53,0.18);
          border-radius: 20px;
          backdrop-filter: blur(8px);
          flex: 1;
          min-width: 130px;
          transition: transform 0.25s ease, background 0.25s ease;
        }
        .about-stat-card:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.7);
        }

        .about-story-card {
          opacity: 0;
          animation: about-fade-up 0.65s ease forwards;
          background: rgba(255,255,255,0.88);
          border-radius: 24px;
          overflow: hidden;
          border: 1.5px solid rgba(182,197,72,0.2);
          box-shadow: 0 4px 20px rgba(58,107,53,0.07);
          transition: box-shadow 0.25s ease, transform 0.25s ease;
        }
        .about-story-card:hover {
          box-shadow: 0 12px 40px rgba(58,107,53,0.14);
          transform: translateY(-4px);
        }

        .about-recognition-row {
          background: rgba(255,255,255,0.88);
          border: 1.5px solid rgba(182,197,72,0.18);
          border-radius: 18px;
          padding: 20px 24px;
          display: flex; gap: 18px; align-items: flex-start;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .about-recognition-row:hover {
          box-shadow: 0 8px 28px rgba(58,107,53,0.10);
          border-color: rgba(182,197,72,0.45);
        }

        .about-news-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }

        .about-cares-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 20px;
        }

        .about-section {
          scroll-margin-top: 90px;
        }

        /* ── Founder layout — photo left, text right ── */
        .about-founder-layout {
          display: grid;
          grid-template-columns: minmax(280px, 420px) 1fr;
          gap: clamp(40px, 6vw, 80px);
          align-items: center;
        }

        .about-founder-photo-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .about-founder-photo-wrap {
          position: relative;
          width: 100%;
          max-width: 420px;
        }

        .about-founder-ring {
          position: absolute;
          inset: -8px;
          border-radius: 32px;
          border: 3px solid var(--c-olive);
          opacity: 0.3;
          pointer-events: none;
        }

        .about-founder-img-frame {
          width: 100%;
          border-radius: 28px;
          overflow: hidden;
          border: 5px solid #fff;
          box-shadow: 0 16px 48px rgba(58,107,53,0.22);
          aspect-ratio: 3/4;
        }

        .about-founder-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center 15%;
          display: block;
          transition: transform 0.5s ease;
        }
        .about-founder-img-frame:hover .about-founder-photo {
          transform: scale(1.03);
        }

        .about-founder-badge {
          position: absolute;
          bottom: 16px;
          right: -12px;
          background: var(--c-olive);
          border: 3px solid #fff;
          border-radius: 999px;
          padding: 8px 18px;
          box-shadow: 0 4px 16px rgba(58,107,53,0.3);
        }

        .about-founder-text-col {
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-bottom: 8px;
        }

        .about-founder-para {
          font-family: 'Nunito', sans-serif;
          font-size: clamp(15px, 1.6vw, 19px);
          color: var(--c-dark);
          line-height: 1.75;
          margin: 0 0 clamp(16px, 2.5vw, 24px);
          opacity: 0.88;
        }

        @media (max-width: 768px) {
          .about-founder-layout {
            grid-template-columns: 1fr;
            align-items: center;
          }
          .about-founder-photo-col {
            order: 2;
            margin-top: 24px;
          }
          .about-founder-photo-wrap {
            max-width: 280px;
          }
          .about-founder-text-col {
            order: 1;
          }
        }

        @media (max-width: 640px) {
          .about-news-grid  { grid-template-columns: 1fr; }
          .about-cares-grid { grid-template-columns: 1fr; }
          .about-stat-card  { min-width: 110px; }
        }
      `}),e.jsxs("div",{style:{position:"relative",overflow:"hidden",minHeight:"clamp(560px, 80vh, 800px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"clamp(100px, 14vw, 140px) 32px clamp(60px, 8vw, 100px)",textAlign:"center"},children:[e.jsx("img",{src:"/franchisebg.svg","aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:"center",zIndex:0}}),e.jsx("div",{style:{position:"absolute",inset:0,zIndex:1,background:"rgba(217,226,158,0.45)"}}),e.jsxs("div",{style:{position:"relative",zIndex:2,maxWidth:"720px",margin:"0 auto"},children:[e.jsxs("div",{className:"about-hero-text",children:[e.jsx("span",{style:{display:"inline-block",marginBottom:"20px",background:"var(--c-pink)",color:"#fff",fontFamily:"Nunito, sans-serif",fontSize:"11px",fontWeight:"800",letterSpacing:"0.08em",textTransform:"uppercase",padding:"5px 20px",borderRadius:"999px"},children:"Est. 2019 · Philippines No. 1 🥑"}),e.jsx("p",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(13px, 1.4vw, 16px)",color:"var(--c-dark)",margin:"0 0 10px",letterSpacing:"0.03em",textShadow:"none"},children:d.tagline}),e.jsx("h1",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontWeight:800,fontSize:"clamp(2.4rem, 7vw, 4.8rem)",color:"var(--c-olive)",textShadow:"none",margin:"0 0 18px",lineHeight:1.05,background:"none",WebkitTextFillColor:"var(--c-olive)"},children:d.headline})]}),e.jsx("div",{className:"about-hero-sub",children:e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"clamp(14px, 1.6vw, 18px)",color:"var(--c-dark)",maxWidth:"560px",margin:"0 auto 40px",lineHeight:1.7,textShadow:"none"},children:d.sub})}),e.jsx("div",{ref:r,className:"about-hero-stats",children:e.jsx("div",{style:{display:"flex",gap:"14px",flexWrap:"wrap",justifyContent:"center"},children:d.stats.map((a,t)=>e.jsx(k,{stat:a,trigger:i},t))})})]})]}),e.jsx(l,{fromColor:"#3a6b35",toColor:"#d9e29e",height:60}),e.jsx("div",{id:"our-story",className:"about-section",style:{background:"#d9e29e",padding:"clamp(52px,7vw,88px) clamp(20px,5vw,72px)"},children:e.jsxs("div",{style:{maxWidth:"1160px",margin:"0 auto"},children:[e.jsx("h2",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(2rem, 5vw, 3.6rem)",fontWeight:800,color:"var(--c-dark)",margin:"0 0 clamp(32px, 5vw, 52px)",lineHeight:1.05,letterSpacing:"-0.01em"},children:"Our Story"}),e.jsxs("div",{className:"about-founder-layout",children:[e.jsx("div",{className:"about-founder-photo-col",children:e.jsxs("div",{className:"about-founder-photo-wrap",children:[e.jsx("div",{className:"about-founder-ring"}),e.jsx("div",{className:"about-founder-img-frame",children:e.jsx("img",{src:"/chef-czarina.webp",alt:"Chef Czarina Sevilla — Founder of Avocadoria",className:"about-founder-photo"})}),e.jsx("div",{className:"about-founder-badge",children:e.jsx("span",{style:{fontFamily:"Nunito, sans-serif",fontSize:"11px",fontWeight:"800",color:"#fff",letterSpacing:"0.06em",textTransform:"uppercase"},children:"Est. 2019 🥑"})})]})}),e.jsxs("div",{className:"about-founder-text-col",children:[e.jsx("p",{className:"about-founder-para",children:"Founded in 2019, Avocadoria was built on a simple belief: desserts can be both indulgent and nourishing."}),e.jsx("p",{className:"about-founder-para",children:"Led by Chef Czarina Sevilla, the brand pioneered an avocado-based dessert concept designed for modern, health-conscious consumers worldwide."}),e.jsx("p",{className:"about-founder-para",children:"Today, Avocadoria brings this vision to life through playful, real-avocado creations that customers instantly recognize and return for — curious, health-conscious, and joy-seeking diners."}),e.jsxs("div",{style:{marginTop:"clamp(24px, 3vw, 36px)",paddingTop:"20px",borderTop:"2px solid rgba(58,107,53,0.15)",display:"flex",alignItems:"center",gap:"14px"},children:[e.jsx("div",{style:{width:"48px",height:"48px",borderRadius:"50%",background:"var(--c-olive)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"22px",flexShrink:0,minHeight:"unset",minWidth:"unset"},children:"👩‍🍳"}),e.jsxs("div",{children:[e.jsx("p",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(15px, 1.6vw, 19px)",fontWeight:"normal",color:"var(--c-dark)",margin:0,lineHeight:1.2},children:"Chef Czarina Sevilla"}),e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"12px",color:"rgba(58,107,53,0.6)",margin:"3px 0 0",letterSpacing:"0.05em",textTransform:"uppercase"},children:"Founder & Chief Avocado Officer"})]})]})]})]}),e.jsx("div",{style:{marginTop:"clamp(48px, 7vw, 72px)"},children:e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill, minmax(280px, 1fr))",gap:"20px"},children:w.filter(a=>a.id!=="beginning").map((a,t)=>e.jsxs("div",{className:"about-story-card",style:{animationDelay:`${t*100}ms`},children:[e.jsx("div",{style:{height:"5px",background:a.color,width:"100%"}}),e.jsxs("div",{style:{padding:"22px 24px 26px"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"10px",marginBottom:"12px"},children:[e.jsx("div",{style:{width:"40px",height:"40px",borderRadius:"12px",flexShrink:0,background:`${a.color}18`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px",minHeight:"unset",minWidth:"unset"},children:a.icon}),e.jsx("span",{style:{background:`${a.color}18`,color:a.color,fontFamily:"Nunito, sans-serif",fontSize:"10px",fontWeight:"800",letterSpacing:"0.07em",textTransform:"uppercase",padding:"3px 12px",borderRadius:"999px"},children:a.badge})]}),e.jsx("h3",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(1.1rem, 2vw, 1.4rem)",fontWeight:"normal",color:"var(--c-dark)",margin:"0 0 10px",lineHeight:1.2},children:a.title}),e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"13px",lineHeight:1.8,color:"rgba(138,95,60,0.85)",margin:0},children:a.body})]})]},a.id))})})]})}),e.jsx(l,{fromColor:"#d9e29e",toColor:"#3a6b35",height:56}),e.jsxs("div",{id:"recognitions",className:"about-section",style:{position:"relative",overflow:"hidden"},children:[e.jsx("img",{src:"/franchisebg.svg","aria-hidden":"true",style:{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:0,opacity:.35}}),e.jsx("div",{style:{position:"absolute",inset:0,zIndex:1,background:"rgba(28,56,20,0.60)"}}),e.jsxs("div",{style:{position:"relative",zIndex:2,maxWidth:"900px",margin:"0 auto",padding:"clamp(52px,8vw,88px) clamp(20px,5vw,72px)"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:"44px"},children:[e.jsx(x,{text:"Recognitions 🏆",color:"var(--c-olive)"}),e.jsx("h2",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(1.8rem, 4vw, 3rem)",fontWeight:"normal",color:"#fff",textShadow:"0 3px 16px rgba(0,0,0,0.4)",margin:"0 0 12px",lineHeight:1.1},children:"Awards & Milestones"}),e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"clamp(14px, 1.5vw, 16px)",color:"rgba(255,255,255,0.7)",margin:0,lineHeight:1.65},children:"The moments that mark our journey."})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:"14px"},children:j.map(a=>e.jsxs("div",{className:"about-recognition-row",children:[e.jsx("div",{style:{width:"56px",height:"56px",borderRadius:"16px",flexShrink:0,background:a.featured?"var(--c-olive)":"rgba(182,197,72,0.18)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"26px"},children:a.icon}),e.jsxs("div",{style:{flex:1},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",flexWrap:"wrap",marginBottom:"6px",alignItems:"center"},children:[e.jsx("span",{style:{background:a.featured?"var(--c-olive)":"rgba(182,197,72,0.15)",color:a.featured?"#fff":"var(--c-dark)",fontFamily:"Nunito, sans-serif",fontSize:"10px",fontWeight:"800",letterSpacing:"0.06em",textTransform:"uppercase",padding:"3px 10px",borderRadius:"999px"},children:a.category}),e.jsxs("span",{style:{fontFamily:"Nunito, sans-serif",fontSize:"11px",color:"rgba(138,95,60,0.55)"},children:[f(a.date)," · ",a.issuer]})]}),e.jsx("h3",{style:{fontFamily:"Nunito, sans-serif",fontWeight:"800",fontSize:"clamp(14px, 1.4vw, 17px)",color:"var(--c-dark)",margin:"0 0 6px",lineHeight:1.3},children:a.title}),e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"13px",color:"rgba(138,95,60,0.8)",lineHeight:1.6,margin:0},children:a.excerpt})]})]},a.id))})]})]}),e.jsx(l,{fromColor:"#3a6b35",toColor:"#F4FAEC",height:56}),e.jsx("div",{id:"whats-new",className:"about-section",style:{background:"#F4FAEC",padding:"clamp(52px,8vw,88px) clamp(20px,5vw,72px)"},children:e.jsxs("div",{style:{maxWidth:"1100px",margin:"0 auto"},children:[e.jsx("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"12px",marginBottom:"36px"},children:e.jsxs("div",{children:[e.jsx(x,{text:"What's New",color:"var(--c-pink)"}),e.jsx("h2",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(1.8rem, 3.5vw, 2.8rem)",fontWeight:"normal",color:"var(--c-dark)",margin:"0 0 6px",lineHeight:1.1},children:"Latest from Avocadoria"}),e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"14px",color:"rgba(138,95,60,0.65)",margin:0},children:"New branches, products, and announcements."})]})}),e.jsx("div",{className:"about-news-grid",children:S.map(a=>e.jsx(z,{post:a},a.id))})]})}),e.jsx(l,{fromColor:"#F4FAEC",toColor:"#d9e29e",height:48}),e.jsx("div",{id:"avo-cares",className:"about-section",style:{background:"#d9e29e",padding:"clamp(52px,8vw,88px) clamp(20px,5vw,72px)"},children:e.jsxs("div",{style:{maxWidth:"1100px",margin:"0 auto"},children:[e.jsxs("div",{style:{textAlign:"center",marginBottom:"44px"},children:[e.jsx(x,{text:"Avo Cares 🌱",color:"var(--c-dark)"}),e.jsx("h2",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(1.8rem, 4vw, 3rem)",fontWeight:"normal",color:"var(--c-olive)",textShadow:g,margin:"0 0 12px",lineHeight:1.1},children:"Spreading Happiness Beyond Our Cups"}),e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"clamp(14px, 1.5vw, 17px)",color:"rgba(58,107,53,0.75)",maxWidth:"520px",margin:"0 auto",lineHeight:1.65},children:"Community, environment, and supporting local farmers."})]}),e.jsx("div",{className:"about-cares-grid",children:N.map(a=>e.jsxs("div",{style:{background:"rgba(255,255,255,0.90)",border:"1.5px solid rgba(182,197,72,0.2)",borderRadius:"20px",overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 2px 14px rgba(58,107,53,0.07)",transition:"box-shadow 0.25s ease, transform 0.25s ease"},onMouseEnter:t=>{t.currentTarget.style.boxShadow="0 14px 40px rgba(58,107,53,0.16)",t.currentTarget.style.transform="translateY(-5px)"},onMouseLeave:t=>{t.currentTarget.style.boxShadow="0 2px 14px rgba(58,107,53,0.07)",t.currentTarget.style.transform="none"},children:[a.image&&e.jsx("div",{style:{width:"100%",height:"220px",overflow:"hidden",flexShrink:0},children:e.jsx("img",{src:a.image,alt:a.title,style:{width:"100%",height:"100%",objectFit:"cover",transition:"transform 0.45s ease"},onMouseEnter:t=>t.target.style.transform="scale(1.05)",onMouseLeave:t=>t.target.style.transform="scale(1)"})}),e.jsxs("div",{style:{padding:"22px 24px 26px",display:"flex",flexDirection:"column",gap:"10px",flex:1},children:[e.jsxs("div",{style:{display:"flex",gap:"8px",alignItems:"center"},children:[e.jsx("span",{style:{fontSize:"20px"},children:a.icon}),e.jsx("span",{style:{background:a.featured?"var(--c-olive)":"rgba(182,197,72,0.15)",color:a.featured?"#fff":"var(--c-dark)",fontFamily:"Nunito, sans-serif",fontSize:"10px",fontWeight:"800",letterSpacing:"0.06em",textTransform:"uppercase",padding:"3px 10px",borderRadius:"999px"},children:a.category}),e.jsx("span",{style:{fontFamily:"Nunito, sans-serif",fontSize:"11px",color:"rgba(138,95,60,0.5)"},children:f(a.date)})]}),e.jsx("h3",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(14px, 1.5vw, 18px)",fontWeight:"normal",color:"var(--c-dark)",margin:0,lineHeight:1.3},children:a.title}),e.jsx("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"13px",color:"rgba(138,95,60,0.8)",lineHeight:1.7,margin:0},children:a.excerpt})]})]},a.id))})]})}),e.jsx(l,{fromColor:"#d9e29e",toColor:"#b6c548",height:50}),e.jsx("div",{style:{background:"#b6c548",padding:"28px 32px",textAlign:"center"},children:e.jsx("p",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(13px, 1.5vw, 16px)",color:"rgba(255,255,255,0.9)",margin:0,textShadow:"0 1px 4px rgba(0,0,0,0.2)"},children:"Happiness in Avocado — since 2019 🥑"})})]})}export{W as default};
