"use client";
import ReactLenis from "lenis/react";
import { asset } from "./lib/asset";

export default function Home() {
  return ( 
  <ReactLenis root>
    <div className="home">
      <video 
      className="home-video"
      src={asset("/video/video_bg_2.mp4")}
      autoPlay
      muted
      loop
      playsInline
      />
      <h1>Anaheim</h1>
    </div>
  </ReactLenis> 
  );
}
