"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import ReactLenis from "lenis/react";
import { asset } from "./lib/asset";

gsap.registerPlugin(useGSAP);

export default function Home() {
  const container = useRef();

  useGSAP(
    () => {

      const heroText = new SplitType (".home h1",{types: "chars"});
      gsap.set(heroText.chars, {y:400});

      gsap.to(heroText.chars, {
        y: 0,
        duration: 1,
        stagger: 0.075,
        ease: "power4.out",
        delay: 1,
      })
    },
    
    {scope: container}
  );

  return ( 
  <ReactLenis root>
    <div className="home" ref={container}>
      <video 
      className="home-video"
      src={asset("/video/video_bg_2.mp4")}
      autoPlay
      muted
      loop
      playsInline
      />
      <h1>anaheim</h1>
    </div>

    <section className="intro">
      <h3>We're more than a design studio based in Mexico city and California</h3>
    </section>
  </ReactLenis> 
  );
}
