"use client";
import ReactLenis from "lenis/react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import SplitType from "split-type";

import Image from "next/image"
import { asset } from "../lib/asset";
import { useRef } from "react";

gsap.registerPlugin(useGSAP);

const Info = () => {

    const container = useRef();
    
    useGSAP(
        () => {
            let text;

            const split = (animate) => {
                if (text) text.revert();
                text = new SplitType(".info p", {
                    types: "lines",
                    tagName: "div",
                    lineClass: "line",
                });

                text.lines.forEach((line) => {
                    line.innerHTML = `<span>${line.innerHTML}</span>`;
                });

                gsap.set(".info p .line span", {
                    y: animate ? 400 : 0,
                    display: "block",
                });

                if (animate) {
                    gsap.to(".info p .line span", {
                        y: 0,
                        duration: 2,
                        stagger: 0.075,
                        ease: "power4.out",
                        delay: 0.25,
                    });
                }
            };

            let cancelled = false;
            let timer;
            document.fonts.ready.then(() => !cancelled && split(true));
            const onResize = () => {
                clearTimeout(timer);
                timer = setTimeout(() => split(false), 200);
            };
            window.addEventListener("resize", onResize);

            return () => {
                cancelled = true;
                clearTimeout(timer);
                window.removeEventListener("resize", onResize);
                if (text) text.revert();
            };
        },
        {scope: container}
    )

    return(
        <ReactLenis root>
        <div className="info" ref={container}>
            <div className="col">
                <img src={asset("/img/rpbk_hz.webp")} alt="profile pic" />
            </div>
            <div className="col">
                <p>
                    So this is Anaheim Studio. Honestly it's design, but I don't stick to one thing: logos, artist artwork, websites, 3D animation. If your project needs a brand and that brand also needs to move on screen, I handle both, because for me it's less about hitting a checklist and more about making sure people actually notice it. If someone looks at your logo or your site and thinks "I've seen this before," I screwed up. So no templates, no shortcuts, just enough obsessing over the details that you can feel there was an actual decision behind every piece.
                </p>
                <p className="mt-6">
                    Edwin García - Founder of Anaheim Std.
                </p>
            </div>
        </div>
        </ReactLenis>
    )
}

export default Info