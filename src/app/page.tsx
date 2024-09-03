"use client"

import { useEffect } from "react";

export default function Home() {
  useEffect(function () {
    document.title = "Home | Yard Protocol"
  }, [])

  return (
    <></>
  );
}
