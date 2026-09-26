"use client";

import { animate, motion, useMotionValue, useTransform, type MotionValue } from "framer-motion";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ChevronLeft, ChevronRight } from "@/components/ui/icons";

export type Shot = { name: string; src: string; alt: string };

const PHONE_W = 230;
const SCREEN_W = 218; // phone width minus the 6px bezel on each side
const SLOT = SCREEN_W + 24; // screen width + gap to the neighbour
const SWIPE = 50; // px swiped before it counts as a change
export const CAROUSEL_W = SCREEN_W * 3 + 48; // phone plus one neighbour each side

const mod = (a: number, n: number) => ((a % n) + n) % n;

// Fade by distance d (px) from the phone's centre, so it changes smoothly while the strip moves:
// d = 0 (in the phone): fully visible. d = one slot: 0 at the outer edge -> 85% at the edge facing
// the phone. d = two slots: invisible (the extra image waiting to slide in).
function maskAt(d: number) {
  const t = Math.abs(d) / SLOT;
  const outer = t <= 1 ? 1 - t : 0;
  const inner = t <= 1 ? 1 - 0.15 * t : Math.max(0, 0.85 * (2 - t));
  const dir = d < 0 ? "to right" : "to left";
  return `linear-gradient(${dir}, rgba(0,0,0,${outer}), rgba(0,0,0,${inner}))`;
}

function Slot({
  offset,
  x,
  shot,
  onPick,
}: {
  offset: number;
  x: MotionValue<number>;
  shot: Shot;
  onPick: (step: number) => void;
}) {
  const mask = useTransform(x, (v) => maskAt(offset * SLOT + v));
  const style = { x: offset * SLOT, maskImage: mask, WebkitMaskImage: mask };
  const base = "absolute inset-0 overflow-hidden rounded-[28px] bg-black";
  const image = (
    <Image
      src={shot.src}
      alt={offset === 0 ? shot.alt : ""}
      fill
      sizes={`${PHONE_W}px`}
      draggable={false}
      className="object-cover object-top"
    />
  );

  // The two visible neighbours are buttons: clicking one brings it into the phone.
  if (Math.abs(offset) === 1) {
    return (
      <motion.button
        type="button"
        aria-label={`Show ${shot.name}`}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={() => onPick(offset)}
        style={style}
        className={`${base} focus-ring pointer-events-auto cursor-pointer`}
      >
        {image}
      </motion.button>
    );
  }

  return (
    <motion.div aria-hidden={offset !== 0 || undefined} style={style} className={base}>
      {image}
    </motion.div>
  );
}

export default function PhoneCarousel({ shots, onChange }: { shots: Shot[]; onChange: (index: number) => void }) {
  // pos counts up/down forever; the project shown is pos mod shots.length. Each image is keyed by
  // its absolute slot number, so it keeps its element (no reload, no jump) as the index changes.
  const [pos, setPos] = useState(0);
  const x = useMotionValue(0);
  const startX = useRef<number | null>(null);
  const current = mod(pos, shots.length);

  function go(step: number) {
    // Settle with the real drag speed (0 for a click). Read it before the shift below.
    const velocity = x.getVelocity();
    if (step) {
      const next = pos + step;
      setPos(next);
      onChange(mod(next, shots.length));
      // The neighbour becomes the centre slot; shift x by one slot so nothing moves on screen.
      // jump() (not set()) so the 242px shift isn't read as speed and flung past the phone.
      x.jump(x.get() + step * SLOT);
    }
    animate(x, 0, { type: "spring", stiffness: 300, damping: 32, velocity });
  }

  // Only the phone takes the swipe. The strip follows it, capped at one slot either way.
  function onPointerDown(e: PointerEvent<HTMLDivElement>) {
    startX.current = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: PointerEvent<HTMLDivElement>) {
    if (startX.current === null) return;
    // A missed pointerup (button already released) must not leave the strip following the mouse.
    if (e.pointerType === "mouse" && e.buttons === 0) return onPointerEnd();
    x.set(Math.max(-SLOT, Math.min(SLOT, e.clientX - startX.current)));
  }

  // Release always snaps back into the phone: the next project if swiped far enough, else the same one.
  function onPointerEnd() {
    if (startX.current === null) return;
    startX.current = null;
    const dx = x.get();
    go(dx < -SWIPE ? 1 : dx > SWIPE ? -1 : 0);
  }

  function onKeyDown(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowLeft") go(-1);
    else if (e.key === "ArrowRight") go(1);
    else return;
    e.preventDefault();
  }

  const arrow =
    "focus-ring glass grid h-10 w-10 place-items-center rounded-full text-ink transition-transform hover:scale-105 active:scale-95";

  return (
    <div
      className="flex flex-col items-center"
      style={{ width: CAROUSEL_W }}
      role="group"
      aria-roledescription="carousel"
      aria-label="Projects on a phone"
    >
      {/* Phone mockup: the screenshot strip is the bottom layer, the frame sits on top */}
      <div
        tabIndex={0}
        aria-label={`${shots[current].name}, project ${current + 1} of ${shots.length}. Use the arrow keys to change.`}
        onKeyDown={onKeyDown}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={onPointerEnd}
        onLostPointerCapture={onPointerEnd}
        style={{ width: PHONE_W }}
        className="focus-ring relative cursor-grab touch-pan-y select-none rounded-[34px] p-[6px] active:cursor-grabbing"
      >
        <div className="relative aspect-[390/844]">
          {/* The screen itself, so the gap between two sliding pages reads as glass, not a hole */}
          <div className="absolute inset-0 rounded-[28px] bg-black" />
          <motion.div style={{ x }} className="pointer-events-none absolute inset-0">
            {[-2, -1, 0, 1, 2].map((offset) => {
              const slot = pos + offset;
              return <Slot key={slot} offset={offset} x={x} shot={shots[mod(slot, shots.length)]} onPick={go} />;
            })}
          </motion.div>
        </div>

        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[34px] border-[6px] border-[#0d0d0f] shadow-[0_30px_60px_-20px_rgb(0_0_0/0.55)] ring-1 ring-white/10"
        >
          <span className="absolute -left-[8px] top-[80px] h-[24px] w-[2px] rounded-l bg-[#0d0d0f]" />
          <span className="absolute -left-[8px] top-[116px] h-[40px] w-[2px] rounded-l bg-[#0d0d0f]" />
          <span className="absolute -right-[8px] top-[100px] h-[52px] w-[2px] rounded-r bg-[#0d0d0f]" />
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4">
        <button type="button" onClick={() => go(-1)} aria-label="Previous project" className={arrow}>
          <ChevronLeft className="h-5 w-5" />
        </button>
        <p className="tabular min-w-[4.5rem] text-center text-sm text-muted" aria-live="polite">
          {current + 1} of {shots.length}
        </p>
        <button type="button" onClick={() => go(1)} aria-label="Next project" className={arrow}>
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
      <p className="mt-3 text-[13px] text-muted">Swipe the phone, or tap a side screen</p>
    </div>
  );
}
