"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

type SlideToBeginProps = {
  onComplete?: () => void;
  href?: string; // optional route to go to when complete
};

export default function SlideToBegin({ onComplete, href = "/password" }: SlideToBeginProps) {
  const router = useRouter();

  React.useEffect(() => {
    const id = "rubik-bubbles-font";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Rubik+Bubbles&display=swap";
    document.head.appendChild(link);
  }, []);

  const TRACK_H = 75;
  const KNOB = 75;

  const TRACK_COLOR = "#F8C0DD";
  const KNOB_COLOR = "#8C7C6F";
  const TEXT_COLOR = "#75AC82";

  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const [maxX, setMaxX] = React.useState(0);

  const [x, setX] = React.useState(0);
  const xRef = React.useRef(0);
  const [dragging, setDragging] = React.useState(false);
  const startRef = React.useRef({ pointerX: 0, startX: 0 });

  const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

  React.useEffect(() => {
    xRef.current = x;
  }, [x]);

  React.useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const resize = () => {
      const w = el.getBoundingClientRect().width;
      const nextMaxX = Math.max(0, w - KNOB);
      setMaxX(nextMaxX);
      setX((prev) => clamp(prev, 0, nextMaxX));
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    e.preventDefault();
    setDragging(true);
    startRef.current = { pointerX: e.clientX, startX: xRef.current };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  }

  React.useEffect(() => {
    if (!dragging) return;

    function onMove(e: PointerEvent) {
      e.preventDefault?.();
      const dx = e.clientX - startRef.current.pointerX;
      const next = clamp(startRef.current.startX + dx, 0, maxX);
      xRef.current = next;
      setX(next);
    }

    function onUp() {
      setDragging(false);

      if (xRef.current >= maxX * 0.9) {
        setX(maxX);
        xRef.current = maxX;

        setTimeout(() => {
          if (typeof onComplete === "function") {
            onComplete();
          } else {
            router.push(href); // ✅ Next.js navigation
          }
        }, 200);
      } else {
        setX(0);
        xRef.current = 0;
      }
    }

    window.addEventListener("pointermove", onMove, { passive: false });
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dragging, maxX, onComplete, router, href]);

  return (
    <div style={{ width: 294, margin: "0 auto" }}>
      <div
        ref={trackRef}
        style={{
          position: "relative",
          height: TRACK_H,
          borderRadius: 999,
          background: TRACK_COLOR,
          boxShadow: "inset 0 4px 4px rgba(0,0,0,0.25)",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          userSelect: "none",
          touchAction: "none",
        }}
      >
        <span
          style={{
            fontFamily: "'Rubik Bubbles', system-ui",
            fontSize: 25,
            color: TEXT_COLOR,
            pointerEvents: "none",
          }}
        >
          slide to me
        </span>

        <div
          onPointerDown={onPointerDown}
          style={{
            position: "absolute",
            top: 0,
            left: x,
            width: KNOB,
            height: KNOB,
            borderRadius: "50%",
            background: KNOB_COLOR,
            cursor: dragging ? "grabbing" : "grab",
            transition: dragging ? "none" : "left 400ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      </div>
    </div>
  );
}
