import Link from "next/link";
import { weeks } from "@/data/weeks";

const MONO = "var(--font-mono-plex), monospace";
const SERIF = "var(--font-serif-kr), serif";

const TICKER =
  "정보 비대칭 · 역선택 · 도덕적 해이 · 크레딧 뷰로 · 스코어카드 · 로지스틱 회귀 · SVM · WOE · IV · 파인 클래싱 · 대안 데이터 · 설명가능성 · 공정성 · 바젤 규제 · AI 거버넌스 · ";

export default function Home() {
  return (
    <div style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.028) 1px,transparent 1px)",
          backgroundSize: "72px 72px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 0%,#000 40%,transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 0%,#000 40%,transparent 100%)",
          pointerEvents: "none",
        }}
      />
      {/* drifting glow */}
      <div
        style={{
          position: "absolute",
          top: -220,
          left: -160,
          width: 640,
          height: 640,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,color-mix(in oklab,var(--ac,#67E8F9) 14%,transparent),transparent 65%)",
          animation: "glowDrift 9s ease-in-out infinite",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "0 32px" }}>
        <header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "30px 0",
            fontFamily: MONO,
            fontSize: 11.5,
            letterSpacing: ".22em",
            color: "#5B6577",
            animation: "fadeUp .7s both",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--ac,#67E8F9)",
                animation: "ledPulse 2.4s infinite",
              }}
            />
            <span>CREDIT SCORING × AI</span>
          </div>
          <div>GRADUATE SEMINAR — 2026</div>
        </header>

        <div style={{ padding: "88px 0 56px" }}>
          <p
            style={{
              fontFamily: MONO,
              fontSize: 12.5,
              letterSpacing: ".3em",
              color: "var(--ac,#67E8F9)",
              margin: "0 0 26px",
              animation: "fadeUp .7s .1s both",
            }}
          >
            신용평가모델 — 한 학기 아카이브
          </p>
          <h1
            style={{
              fontFamily: SERIF,
              fontWeight: 900,
              fontSize: "clamp(44px,7.2vw,86px)",
              lineHeight: 1.14,
              margin: 0,
              letterSpacing: "-.01em",
            }}
          >
            <span style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "block", animation: "lineUp .9s cubic-bezier(.2,.75,.2,1) .15s both" }}>
                AI 기반
              </span>
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <span style={{ display: "block", animation: "lineUp .9s cubic-bezier(.2,.75,.2,1) .28s both" }}>
                신용평가모형{" "}
                <em style={{ fontStyle: "normal", color: "var(--ac,#67E8F9)" }}>개발</em>
              </span>
            </span>
          </h1>
          <p
            style={{
              maxWidth: 560,
              color: "#8B94A6",
              fontSize: 17,
              lineHeight: 1.8,
              margin: "30px 0 0",
              animation: "fadeUp .8s .5s both",
            }}
          >
            아홉 번의 강의를 요약 노트, 쇼츠 영상, 웹툰 세 가지 형식으로 다시 담았습니다. 주차를
            골라 원하는 방식으로 복습하세요.
          </p>
          <div style={{ display: "flex", gap: 44, marginTop: 52, animation: "fadeUp .8s .65s both" }}>
            {[
              { big: "09", small: "WEEKS", accent: false },
              { big: "03", small: "FORMATS", accent: false },
              { big: "AI", small: "× FINTECH", accent: true },
            ].map((s) => (
              <div key={s.small}>
                <div
                  style={{
                    fontFamily: SERIF,
                    fontWeight: 900,
                    fontSize: 34,
                    color: s.accent ? "var(--ac,#67E8F9)" : undefined,
                  }}
                >
                  {s.big}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: ".24em",
                    color: "#5B6577",
                    marginTop: 6,
                  }}
                >
                  {s.small}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* keyword ticker */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,.07)",
          borderBottom: "1px solid rgba(255,255,255,.07)",
          overflow: "hidden",
          padding: "13px 0",
          animation: "fadeUp .8s .75s both",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "max-content",
            gap: 0,
            animation: "marquee 38s linear infinite",
            fontFamily: MONO,
            fontSize: 12,
            letterSpacing: ".18em",
            color: "#4A5364",
            whiteSpace: "nowrap",
          }}
        >
          <span style={{ paddingRight: 48 }}>{TICKER}</span>
          <span style={{ paddingRight: 48 }}>{TICKER}</span>
        </div>
      </div>

      <div style={{ position: "relative", maxWidth: 1160, margin: "0 auto", padding: "64px 32px 100px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            marginBottom: 28,
            animation: "fadeUp .8s .8s both",
          }}
        >
          <h2 style={{ fontFamily: SERIF, fontWeight: 900, fontSize: 26, margin: 0 }}>
            주차별 커리큘럼
          </h2>
          <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: ".22em", color: "#5B6577" }}>
            INDEX 01—09
          </span>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))",
            gap: 14,
          }}
        >
          {weeks.map((w, i) => {
            const num = String(w.number).padStart(2, "0");
            return (
              <Link
                key={w.number}
                href={`/week/${w.number}`}
                className="week-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  display: "block",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 16,
                  background: "linear-gradient(160deg,rgba(255,255,255,.035),rgba(255,255,255,.012))",
                  padding: "26px 24px 22px",
                  cursor: "pointer",
                  color: "inherit",
                  animation: "fadeUp .7s both",
                  animationDelay: `${0.85 + i * 0.06}s`,
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: -24,
                    right: 2,
                    fontFamily: SERIF,
                    fontWeight: 900,
                    fontSize: 110,
                    lineHeight: 1,
                    color: "rgba(235,240,250,.05)",
                    pointerEvents: "none",
                  }}
                >
                  {num}
                </div>
                <div
                  style={{
                    fontFamily: MONO,
                    fontSize: 11,
                    letterSpacing: ".26em",
                    color: "var(--ac,#67E8F9)",
                    marginBottom: 14,
                  }}
                >
                  WEEK {num}
                </div>
                <div
                  style={{
                    fontWeight: 500,
                    fontSize: 15.5,
                    lineHeight: 1.6,
                    color: "#D7DEE9",
                    minHeight: 74,
                    textWrap: "pretty",
                  }}
                >
                  {w.pageTitle}
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: 14,
                    marginTop: 16,
                    fontFamily: MONO,
                    fontSize: 10.5,
                    letterSpacing: ".14em",
                    color: "#5B6577",
                  }}
                >
                  <span>■ 요약</span>
                  <span>▶ 쇼츠</span>
                  <span>◧ 웹툰</span>
                </div>
              </Link>
            );
          })}
        </div>

        <footer
          style={{
            marginTop: 90,
            paddingTop: 26,
            borderTop: "1px solid rgba(255,255,255,.06)",
            display: "flex",
            justifyContent: "space-between",
            fontFamily: MONO,
            fontSize: 10.5,
            letterSpacing: ".2em",
            color: "#414B5C",
          }}
        >
          <span>CREDIT SCORING MODEL — LECTURE ARCHIVE</span>
          <span>SUMMARY / SHORTS / WEBTOON</span>
        </footer>
      </div>
    </div>
  );
}
