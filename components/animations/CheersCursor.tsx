"use client";

import { useEffect, useState } from "react";
import { motion, useAnimationControls, useMotionValue } from "framer-motion";
import { PiCheers } from "react-icons/pi";

export const ROYAL_GOLD = "#D4AF37";

const INTERACTIVE = "a, button, [role='button'], label, summary, .cursor-pointer";
const TEXT_FIELDS = "input, textarea, select, [contenteditable='true']";

export function CheersCursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const clink = useAnimationControls();

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target instanceof Element ? e.target : null;
      setVisible(!target?.closest(TEXT_FIELDS));
      setHovering(!!target?.closest(INTERACTIVE));
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      clink.start({
        rotate: [0, -18, 14, -6, 0],
        transition: { duration: 0.45, ease: "easeOut" },
      });
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.documentElement.removeEventListener("mouseleave", onLeave);
    };
  }, [x, y, clink]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[70]"
      style={{ x, y }}
    >
      {/* offset so the pointer sits at the glasses' clink point */}
      <div className="-translate-x-1/2 -translate-y-[30%]">
        <motion.div
          animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.3 : 1 }}
          transition={{
            opacity: { duration: 0.15 },
            scale: { type: "spring", stiffness: 400, damping: 22 },
          }}
        >
          <motion.div
            animate={clink}
            style={{ color: ROYAL_GOLD }}
            className="[filter:drop-shadow(0_1px_1px_rgba(0,0,0,0.8))_drop-shadow(0_0_6px_rgba(212,175,55,0.45))]"
          >
            <PiCheers size={30} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
