"use client";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import SplitType from "split-type";
import { asset } from "../lib/asset";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const images = ["Anaheim_STD_001", "Anaheim_STD_002", "AS_0012_ai", "Anaheim_STD_004"];

const CELL = 16;
const SPREAD_ABOVE = 0.25;
const SPREAD_BELOW = 0.25;
const SCATTER = 0.15;
const CORE_RADIUS = 0.025;
const MIN_SCATTER_AT_CENTER = 0.3;
const VISIBILITY_THRESHOLD = 0.65;
const COLOR = "#0043FF";
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&*+=?!<>{}[]";
const TRAVEL = 1 + SPREAD_ABOVE + SPREAD_BELOW;

const hash = (row, col, seed) => {
  const raw = Math.sin(row * seed + col * (seed * 2.45)) * 43758.5453;
  return raw - Math.floor(raw);
};

export default function Spotlight({ children }) {
  const root = useRef();
  const grid = useRef();
  const copy = useRef();

  useLenis(ScrollTrigger.update);

  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const imgs = gsap.utils.toArray(".spotlight-img", root.current);
      const transitions = imgs.length - 1;

      const cols = Math.ceil(window.innerWidth / CELL);
      const rows = Math.ceil(window.innerHeight / CELL);
      const cells = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const el = document.createElement("div");
          el.textContent = CHARS[Math.floor(Math.random() * CHARS.length)];
          el.style.cssText = `position:absolute;left:${col * CELL}px;top:${row * CELL}px;width:${CELL}px;height:${CELL}px;font-size:${Math.round(CELL * 0.7)}px;background:${COLOR};color:#000;display:flex;align-items:center;justify-content:center;overflow:hidden;line-height:1;font-family:monospace;font-weight:500;visibility:hidden`;
          grid.current.appendChild(el);
          cells.push({
            el,
            y: (row + 0.5) / rows,
            rand: hash(row, col, 127.1),
            scatter: (hash(row, col, 269.3) - 0.5) * SCATTER,
            shown: false,
          });
        }
      }

      const setShown = (c, shown) => {
        if (c.shown !== shown) {
          c.el.style.visibility = shown ? "visible" : "hidden";
          c.shown = shown;
        }
      };

      const updateClips = (progress) => {
        imgs.slice(0, transitions).forEach((img, i) => {
          const seg = gsap.utils.clamp(0, 1, progress * transitions - i);
          const pct = gsap.utils.clamp(0, 100, (-SPREAD_ABOVE + seg * TRAVEL) * 100);
          img.style.clipPath = `polygon(0% ${pct}%, 100% ${pct}%, 100% 100%, 0% 100%)`;
        });
      };

      const updateBand = (centerY) => {
        for (const c of cells) {
          const strength = gsap.utils.clamp(
            MIN_SCATTER_AT_CENTER,
            1,
            Math.abs(c.y - centerY) / CORE_RADIUS,
          );
          const d = c.y - centerY + c.scatter * strength;
          const n = d >= 0 ? d / SPREAD_BELOW : -d / SPREAD_ABOVE;
          setShown(c, n < 1 && (1 - n) ** 2 > c.rand * VISIBILITY_THRESHOLD);
        }
      };

      const split = new SplitType(copy.current.querySelector("h3"), { types: "words" });
      gsap.fromTo(
        split.words,
        { opacity: 0, y: 24, filter: "blur(12px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: root.current,
            start: `top+=${window.innerHeight * 0.3} top`,
            end: `+=${transitions * window.innerHeight * 0.7}`,
            scrub: true,
          },
        },
      );

      ScrollTrigger.create({
        trigger: root.current,
        start: "top top",
        end: `+=${transitions * window.innerHeight}`,
        pin: true,
        scrub: true,
        onUpdate: ({ progress }) => {
          const raw = progress * transitions;
          const current = Math.min(Math.floor(raw), transitions - 1);
          const t = gsap.utils.clamp(0, 1, raw - current);

          updateClips(progress);
          if (reduced || t <= 0 || t >= 1) {
            cells.forEach((c) => setShown(c, false));
          } else {
            updateBand(-SPREAD_ABOVE + t * TRAVEL);
          }
        },
      });

      return () => {
        split.revert();
        cells.forEach((c) => c.el.remove());
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} className="relative w-full h-svh overflow-hidden">
      {images.map((n, i) => (
        <div
          key={n}
          className="spotlight-img absolute inset-0 will-change-[clip-path]"
          style={{ zIndex: images.length - i }}
        >
          <img src={asset(`/img/${n}.webp`)} alt="" />
        </div>
      ))}
      <div ref={grid} className="absolute inset-0 z-100 pointer-events-none" />
      <div ref={copy} className="absolute inset-0 z-200 flex items-center justify-center px-8 text-center [&_h3]:lowercase [&_h3]:text-[clamp(2.25rem,3.2vw,3.5rem)] [&_h3]:max-w-[24em] [&_h3]:text-balance [&_h3]:font-bold [&_h3]:leading-[1.1] [&_h3]:[text-shadow:0_2px_26px_rgb(0_0_0/0.7)]">
        {children}
      </div>
    </section>
  );
}
