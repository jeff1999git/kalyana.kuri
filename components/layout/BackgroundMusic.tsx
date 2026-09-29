"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PiSpeakerHigh, PiSpeakerSlash } from "react-icons/pi";
import { ROYAL_GOLD } from "@/components/animations/CheersCursor";
import { SITE } from "@/lib/site";

const SRC = "/bgm.mp3";
const VOLUME = 0.5;
const FADE_IN_MS = 1500;

// Browsers refuse to start sound until the visitor has tapped, clicked or
// pressed a key on the page — no site can autoplay audio before that. The
// welcome veil turns that first tap into "enter the site", so every visit
// starts with music. Set to false to drop the veil and rely on the first
// interaction anywhere on the page instead.
const SHOW_WELCOME = true;

// Events that count as a user gesture for autoplay purposes
// (Chrome: pointerdown/pointerup/keydown, iOS: touchend/click).
const GESTURE_EVENTS = ["pointerdown", "pointerup", "touchend", "keydown", "click"] as const;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const veilRef = useRef<HTMLDivElement>(null);
  const fadeFrame = useRef<number | null>(null);
  const stopWaitingForGesture = useRef<() => void>(() => {});
  const [welcome, setWelcome] = useState(SHOW_WELCOME);
  const [enabled, setEnabled] = useState(true); // visitor's choice (mute button)
  const [playing, setPlaying] = useState(false); // what the element is actually doing

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return false;
    try {
      await audio.play();
      return true;
    } catch {
      return false; // autoplay blocked until the visitor interacts
    }
  }, []);

  const waitForGesture = useCallback(() => {
    function onGesture(e: Event) {
      // the veil and the mute button decide for themselves
      if (e.target instanceof Element && e.target.closest("[data-bgm-veil], [data-bgm-toggle]")) return;
      void play().then((ok) => {
        if (ok) stopWaitingForGesture.current();
      });
    }
    stopWaitingForGesture.current = () => {
      GESTURE_EVENTS.forEach((ev) => window.removeEventListener(ev, onGesture));
      stopWaitingForGesture.current = () => {};
    };
    GESTURE_EVENTS.forEach((ev) => window.addEventListener(ev, onGesture));
  }, [play]);

  // Keep the button in sync with the element, and ease the volume in whenever
  // playback starts so the music never jumps in.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => {
      setPlaying(true);
      if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
      let start: number | null = null;
      audio.volume = 0;
      const step = (now: number) => {
        // rAF timestamps can precede performance.now(), so take t0 from the
        // first frame and clamp — a negative volume throws and kills the fade.
        if (start === null) start = now;
        const t = Math.min(1, Math.max(0, (now - start) / FADE_IN_MS));
        audio.volume = VOLUME * t;
        if (t < 1) fadeFrame.current = requestAnimationFrame(step);
      };
      fadeFrame.current = requestAnimationFrame(step);
    };
    const onPause = () => setPlaying(false);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      if (fadeFrame.current) cancelAnimationFrame(fadeFrame.current);
    };
  }, []);

  // Try to autoplay straight away (works for browsers that already trust the
  // site); otherwise start at the first interaction.
  useEffect(() => {
    let cancelled = false;
    void play().then((ok) => {
      if (!cancelled && !ok) waitForGesture();
    });
    return () => {
      cancelled = true;
      stopWaitingForGesture.current();
    };
  }, [play, waitForGesture]);

  // While the veil is up: no page scroll, and keyboard focus on the veil so
  // Enter/Space go straight in and Tab reaches its buttons first.
  useEffect(() => {
    if (!welcome) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    veilRef.current?.focus({ preventScroll: true });
    return () => {
      document.body.style.overflow = previous;
    };
  }, [welcome]);

  const mute = () => {
    setEnabled(false);
    stopWaitingForGesture.current();
    audioRef.current?.pause();
  };

  const unmute = () => {
    setEnabled(true);
    void play(); // called from a click/keypress, so the browser allows it
  };

  const enter = (withMusic: boolean) => {
    setWelcome(false);
    if (withMusic) unmute();
    else mute();
  };

  const state = enabled ? (playing ? "playing" : "waiting") : "muted";
  const label = enabled ? "Mute background music" : "Unmute background music";

  return (
    <>
      <audio ref={audioRef} src={SRC} loop preload="auto" />

      <AnimatePresence>
        {welcome && (
          <motion.div
            data-bgm-veil
            role="dialog"
            aria-modal="true"
            aria-label={`Welcome to ${SITE.name}`}
            ref={veilRef}
            tabIndex={-1}
            initial={false}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            onClick={() => enter(true)}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return; // buttons handle their own keys
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                enter(true);
              }
            }}
            className="fixed inset-0 z-[55] flex items-center justify-center px-6 text-center bg-background/80 backdrop-blur-md cursor-pointer outline-none"
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.svg" alt="" aria-hidden width={80} height={80} className="mb-5 drop-shadow-lg" />
              <p className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">{SITE.name}</p>
              <p className="mt-2 text-sm md:text-base font-medium text-accent tracking-wide">{SITE.tagline}</p>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  enter(true);
                }}
                className="mt-8 inline-flex items-center justify-center gap-2 h-11 px-7 text-sm font-semibold rounded-full bg-white/90 text-black hover:bg-white transition-colors duration-fast"
              >
                <PiSpeakerHigh size={18} aria-hidden />
                Enter with music
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  enter(false);
                }}
                className="mt-4 text-xs text-foreground/50 hover:text-foreground transition-colors duration-fast"
              >
                Enter without music
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        data-bgm-toggle
        data-state={state}
        onClick={enabled ? mute : unmute}
        aria-label={label}
        title={label}
        className="fixed bottom-5 left-5 md:bottom-6 md:left-6 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-surface-border bg-surface/80 backdrop-blur-md shadow-lg text-foreground/50 hover:text-foreground hover:bg-surface-elevated transition-colors duration-fast"
        style={enabled ? { color: ROYAL_GOLD } : undefined}
      >
        {enabled ? (
          // pulses gently until the browser actually lets the sound through
          <span className={state === "waiting" ? "motion-safe:animate-glow-pulse" : undefined}>
            <PiSpeakerHigh size={18} aria-hidden />
          </span>
        ) : (
          <PiSpeakerSlash size={18} aria-hidden />
        )}
      </button>
    </>
  );
}
