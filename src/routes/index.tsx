import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import p1 from "@/assets/p1.jpg";
import p2 from "@/assets/p2.jpg";
import p3 from "@/assets/p3.jpg";
import p4 from "@/assets/p4.jpg";
import p5 from "@/assets/p5.jpg";
import { pageCss } from "@/components/andishe-styles";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "اندیشه آنلاین | هر کلید، یک پروژه — طراحی وب سه‌بعدی" },
      {
        name: "description",
        content:
          "اندیشه آنلاین، استودیو طراحی وب سه‌بعدی. با هر کلید کیبورد سه‌بعدی، یک نمونه‌کار و پالت رنگ تازه ببینید.",
      },
      { property: "og:title", content: "اندیشه آنلاین | هر کلید، یک پروژه" },
      {
        property: "og:description",
        content: "استودیو طراحی وب سه‌بعدی — کیبورد تعاملی نمونه‌کارها.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type Project = {
  theme: string;
  pc: string;
  icon: string;
  name: string;
  desc: string;
  img: string;
  pal: string;
};

const PROJECTS: Project[] = [
  { theme: "t1", pc: "#10b981", icon: "🎓", name: "سایت آموزشی", desc: "پلتفرم آموزش آنلاین", img: p1, pal: "زمرد" },
  { theme: "t2", pc: "#3b82f6", icon: "🌍", name: "سایت خارجی", desc: "پروژه بین‌المللی", img: p2, pal: "اقیانوس" },
  { theme: "t3", pc: "#f59e0b", icon: "🛠️", name: "سایت خدماتی", desc: "خدمات حرفه‌ای", img: p3, pal: "کهربا" },
  { theme: "t4", pc: "#ec4899", icon: "🧑‍💻", name: "سایت شخصی", desc: "برندینگ شخصی", img: p4, pal: "سرخاب" },
  { theme: "t5", pc: "#0ea5e9", icon: "🏢", name: "سایت شرکتی", desc: "شرکتیِ کلاس‌بالا", img: p5, pal: "فیروزه" },
];

const U = 58;
const GAP = 9;
const ROWS: Array<Array<[string, number?]>> = [
  [["ESC", 1.25], ["P1"], ["P2"], ["P3"], ["P4"], ["P5"], ["—", 1], ["+", 1], ["DEL ⌫", 1.5]],
  [["TAB ⇥", 1.5], ["Q"], ["W"], ["E"], ["R"], ["T"], ["Y"], ["U"], ["I"], ["O"], ["P"], ["{", 1], ["}", 1], ["\\", 1.5]],
  [["CAPS", 1.75], ["A"], ["S"], ["D"], ["F"], ["G"], ["H"], ["J"], ["K"], ["L"], [":", 1], ['"', 1], ["ENTER ⏎", 1.75]],
  [["SHIFT ⇧", 2.25], ["Z"], ["X"], ["C"], ["V"], ["B"], ["N"], ["M"], ["<", 1], [">", 1], ["/", 1], ["⇧", 2.25]],
  [["CTRL", 1.25], ["ALT", 1.25], ["CMD", 1.25], ["ANDISHEONLINE", 6.25], ["ALT", 1.25], ["FN", 1.25], ["◀"], ["▼"], ["▶"]],
];

