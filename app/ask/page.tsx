"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type Sparkle = {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
};

export default function AskPage() {
  const router = useRouter();
  const frameRef = React.useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = React.useState(1);

  const DESIGN_W = 579;
  const DESIGN_H = 1256;

  // Load Rubik Bubbles (if not loaded globally)
  React.useEffect(() => {
    const id = "rubik-bubbles-font";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap";
    document.head.appendChild(link);
  }, []);

  React.useLayoutEffect(() => {
    const el = frameRef.current;
    if (!el) return;

    const update = () => {
      const w = el.getBoundingClientRect().width;
      setScale(w / DESIGN_W);
    };

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [sparkles, setSparkles] = React.useState<Sparkle[]>([]);

  function createSparkles(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const baseX = rect.left + rect.width / 2;
    const baseY = rect.top + rect.height / 2;

    const newSparkles: Sparkle[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i + Math.random(),
      x: baseX,
      y: baseY,
      dx: (Math.random() - 0.5) * 140,
      dy: (Math.random() - 0.5) * 140,
    }));

    setSparkles(newSparkles);

    setTimeout(() => {
      router.push("/plan");
    }, 700);
  }

  const buttonStyle: React.CSSProperties = {
    width: 115,
    height: 49,
    borderRadius: 999,
    background: "#B9C6F2",
    border: "none",
    boxShadow: "0 4px 6px rgba(0,0,0,0.25)",
    fontFamily: "'Rubik Bubbles', system-ui",
    fontSize: 30,
    letterSpacing: "0.3px",
    color: "#434753",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 2,
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#8C7C6F",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        ref={frameRef}
        style={{
          width: "100%",
          maxWidth: 390,
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          overflow: "visible",
        }}
      >
        <div
          style={{
            width: DESIGN_W,
            height: DESIGN_H,
            position: "relative",
            transformOrigin: "top left",
            transform: `scale(${scale})`,
          }}
        >
          {/* Broccoli illustration */}
          <img
            src="/broccoly.png"
            alt="Broccoli bouquet"
            style={{
              width: 2000,
              height: "1256",
              position: "absolute",
              left: -140,
              top: -170,
              pointerEvents: "none",
              userSelect: "none",
            }}
          />

          {/* Question text */}
          <div
            style={{
              position: "absolute",
              left: 135,
              top: 79,
              width: 240,
              height: 214,
              fontFamily: "'Rubik Bubbles', system-ui",
              fontSize: 36,
              lineHeight: 1.05,
              color: "#FCEFA2",
              textAlign: "center",
              whiteSpace: "pre-wrap",
            }}
          >
            <div>Would</div>
            <div>you like</div>
            <div>to be</div>
            <div>my</div>
            <div style={{ color: "#FD9ACD" }}>valentine?</div>
          </div>

          {/* Buttons */}
          <div
            style={{
              position: "absolute",
              left: -11,
              top: 470,
              width: 386,
              height: 219,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 50,
            }}
          >
            <button onClick={createSparkles} style={buttonStyle}>
              yes
            </button>

            <button onClick={createSparkles} style={buttonStyle}>
              yes
            </button>
          </div>
        </div>
      </div>

      {/* Sparkles */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          style={{
            position: "fixed",
            left: s.x,
            top: s.y,
            pointerEvents: "none",
            fontSize: 20,
            transform: "translate(-50%, -50%)",
            animation: "sparkleMove 0.7s ease-out forwards",
            ...( { ["--dx" as any]: `${s.dx}px`, ["--dy" as any]: `${s.dy}px` } as any ),
          }}
        >
          ✨
        </span>
      ))}

      <style>
        {`
          @keyframes sparkleMove {
            0% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
            100% { opacity: 0; transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1.6); }
          }
        `}
      </style>
    </main>
  );
}