import{j as e}from"./index-68WyG8Fq.js";import{c as f,L as s}from"./vendor-Bsz0z0Mx.js";import{S as g}from"./SEO-Tn9JO2Nt.js";const h={direction:"to-left",fadeStart:30,fadeEnd:75,color:"#d4eca0",opacity:1};function m({direction:i,fadeStart:n,fadeEnd:o,color:a,opacity:l}){const d=a.replace("#",""),p=parseInt(d.slice(0,2),16),x=parseInt(d.slice(2,4),16),b=parseInt(d.slice(4,6),16);return`linear-gradient(${i},rgba(${p},${x},${b},0) ${n}%,rgba(${p},${x},${b},${l}) ${o}%)`}const r={src:"/hero-bg.png",right:"-2%",bottom:"8%",height:"88vh",slideFrom:120,slideRotateStart:2,slideDuration:1.1,floatHeight:22,floatRotate:1.5,floatDuration:3.8,floatDelay:1.1},t={label:"Discover Avo Faves",fontSize:"clamp(1rem, 1.6vw, 1.3rem)",fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",paddingX:"40px",paddingY:"14px",background:"rgba(255,255,255,0.92)",color:"#3a6b35",borderColor:"rgba(255,255,255,0.9)",borderWidth:"2.5px",borderRadius:"999px",shadow:"0 6px 24px rgba(58,107,53,0.22)",blur:"blur(4px)",hoverBg:"#b6c548",hoverColor:"#fff",hoverBorder:"#b6c548",posBottom:"18%",posLeft:"37%"};function c({fromColor:i,toColor:n,height:o=70,flip:a=!1}){const l=a?`M0,${o} C360,0 1080,${o} 1440,${Math.round(o*.4)} L1440,0 L0,0 Z`:`M0,0 C360,${o} 1080,0 1440,${Math.round(o*.6)} L1440,${o} L0,${o} Z`;return e.jsx("div",{style:{background:i,lineHeight:0,display:"block"},children:e.jsx("svg",{viewBox:`0 0 1440 ${o}`,xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",style:{display:"block",width:"100%",height:`${o}px`},children:e.jsx("path",{d:l,fill:n})})})}function w(){const[i,n]=f.useState(!1);f.useEffect(()=>{n(!0)},[]);const o={hero:"#d4eca0",franchise:"#3a6b35",news:"#F4FAEC"};return e.jsxs(e.Fragment,{children:[e.jsx(g,{title:null,description:"Avocadoria is the home of the No. 1 avocado-based desserts in the Philippines. Real avocado treats — indulgent yet guilt-free.",path:"/"}),e.jsx("style",{children:`
        @font-face {
          font-family: 'BubbleboddyNeue';
          src: url('/fonts/bubbleboddyneueinline-extrabold.ttf') format('truetype');
          font-weight: normal; font-style: normal; font-display: swap;
        }

        /* ── Hero image animation — driven by HERO_IMAGE config ── */
        @keyframes hero-slide-in {
          0%   { opacity:0; transform: translateX(${r.slideFrom}px) rotate(${r.slideRotateStart}deg); }
          60%  { opacity:1; transform: translateX(${-120*.1}px) rotate(${-2*.25}deg); }
          80%  { transform: translateX(${r.slideFrom*.05}px) rotate(${r.slideRotateStart*.25}deg); }
          100% { opacity:1; transform: translateX(0px) rotate(0deg); }
        }
        @keyframes hero-float {
          0%,100% { transform: translateY(0px) rotate(-${r.floatRotate}deg); }
          50%      { transform: translateY(-${r.floatHeight}px) rotate(${r.floatRotate}deg); }
        }
        .hero-img-anim {
          animation:
            hero-slide-in ${r.slideDuration}s cubic-bezier(.22,1,.36,1) forwards,
            hero-float    ${r.floatDuration}s ease-in-out ${r.floatDelay}s infinite;
        }

        @keyframes shimmer-sweep {
          0%   { background-position: -250% center; }
          100% { background-position:  250% center; }
        }
        @keyframes glow-pulse {
          0%,100% {
            text-shadow:
              0 1px 0 rgba(255,255,255,.95), 0 2px 0 rgba(220,255,80,.7),
              0 3px 0 rgba(40,80,0,.5), 0 5px 8px rgba(40,80,0,.35),
              0 0 14px rgba(210,255,50,.5), 0 0 32px rgba(180,240,0,.28);
          }
          50% {
            text-shadow:
              0 1px 0 rgba(255,255,255,.95), 0 2px 0 rgba(220,255,80,.7),
              0 3px 0 rgba(40,80,0,.5), 0 5px 8px rgba(40,80,0,.35),
              0 0 22px rgba(210,255,50,.9), 0 0 55px rgba(180,240,0,.55);
          }
        }
        .hero-headline {
          font-family: 'BubbleboddyNeue','Nunito',sans-serif;
          font-weight: normal;
          font-size: clamp(2.8rem,5.5vw,5rem);
          line-height: 1.12;
          margin: 0 0 36px;
          letter-spacing: .01em;
          display: block;
          background: linear-gradient(105deg,
            #4a7a00 0%,#7ab000 15%,#c8f000 28%,#ffffff 38%,
            #eeff80 46%,#9acc00 55%,#4a7a00 65%,
            #7ab000 75%,#c8f000 85%,#ffffff 92%,#4a7a00 100%);
          background-size: 250% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer-sweep 3.5s linear infinite, glow-pulse 2.5s ease-in-out infinite;
        }
        .btn-white {
          display:inline-flex;align-items:center;justify-content:center;
          padding:13px 36px;border-radius:999px;
          background:#fff;color:#3a6b35;
          font-family:'Nunito',sans-serif;font-size:16px;font-weight:700;
          text-decoration:none;border:2px solid #fff;
          box-shadow:0 2px 14px rgba(0,0,0,.10);min-width:140px;
          transition:all .2s;
        }
        .btn-white:hover { background:rgba(255,255,255,.82); }
        .btn-olive {
          display:inline-flex;align-items:center;justify-content:center;
          padding:13px 36px;border-radius:999px;
          background:#b6c548;color:#fff;
          font-family:'Nunito',sans-serif;font-size:16px;font-weight:700;
          text-decoration:none;border:2px solid #b6c548;
          box-shadow:0 4px 18px rgba(182,197,72,.45);min-width:140px;
          transition:all .2s;
        }
        .btn-olive:hover { background:#3a6b35;border-color:#3a6b35; }
        .btn-outline-white {
          display:inline-flex;align-items:center;justify-content:center;
          padding:13px 36px;border-radius:999px;
          background:transparent;color:#fff;
          font-family:'Nunito',sans-serif;font-size:16px;font-weight:700;
          text-decoration:none;border:2px solid rgba(255,255,255,.7);
          min-width:140px;transition:all .2s;
        }
        .btn-outline-white:hover { background:rgba(255,255,255,.12); }
        .avofaves-btn {
          display:inline-flex;align-items:center;justify-content:center;
          padding:14px 40px;border-radius:999px;
          background:rgba(255,255,255,.92);color:#3a6b35;
          font-family:'BubbleboddyNeue','Nunito',sans-serif;
          font-size:clamp(1rem,1.8vw,1.35rem);font-weight:bold;
          text-decoration:none;border:2.5px solid rgba(255,255,255,.9);
          box-shadow:0 6px 24px rgba(58,107,53,.18);
          backdrop-filter:blur(4px);letter-spacing:.01em;
          transition:all .2s;white-space:nowrap;
        }
        .avofaves-btn:hover { background:#b6c548;color:#fff;border-color:#b6c548; }
        .section-title {
          font-family:'BubbleboddyNeue','Nunito',sans-serif;
          font-weight:normal;font-size:clamp(1.8rem,3.5vw,2.6rem);
          margin:0 0 8px;letter-spacing:.01em;
        }
        .section-sub {
          font-family:'Nunito',sans-serif;font-size:15px;
          opacity:.75;margin:0 0 32px;
        }
      `}),e.jsxs("div",{className:"page-enter",children:[e.jsx("style",{children:`
          /* ── Mobile hero layout ───────────────────────────────── */
          .hero-wrap {
            position: relative;
            width: 100%;
            min-height: 100vh;
            overflow: hidden;
            background: linear-gradient(180deg,#e8f5c0 0%,${o.hero} 60%,#cce890 100%);
            display: flex;
            flex-direction: column;
          }

          /* Desktop: image absolute right, text takes left half */
          @media (min-width: 769px) {
            .hero-inner {
              display: flex;
              flex-direction: column;
              justify-content: center;
              min-height: 100vh;
              padding: 100px 50% 60px 5%;
            }
            .hero-product-img {
              position: absolute;
              right: ${r.right};
              bottom: ${r.bottom};
              height: ${r.height};
              width: auto;
              object-fit: contain;
              z-index: 2;
            }
          }

          /* Mobile: stack — image on top, text below, no overlap */
          @media (max-width: 768px) {
            .hero-wrap { min-height: auto; padding-bottom: 40px; }
            .hero-inner {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              padding: 90px 24px 32px;
              position: relative;
              z-index: 4;
            }
            .hero-product-img {
              position: relative;
              display: block;
              width: 90%;
              max-width: 340px;
              height: auto;
              margin: 0 auto 28px;
              object-fit: contain;
              z-index: 2;
              animation: hero-float ${r.floatDuration}s ease-in-out infinite !important;
            }
            .hero-headline {
              font-size: clamp(2.2rem, 10vw, 3.2rem) !important;
            }
            .btn-white, .btn-olive {
              width: 100%;
              justify-content: center;
            }
          }

          /* Tablet */
          @media (min-width: 769px) and (max-width: 1024px) {
            .hero-product-img {
              height: 65vh !important;
            }
            .hero-inner { padding-right: 48% !important; }
          }
        `}),e.jsxs("section",{className:"hero-wrap",children:[e.jsx("div",{style:{position:"absolute",inset:0,zIndex:1,pointerEvents:"none",background:"radial-gradient(ellipse 60% 80% at 18% 50%,rgba(210,240,110,.55) 0%,transparent 68%)"}}),e.jsx("img",{src:r.src,alt:"Avocadoria dessert cups",className:"hero-img-anim hero-product-img",style:{zIndex:2}}),e.jsx("div",{style:{position:"absolute",inset:0,zIndex:3,pointerEvents:"none",background:m(h)}}),e.jsxs("div",{className:"hero-inner",style:{position:"relative",zIndex:4,opacity:i?1:0,transform:i?"translateY(0)":"translateY(24px)",transition:"opacity .7s ease .2s, transform .7s ease .2s"},children:[e.jsxs("h1",{className:"hero-headline",children:["Home of No. 1",e.jsx("br",{}),"Avocado-Based",e.jsx("br",{}),"Desserts"]}),e.jsxs("div",{style:{display:"flex",gap:"12px",flexWrap:"wrap",width:"100%"},children:[e.jsx(s,{to:"/menu",className:"btn-white",children:"Our Menu"}),e.jsx(s,{to:"/our-stores",className:"btn-olive",children:"Our Stores"})]})]})]}),e.jsx(c,{fromColor:o.hero,toColor:"#e8f0c8",height:60}),e.jsx("section",{style:{background:"#e8f0c8",padding:0,margin:0,lineHeight:0},children:e.jsxs("div",{style:{position:"relative",width:"100%",lineHeight:0},children:[e.jsx("img",{src:"/avofaves.png",alt:"Avo-Faves — Avocado Lover, Avocado Naked Light Ice Cream, Avocado Shake",style:{width:"100%",display:"block",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",bottom:t.posBottom,left:t.posLeft,transform:"translateX(-50%)",zIndex:5},children:e.jsx(s,{to:"/menu",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:`${t.paddingY} ${t.paddingX}`,borderRadius:t.borderRadius,background:t.background,color:t.color,fontFamily:t.fontFamily,fontSize:t.fontSize,fontWeight:"bold",textDecoration:"none",border:`${t.borderWidth} solid ${t.borderColor}`,boxShadow:t.shadow,backdropFilter:t.blur,letterSpacing:"0.01em",whiteSpace:"nowrap",transition:"all 0.2s"},onMouseEnter:a=>{a.currentTarget.style.background=t.hoverBg,a.currentTarget.style.color=t.hoverColor,a.currentTarget.style.borderColor=t.hoverBorder},onMouseLeave:a=>{a.currentTarget.style.background=t.background,a.currentTarget.style.color=t.color,a.currentTarget.style.borderColor=t.borderColor},children:t.label})})]})}),e.jsx(c,{fromColor:"#b6c548",toColor:o.franchise,height:64,flip:!0}),e.jsx("section",{style:{background:o.franchise,padding:"72px 32px",textAlign:"center"},children:e.jsxs("div",{style:{maxWidth:"680px",margin:"0 auto"},children:[e.jsxs("h2",{className:"section-title",style:{color:"#c8e690",marginBottom:"14px"},children:["Dreaming of your own",e.jsx("br",{}),"Avocadoria store?"]}),e.jsxs("p",{className:"section-sub",style:{color:"rgba(255,255,255,.85)"},children:["Be part of our growing family.",e.jsx("br",{}),"Let's spread happiness in avocado!"]}),e.jsx(s,{to:"/franchise",className:"btn-white",children:"Explore Now"})]})}),e.jsx(c,{fromColor:o.franchise,toColor:o.news,height:72}),e.jsx("section",{style:{background:o.news,padding:"64px 32px 80px"},children:e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto"},children:[e.jsx("h2",{className:"section-title",style:{color:"#b6c548"},children:"News and Updates"}),e.jsx("p",{className:"section-sub",style:{color:"rgba(138,95,60,.65)"},children:"Like and Follow for more updates!"}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"20px"},children:[1,2,3].map(a=>e.jsxs("div",{style:{background:"rgba(182,197,72,.08)",border:"1.5px solid rgba(182,197,72,.2)",borderRadius:"16px",padding:"32px",display:"flex",flexDirection:"column",gap:"10px"},children:[e.jsx("div",{style:{width:"100%",height:"140px",borderRadius:"10px",background:"rgba(182,197,72,.12)"}}),e.jsx("div",{style:{width:"60%",height:"14px",borderRadius:"6px",background:"rgba(182,197,72,.18)"}}),e.jsx("div",{style:{width:"90%",height:"10px",borderRadius:"6px",background:"rgba(182,197,72,.12)"}}),e.jsx("div",{style:{width:"75%",height:"10px",borderRadius:"6px",background:"rgba(182,197,72,.10)"}})]},a))})]})})]})]})}export{w as default};
