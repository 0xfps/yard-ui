"use client"

import Hero from "@/components/hero";
import HeroData from "@/components/hero-data";
import HeroImage from "@/components/hero-image";
import NavBarHome from "@/components/navbar-home";
import { useEffect } from "react";

export default function Home() {
  useEffect(function () {
    document.title = "Home | Yard Protocol"
  }, [])

  return (
    <>
      <div className="bg-background min-h-screen bg-hero bg-top bg-no-repeat">
        <NavBarHome />
        <Hero />
        <HeroImage />
        <HeroData/>
      </div>
    </>
  );
}
