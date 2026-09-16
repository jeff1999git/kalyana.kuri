"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Fireflies } from "@/components/animations/Fireflies";
import { GradientText } from "@/components/ui/GradientText";

const PROJECTS = [
  {
    title: "Vishnu & Anupama",
    category: "Wedding Invitation",
    href: "https://vishnu-anupama.framer.ai/",
    x: "40%", y: "30%",
    float: { dur: 3.6, delay: 0 },
  },
  {
    title: "Vishnu — The Groom",
    category: "Custom Wedding Experience",
    href: "https://vishnuvirtualgroom.vercel.app/",
    x: "58%", y: "46%",
    float: { dur: 4.2, delay: 0.8 },
  },
  {
    title: "Nora",
    category: "Farewell Gallery",
    href: "https://noraaa.vercel.app/",
    x: "42%", y: "64%",
    float: { dur: 3.9, delay: 1.4 },
  },
];

function FloatingProject({
  title, category, href, x, y, float: { dur, delay },
}: (typeof PROJECTS)[number]) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      className="absolute"
      style={{ left: x, top: y, translateX: "-50%", translateY: "-50%" }}
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay }}
    >
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        whileHover={{ scale: 1.1, y: -8 }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        className="block cursor-pointer rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 px-6 py-4 origin-center
          hover:bg-white/20 hover:border-white/40 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]
          transition-[background-color,border-color,box-shadow] duration-300"
        style={{ minWidth: 160 }}
      >
        <p className="text-base font-bold text-foreground text-center tracking-wide">
          {title}
        </p>

        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 8 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-xs text-foreground/70 leading-relaxed text-center max-w-[200px] overflow-hidden"
            >
              {category}
              <br />
              <span className="text-accent">View Experience →</span>
            </motion.p>
          )}
        </AnimatePresence>
      </motion.a>
    </motion.div>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <Fireflies />

      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"
      />

      {/* heading — desktop only, floats above the project cards */}
      <div className="hidden md:block absolute top-[8%] inset-x-0 z-10 text-center px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
          Our work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          See What We <GradientText>Create</GradientText>
        </h2>
      </div>

      {/* bottom-anchored glowing figure — desktop only */}
      <div className="hidden md:block">
        <picture>
          <source srcSet="/optimized/2.2-orig.avif" type="image/avif" />
          <source srcSet="/optimized/2.2-orig.webp" type="image/webp" />
          <motion.img
            // eslint-disable-next-line @next/next/no-img-element
            src="/optimized/2.2-orig.png"
            alt=""
            aria-hidden
            loading="lazy"
            className="absolute bottom-0 right-8 w-[28rem] lg:w-[36rem] object-contain object-bottom pointer-events-none"
            animate={{
              filter: [
                "drop-shadow(0 0 8px rgba(255,255,255,0.25))",
                "drop-shadow(0 0 32px rgba(255,255,255,0.75))",
                "drop-shadow(0 0 8px rgba(255,255,255,0.25))",
              ],
            }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </picture>
      </div>

      {/* mobile layout: heading + static card grid */}
      <div className="md:hidden relative z-10 w-full px-6 py-8 flex flex-col items-center justify-center min-h-screen gap-8">
        <div className="text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
            Our work
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
            See What We <GradientText>Create</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
          {PROJECTS.map((project, i) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 px-4 py-4${
                i === PROJECTS.length - 1 && PROJECTS.length % 2 === 1 ? " col-span-2" : ""
              }`}
            >
              <p className="text-sm font-bold text-foreground text-center tracking-wide">{project.title}</p>
              <p className="text-xs text-foreground/60 text-center mt-2 leading-relaxed">{project.category}</p>
              <p className="text-xs text-accent text-center mt-2">View Experience →</p>
            </a>
          ))}
        </div>
      </div>

      {/* desktop layout: floating project cards */}
      {PROJECTS.map((project) => (
        <div key={project.title} className="hidden md:block">
          <FloatingProject {...project} />
        </div>
      ))}
    </section>
  );
}
