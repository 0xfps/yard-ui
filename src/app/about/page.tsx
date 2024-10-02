"use client"

import AboutHero from "@/components/about-hero";
import Footer from "@/components/footer";
import Links from "@/components/links";
import NavBarHome from "@/components/navbar-home";
import { useEffect } from "react";

export default function About() {
    useEffect(function () {
        document.title = "About The Builders | Yard Protocol"
    }, [])

    return (
        <div className="bg-background min-h-screen bg-hero bg-top bg-no-repeat">
            <div>
                <NavBarHome />
            </div>
            <AboutHero />
            <Links />
            <Footer />
        </div>
    );
}
