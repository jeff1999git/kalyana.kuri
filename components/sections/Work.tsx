"use client";

import { motion } from "framer-motion";
import { Fireflies } from "@/components/animations/Fireflies";
import { GradientText } from "@/components/ui/GradientText";

const PROJECTS = [
  {
    title: "Vishnu & Anupama",
    category: "Wedding Invitation",
    href: "https://vishnu-anupama.framer.ai/",
    image: "work-vishnu-anupama",
    x: "26%", y: "42%",
    float: { dur: 3.6, delay: 0 },
  },
  {
    title: "Vishnu — The Groom",
    category: "Custom Wedding Experience",
    href: "https://vishnuvirtualgroom.vercel.app/",
    image: "work-the-groom",
    x: "52%", y: "40%",
    float: { dur: 4.2, delay: 0.8 },
  },
  {
    title: "Nora",
    category: "Farewell Gallery",
    href: "https://noraaa.vercel.app/",
    image: "work-nora",
    x: "36%", y: "76%",
    float: { dur: 3.9, delay: 1.4 },
  },
];

type Project = (typeof PROJECTS)[number];

function ProjectPreview({ title, category, href, image }: Project) {
  const hostname = new URL(href).hostname;

  return (
    <>
      {/* mini browser window */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-black/40">
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white/5 border-b border-white/10">
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
          <span className="w-1.5 h-1.5 rounded-full bg-white/25" />
          <span className="ml-2 flex-1 truncate rounded-full bg-black/40 px-2 py-0.5 text-[9px] leading-none text-foreground/40">
            {hostname}
          </span>
        </div>
        <picture>
          <source srcSet={`/optimized/${image}-orig.avif`} type="image/avif" />
          <source srcSet={`/optimized/${image}-orig.webp`} type="image/webp" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`/optimized/${image}-orig.jpg`}
            alt={`${title} — ${category} preview`}
            loading="lazy"
            className="w-full aspect-[16/10] object-cover object-top"
          />
        </picture>
      </div>

      {/* caption */}
      <div className="mt-3">
        <p className="text-sm font-bold text-foreground tracking-wide">{title}</p>
        <div className="mt-0.5 flex items-start justify-between gap-3">
          <p className="text-xs text-foreground/60">{category}</p>
          <span className="shrink-0 text-xs text-accent whitespace-nowrap group-hover:text-foreground transition-colors duration-fast">
            View Experience →
          </span>
        </div>
      </div>
    </>
  );
}

function FloatingProject(project: Project) {
  const { href, x, y, float: { dur, delay } } = project;

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
        whileHover={{ scale: 1.05, y: -8 }}
        transition={{ type: "spring", stiffness: 350, damping: 24 }}
        className="group block w-[264px] 2xl:w-[300px] cursor-pointer rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-3 origin-center
          hover:bg-white/20 hover:border-white/40 hover:shadow-[0_12px_40px_rgba(255,255,255,0.12)]
          transition-[background-color,border-color,box-shadow] duration-300"
      >
        <ProjectPreview {...project} />
      </motion.a>
    </motion.div>
  );
}

export function Work() {
  return (
    <section
      id="work"
      className="relative lg:min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      <Fireflies />

      <div
        aria-hidden
        className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent"
      />

      {/* heading — desktop only, floats above the project cards */}
      <div className="hidden lg:block absolute top-[8%] inset-x-0 z-10 text-center px-6">
        <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
          Our work
        </p>
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight">
          See What We <GradientText>Create</GradientText>
        </h2>
      </div>

      {/* bottom-anchored glowing figure — desktop only */}
      <div className="hidden lg:block">
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

      {/* mobile / tablet layout: heading + static card grid */}
      <div className="lg:hidden relative z-10 w-full px-6 py-24 flex flex-col items-center justify-center gap-10">
        <div className="text-center">
          <p className="text-xs font-medium tracking-widest uppercase text-accent mb-4">
            Our work
          </p>
          <h2 className="text-4xl font-bold tracking-tight text-foreground leading-tight">
            See What We <GradientText>Create</GradientText>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-sm sm:max-w-4xl">
          {PROJECTS.map((project) => (
            <a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 p-3 hover:bg-white/20 hover:border-white/40 transition-colors duration-300"
            >
              <ProjectPreview {...project} />
            </a>
          ))}
        </div>
      </div>

      {/* desktop layout: floating project cards */}
      {PROJECTS.map((project) => (
        <div key={project.title} className="hidden lg:block">
          <FloatingProject {...project} />
        </div>
      ))}
    </section>
  );
}
