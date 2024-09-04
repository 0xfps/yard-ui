"use client"

import AboutHero from "@/components/about-hero";
import Footer from "@/components/footer";
import Links from "@/components/links";
import NavBarHome from "@/components/navbar-home";
import { useEffect } from "react";

export default function Home() {
    useEffect(function () {
        document.title = "Home | Yard Protocol"
    }, [])

    return (
        <>
            <div className="bg-background min-h-screen bg-hero bg-top bg-no-repeat">
                {/* The NavBar is sticky and I want it to only remain sticy while this div is visible. */}
                <div>
                    <NavBarHome />
                </div>
                <AboutHero />
                <Links />
                <Footer />
            </div>
        </>
    );
}
