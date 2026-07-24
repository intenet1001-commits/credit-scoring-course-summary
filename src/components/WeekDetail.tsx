"use client";

import { useCallback, useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";

const MONO = "var(--font-mono-plex), monospace";
const SERIF = "var(--font-serif-kr), serif";
const PAGE_BG = "#F7F5F0";
const MAX_SPREAD = 2; // webtoon png is a 2×3 grid → 6 panels → 3 spreads

export type SectionData = {
  id: string;
  title: string;
  html: string;
  svg?: string;
};

export type WeekNavInfo = {
  number: number;
  label: string;
};

type Tab = "summary" | "shorts" | "webtoon";

export function WeekDetail({
  weekNum,
  title,
  sections,
  audio,
  video,
  poster,
  webtoon,
  prev,
  next,
}: {
  weekNum: number;
  title: string;
  sections: SectionData[];
  audio: string;
  video: string;
  poster: string;
  webtoon: string;
  prev?: WeekNavInfo;
  next?: WeekNavInfo;
}) {
  const [tab, setTab] = useState<Tab>("summary");
  const [spread, setSpread] = useState(0);
  const [flip, setFlip] = useState<"next" | "prev" | null>(null);
  const [flipT, setFlipT] = useState(false);
  const [imgAspect, setImgAspect] = useState(0.95);

  const num = String(weekNum).padStart(2, "0");

  // measure webtoon page aspect: image is a 2-column × 3-row panel grid
  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.onload = () => {
      if (alive) setImgAspect(img.naturalWidth / 2 / (img.naturalHeight / 3));
    };
    img.src = webtoon;
    return () => {
      alive = false;
    };
  }, [webtoon]);

  const nextSpread = useCallback(() => {
    if (flip || spread >= MAX_SPREAD) return;
    setFlip("next");
    setFlipT(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setFlipT(true)));
    setTimeout(() => {
      setSpread((s) => s + 1);
      setFlip(null);
      setFlipT(false);
    }, 820);
  }, [flip, spread]);

  const prevSpread = useCallback(() => {
    if (flip || spread <= 0) return;
    setFlip("prev");
    setFlipT(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setFlipT(true)));
    setTimeout(() => {
      setSpread((s) => s - 1);
      setFlip(null);
      setFlipT(false);
    }, 820);
  }, [flip, spread]);

  // ← → keyboard paging on the webtoon tab
  useEffect(() => {
    if (tab !== "webtoon") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextSpread();
      if (e.key === "ArrowLeft") prevSpread();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [tab, nextSpread, prevSpread]);

  const selectTab = (t: Tab) => {
    setTab(t);
    setSpread(0);
    setFlip(null);
    setFlipT(false);
  };

  const panelStyle = (p: number): CSSProperties => ({
    backgroundImage: `url(${webtoon})`,
    backgroundSize: "200% 300%",
    backgroundPosition: `${(p % 2) * 100}% ${Math.floor(p / 2) * 50}%`,
    backgroundColor: PAGE_BG,
  });

  const pageStyle = (p: number, side: "l" | "r"): CSSProperties => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    width: "50%",
    cursor: "pointer",
    left: side === "l" ? 0 : "50%",
    borderRadius: side === "l" ? "6px 2px 2px 6px" : "2px 6px 6px 2px",
    border: "1px solid rgba(0,0,0,.25)",
    boxSizing: "border-box",
    overflow: "hidden",
    ...panelStyle(p),
  });

  const faceStyle = (p: number, rotated: boolean): CSSProperties => ({
    position: "absolute",
    inset: 0,
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    transform: rotated ? "rotateY(180deg)" : "none",
    border: "1px solid rgba(0,0,0,.25)",
    boxSizing: "border-box",
    borderRadius: 3,
    overflow: "hidden",
    boxShadow: "0 10px 40px rgba(0,0,0,.35)",
    ...panelStyle(p),
  });

  const navBtnStyle = (enabled: boolean): CSSProperties => ({
    width: 44,
    height: 44,
    borderRadius: "50%",
    background: "none",
    border: "1px solid " + (enabled ? "rgba(255,255,255,.28)" : "rgba(255,255,255,.09)"),
    color: enabled ? "#E6EAF2" : "#39414F",
    fontSize: 17,
    cursor: enabled ? "pointer" : "default",
    transition: "border-color .3s,color .3s",
  });

  // which panel each static page shows (the flipper overlays the moving one)
  const leftPanel = flip === "prev" ? (spread - 1) * 2 : spread * 2;
  const rightPanel = flip === "next" ? (spread + 1) * 2 + 1 : spread * 2 + 1;
  const flippingNext = flip === "next";

  const tabs: { id: Tab; label: string; sub: string }[] = [
    { id: "summary", label: "요약", sub: "DIGEST" },
    { id: "shorts", label: "쇼츠", sub: "ON AIR" },
    { id: "webtoon", label: "웹툰", sub: "COMIC" },
  ];

  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <div
        style={{
          position: "absolute",
          top: -200,
          right: -180,
          width: 560,
          height: 560,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,color-mix(in oklab,var(--ac,#67E8F9) 10%,transparent),transparent 65%)",
          pointerEvents: "none",
        }}
      />
      <div style={{ position: "relative", maxWidth: 960, margin: "0 auto", padding: "0 28px 90px" }}>
        {/* top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "28px 0 0",
            animation: "fadeUp .6s both",
          }}
        >
          <Link
            href="/"
            className="ghost-pill"
            style={{
              background: "none",
              border: "1px solid rgba(255,255,255,.14)",
              borderRadius: 999,
              color: "#AEB7C7",
              fontSize: 13,
              padding: "9px 18px",
              letterSpacing: ".04em",
            }}
          >
            ← 전체 커리큘럼
          </Link>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".24em", color: "#5B6577" }}>
            ARCHIVE — {num} / 09
          </span>
        </div>

        {/* heading */}
        <div style={{ position: "relative", padding: "64px 0 8px" }}>
          <div
            style={{
              position: "absolute",
              top: -10,
              right: -14,
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: 230,
              lineHeight: 1,
              color: "rgba(235,240,250,.045)",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            {num}
          </div>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 12,
              letterSpacing: ".3em",
              color: "var(--ac,#67E8F9)",
              margin: "0 0 18px",
              animation: "fadeUp .6s .05s both",
            }}
          >
            WEEK {num}
          </p>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: "clamp(28px,4.4vw,44px)",
              lineHeight: 1.32,
              margin: 0,
              maxWidth: 780,
              letterSpacing: "-.01em",
              textWrap: "pretty",
              animation: "fadeUp .6s .12s both",
            }}
          >
            {title}
          </h1>
        </div>

        {/* tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            margin: "42px 0 0",
            borderBottom: "1px solid rgba(255,255,255,.08)",
            animation: "fadeUp .6s .2s both",
          }}
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => selectTab(t.id)}
              style={{
                background: "none",
                border: "none",
                padding: "10px 22px 16px",
                fontSize: 16,
                fontWeight: 700,
                fontFamily: "var(--font-sans-kr), sans-serif",
                letterSpacing: ".02em",
                color: tab === t.id ? "#FFFFFF" : "#5B6577",
                borderBottom:
                  tab === t.id ? "2px solid var(--ac,#67E8F9)" : "2px solid transparent",
                marginBottom: -1,
                transition: "color .3s, border-color .3s",
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: 10,
                  letterSpacing: ".24em",
                  display: "block",
                  marginBottom: 5,
                  opacity: 0.65,
                }}
              >
                {t.sub}
              </span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ---- 요약 ---- */}
        {tab === "summary" && (
          <div style={{ paddingTop: 44 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 18,
                border: "1px solid rgba(255,255,255,.09)",
                borderRadius: 14,
                background: "linear-gradient(160deg,rgba(255,255,255,.04),rgba(255,255,255,.01))",
                padding: "16px 20px",
                marginBottom: 52,
                animation: "fadeUp .6s .25s both",
              }}
            >
              <div
                style={{
                  flexShrink: 0,
                  fontFamily: MONO,
                  fontSize: 10.5,
                  letterSpacing: ".22em",
                  color: "var(--ac,#67E8F9)",
                }}
              >
                AUDIO
                <br />
                BRIEFING
              </div>
              <audio controls src={audio} preload="none" />
            </div>

            {sections.map((sec, i) => (
              <section
                key={sec.id}
                style={{
                  marginBottom: 64,
                  animation: "fadeUp .7s both",
                  animationDelay: `${0.3 + i * 0.1}s`,
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 16, marginBottom: 20 }}>
                  <span
                    style={{
                      width: 26,
                      height: 3,
                      background: "var(--ac,#67E8F9)",
                      borderRadius: 2,
                      flexShrink: 0,
                      transform: "translateY(-6px)",
                    }}
                  />
                  <h2
                    style={{
                      fontFamily: SERIF,
                      fontWeight: 900,
                      fontSize: 23,
                      lineHeight: 1.5,
                      margin: 0,
                      textWrap: "pretty",
                    }}
                  >
                    {sec.title}
                  </h2>
                </div>
                <div className="sec-body" dangerouslySetInnerHTML={{ __html: sec.html }} />
                {sec.svg ? (
                  <div
                    style={{
                      background: "#F5F2EA",
                      borderRadius: 14,
                      padding: "30px 26px",
                      margin: "28px 0 6px",
                      textAlign: "center",
                      boxShadow: "0 24px 60px -30px rgba(0,0,0,.6)",
                    }}
                    dangerouslySetInnerHTML={{ __html: sec.svg }}
                  />
                ) : null}
              </section>
            ))}
          </div>
        )}

        {/* ---- 쇼츠 ---- */}
        {tab === "shorts" && (
          <div style={{ padding: "60px 0 20px", position: "relative" }}>
            <div style={{ position: "relative", maxWidth: 820, margin: "0 auto" }}>
              <div
                style={{
                  position: "absolute",
                  inset: "-40px -60px",
                  background:
                    "radial-gradient(ellipse 70% 60% at 50% 45%,color-mix(in oklab,var(--ac,#67E8F9) 9%,transparent),transparent 70%)",
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "relative",
                  background: "linear-gradient(175deg,#12161F,#0A0D14)",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 22,
                  padding: "16px 16px 12px",
                  boxShadow:
                    "0 50px 130px -35px rgba(0,0,0,.9),inset 0 1px 0 rgba(255,255,255,.06)",
                  animation: "fadeUp .7s .1s both",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    borderRadius: 11,
                    overflow: "hidden",
                    background: "#000",
                    aspectRatio: "16/9",
                  }}
                >
                  <video
                    controls
                    src={video}
                    poster={poster}
                    preload="metadata"
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      background: "#000",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background:
                        "repeating-linear-gradient(rgba(255,255,255,.028) 0 1px,transparent 1px 3px)",
                      opacity: 0.7,
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      pointerEvents: "none",
                      background: "linear-gradient(115deg,rgba(255,255,255,.06),transparent 28%)",
                    }}
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px 6px 2px",
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: ".24em",
                    color: "#5B6577",
                  }}
                >
                  <span>FINTECH·GRAD TV</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span
                      style={{
                        width: 7,
                        height: 7,
                        borderRadius: "50%",
                        background: "#F87171",
                        animation: "ledPulse 1.8s infinite",
                      }}
                    />
                    ON AIR
                  </span>
                  <span style={{ color: "var(--ac,#67E8F9)" }}>CH {num} · SHORTS</span>
                </div>
              </div>
              {/* TV stand */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div
                  style={{
                    width: 130,
                    height: 16,
                    background: "linear-gradient(#1B2029,#0D1017)",
                    clipPath: "polygon(12% 0,88% 0,100% 100%,0 100%)",
                  }}
                />
                <div
                  style={{
                    width: 300,
                    height: 9,
                    borderRadius: 999,
                    background: "linear-gradient(#171C26,#0A0D13)",
                    boxShadow: "0 14px 30px rgba(0,0,0,.7)",
                  }}
                />
                <div
                  style={{
                    width: 420,
                    maxWidth: "80%",
                    height: 26,
                    marginTop: 6,
                    background:
                      "radial-gradient(ellipse at 50% 0%,color-mix(in oklab,var(--ac,#67E8F9) 12%,transparent),transparent 70%)",
                    filter: "blur(6px)",
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* ---- 웹툰 ---- */}
        {tab === "webtoon" && (
          <div style={{ padding: "52px 0 10px" }}>
            <p
              style={{
                textAlign: "center",
                fontFamily: MONO,
                fontSize: 11,
                letterSpacing: ".2em",
                color: "#5B6577",
                margin: "0 0 26px",
                animation: "fadeUp .6s both",
              }}
            >
              페이지를 클릭하거나 ← → 키로 책장을 넘기세요
            </p>
            <div
              style={{
                perspective: 2600,
                display: "flex",
                justifyContent: "center",
                padding: "6px 0 30px",
                animation: "fadeUp .7s .1s both",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: `min(${Math.round(1040 * imgAspect)}px, 92vw)`,
                  aspectRatio: `${(2 * imgAspect).toFixed(4)}`,
                  filter: "drop-shadow(0 60px 60px rgba(0,0,0,.55))",
                }}
              >
                <div onClick={prevSpread} style={pageStyle(leftPanel, "l")}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to left,rgba(0,0,0,.22),transparent 22%)",
                      pointerEvents: "none",
                      borderRadius: "6px 0 0 6px",
                    }}
                  />
                </div>
                <div onClick={nextSpread} style={pageStyle(rightPanel, "r")}>
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: "linear-gradient(to right,rgba(0,0,0,.22),transparent 22%)",
                      pointerEvents: "none",
                      borderRadius: "0 6px 6px 0",
                    }}
                  />
                </div>
                {flip ? (
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      bottom: 0,
                      width: "50%",
                      zIndex: 8,
                      left: flippingNext ? "50%" : 0,
                      transformOrigin: flippingNext ? "left center" : "right center",
                      transformStyle: "preserve-3d",
                      transition: "transform .78s cubic-bezier(.36,.1,.24,1)",
                      transform: flipT
                        ? `rotateY(${flippingNext ? -180 : 180}deg)`
                        : "rotateY(0deg)",
                      pointerEvents: "none",
                    }}
                  >
                    <div
                      style={faceStyle(flippingNext ? spread * 2 + 1 : spread * 2, false)}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to right,rgba(0,0,0,.16),transparent 30%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                    <div
                      style={faceStyle(
                        flippingNext ? (spread + 1) * 2 : (spread - 1) * 2 + 1,
                        true
                      )}
                    >
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to left,rgba(0,0,0,.16),transparent 30%)",
                          pointerEvents: "none",
                        }}
                      />
                    </div>
                  </div>
                ) : null}
                {/* spine */}
                <div
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    bottom: 0,
                    width: 34,
                    transform: "translateX(-50%)",
                    background:
                      "linear-gradient(to right,transparent,rgba(0,0,0,.35),transparent)",
                    pointerEvents: "none",
                    zIndex: 6,
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 26,
                animation: "fadeUp .7s .15s both",
              }}
            >
              <button onClick={prevSpread} style={navBtnStyle(spread > 0)}>
                ←
              </button>
              <span
                style={{ fontFamily: MONO, fontSize: 12, letterSpacing: ".3em", color: "#8B94A6" }}
              >
                {String(spread + 1).padStart(2, "0")} / {String(MAX_SPREAD + 1).padStart(2, "0")}
              </span>
              <button onClick={nextSpread} style={navBtnStyle(spread < MAX_SPREAD)}>
                →
              </button>
            </div>
          </div>
        )}

        {/* prev / next week */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 14,
            marginTop: 90,
            paddingTop: 26,
            borderTop: "1px solid rgba(255,255,255,.07)",
          }}
        >
          {prev ? (
            <Link
              href={`/week/${prev.number}`}
              className="week-nav-link"
              style={{ color: "#8B94A6", fontSize: 14, padding: "6px 0", textAlign: "left" }}
            >
              ← {prev.label}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/week/${next.number}`}
              className="week-nav-link"
              style={{ color: "#8B94A6", fontSize: 14, padding: "6px 0", textAlign: "right" }}
            >
              {next.label} →
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
