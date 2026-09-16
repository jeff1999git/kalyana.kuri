"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PiCheers } from "react-icons/pi";
import { ROYAL_GOLD } from "./CheersCursor";

const COLORS = ["#ffffff", "#f5d48a", "#c4b5fd", "#8b5cf6"];
const PARTICLE_COUNT = 14;
const MAX_BURSTS = 8;
const BURST_LIFETIME_MS = 1600;

type Shape = "heart" | "sparkle" | "cheers" | "dot";

interface Particle {
  id: number;
  dx: number;
  dy: number;
  size: number;
  color: string;
  shape: Shape;
  rotate: number;
  duration: number;
}

interface Burst {
  id: number;
  x: number;
  y: number;
  particles: Particle[];
}

function pickShape(): Shape {
  const r = Math.random();
  if (r < 0.32) return "heart";
  if (r < 0.58) return "sparkle";
  if (r < 0.8) return "cheers";
  return "dot";
}

function makeBurst(id: number, x: number, y: number): Burst {
  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() - 0.5) * 0.6;
    const dist = 50 + Math.random() * 80;
    const shape = pickShape();
    return {
      id: i,
      dx: Math.cos(angle) * dist,
      dy: Math.sin(angle) * dist + 24,
      size: shape === "cheers" ? 18 + Math.random() * 10 : 10 + Math.random() * 10,
      color: shape === "cheers" ? ROYAL_GOLD : COLORS[Math.floor(Math.random() * COLORS.length)],
      shape,
      rotate: (Math.random() - 0.5) * 240,
      duration: 0.9 + Math.random() * 0.4,
    };
  });
  return { id, x, y, particles };
}

function ParticleShape({ shape }: { shape: Shape }) {
  if (shape === "cheers") {
    return <PiCheers size="100%" aria-hidden />;
  }
  if (shape === "heart") {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden>
        <path d="M12 21s-6.7-4.4-9.3-8.3C.6 9.6 2 5.2 5.7 4.3c2-.5 4.1.3 5.3 2 1.2-1.7 3.3-2.5 5.3-2 3.7.9 5.1 5.3 3 8.4C18.7 16.6 12 21 12 21z" />
      </svg>
    );
  }
  if (shape === "sparkle") {
    return (
      <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden>
        <path d="M12 2l2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" width="100%" height="100%" fill="currentColor" aria-hidden>
      <circle cx="12" cy="12" r="6" />
    </svg>
  );
}

export function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let nextId = 0;
    let lastPointerType = "mouse";

    const spawn = (x: number, y: number) => {
      const burst = makeBurst(nextId++, x, y);
      setBursts((current) => [...current.slice(-(MAX_BURSTS - 1)), burst]);
      window.setTimeout(() => {
        setBursts((current) => current.filter((b) => b.id !== burst.id));
      }, BURST_LIFETIME_MS);
    };

    // Mouse: burst on press for instant feedback. Touch/pen: burst on the
    // resulting click so a scroll-start doesn't trigger it.
    const onPointerDown = (e: PointerEvent) => {
      lastPointerType = e.pointerType;
      if (e.pointerType === "mouse" && e.button === 0) spawn(e.clientX, e.clientY);
    };
    const onClick = (e: MouseEvent) => {
      if (e.detail === 0) return; // keyboard-triggered click
      if (lastPointerType !== "mouse") spawn(e.clientX, e.clientY);
    };

    window.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("click", onClick);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {bursts.map((burst) => (
        <div key={burst.id} className="absolute" style={{ left: burst.x, top: burst.y }}>
          <motion.span
            className="absolute rounded-full border border-white/60"
            style={{ width: 12, height: 12, left: -6, top: -6 }}
            initial={{ scale: 0.4, opacity: 0.8 }}
            animate={{ scale: 6, opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          />
          {burst.particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute"
              style={{ width: p.size, height: p.size, left: -p.size / 2, top: -p.size / 2, color: p.color }}
              initial={{ x: 0, y: 0, scale: 0, opacity: 1, rotate: 0 }}
              animate={{ x: p.dx, y: p.dy, scale: [0, 1, 0.7], opacity: [1, 1, 0], rotate: p.rotate }}
              transition={{
                x: { duration: p.duration, ease: [0.16, 1, 0.3, 1] },
                y: { duration: p.duration, ease: [0.16, 1, 0.3, 1] },
                rotate: { duration: p.duration, ease: "easeOut" },
                scale: { duration: p.duration, times: [0, 0.25, 1], ease: "easeOut" },
                opacity: { duration: p.duration, times: [0, 0.55, 1], ease: "linear" },
              }}
            >
              <ParticleShape shape={p.shape} />
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  );
}
