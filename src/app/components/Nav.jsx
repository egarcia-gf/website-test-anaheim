"use client";

import{useTransitionRouter} from "next-view-transitions";
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { asset } from "../lib/asset";
import { usePathname } from "next/navigation";



const Nav = () =>{

    const router = useTransitionRouter();
    const [open, setOpen] = useState(false)
    const pathname = usePathname();


    const slideInOut = () => {
        const opts = { duration: 1000, easing: "ease-in-out", fill: "forwards" };
        document.documentElement.animate(
            [{ opacity: 1, transform: "translateY(0)" }, { opacity: 0.2, transform: "translateY(-35%)" }],
            { ...opts, pseudoElement: "::view-transition-old(root)" }
        );
        document.documentElement.animate(
            [{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }, { clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)" }],
            { ...opts, pseudoElement: "::view-transition-new(root)" }
        );
    };

    const clean = (p) => p.replace(/\/$/, "") || "/";

    const go = (e, href) => {
        e.preventDefault();
        setOpen(false);
        if (clean(pathname) === clean(href)) return; // ya estás aquí: sin animación
        router.push(href, { onTransitionReady: slideInOut });
    };


    return(
        <nav className="nav">
            <div className="logo">
                <div className="link">
                    <Link href="/" onClick={(e) => go(e, "/")}>
                        <Image src={asset("/img/Anaheim_Logo_white.svg")} alt="Anaheim logo" width={120} height={40}/>
                    </Link>

                </div>
            </div>
            <button
                className="menu-btn"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Cerrar menú" : "Abrir menú"}
                aria-expanded={open}
            >
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className={`links ${open ? "open" : ""}`}>
                <div className="link">
                    <Link href="/projects" onClick={(e) => go(e, "/projects")}>Projects</Link>
                </div>
                <div className="link">
                    <Link href="/info" onClick={(e) => go(e, "/info")}>About</Link>
                </div>
                <div className="link">
                    <Link href="/contact" onClick={(e) => go(e, "/contact")}>contact</Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav
