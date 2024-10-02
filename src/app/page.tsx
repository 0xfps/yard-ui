"use client"

import Chains from "@/components/chains";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import HeroData from "@/components/hero-data";
import HeroImage from "@/components/hero-image";
import Links from "@/components/links";
import NavBarHome from "@/components/navbar-home";
import { useEffect } from "react";

export default function Home() {
  useEffect(function () {
    document.title = "Home | Yard Protocol"
  }, [])

  return (
    <div className="bg-background min-h-screen bg-hero bg-top bg-no-repeat">
      <div>
        <NavBarHome />
        <Hero />
        <HeroImage />
        <HeroData />
      </div>
      <Chains />
      <Features />
      <Links />
      <Footer />
    </div>
  );
}
