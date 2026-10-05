"use client"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

const Nav = () =>{
    const [open, setOpen] = useState(false)

    return(
        <nav className="nav">
            <div className="logo">
                <div className="link">
                    <Link href="/">
                        <Image src="/img/Anaheim_Logo_white.svg" alt="Anaheim logo" width={120} height={40}/>
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
                    <Link href="/projects" onClick={() => setOpen(false)}>Projects</Link>
                </div>
                <div className="link">
                    <Link href="/info" onClick={() => setOpen(false)}>About</Link>
                </div>
                <div className="link">
                    <Link href="/contact" onClick={() => setOpen(false)}>contact</Link>
                </div>
            </div>
        </nav>
    )
}

export default Nav
