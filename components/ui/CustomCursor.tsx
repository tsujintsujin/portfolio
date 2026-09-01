"use client";

import { useEffect, useRef } from "react";

const CURSOR_PATH =
  "M104.552,188.324l-1.126-0.023c-8.686-0.485-16.159-6.421-18.601-14.758l-14.164-48.403 l-52.088-10.344c-8.548-1.675-15.124-8.622-16.348-17.279c-1.224-8.638,3.162-17.134,10.91-21.137L156.295,2.228 c7.49-3.883,17.143-2.596,23.369,3.119c6.336,5.827,8.371,15.078,5.083,23.018l-61.193,147.287 C120.334,183.355,112.872,188.324,104.552,188.324z";

const TIP_X = 156.295;
const TIP_Y = 2.228;
const SCALE = 0.14;
// 1 = the head sits exactly on the pointer; lower values let it trail behind.
const WEIGHT = 1;

function lerpAngle(a: number, b: number, t: number) {
  let diff = (b - a) % 360;
  if (diff > 180) diff -= 360;
  if (diff < -180) diff += 360;
  return a + diff * t;
}

export default function CustomCursor() {
  const headRef = useRef<SVGGElement>(null);
  const shapeRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;

    document.body.classList.add("custom-cursor-active");

    const head = headRef.current;
    const shapeEl = shapeRef.current;
    if (!head || !shapeEl) return;

    const bbox = shapeEl.getBBox();
    const centroidX = bbox.x + bbox.width / 2;
    const centroidY = bbox.y + bbox.height / 2;
    const intrinsicAngle =
      (Math.atan2(centroidY - TIP_Y, centroidX - TIP_X) * 180) / Math.PI;

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const prev = { ...pos };
    const target = { ...pos };
    let targetRot = 0;
    let dispRot = 0;
    let dispStretch = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
    };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      prev.x = pos.x;
      prev.y = pos.y;
      pos.x += (target.x - pos.x) * WEIGHT;
      pos.y += (target.y - pos.y) * WEIGHT;

      const dx = pos.x - prev.x;
      const dy = pos.y - prev.y;
      const speed = Math.sqrt(dx * dx + dy * dy);

      if (speed > 0.35) {
        const travelAngle = (Math.atan2(dy, dx) * 180) / Math.PI;
        targetRot = travelAngle + 180 - intrinsicAngle;
      }

      dispRot = lerpAngle(dispRot, targetRot, 0.18);
      dispRot = ((dispRot % 360) + 360) % 360;

      const targetStretch = 1 + Math.min(speed, 20) / 40;
      dispStretch += (targetStretch - dispStretch) * 0.25;

      head.setAttribute(
        "transform",
        `translate(${pos.x},${pos.y}) rotate(${dispRot}) scale(${1 / dispStretch},${dispStretch}) translate(${-TIP_X * SCALE},${-TIP_Y * SCALE})`
      );

      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <svg
      width="100%"
      height="100%"
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      aria-hidden="true"
    >
      <g ref={headRef}>
        <path
          ref={shapeRef}
          fill="#FFFFFF"
          stroke="#000000"
          strokeWidth={7}
          strokeLinejoin="round"
          paintOrder="stroke fill"
          transform="scale(0.14)"
          d={CURSOR_PATH}
        />
      </g>
    </svg>
  );
}
