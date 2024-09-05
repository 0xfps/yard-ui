"use client"

import AppContainer from "@/components/app-container"
import AppNavBar from "@/components/app-navbar"
import { useEffect } from "react"

export default function Swap() {
    useEffect(function () {
        document.title = "Swap An NFT Instantly For Another Instantly - Yard Protocol"
    }, [])
    return (
        <>
            <AppContainer>
                <AppNavBar/>
            </AppContainer>
        </>
    )
}