"use client";

import * as React from "react";

export default function PlanPage() {
  // Load Rubik Bubbles font (if not already loaded)
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
        minHeight: "100vh",
        background: "#FDDDEE",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px 24px",
      }}
    >
      <p
        style={{
          fontFamily: "'Rubik Bubbles', system-ui",
          fontSize: 36,
          color: "#434753",
          margin: 0,
          textAlign: "center",
        }}
      >
        Rissy’s plan!!
      </p>

      <img
        src="/rissyplan.png"
        alt="Rissy plan illustration"
        style={{
          width: "100%",
          maxWidth: 390,
          height: "auto",
          display: "block",
        }}
      />

      <p
        style={{
          fontFamily: "'Rubik Bubbles', system-ui",
          fontSize: 36,
          color: "#75AC82",
          margin: 0,
          textAlign: "center",
        }}
      >
        see yaa~~
      </p>
    </main>
  );
}