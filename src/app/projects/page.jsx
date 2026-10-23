"use client";
import { useEffect, useRef, useState } from "react";
import ReactLenis from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { asset } from "../lib/asset";

const imgs = [
  ["Anime_pic", "Work_001"],
  ["AS_029_ai", "Work_002"],
  ["AS_028_ai", "Work_003"],
  ["no_face_art", "Work_004"],
  ["AS_007_ai", "Work_005"],
  ["AS_013_ai", "Work_006"],
  ["AS_021_ai", "Work_007"],
  ["AS_027_ai", "Work_008"],
];

const videos = [
  ["https://vimeo.com/320972740", "Video_001"],
  ["https://www.facebook.com/ANGofficial/videos/635016847014364/", "ANG Official"],
];

const isVimeo = (url) => url.includes("vimeo.com");

const embedUrl = (url) => {
  if (!isVimeo(url)) {
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=0&autoplay=true`;
  }
  const [, id, hash] = url.match(/vimeo\.com\/(\d+)(?:\/(\w+))?/);
  return `https://player.vimeo.com/video/${id}?autoplay=1${hash ? `&h=${hash}` : ""}`;
};

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Projects = () => {
  const root = useRef();
  const dialog = useRef();
  const [current, setCurrent] = useState(null);
  const [thumbs, setThumbs] = useState({});

  useEffect(() => {
    videos.filter(([url]) => isVimeo(url)).forEach(([url]) => {
      fetch(`https://vimeo.com/api/oembed.json?width=960&url=${encodeURIComponent(url)}`)
        .then((r) => r.json())
        .then((d) => setThumbs((t) => ({ ...t, [url]: d.thumbnail_url })))
        .catch(() => {});
    });
  }, []);
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(hover: none) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray(".scroll-zoom").forEach((img) =>
          gsap.fromTo(
            img,
            { scale: 1 },
            {
              scale: 1.15,
              ease: "none",
              scrollTrigger: { trigger: img.parentElement, start: "top bottom", end: "bottom top", scrub: true },
            },
          ),
        );
      });
    },
    { scope: root },
  );

  const open = (url) => {
    setCurrent(url);
    dialog.current.showModal();
  };

  return (
  <ReactLenis root>
    <div ref={root} className="w-screen min-h-svh bg-[var(--bg)] px-4 pt-24 pb-8">
      <h1 className="text-[clamp(3rem,10vw,120px)] tracking-[-0.2rem] pb-[2%]">Projects</h1>
      <p className="short-description text-[clamp(1.1rem,2.5vw,2rem)] leading-tight max-w-[40ch] pb-8 text-white/70">Some projects for personal use and for clients</p>
      <div className="grid grid-cols-1 min-[801px]:grid-cols-4 gap-1 w-full mx-auto">
        {imgs.map(([file, alt]) => (
          <div key={file} className="group aspect-[3/4] overflow-hidden">
            <img
              src={asset(`/img/${file}.webp`)}
              alt={alt}
              className="scroll-zoom transition-transform duration-300 group-hover:scale-115"
            />
          </div>
        ))}
      </div>

      <h2 className="text-[clamp(2rem,6vw,72px)] tracking-[-0.1rem] pt-24 pb-8">Videos</h2>
      <div className="grid grid-cols-1 min-[801px]:grid-cols-2 gap-1 w-full mx-auto">
        {videos.map(([url, title, thumb], i) => (
          <button
            key={i}
            type="button"
            onClick={() => open(url)}
            aria-label={`Play ${title}`}
            className="group relative aspect-video overflow-hidden bg-black cursor-pointer"
          >
            {(thumb || thumbs[url]) ? (
              <img
                src={thumb ? asset(thumb) : thumbs[url]}
                alt=""
                className="transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <span className="absolute bottom-3 left-4 text-white/70">{title}</span>
            )}
            <span className="absolute inset-0 grid place-items-center text-5xl text-white/90">▶</span>
          </button>
        ))}
      </div>

      <div className="group aspect-[1600/680] w-full mt-1 overflow-hidden">
        <img
          src={asset("/img/ang_concert.webp")}
          alt="ANG concert"
          className="scroll-zoom transition-transform duration-300 group-hover:scale-115"
        />
      </div>

      <dialog
        ref={dialog}
        data-lenis-prevent
        onClick={(e) => e.target === dialog.current && dialog.current.close()}
        onClose={() => setCurrent(null)}
        className="m-auto w-[min(90vw,1200px)] overflow-visible bg-black backdrop:bg-black/80"
      >
        {current && (
          <iframe
            src={embedUrl(current)}
            title="Video"
            className="aspect-video w-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        )}
        <button
          type="button"
          onClick={() => dialog.current.close()}
          aria-label="Close"
          className="absolute -top-11 right-0 text-4xl leading-none text-white cursor-pointer"
        >
          ×
        </button>
      </dialog>
    </div>
  </ReactLenis>
  );
};

export default Projects;