function Index() {
  const [current, setCurrent] = useState(0);
  const [swap, setSwap] = useState(false);
  const [shown, setShown] = useState<Project>(PROJECTS[0]!);
  const [toast, setToast] = useState<string | null>(null);
  const [intro, setIntro] = useState(true);

  const kbTilt = useRef<HTMLDivElement>(null);
  const kbRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const starsRef = useRef<HTMLCanvasElement>(null);
  const appRef = useRef<HTMLDivElement>(null);
  const keyEls = useRef<Record<string, HTMLButtonElement | null>>({});
  const audioRef = useRef<AudioContext | null>(null);
  const swapTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ---- sound ---- */
  const blip = (freq: number) => {
    try {
      const AC = audioRef.current ?? new AudioContext();
      audioRef.current = AC;
      const o = AC.createOscillator();
      const g = AC.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(freq, AC.currentTime);
      o.frequency.exponentialRampToValueAtTime(freq * 0.55, AC.currentTime + 0.09);
      g.gain.setValueAtTime(0.1, AC.currentTime);
      g.gain.exponentialRampToValueAtTime(0.0001, AC.currentTime + 0.12);
      o.connect(g).connect(AC.destination);
      o.start();
      o.stop(AC.currentTime + 0.13);
    } catch {
      /* noop */
    }
  };

  const press = (el: HTMLElement | null | undefined) => {
    if (!el) return;
    el.classList.add("pressed");
    setTimeout(() => el.classList.remove("pressed"), 150);
  };

  const select = (i: number, silent = false) => {
    setCurrent((c) => {
      if (c === i) return c;
      const p = PROJECTS[i]!;
      document.body.dataset["theme"] = p.theme;
      setSwap(true);
      if (swapTimer.current) clearTimeout(swapTimer.current);
      swapTimer.current = setTimeout(() => {
        setShown(p);
        setSwap(false);
      }, 280);
      if (!silent) {
        setToast("پالت رنگ: " + p.pal);
        if (toastTimer.current) clearTimeout(toastTimer.current);
        toastTimer.current = setTimeout(() => setToast(null), 1900);
        blip(660 + i * 60);
      }
      return i;
    });
  };

  /* ---- boot / theme ---- */
  useEffect(() => {
    document.body.dataset["theme"] = PROJECTS[0]!.theme;
    const t = setTimeout(() => setIntro(false), 1400);
    return () => clearTimeout(t);
  }, []);

  /* ---- physical keyboard ---- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const digit = ["1", "2", "3", "4", "5"].indexOf(e.key);
      if (digit >= 0) {
        select(digit);
        press(keyEls.current["P" + (digit + 1)]);
        return;
      }
      const k = e.key.length === 1 ? e.key.toUpperCase() : e.key;
      const target = keyEls.current[k];
      if (target) {
        press(target);
        blip(430 + Math.random() * 240);
      }
    };
    addEventListener("keydown", onKey);
    return () => removeEventListener("keydown", onKey);
  }, []);

  /* ---- pointer parallax + per-key magnetic 3D ---- */
  useEffect(() => {
    let mx = 0,
      my = 0,
      tx = 0,
      ty = 0,
      px = -9999,
      py = -9999,
      raf = 0;
    const mql = matchMedia("(max-width:900px)");

    const onMove = (e: PointerEvent) => {
      mx = (e.clientX / innerWidth) * 2 - 1;
      my = (e.clientY / innerHeight) * 2 - 1;
      px = e.clientX;
      py = e.clientY;
    };
    addEventListener("pointermove", onMove);

    const loop = () => {
      tx += (mx - tx) * 0.075;
      ty += (my - ty) * 0.075;
      const mobile = mql.matches;

      if (kbTilt.current) {
        kbTilt.current.style.transform = mobile
          ? `rotateX(${52 + ty * 3}deg) rotateZ(-20deg)`
          : `scale(.9) rotateX(${50 + ty * 7}deg) rotateZ(${-24 + tx * 9}deg) rotateY(${tx * 2.5}deg) translate3d(${tx * -14}px, ${ty * -8}px, 0)`;
      }
      if (!mobile && previewRef.current) {
        previewRef.current.style.transform = `perspective(1100px) rotateX(${7 - ty * 3}deg) rotateY(${17 - tx * 5}deg) rotateZ(-1.5deg) translateX(${tx * -12}px)`;
      }
      if (!mobile && logoRef.current) {
        logoRef.current.style.transform = `rotateY(${tx * 14}deg) rotateX(${-ty * 10}deg)`;
      }

      // magnetic keys: each cap rises and lights up near the cursor
      const kb = kbRef.current;
      if (kb && !mobile) {
        const keys = kb.querySelectorAll<HTMLElement>(".key");
        keys.forEach((k) => {
          const r = k.getBoundingClientRect();
          const dx = px - (r.left + r.width / 2);
          const dy = py - (r.top + r.height / 2);
          const d = Math.hypot(dx, dy);
          const f = Math.max(0, 1 - d / 260);
          k.style.setProperty("--lift", (f * f * 22).toFixed(2) + "px");
          k.style.setProperty("--near", (f * f).toFixed(3));
        });
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", onMove);
    };
  }, []);

  /* ---- starfield ---- */
  useEffect(() => {
    const cv = starsRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const size = () => {
      cv.width = innerWidth;
      cv.height = innerHeight;
    };
    size();
    addEventListener("resize", size);
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.7 + 0.4,
      v: Math.random() * 0.00035 + 0.00012,
      p: Math.random() * Math.PI * 2,
      c: Math.random() < 0.5,
    }));
    let raf = 0;
    const draw = (t: number) => {
      const rgb = getComputedStyle(document.body).getPropertyValue("--c2a").trim() || "16,185,129";
      ctx.clearRect(0, 0, cv.width, cv.height);
      for (const s of stars) {
        s.y -= s.v;
        if (s.y < -0.02) s.y = 1.02;
        const a = 0.25 + 0.55 * Math.abs(Math.sin(t * 0.0012 + s.p));
        ctx.beginPath();
        ctx.arc(s.x * cv.width, s.y * cv.height, s.r, 0, 7);
        ctx.fillStyle = s.c ? `rgba(${rgb},${a})` : `rgba(255,255,255,${a * 0.8})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("resize", size);
    };
  }, []);

  /* ---- fit stage ---- */
  useEffect(() => {
    const fit = () => {
      if (!appRef.current) return;
      if (innerWidth <= 900) {
        appRef.current.style.setProperty("--s", "1");
        document.documentElement.style.setProperty(
          "--kbs",
          Math.min(0.62, Math.max(0.3, (innerWidth - 26) / 1010)).toFixed(3),
        );
      } else {
        appRef.current.style.setProperty(
          "--s",
          String(Math.min(1, innerWidth / 1280, innerHeight / 880)),
        );
      }
    };
    fit();
    addEventListener("resize", fit);
    return () => removeEventListener("resize", fit);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCss }} />

      <div id="intro" className={intro ? "" : "done"} onClick={() => setIntro(false)}>
        <img src={logo} alt="" width={110} height={110} />
        <div className="t">ANDISHEONLINE</div>
        <div className="bar">
          <i />
        </div>
      </div>

      <canvas id="stars" ref={starsRef} />
      <div className="aurora a1" />
      <div className="aurora a2" />
      <div className="grid-floor" />

      <div id="app" ref={appRef}>
        <header>
          <div className="logo-wrap" ref={logoRef}>
            <img src={logo} alt="لوگوی اندیشه آنلاین" width={108} height={108} />
          </div>
          <div className="brand-en">
            <span className="be-1">ANDISHEONLINE</span>
            <span className="be-2">
              WEB DESIGN <b>3D</b>
            </span>
          </div>
          <h1 className="headline">هر کلید، یک پروژه</h1>
          <p className="sub">
            روی کلیدهای رنگی بزن؛ با هر کلیک، <b>رنگِ کل صفحه</b> و نمونه‌کار عوض می‌شود — حتی با
            کیبورد واقعی هم می‌توانی تایپ کنی!
          </p>
        </header>

        <main className="scene">
          <div className="chips">
            <div className="chip">
              <span className="ic">🚀</span>
              <span>
                <b>طراحی اختصاصی 3D</b>
                <span>مدرن و متفاوت</span>
              </span>
            </div>
            <div className="chip">
              <span className="ic">🎨</span>
              <span>
                <b>رنگ‌بندی زنده</b>
                <span>با هر کلیک عوض می‌شود</span>
              </span>
            </div>
            <div className="chip">
              <span className="ic">⚡</span>
              <span>
                <b>سریع و سئوشده</b>
                <span>تجربه‌ی درجه‌یک</span>
              </span>
            </div>
          </div>

          <div className={"preview" + (swap ? " swap" : "")} ref={previewRef}>
            <div className="pv-bar">
              <i />
              <i />
              <i />
              <span className="pv-url">andisheonline.com/portfolio</span>
            </div>
            <div className="pv-body">
              <img src={shown.img} alt={shown.name} width={768} height={1024} />
              <div className="pv-shine" />
              <div className="pv-scan" />
            </div>
            <div className="pv-foot">
              <span className="pv-ic">{shown.icon}</span>
              <span>
                <span className="pv-name">{shown.name}</span>
                <br />
                <span className="pv-desc">{shown.desc}</span>
              </span>
              <span className="pv-count">
                {(PROJECTS.indexOf(shown) + 1).toLocaleString("fa-IR")} / {(5).toLocaleString("fa-IR")}
              </span>
              <a
                className="pv-link"
                href="https://andisheonline.com/portfolio/"
                target="_blank"
                rel="noopener"
              >
                همه نمونه‌ها ↗
              </a>
            </div>
          </div>

          <div className="kb-perspective">
            <div className="kb-tilt" ref={kbTilt}>
              <div className="kb" ref={kbRef}>
                <div className="kb-deck" />
                {ROWS.map((row, r) => {
                  let c = 0;
                  return (
                    <div className="krow" key={r}>
                      {row.map(([label, u = 1], idx) => {
                        const width = u * U + (u - 1) * GAP;
                        const delayIn = 0.15 + r * 0.07 + c * 0.014;
                        const hueDelay = -(r + c) * 0.22;
                        c += u;
                        const projMatch = /^P([1-5])$/.exec(label);
                        const isProj = !!projMatch;
                        const pIdx = projMatch ? Number(projMatch[1]) - 1 : -1;
                        const p = isProj ? PROJECTS[pIdx]! : null;
                        return (
                          <button
                            type="button"
                            key={r + "-" + idx}
                            ref={(el) => {
                              keyEls.current[label] = el;
                            }}
                            className={
                              "key" +
                              (isProj ? " proj" : "") +
                              (isProj && pIdx === current ? " active" : "")
                            }
                            style={
                              {
                                width: width + "px",
                                "--d": hueDelay + "s",
                                "--in": delayIn + "s",
                                ...(p ? { "--pc": p.pc } : {}),
                              } as React.CSSProperties
                            }
                            title={p ? p.name : label}
                            aria-label={p ? p.name : label}
                            onPointerDown={(e) => {
                              press(e.currentTarget);
                              if (isProj) select(pIdx);
                              else blip(420 + Math.random() * 260);
                            }}
                          >
                            <span className="cap">
                              {p ? (
                                <>
                                  <span className="pic">{p.icon}</span>
                                  <span>{p.name.replace("سایت ", "")}</span>
                                </>
                              ) : label === "ANDISHEONLINE" ? (
                                <span className="space-label">ANDISHEONLINE.COM</span>
                              ) : (
                                label
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        <footer className="actions">
          <div className="btn-row">
            <a className="btn3d b1" href="https://andisheonline.com/" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="9" />
                <path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9S14.5 18.4 12 21c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" />
              </svg>
              دیدن سایت
            </a>
            <a
              className="btn3d b2"
              href="https://andisheonline.com/portfolio/"
              target="_blank"
              rel="noopener"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="3" y="3" width="7.5" height="7.5" rx="1.5" />
                <rect x="13.5" y="3" width="7.5" height="7.5" rx="1.5" />
                <rect x="3" y="13.5" width="7.5" height="7.5" rx="1.5" />
                <rect x="13.5" y="13.5" width="7.5" height="7.5" rx="1.5" />
              </svg>
              دیدن نمونه‌ها
            </a>
            <a
              className="btn3d b3"
              href="https://andisheonline.com/contact-us/"
              target="_blank"
              rel="noopener"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2c3.5 2 5 6.5 5 10l3 4-4 1-2-2h-4l-2 2-4-1 3-4c0-3.5 1.5-8 5-10z" />
                <circle cx="10" cy="10" r="1" fill="currentColor" />
                <circle cx="14" cy="10" r="1" fill="currentColor" />
              </svg>
              شروع همکاری
            </a>
          </div>
          <p className="credit">
            © 2026 ANDISHEONLINE —{" "}
            <a href="https://andisheonline.com/" target="_blank" rel="noopener">
              andisheonline.com
            </a>{" "}
            — WEB DESIGN 3D STUDIO
          </p>
        </footer>
      </div>

      <div className="vignette" />
      <div id="toast" className={toast ? "show" : ""}>
        <span className="dot" />
        <span>{toast ?? ""}</span>
      </div>
    </>
  );
}
