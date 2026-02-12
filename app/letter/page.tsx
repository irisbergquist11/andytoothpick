"use client";

import { useRouter } from "next/navigation";

export default function LetterPage() {
  const router = useRouter();

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
      <div /> {/* spacer */}

      <img
        src="/rissyletter.png"
        alt="Flower girl"
        style={{
          width: "100%",
          maxWidth: 390,
          height: "auto",
          display: "block",
        }}
      />

      <button
        onClick={() => router.push("/ask")}
        style={{
          width: 125,
          height: 45,
          borderRadius: 999,
          background: "#75AC82",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Rubik Bubbles', system-ui",
          fontSize: 32,
          lineHeight: 1,
          color: "#FCEFA2",
          boxShadow: "0 4px 6px rgba(0,0,0,0.25)",
          cursor: "pointer",
        }}
      >
        next
      </button>
    </main>
  );
}