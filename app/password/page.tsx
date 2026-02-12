"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

export default function PasswordPage() {
  const router = useRouter();

  const CORRECT = "250818";
  const NEXT_ROUTE = "/letter";
  const MAX = CORRECT.length;

  const [input, setInput] = React.useState("");
  const [shake, setShake] = React.useState(false);

  React.useEffect(() => {
    const id = "passcode-shake-kf";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      @keyframes passcodeShake {
        0% { transform: translateX(0); }
        20% { transform: translateX(-7px); }
        40% { transform: translateX(7px); }
        60% { transform: translateX(-5px); }
        80% { transform: translateX(5px); }
        100% { transform: translateX(0); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  React.useEffect(() => {
    const id = "rubik-bubbles-font";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap";
    document.head.appendChild(link);
  }, []);

  function press(n: number) {
    if (input.length >= MAX) return;

    const next = input + String(n);
    setInput(next);

    if (next.length === MAX) {
      setTimeout(() => {
        if (next === CORRECT) {
          router.push(NEXT_ROUTE);
        } else {
          setShake(true);
          setTimeout(() => setShake(false), 350);
          setInput("");
        }
      }, 180);
    }
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#434753",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        gap: 28,
      }}
    >
      <p
        style={{
          margin: 0,
          fontFamily: "'Rubik Bubbles', system-ui",
          fontSize: 24,
          color: "#F8C0DD",
          textAlign: "center",
        }}
      >
        Enter your phone password
      </p>

      <div style={{ display: "flex", gap: 10, opacity: 0.65, ...(shake ? { animation: "passcodeShake 0.35s ease" } : {}) }}>
        {Array.from({ length: MAX }).map((_, i) => (
          <div
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: i < input.length ? "#75AC82" : "#55615A",
            }}
          />
        ))}
      </div>

      <div
        style={{
          width: 254,
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
          justifyItems: "center",
        }}
      >
        {[1,2,3,4,5,6,7,8,9].map((n) => (
          <button
            key={n}
            onClick={() => press(n)}
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: "#6E6F65",
              border: "none",
              boxShadow: "0 6px 8px rgba(0,0,0,0.35)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "'Rubik Bubbles', system-ui",
              fontSize: 24,
              lineHeight: 1,
              color: "#FCEFA2",
            }}
          >
            {n}
          </button>
        ))}
        <div />
        <button
          onClick={() => press(0)}
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: "#6E6F65",
            border: "none",
            boxShadow: "0 6px 8px rgba(0,0,0,0.35)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Rubik Bubbles', system-ui",
            fontSize: 24,
            lineHeight: 1,
            color: "#FCEFA2",
          }}
        >
          0
        </button>
        <div />
      </div>
    </main>
  );
}