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
  // Load Rubik Bubbles once
  React.useEffect(() => {
    const id = "rubik-bubbles-font";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <main
      style={{
        background: "#8C7C6F",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 390,
          height: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "60px 20px 80px",
          boxSizing: "border-box",
        }}
      >
        {/* Broccoli */}
        <img
          src="/broccoly.png"
          alt="Broccoli bouquet"
          style={{
            width: 300,
            height: "auto",
            userSelect: "none",
            pointerEvents: "none",
          }}
        />

        {/* Text */}
        <div style={{ textAlign: "center" }}>
          <WouldYouLikeToBeMyValentine />
        </div>

        {/* Buttons */}
        <AskButtons />
      </div>
    </main>
  );
}

function WouldYouLikeToBeMyValentine() {
  return (
    <div
      style={{
        fontFamily: "'Rubik Bubbles', system-ui",
        fontSize: 36,
        lineHeight: "normal",
        fontStyle: "normal",
        color: "#FCEFA2",
        whiteSpace: "pre-wrap",
      }}
    >
      <div>Would</div>
      <div>you like</div>
      <div>to be</div>
      <div>my</div>
      <div style={{ color: "#FD9ACD" }}>valentine?</div>
    </div>
  );
}

function AskButtons() {
  const router = useRouter();
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

    window.setTimeout(() => {
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
    <div style={{ position: "relative", width: "100%" }}>
      <div style={{ display: "flex", gap: 50, justifyContent: "center" }}>
        <button onClick={createSparkles} style={buttonStyle}>
          yes
        </button>
        <button onClick={createSparkles} style={buttonStyle}>
          yes
        </button>
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
    </div>
  );
}