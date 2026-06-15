import{j as e}from"./index-CW9Oztzp.js";import{c as f,L as h}from"./vendor-Bsz0z0Mx.js";import{S as B}from"./SEO-DLIFSPVU.js";const T=[{id:"news-001",title:"Avocadoria Opens in SM Mall of Asia!",date:"2025-05-20",category:"Store Opening",excerpt:"We are thrilled to announce our newest branch at SM Mall of Asia — bringing happiness in avocado to the Bay Area!",content:"We are thrilled to announce our newest branch at SM Mall of Asia — bringing happiness in avocado to the Bay Area! Visit us at the Ground Floor, near the main entrance. Open daily 10AM–9PM.",image:null,featured:!0},{id:"news-002",title:"New Product Alert: Biscoff Lover is here!",date:"2025-04-10",category:"New Product",excerpt:"Meet our newest creation — the Biscoff Lover. Layers of creamy avocado, Biscoff drizzle, and our signature crumble base.",content:"Meet our newest creation — the Biscoff Lover. Layers of creamy avocado, Biscoff drizzle, and our signature crumble base. Available in all branches starting April 10.",image:null,featured:!1}],w=[{src:"/lover.webp",alt:"Avo Lover dessert cup"},{src:"/biscoff_lover.webp",alt:"Biscoff Lover dessert cup"},{src:"/naked_light_ice_cream.webp",alt:"Naked Light Ice Cream"}],z={src:"/avocadoria_bg.webp",objectPosition:"center bottom"},v={opacityLeft:.88,opacityMidLeft:.62,opacityMid:.18,opacityRight:0,clearAt:"60%"},k={right:"2%",bottom:"0%",height:"52vh"},C={height:"20%"},_={left:"clamp(48px, 6vw, 110px)",bottom:"20vh"},j={duration:5500,transition:800},g={size:8,sizeActive:12,color:"rgba(255,255,255,0.45)",colorActive:"#fff",glow:"0 0 10px rgba(182,197,72,0.9)"};function I({fromColor:r,toColor:x,height:n=70,flip:s=!1}){const l=s?`M0,${n} C360,0 1080,${n} 1440,${Math.round(n*.4)} L1440,0 L0,0 Z`:`M0,0 C360,${n} 1080,0 1440,${Math.round(n*.6)} L1440,${n} L0,${n} Z`;return e.jsx("div",{style:{background:r,lineHeight:0},children:e.jsx("svg",{viewBox:`0 0 1440 ${n}`,xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",style:{display:"block",width:"100%",height:`${n}px`},children:e.jsx("path",{d:l,fill:x})})})}const i={label:"Discover Avo Faves",fontFamily:"'BubbleboddyNeue','Nunito',sans-serif",paddingX:"40px",paddingY:"14px",background:"rgba(255,255,255,0.92)",color:"#3a6b35",borderColor:"rgba(255,255,255,0.9)",borderWidth:"2.5px",borderRadius:"999px",shadow:"0 6px 24px rgba(58,107,53,0.22)",blur:"blur(4px)",hoverBg:"#b6c548",hoverColor:"#fff",hoverBorder:"#b6c548",posBottom:"18%",posLeft:"37%"};function A(){const[r,x]=f.useState(0),[n,s]=f.useState(!0),l=f.useRef(null),t=d=>{d!==r&&(s(!1),setTimeout(()=>{x(d),setTimeout(()=>s(!0),40)},j.transition))};f.useEffect(()=>(l.current=setInterval(()=>{s(!1),setTimeout(()=>{x(d=>{const o=(d+1)%w.length;return setTimeout(()=>s(!0),40),o})},j.transition)},j.duration),()=>clearInterval(l.current)),[]);const c=w[r],m=(d=1)=>({opacity:n?d:0,transition:`opacity ${j.transition}ms ease`});return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"avo-hero__product-wrap",style:{zIndex:8,...m()},children:e.jsx("img",{src:c.src,alt:c.alt,className:"avo-hero__product-img",style:{pointerEvents:"none"}})}),w.length>1&&e.jsx("div",{className:"avo-hero__dots",children:w.map((d,o)=>e.jsx("button",{onClick:()=>t(o),"aria-label":`Show product ${o+1}`,style:{width:`${o===r?g.sizeActive:g.size}px`,height:`${o===r?g.sizeActive:g.size}px`,borderRadius:"50%",background:o===r?g.colorActive:g.color,boxShadow:o===r?g.glow:"none",border:"none",cursor:"pointer",padding:0,minHeight:"unset",minWidth:"unset",transition:"all 0.35s ease"}},o))})]})}const u=[{id:"food-truck",image:"/franchise-food-truck.png",name:"Food Truck",size:"10 sqm",tag:"Most Mobile",tagColor:"#EF7ECB",color:"#b6c548",highlights:["Perfect for events, bazaars & festivals","Pick-up + Order window layout","Fully branded with illuminated signage","Easy to relocate — maximum reach"]},{id:"island",image:"/franchise-island.png",name:"Island",size:"20 sqm",tag:"Best Value",tagColor:"#DFD438",color:"#3a6b35",highlights:["Integrated seating area for dwell time","Largest format — premium mall presence","Dedicated prep + service zones","Scalable layout for high foot traffic"]},{id:"popup",image:"/franchise-popup.png",name:"Pop Up",size:"6 sqm",tag:"Entry Level",tagColor:"#b6c548",color:"#EF7ECB",highlights:["Most affordable entry point","Illuminated Avocadoria branding wall","Built-in digital display screen","Compact & efficient — fits any space"]},{id:"kiosk",image:"/franchise-kiosk.png",name:"Kiosk",size:"6.25 sqm",tag:"Most Popular",tagColor:"#b6c548",color:"#8A5F3C",highlights:["Iconic avocado drip counter design","Signature curved architecture","Open layout — fast Order → Pick-Up flow","Premium finish, strong brand visibility"]}],b={intervalMs:1e4,transitionMs:600},S={image:"/franchise-bg.webp",overlayOpacity:.45,paddingTop:"72px",paddingBottom:"56px"},F=["-3px -3px 0 #fff"," 3px -3px 0 #fff","-3px  3px 0 #fff"," 3px  3px 0 #fff","-3px  0   0 #fff"," 3px  0   0 #fff"," 0   -3px 0 #fff"," 0    3px 0 #fff","-2px -2px 0 #fff"," 2px -2px 0 #fff","-2px  2px 0 #fff"," 2px  2px 0 #fff"].join(", ");function $(){const[r,x]=f.useState(0),[n,s]=f.useState(!0),l=f.useRef(null),t=a=>{a!==r&&(s(!1),setTimeout(()=>{x(a),setTimeout(()=>s(!0),40)},b.transitionMs))},c=()=>t((r-1+u.length)%u.length),m=()=>t((r+1)%u.length);f.useEffect(()=>(l.current=setInterval(()=>m(),b.intervalMs),()=>clearInterval(l.current)),[r]);const d=()=>{clearInterval(l.current),l.current=setInterval(()=>m(),b.intervalMs)},o=u[r],N=(a,p,M)=>e.jsx("button",{onClick:()=>{a(),d()},"aria-label":p,style:{width:"44px",height:"44px",borderRadius:"50%",background:"rgba(255,255,255,0.85)",border:`2px solid ${o.color}40`,display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",fontSize:"22px",color:o.color,flexShrink:0,boxShadow:"0 2px 10px rgba(0,0,0,0.10)",transition:"all 0.2s"},onMouseEnter:y=>{y.currentTarget.style.background=o.color,y.currentTarget.style.color="#fff"},onMouseLeave:y=>{y.currentTarget.style.background="rgba(255,255,255,0.85)",y.currentTarget.style.color=o.color},children:M});return e.jsxs("section",{style:{padding:`${S.paddingTop} 24px ${S.paddingBottom}`,position:"relative",background:"transparent",backgroundImage:`url('${S.image}')`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat"},children:[e.jsx("div",{style:{position:"absolute",inset:0,pointerEvents:"none",zIndex:0,background:`rgba(255,255,255,${S.overlayOpacity})`}}),e.jsxs("div",{style:{position:"relative",zIndex:1},children:[e.jsx("style",{children:`
        @keyframes ft-fade-in {
          from { opacity:0; transform: translateY(16px); }
          to   { opacity:1; transform: translateY(0); }
        }
        .ft-card-enter { animation: ft-fade-in ${b.transitionMs}ms ease forwards; }

        /* Progress bar */
        @keyframes ft-progress {
          from { width: 0% }
          to   { width: 100% }
        }

        .ft-btn-white {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 13px 36px; border-radius: 999px;
          background: rgba(255,255,255,0.92);
          border: 2px solid rgba(182,197,72,0.5);
          font-family: 'BubbleboddyNeue', 'Nunito', sans-serif;
          font-size: clamp(14px, 1.4vw, 17px);
          font-weight: 800; color: #3a6b35;
          text-decoration: none; cursor: pointer;
          box-shadow: 0 4px 18px rgba(58,107,53,0.15),
                      inset 0 1px 0 rgba(255,255,255,0.8);
          transition: all 0.2s;
          text-shadow: ${F};
        }
        .ft-btn-white:hover {
          background: #b6c548; color: #fff;
          border-color: #b6c548;
          text-shadow: none;
        }

        @media (max-width: 767px) {
          .ft-card-grid { flex-direction: column !important; }
          .ft-card-img  { width: 100% !important; max-height: 220px !important; }
          .ft-card-info { padding: 20px !important; }
        }
      `}),e.jsxs("div",{style:{textAlign:"center",marginBottom:"36px"},children:[e.jsx("span",{style:{display:"inline-block",marginBottom:"14px",background:"#EF7ECB",color:"#fff",fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"12px",fontWeight:"800",letterSpacing:"0.07em",textTransform:"uppercase",padding:"5px 18px",borderRadius:"999px"},children:"Now Open for Franchising 🥑"}),e.jsxs("h2",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontWeight:800,fontSize:"clamp(2rem, 4.5vw, 3.6rem)",lineHeight:1.1,margin:"0 0 12px",color:"#b5c448",textShadow:F},children:["Dreaming of your own",e.jsx("br",{}),"Avocadoria store?"]}),e.jsx("p",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(13px, 1.3vw, 16px)",color:"#5a8a1a",margin:0,textShadow:"0 1px 0 rgba(255,255,255,0.8)"},children:"Four flexible formats. One iconic brand."})]}),e.jsxs("div",{style:{maxWidth:"960px",margin:"0 auto",display:"flex",alignItems:"center",gap:"16px"},children:[N(c,"Previous cart format","‹"),e.jsx("div",{className:"ft-card-enter",style:{flex:1,background:"rgba(255,255,255,0.88)",borderRadius:"24px",border:`2px solid ${o.color}30`,boxShadow:"0 8px 32px rgba(0,0,0,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",backdropFilter:"blur(12px)",overflow:"hidden",opacity:n?1:0,transition:`opacity ${b.transitionMs}ms ease`},children:e.jsxs("div",{className:"ft-card-grid",style:{display:"flex"},children:[e.jsx("div",{className:"ft-card-img",style:{width:"42%",minHeight:"320px",background:`${o.color}10`,display:"flex",alignItems:"center",justifyContent:"center",padding:"24px",borderRight:`1px solid ${o.color}20`,flexShrink:0},children:e.jsx("img",{src:o.image,alt:o.name,style:{width:"100%",maxHeight:"280px",objectFit:"contain",display:"block"}})}),e.jsxs("div",{className:"ft-card-info",style:{flex:1,padding:"28px 28px 24px"},children:[e.jsx("span",{style:{display:"inline-block",marginBottom:"12px",background:o.tagColor,color:"#fff",fontFamily:"Nunito, sans-serif",fontSize:"11px",fontWeight:"800",letterSpacing:"0.06em",textTransform:"uppercase",padding:"4px 14px",borderRadius:"999px"},children:o.tag}),e.jsx("h3",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(1.6rem, 3vw, 2.4rem)",fontWeight:800,lineHeight:1.1,color:o.color,margin:"0 0 4px"},children:o.name}),e.jsxs("p",{style:{fontFamily:"Nunito, sans-serif",fontSize:"13px",color:"#8A5F3C",opacity:.7,margin:"0 0 18px"},children:["Store Size: ",e.jsx("strong",{children:o.size})]}),e.jsx("div",{style:{height:"1px",background:`${o.color}30`,marginBottom:"16px"}}),e.jsx("ul",{style:{listStyle:"none",padding:0,margin:"0 0 22px",display:"flex",flexDirection:"column",gap:"9px"},children:o.highlights.map((a,p)=>e.jsxs("li",{style:{display:"flex",alignItems:"flex-start",gap:"9px",fontFamily:"Nunito, sans-serif",fontSize:"13px",color:"#5a6a2a",lineHeight:1.4},children:[e.jsx("span",{style:{width:"18px",height:"18px",borderRadius:"50%",background:o.color,color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"9px",fontWeight:"800",flexShrink:0,marginTop:"1px"},children:"✓"}),a]},p))}),e.jsx(h,{to:"/franchise",style:{fontFamily:"Nunito, sans-serif",fontSize:"13px",fontWeight:"700",color:o.color,textDecoration:"none",display:"inline-flex",alignItems:"center",gap:"4px",opacity:.85,transition:"opacity 0.2s"},onMouseEnter:a=>a.currentTarget.style.opacity="1",onMouseLeave:a=>a.currentTarget.style.opacity="0.85",children:"Inquire About This Format →"})]})]})},r),N(m,"Next cart format","›")]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",alignItems:"center",gap:"10px",marginTop:"24px"},children:u.map((a,p)=>e.jsxs("button",{onClick:()=>{t(p),d()},"aria-label":`Show ${a.name}`,style:{display:"flex",flexDirection:"column",alignItems:"center",gap:"4px",background:"none",border:"none",cursor:"pointer",padding:"4px 8px"},children:[e.jsx("span",{style:{fontFamily:"Nunito, sans-serif",fontSize:"11px",fontWeight:p===r?"800":"600",color:p===r?u[p].color:"rgba(90,120,30,0.5)",transition:"all 0.3s"},children:a.name}),e.jsxs("div",{style:{position:"relative",width:"40px",height:"4px",borderRadius:"2px",background:"rgba(182,197,72,0.2)"},children:[p===r&&e.jsx("div",{style:{position:"absolute",top:0,left:0,height:"100%",borderRadius:"2px",background:o.color,animation:`ft-progress ${b.intervalMs}ms linear forwards`}},`prog-${r}`),p!==r&&e.jsx("div",{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",width:"6px",height:"6px",borderRadius:"50%",background:"rgba(182,197,72,0.4)"}})]})]},a.id))}),e.jsx("div",{style:{textAlign:"center",marginTop:"28px"},children:e.jsx(h,{to:"/franchise",className:"ft-btn-white",children:"Explore Franchise Opportunities →"})})]})]})}function W(){const[r,x]=f.useState(!1);f.useEffect(()=>{x(!0)},[]);const n={news:"#F4FAEC"},s=["-3px -3px 0 #fff"," 3px -3px 0 #fff","-3px  3px 0 #fff"," 3px  3px 0 #fff","-3px  0   0 #fff"," 3px  0   0 #fff"," 0   -3px 0 #fff"," 0    3px 0 #fff","-2px -2px 0 #fff"," 2px -2px 0 #fff","-2px  2px 0 #fff"," 2px  2px 0 #fff"].join(", "),l=["-2px -2px 0 #fff"," 2px -2px 0 #fff","-2px  2px 0 #fff"," 2px  2px 0 #fff","-2px  0   0 #fff"," 2px  0   0 #fff"," 0   -2px 0 #fff"," 0    2px 0 #fff"].join(", ");return e.jsxs(e.Fragment,{children:[e.jsx(B,{title:null,description:"Avocadoria is the home of the No. 1 avocado-based desserts in the Philippines. Real avocado treats — indulgent yet guilt-free.",path:"/"}),e.jsx("style",{children:`
        @font-face {
          font-family: 'BubbleboddyNeue';
          src: url('/fonts/bubbleboddyneueinline-extrabold.ttf') format('truetype');
          font-weight: normal; font-style: normal; font-display: swap;
        }
        @keyframes hero-breathe {
          0%,100% { transform: translateY(0px) scale(1); }
          50%      { transform: translateY(-8px) scale(1.015); }
        }

        /* ── MOBILE FIRST ── */
        .avo-hero {
          position: relative;
          width: 100%;
          min-height: 100svh;
          overflow: hidden;
          background: #d9eaa0;
          display: flex;
          flex-direction: column;
        }

        /* Mobile: text sits at top, product below */
        .avo-hero__text {
          position: relative;
          z-index: 7;
          padding: 100px 24px 20px 24px;  /* top clears navbar */
          max-width: 100%;
          width: 100%;
        }

        /* Mobile: product carousel below text */
        .avo-hero__product-wrap {
          position: relative;
          z-index: 5;
          flex: 1;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          padding-bottom: 80px; /* clear slope */
        }

        /* Mobile headline size */
        .avo-hero__headline {
          font-size: clamp(1.8rem, 7vw, 2.4rem) !important;
          margin-bottom: 16px !important;
        }

        /* Mobile buttons: stack */
        .avo-hero__buttons {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 280px;
        }
        .avo-hero__buttons .btn {
          width: 100%;
          text-align: center;
          justify-content: center;
        }

        /* Mobile product image */
        .avo-hero__product-img {
          width: 55vw;
          max-width: 220px;
          height: auto;
          object-fit: contain;
          animation: hero-breathe 4.5s ease-in-out infinite;
        }

        /* Mobile dots: bottom center */
        .avo-hero__dots {
          position: absolute;
          bottom: 90px;
          right: 16px;
          z-index: 9;
          display: flex;
          flex-direction: column;
          gap: 8px;
          align-items: center;
        }

        /* ── DESKTOP (768px+) ── */
        @media (min-width: 768px) {
          .avo-hero {
            display: block;          /* back to absolute positioning */
            height: 100vh;
            min-height: 100vh;
          }

          .avo-hero__text {
            position: absolute;
            left:   ${_.left};
            bottom: ${_.bottom};
            padding: 0;
            max-width: 520px;
            width: auto;
          }

          .avo-hero__headline {
            font-size: clamp(2.4rem, 5vw, 4.2rem) !important;
            margin-bottom: 28px !important;
          }

          .avo-hero__buttons {
            flex-direction: row;
            width: auto;
            max-width: none;
          }
          .avo-hero__buttons .btn {
            width: auto;
          }

          .avo-hero__product-wrap {
            position: absolute;
            right:  ${k.right};
            bottom: ${k.bottom};
            height: ${k.height};
            width: auto;
            flex: unset;
            align-items: unset;
            justify-content: unset;
            padding-bottom: 0;
          }

          .avo-hero__product-img {
            width: auto;
            height: 100%;
            max-width: none;
            animation: hero-breathe 4.5s ease-in-out infinite;
          }

          .avo-hero__dots {
            right: 20px;
            bottom: calc(${C.height} + 16px);
            flex-direction: column;
          }
        }
      `}),e.jsxs("div",{className:"page-enter",children:[e.jsxs("section",{className:"avo-hero",style:{marginBottom:0,paddingBottom:0},children:[e.jsx("img",{src:z.src,alt:"","aria-hidden":"true",style:{position:"absolute",top:0,left:0,width:"100%",height:"100%",objectFit:"cover",objectPosition:z.objectPosition,zIndex:1,pointerEvents:"none",display:"block"}}),e.jsx(A,{}),e.jsx("div",{style:{position:"absolute",inset:0,zIndex:3,pointerEvents:"none",background:`linear-gradient(to right,
              rgba(255,255,255,${v.opacityLeft})    0%,
              rgba(255,255,255,${v.opacityMidLeft}) 0%,
              rgba(255,255,255,${v.opacityMid})     100%,
              rgba(255,255,255,${v.opacityRight})   ${v.clearAt},
              rgba(255,255,255,0) 100%)`}}),e.jsx("div",{style:{position:"absolute",bottom:-2,left:0,right:0,width:"100%",height:C.height,zIndex:6,pointerEvents:"none",lineHeight:0,overflow:"hidden",background:"transparent"},children:e.jsx("svg",{viewBox:"0 0 1440 222",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",style:{display:"block",width:"100%",height:"calc(100% + 4px)"},children:e.jsx("path",{d:"M0,222 L0,140 C120,90 240,60 400,80 C560,100 680,160 840,155 C1000,150 1120,95 1280,75 C1360,65 1400,68 1440,72 L1440,222 Z",fill:"#b6c548"})})}),e.jsxs("div",{className:"avo-hero__text",style:{opacity:r?1:0,transform:r?"translateY(0)":"translateY(22px)",transition:"opacity 0.7s ease 0.2s, transform 0.7s ease 0.2s"},children:[e.jsx("p",{style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontSize:"clamp(11px, 1.1vw, 14px)",fontWeight:800,letterSpacing:"0.04em",color:"#b5c448",margin:"0 0 6px 2px",textShadow:l},children:"“Happiness in Avocado”"}),e.jsxs("h1",{className:"avo-hero__headline",style:{fontFamily:"'BubbleboddyNeue', 'Nunito', sans-serif",fontWeight:800,lineHeight:1.08,letterSpacing:"0.01em",color:"#b5c448",background:"none",WebkitTextFillColor:"#b5c448",animation:"none",textShadow:s},children:["Home of No. 1",e.jsx("br",{}),"Avocado-Based",e.jsx("br",{}),"Desserts"]}),e.jsxs("div",{className:"avo-hero__buttons",children:[e.jsx(h,{to:"/menu",className:"btn btn-white",children:"Our Menu"}),e.jsx(h,{to:"/our-stores",className:"btn btn-olive",children:"Our Stores"})]})]})]}),e.jsx("section",{style:{background:"#e8f0c8",padding:0,margin:0,lineHeight:0},children:e.jsxs("div",{style:{position:"relative",width:"100%",lineHeight:0},children:[e.jsx("img",{src:"/avofaves.png",alt:"Avo-Faves — Avocado Lover, Naked Light Ice Cream, Avocado Shake",style:{width:"100%",display:"block",objectFit:"cover"}}),e.jsx("div",{style:{position:"absolute",bottom:i.posBottom,left:i.posLeft,transform:"translateX(-50%)",zIndex:5},children:e.jsx(h,{to:"/menu",style:{display:"inline-flex",alignItems:"center",justifyContent:"center",padding:`${i.paddingY} ${i.paddingX}`,borderRadius:i.borderRadius,background:i.background,color:i.color,fontFamily:i.fontFamily,fontSize:"clamp(1rem,1.6vw,1.3rem)",fontWeight:"bold",textDecoration:"none",border:`${i.borderWidth} solid ${i.borderColor}`,boxShadow:i.shadow,backdropFilter:i.blur,letterSpacing:"0.01em",whiteSpace:"nowrap",transition:"all 0.2s"},onMouseEnter:t=>{t.currentTarget.style.background=i.hoverBg,t.currentTarget.style.color=i.hoverColor,t.currentTarget.style.borderColor=i.hoverBorder},onMouseLeave:t=>{t.currentTarget.style.background=i.background,t.currentTarget.style.color=i.color,t.currentTarget.style.borderColor=i.borderColor},children:i.label})})]})}),e.jsx($,{}),e.jsx(I,{fromColor:"#e8f0c8",toColor:n.news,height:56}),e.jsx("section",{style:{background:n.news,padding:"64px 32px 80px"},children:e.jsxs("div",{style:{maxWidth:"1200px",margin:"0 auto"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"flex-end",justifyContent:"space-between",flexWrap:"wrap",gap:"12px",marginBottom:"32px"},children:[e.jsxs("div",{children:[e.jsx("h2",{className:"section-title",style:{color:"#b6c548",margin:"0 0 6px"},children:"What's New"}),e.jsx("p",{className:"section-sub",style:{color:"rgba(138,95,60,.65)",margin:0},children:"Latest news and updates from Avocadoria"})]}),e.jsx(h,{to:"/about#whats-new",style:{fontFamily:"Nunito, sans-serif",fontSize:"13px",fontWeight:"700",color:"#b6c548",textDecoration:"none",whiteSpace:"nowrap",display:"flex",alignItems:"center",gap:"4px",paddingBottom:"2px",borderBottom:"2px solid rgba(182,197,72,0.3)",transition:"border-color 0.2s"},onMouseEnter:t=>t.currentTarget.style.borderColor="#b6c548",onMouseLeave:t=>t.currentTarget.style.borderColor="rgba(182,197,72,0.3)",children:"View all posts →"})]}),T.length>0?e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:"20px"},children:T.slice(0,3).map(t=>e.jsx(h,{to:"/about#whats-new",style:{textDecoration:"none"},children:e.jsxs("div",{style:{background:"rgba(255,255,255,0.85)",border:"1.5px solid rgba(182,197,72,0.2)",borderRadius:"16px",padding:"24px",display:"flex",flexDirection:"column",gap:"10px",height:"100%",boxSizing:"border-box",transition:"box-shadow 0.2s, border-color 0.2s"},onMouseEnter:c=>{c.currentTarget.style.boxShadow="0 6px 24px rgba(58,107,53,0.10)",c.currentTarget.style.borderColor="rgba(182,197,72,0.5)"},onMouseLeave:c=>{c.currentTarget.style.boxShadow="none",c.currentTarget.style.borderColor="rgba(182,197,72,0.2)"},children:[e.jsx("div",{style:{width:"100%",height:"140px",borderRadius:"10px",background:"rgba(182,197,72,0.10)",overflow:"hidden",display:"flex",alignItems:"center",justifyContent:"center"},children:t.image?e.jsx("img",{src:t.image,alt:t.title,style:{width:"100%",height:"100%",objectFit:"cover"}}):e.jsx("span",{style:{fontSize:"36px"},children:"🥑"})}),e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"8px",flexWrap:"wrap"},children:[e.jsx("span",{style:{background:t.featured?"#b6c548":"rgba(182,197,72,0.15)",color:t.featured?"#fff":"#3a6b35",fontFamily:"Nunito,sans-serif",fontSize:"10px",fontWeight:"800",letterSpacing:"0.06em",textTransform:"uppercase",padding:"3px 10px",borderRadius:"999px"},children:t.featured?"Featured":t.category}),e.jsx("span",{style:{fontFamily:"Nunito,sans-serif",fontSize:"11px",color:"rgba(138,95,60,0.5)"},children:new Date(t.date).toLocaleDateString("en-PH",{month:"short",day:"numeric",year:"numeric"})})]}),e.jsx("h3",{style:{fontFamily:"Nunito,sans-serif",fontWeight:"800",fontSize:"clamp(14px,1.4vw,16px)",color:"#3a6b35",margin:0,lineHeight:1.35},children:t.title}),e.jsx("p",{style:{fontFamily:"Nunito,sans-serif",fontSize:"13px",color:"rgba(138,95,60,0.8)",lineHeight:1.6,margin:0,display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden"},children:t.excerpt}),e.jsx("span",{style:{fontFamily:"Nunito,sans-serif",fontSize:"12px",fontWeight:"700",color:"#b6c548",marginTop:"auto"},children:"Read more →"})]})},t.id))}):e.jsxs("div",{style:{textAlign:"center",padding:"48px 0"},children:[e.jsx("span",{style:{fontSize:"40px"},children:"🥑"}),e.jsx("p",{style:{fontFamily:"Nunito,sans-serif",color:"rgba(138,95,60,0.5)",marginTop:"12px"},children:"No posts yet — check back soon!"})]})]})})]})]})}export{W as default};
