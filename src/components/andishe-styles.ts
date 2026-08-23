export const pageCss = String.raw`
@property --h  { syntax:'<number>'; inherits:false; initial-value:200; }
@property --c1 { syntax:'<color>';  inherits:true;  initial-value:#34d399; }
@property --c2 { syntax:'<color>';  inherits:true;  initial-value:#10b981; }
@property --c3 { syntax:'<color>';  inherits:true;  initial-value:#059669; }

body[data-theme="t1"]{ --c1:#6ee7b7; --c2:#10b981; --c3:#047857; --c2a:16,185,129; }
body[data-theme="t2"]{ --c1:#93c5fd; --c2:#3b82f6; --c3:#1d4ed8; --c2a:59,130,246; }
body[data-theme="t3"]{ --c1:#fde68a; --c2:#f59e0b; --c3:#b45309; --c2a:245,158,11; }
body[data-theme="t4"]{ --c1:#f9a8d4; --c2:#ec4899; --c3:#be185d; --c2a:236,72,153; }
body[data-theme="t5"]{ --c1:#7dd3fc; --c2:#0ea5e9; --c3:#0369a1; --c2a:14,165,233; }

html,body{ height:100%; }
body{
  font-family:'Vazirmatn', Tahoma, sans-serif;
  background:#04050c; color:#e8edf7; overflow:hidden; direction:rtl;
  transition:--c1 .8s, --c2 .8s, --c3 .8s;
}

#stars{ position:fixed; inset:0; z-index:0; }
.vignette{ position:fixed; inset:0; z-index:3; pointer-events:none;
  background:radial-gradient(125% 95% at 50% 40%, transparent 62%, rgba(2,3,9,.5) 100%); }
.aurora{ position:fixed; z-index:0; border-radius:50%; filter:blur(110px); opacity:.5;
  mix-blend-mode:screen; transition:background .8s; }
.aurora.a1{ width:56vw; height:56vw; top:-22vw; right:-14vw;
  background:radial-gradient(circle at 35% 35%, var(--c2), transparent 65%); animation:drift1 16s ease-in-out infinite alternate; }
.aurora.a2{ width:48vw; height:48vw; bottom:-20vw; left:-12vw;
  background:radial-gradient(circle at 60% 60%, var(--c3), transparent 65%); animation:drift2 20s ease-in-out infinite alternate; }
@keyframes drift1{ to{ transform:translate(-6vw,7vh) scale(1.15) rotate(20deg);} }
@keyframes drift2{ to{ transform:translate(7vw,-5vh) scale(.9) rotate(-15deg);} }

.grid-floor{ position:fixed; z-index:0; left:50%; bottom:-16vh; width:170vw; height:78vh;
  transform:translateX(-50%) perspective(700px) rotateX(74deg);
  background:
    repeating-linear-gradient(90deg, rgba(var(--c2a),.28) 0 2px, transparent 2px 64px),
    repeating-linear-gradient(0deg,  rgba(var(--c2a),.28) 0 2px, transparent 2px 64px);
  -webkit-mask-image:radial-gradient(60% 80% at 50% 0%, #000 0%, transparent 78%);
          mask-image:radial-gradient(60% 80% at 50% 0%, #000 0%, transparent 78%);
  animation:gridmove 2.6s linear infinite; opacity:.6; }
@keyframes gridmove{ to{ background-position:0 64px, 0 64px; } }

#app{ position:fixed; z-index:2; left:50%; top:50%; width:1280px; height:900px;
  transform:translate(-50%,-50%) scale(var(--s,1));
  display:flex; flex-direction:column; align-items:center; }

header{ text-align:center; padding-top:12px; user-select:none; }
.logo-wrap{ width:108px; height:108px; margin:0 auto 6px; position:relative; }
.logo-wrap::before{ content:''; position:absolute; inset:-22px; border-radius:50%; z-index:-1;
  background:radial-gradient(circle, rgba(var(--c2a),.5), transparent 70%);
  filter:blur(18px); animation:pulse 3.2s ease-in-out infinite; }
.logo-wrap img{ width:100%; height:100%; object-fit:contain;
  filter:drop-shadow(0 10px 24px rgba(0,0,0,.6));
  animation:logofloat 5s ease-in-out infinite; }
@keyframes logofloat{ 0%,100%{ transform:translateY(0) rotate(-2deg);} 50%{ transform:translateY(-9px) rotate(2deg);} }
@keyframes pulse{ 0%,100%{ opacity:.55; transform:scale(1);} 50%{ opacity:1; transform:scale(1.18);} }

.brand-en{ direction:ltr; font-family:'Audiowide','Space Grotesk',sans-serif; line-height:1.05; }
.be-1{ display:block; font-weight:400; font-size:33px; letter-spacing:.26em; margin-right:-.26em; color:#fff;
  text-shadow:0 1px 0 #b9c4dd, 0 2px 0 #93a1c2, 0 3px 0 #6f7da0, 0 4px 0 #4d5a7c,
              0 5px 2px rgba(0,0,0,.5), 0 10px 24px rgba(0,0,0,.65); }
.be-2{ display:block; margin-top:8px; font-weight:700; font-size:19px; letter-spacing:.58em; margin-right:-.58em;
  background:linear-gradient(90deg, var(--c1), var(--c2) 30%, #fff 50%, var(--c3) 70%, var(--c1));
  background-size:250% 100%;
  -webkit-background-clip:text; background-clip:text; color:transparent;
  animation:shine 5s linear infinite;
  filter:drop-shadow(0 4px 10px rgba(var(--c2a),.45)); }
.be-2 b{ font-weight:900; }
@keyframes shine{ to{ background-position:250% 0; } }

.headline{ margin-top:14px; font-weight:900; font-size:54px;
  background:linear-gradient(180deg, #fff 20%, var(--c1) 55%, var(--c3) 100%);
  -webkit-background-clip:text; background-clip:text; color:transparent;
  filter:drop-shadow(0 3px 0 rgba(0,0,0,.55)) drop-shadow(0 14px 26px rgba(var(--c2a),.35)); }
.sub{ margin-top:10px; font-size:15.5px; color:#aab6d3; }
.sub b{ color:var(--c1); }

.scene{ position:relative; flex:1; width:100%; }

.chips{ position:absolute; right:6px; top:26px; display:flex; flex-direction:column; gap:16px; z-index:3; pointer-events:none; }
.chip{ display:flex; align-items:center; gap:12px; padding:14px 20px; border-radius:17px;
  background:linear-gradient(150deg, rgba(24,32,56,.92), rgba(11,16,30,.92));
  border:1px solid rgba(var(--c2a),.6); backdrop-filter:blur(10px);
  box-shadow:0 14px 30px rgba(0,0,0,.55), 0 0 30px rgba(var(--c2a),.3), inset 0 1px 0 rgba(255,255,255,.14);
  animation:chipfloat 4.5s ease-in-out infinite; transition:border-color .8s, box-shadow .8s; }
.chip:nth-child(2){ animation-delay:.8s; margin-right:24px; }
.chip:nth-child(3){ animation-delay:1.6s; }
@keyframes chipfloat{ 0%,100%{ translate:0 0; } 50%{ translate:0 -9px; } }
.chip .ic{ width:42px; height:42px; flex:none; border-radius:12px; display:grid; place-items:center;
  font-size:21px; background:linear-gradient(150deg, rgba(var(--c2a),.5), rgba(var(--c2a),.12));
  border:1px solid rgba(var(--c2a),.65); box-shadow:0 0 18px rgba(var(--c2a),.5); }
.chip b{ display:block; font-size:15.5px; color:#fff; text-shadow:0 0 14px rgba(var(--c2a),.65); }
.chip span{ font-size:11.5px; color:#aeb9d6; }

.preview{ position:absolute; left:0px; top:12px; width:392px; z-index:3;
  transform:perspective(1100px) rotateX(7deg) rotateY(17deg) rotateZ(-1.5deg);
  transform-style:preserve-3d; border-radius:16px; overflow:hidden;
  background:#0c1120; border:1px solid rgba(255,255,255,.12);
  box-shadow:0 34px 60px rgba(0,0,0,.72), 0 0 70px rgba(var(--c2a),.35), inset 0 1px 0 rgba(255,255,255,.16);
  transition:box-shadow .8s; }
.pv-bar{ display:flex; align-items:center; gap:7px; padding:10px 14px; direction:ltr;
  background:linear-gradient(180deg,#141b30,#0e1425); border-bottom:1px solid rgba(255,255,255,.08); }
.pv-bar i{ width:11px; height:11px; border-radius:50%; }
.pv-bar i:nth-child(1){ background:#ff5f57; } .pv-bar i:nth-child(2){ background:#febc2e; } .pv-bar i:nth-child(3){ background:#28c840; }
.pv-url{ margin-left:10px; flex:1; font:500 11.5px 'Space Grotesk'; color:#8f9dbd;
  background:#070b16; border:1px solid rgba(255,255,255,.07); border-radius:99px; padding:4px 12px; text-align:center; }
.pv-body{ position:relative; height:224px; overflow:hidden; background:#111; }
.pv-body img{ width:100%; height:100%; object-fit:cover; object-position:top;
  transition:opacity .28s ease, transform .28s ease; display:block; }
.preview.swap .pv-body img{ opacity:0; transform:scale(1.06) rotate(1deg); }
.pv-shine{ position:absolute; inset:0; pointer-events:none;
  background:linear-gradient(115deg, transparent 30%, rgba(255,255,255,.16) 48%, transparent 62%);
  background-size:250% 100%; animation:shine 4.5s linear infinite; }
.pv-scan{ position:absolute; left:0; right:0; height:64px; pointer-events:none;
  background:linear-gradient(180deg, transparent, rgba(var(--c2a),.22), transparent);
  animation:scan 3.4s linear infinite; }
@keyframes scan{ from{ top:-70px; } to{ top:110%; } }
.pv-foot{ display:flex; align-items:center; gap:10px; padding:11px 14px;
  background:linear-gradient(180deg,#101728,#0b101e); border-top:1px solid rgba(255,255,255,.07); font-size:13px; }
.pv-ic{ font-size:19px; }
.pv-name{ font-weight:800; color:#fff; }
.pv-desc{ color:#93a0bf; font-size:11.5px; }
.pv-count{ margin-right:auto; direction:ltr; font:700 12px 'Space Grotesk'; color:var(--c1);
  background:rgba(var(--c2a),.14); border:1px solid rgba(var(--c2a),.35); padding:3px 10px; border-radius:99px; }
.pv-link{ color:var(--c1); text-decoration:none; font-weight:700; font-size:12.5px; white-space:nowrap; }
.pv-link:hover{ text-decoration:underline; }

/* ============================================================
   KEYBOARD — deep 3D low-profile aluminium deck w/ sculpted caps
   ============================================================ */
.kb-perspective{ position:absolute; bottom:8px; left:50%; transform:translateX(-50%);
  perspective:1250px; perspective-origin:50% -6%; z-index:2; }
.kb-tilt{ transform-style:preserve-3d; will-change:transform;
  transform:rotateX(50deg) rotateZ(-24deg); }

.kb{ position:relative; display:flex; flex-direction:column; gap:9px;
  padding:26px 30px 34px; border-radius:26px;
  transform-style:preserve-3d;
  background:
    linear-gradient(150deg, rgba(255,255,255,.10), rgba(255,255,255,0) 32%),
    linear-gradient(160deg, #232a3d 0%, #131829 45%, #090c17 100%);
  border:1px solid rgba(255,255,255,.14);
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.20),
    inset 0 -14px 30px rgba(0,0,0,.7),
    0 60px 90px rgba(0,0,0,.85),
    0 0 130px rgba(var(--c2a),.45); }

/* chassis body (extruded sides) */
.kb::before{ content:''; position:absolute; inset:0; border-radius:26px;
  background:linear-gradient(180deg,#11162a,#04060d);
  transform:translateZ(-42px);
  box-shadow:0 40px 60px rgba(0,0,0,.85); }
/* RGB underglow strip */
.kb::after{ content:''; position:absolute; left:5%; right:5%; bottom:-6px; height:10px; border-radius:99px;
  background:linear-gradient(90deg, var(--c1), var(--c2) 50%, var(--c3));
  filter:blur(3px); transform:translateZ(-20px);
  box-shadow:0 0 30px var(--c2), 0 0 80px rgba(var(--c2a),.7); transition:.8s; }
/* inner recessed deck plate */
.kb-deck{ position:absolute; inset:16px 20px 24px; border-radius:18px; pointer-events:none;
  transform:translateZ(4px);
  background:linear-gradient(160deg, rgba(255,255,255,.05), rgba(0,0,0,.35));
  box-shadow:inset 0 2px 6px rgba(0,0,0,.8), inset 0 -1px 0 rgba(255,255,255,.08),
             0 0 40px rgba(var(--c2a),.18); }

.krow{ display:flex; gap:9px; transform-style:preserve-3d; position:relative; z-index:1; }

.key{
  --h:200; --lift:0px; --near:0;
  height:58px; border-radius:11px; flex:none; position:relative; padding:0;
  transform-style:preserve-3d; background:transparent; border:0; cursor:pointer; user-select:none;
  transform:translateZ(calc(18px + var(--lift)));
  transition:transform .18s cubic-bezier(.2,.8,.3,1);
  animation:huewave 9s linear infinite, keyin .6s backwards cubic-bezier(.2,.9,.3,1.35);
  animation-delay:var(--d), var(--in);
}
@keyframes huewave{ to{ --h:560; } }
@keyframes keyin{ from{ opacity:0; transform:translateZ(140px) scale(.5);} }

/* keycap top face */
.key .cap{
  position:absolute; inset:0; border-radius:11px;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:2px;
  font:600 14px/1 'Space Grotesk',sans-serif; color:#a8bade;
  background:
    radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,.22), transparent 55%),
    linear-gradient(180deg,#2b344c 0%,#1a2135 45%,#10152444 100%),
    linear-gradient(180deg,#212940,#0d1220);
  border:1px solid rgba(255,255,255,.12);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.30),
    inset 0 -6px 10px rgba(0,0,0,.6),
    0 0 calc(14px + 34px * var(--near)) hsl(var(--h) 95% 62% / calc(.18 + .55 * var(--near)));
  text-shadow:0 0 10px hsl(var(--h) 95% 70% / calc(.4 + .5 * var(--near)));
  transition:color .2s, box-shadow .3s;
}
/* stem / side walls of the cap */
.key::before{ content:''; position:absolute; inset:3px 2px -1px; border-radius:10px;
  transform:translateZ(-9px);
  background:linear-gradient(180deg,#141a2b,#070a13);
  box-shadow:0 0 0 1px rgba(0,0,0,.6); }
/* switch shadow on the plate */
.key::after{ content:''; position:absolute; inset:2px; border-radius:12px;
  transform:translateZ(-19px);
  background:#02040a; filter:blur(3px); opacity:calc(.65 + .25 * var(--near)); }

.key:hover .cap, .key:focus-visible .cap{ color:#fff; }
.key.pressed{ transform:translateZ(5px); transition-duration:.05s; }
.key.pressed .cap{ color:#fff;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.2), inset 0 -3px 6px rgba(0,0,0,.7),
    0 0 64px hsl(var(--h) 95% 65% / .98), 0 0 130px hsl(var(--h) 95% 60% / .45);
  animation:pressFlash .42s ease-out; }
@keyframes pressFlash{
  0%{ box-shadow:inset 0 0 0 rgba(255,255,255,0), 0 0 0 0 hsl(var(--h) 95% 70% / 1); }
  25%{ box-shadow:inset 0 0 24px rgba(255,255,255,.65), 0 0 80px hsl(var(--h) 95% 66% / 1); }
  100%{ box-shadow:inset 0 1px 0 rgba(255,255,255,.2), inset 0 -3px 6px rgba(0,0,0,.7), 0 0 64px hsl(var(--h) 95% 65% / .98); }
}
.key .space-label{ font:700 10px 'Space Grotesk'; letter-spacing:.35em; color:#8695ba; }

/* project keys */
.key.proj{ width:82px; height:64px; transform:translateZ(calc(24px + var(--lift))); }
.key.proj .cap{
  border-radius:13px; color:#fff; font-family:'Vazirmatn'; font-weight:800; font-size:12.5px; gap:3px;
  background:
    radial-gradient(120% 90% at 50% 0%, rgba(255,255,255,.35), transparent 58%),
    linear-gradient(170deg, var(--pc), color-mix(in srgb, var(--pc) 45%, #080c16));
  border:1px solid color-mix(in srgb, var(--pc) 70%, #fff);
  text-shadow:0 1px 3px rgba(0,0,0,.7);
  box-shadow:
    inset 0 1px 0 rgba(255,255,255,.45),
    inset 0 -7px 12px rgba(0,0,0,.4),
    0 0 calc(22px + 40px * var(--near)) var(--pc); }
.key.proj::before{ background:linear-gradient(180deg, color-mix(in srgb, var(--pc) 45%, #0a0e1a), #05070f); }
.key.proj .pic{ font-size:19px; filter:drop-shadow(0 3px 5px rgba(0,0,0,.6)); }
.key.proj.pressed{ transform:translateZ(8px); }
.key.proj.pressed .cap{ animation:pressFlashPc .42s ease-out; }
@keyframes pressFlashPc{
  0%{ box-shadow:inset 0 0 0 rgba(255,255,255,0), 0 0 0 0 var(--pc); }
  25%{ box-shadow:inset 0 0 24px rgba(255,255,255,.6), 0 0 80px var(--pc); }
  100%{ box-shadow:inset 0 1px 0 rgba(255,255,255,.45), inset 0 -7px 12px rgba(0,0,0,.4), 0 0 60px var(--pc); }
}
.key.proj.active .cap{ outline:2.5px solid color-mix(in srgb, var(--pc) 75%, #fff); outline-offset:2px; }
.key.proj.active{ animation:huewave 9s linear infinite, projfloat 2.2s ease-in-out infinite; }
@keyframes projfloat{
  0%,100%{ transform:translateZ(calc(26px + var(--lift))); }
  50%{ transform:translateZ(calc(42px + var(--lift))); } }

.actions{ display:flex; flex-direction:column; align-items:center; gap:13px; padding-bottom:14px; z-index:4; position:relative; }
.btn-row{ display:flex; gap:34px; }
.btn3d{ position:relative; display:inline-flex; align-items:center; gap:12px;
  padding:17px 34px 19px; border-radius:18px; text-decoration:none;
  font:900 20px 'Vazirmatn'; color:#fff; letter-spacing:.02em;
  background:linear-gradient(180deg, var(--b1), var(--b2));
  border:1px solid rgba(255,255,255,.28);
  box-shadow:
    inset 0 2px 0 rgba(255,255,255,.4), inset 0 -6px 10px rgba(0,0,0,.3),
    0 7px 0 var(--b3), 0 9px 2px rgba(0,0,0,.45),
    0 20px 34px rgba(0,0,0,.55), 0 0 44px rgba(var(--c2a),.35);
  transform:perspective(700px) rotateX(11deg);
  transition:transform .16s ease, box-shadow .16s ease, filter .3s;
  overflow:hidden; cursor:pointer; }
.btn3d::after{ content:''; position:absolute; inset:0;
  background:linear-gradient(115deg, transparent 32%, rgba(255,255,255,.38) 48%, transparent 64%);
  background-size:260% 100%; animation:shine 3.6s linear infinite; }
.btn3d:hover{ transform:perspective(700px) rotateX(11deg) translateY(-5px);
  box-shadow:inset 0 2px 0 rgba(255,255,255,.45), inset 0 -6px 10px rgba(0,0,0,.25),
    0 12px 0 var(--b3), 0 14px 3px rgba(0,0,0,.4), 0 28px 44px rgba(0,0,0,.5), 0 0 64px rgba(var(--c2a),.55); }
.btn3d:active{ transform:perspective(700px) rotateX(11deg) translateY(5px);
  box-shadow:inset 0 2px 0 rgba(255,255,255,.3), inset 0 -3px 6px rgba(0,0,0,.35),
    0 2px 0 var(--b3), 0 4px 6px rgba(0,0,0,.5), 0 0 30px rgba(var(--c2a),.4); }
.btn3d svg{ width:24px; height:24px; filter:drop-shadow(0 3px 4px rgba(0,0,0,.45)); }
.btn3d.b1{ --b1:var(--c1); --b2:var(--c2); --b3:var(--c3); }
.btn3d.b2{ --b1:var(--c2); --b2:var(--c3); --b3:color-mix(in srgb, var(--c3) 60%, #04060c); }
.btn3d.b3{ --b1:#f8fafc; --b2:#cbd5e1; --b3:#8b98ad; color:#0b1020; text-shadow:none;
  background:linear-gradient(180deg,#ffffff,#c9d4e4); }
.btn3d.b3 svg{ color:#0b1020; }

.credit{ font-size:12.5px; color:#6b7897; direction:ltr; font-family:'Space Grotesk'; letter-spacing:.14em; }
.credit a{ color:#93a2c4; text-decoration:none; }
.credit a:hover{ color:var(--c1); }

#toast{ position:fixed; bottom:26px; left:50%; transform:translate(-50%,80px); z-index:20;
  display:flex; align-items:center; gap:10px; padding:11px 22px; border-radius:99px;
  background:rgba(8,11,22,.85); border:1px solid rgba(var(--c2a),.5); backdrop-filter:blur(8px);
  font-weight:800; font-size:14.5px; box-shadow:0 12px 34px rgba(0,0,0,.55), 0 0 34px rgba(var(--c2a),.3);
  opacity:0; transition:.45s cubic-bezier(.2,.9,.3,1.3); pointer-events:none; }
#toast.show{ transform:translate(-50%,0); opacity:1; }
#toast .dot{ width:13px; height:13px; border-radius:50%; background:var(--c2); box-shadow:0 0 14px var(--c2); }

#intro{ position:fixed; inset:0; z-index:50; background:#04050c;
  display:flex; flex-direction:column; align-items:center; justify-content:center; gap:22px;
  transition:opacity .7s, visibility .7s; }
#intro.done{ opacity:0; visibility:hidden; }
#intro img{ width:110px; animation:logofloat 1.6s ease-in-out infinite; }
#intro .t{ font-family:'Orbitron'; font-weight:900; font-size:22px; letter-spacing:.5em; margin-right:-.5em;
  color:#fff; text-shadow:0 0 30px rgba(var(--c2a),.8); direction:ltr; }
#intro .bar{ width:220px; height:3px; border-radius:99px; background:#141a2b; overflow:hidden; }
#intro .bar i{ display:block; height:100%; width:40%; border-radius:99px;
  background:linear-gradient(90deg, var(--c1), var(--c2)); animation:load 1.1s ease-in-out infinite; }
@keyframes load{ 0%{ transform:translateX(260%);} 100%{ transform:translateX(-260%);} }

header, .scene, .actions{ opacity:0; animation:reveal .9s .35s forwards cubic-bezier(.2,.8,.3,1); }
.scene{ animation-delay:.55s; } .actions{ animation-delay:.75s; }
@keyframes reveal{ from{ opacity:0; transform:translateY(26px);} to{ opacity:1; transform:none;} }

@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{ animation-duration:.01s !important; animation-iteration-count:1 !important; }
}

@media (max-width: 900px){
  html, body{ overflow-y:auto; }
  body{ overflow-x:hidden; }
  #app{ position:relative; left:auto; top:auto; transform:none !important;
        width:100%; height:auto; min-height:100svh; }
  header{ padding:26px 14px 2px; }
  .logo-wrap{ width:82px; height:82px; }
  .be-1{ font-size:24px; letter-spacing:.3em; margin-right:-.3em; }
  .be-2{ font-size:13.5px; letter-spacing:.42em; margin-right:-.42em; }
  .headline{ font-size:36px; margin-top:12px; }
  .sub{ font-size:13px; padding:0 20px; }
  .scene{ padding:12px 10px 0; }
  .preview{ position:relative; left:auto; top:auto; width:min(440px,100%); margin:0 auto; transform:none; }
  .pv-body{ height:196px; }
  .chips{ position:static; right:auto; top:auto; flex-direction:row; flex-wrap:wrap;
          justify-content:center; gap:10px; padding:16px 6px 2px; }
  .chip:nth-child(2){ margin-right:0; }
  .chip{ padding:10px 14px; gap:9px; }
  .chip .ic{ width:34px; height:34px; font-size:17px; }
  .chip b{ font-size:13px; } .chip span{ font-size:10px; }
  .kb-perspective{ position:relative; bottom:auto; left:auto;
                   transform:scale(var(--kbs, .42)); transform-origin:top center;
                   margin:8px auto 0 calc((1 - var(--kbs, .42)) * -410px + 36px); }
  .actions{ padding:20px 14px 34px; }
  .btn-row{ flex-direction:column; width:min(360px,92%); gap:18px; }
  .btn3d{ justify-content:center; width:100%; padding:15px 20px; font-size:18px; }
  .grid-floor{ display:none; }
  .aurora{ filter:blur(70px); }
}
`;
