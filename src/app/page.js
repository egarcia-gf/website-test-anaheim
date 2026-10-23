"use client";
import { useRef } from "react";
// import { useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";
import ReactLenis from "lenis/react";
import { asset } from "./lib/asset";
import Spotlight from "./components/Spotlight";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Home() {
  const container = useRef();
  // const [clicks, setClicks] = useState(0);

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
      });

      gsap.to(".home h1", {
        opacity: 0,
        filter: "blur(24px)",
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom 40%",
          scrub: true,
        },
      });
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

    <Spotlight>
      <h3>We're more than a design studio based in Mexico city and California</h3>
    </Spotlight>

    {/* <section className="counter">
      <h2>{clicks}</h2>
      <button onClick={() => setClicks(clicks + 1)}>Hacer clic</button>
    </section> */}
  </ReactLenis> 
  );
}
