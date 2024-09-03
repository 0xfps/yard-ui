"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(function () {
    document.title = "Home | Yard Protocol"
  }, [])

  return (
    <>
      <div className="bg-background min-h-screen bg-hero">
        
      </div>
    </>
  );
}
