"use client"

import AppContainer from "@/components/app-container"
import AppNavBar from "@/components/app-navbar"
import SwapHeader from "@/components/swap-header"
import SwapModal from "@/components/swap-modal"
import { useEffect } from "react"

export default function Swap() {
    useEffect(function () {
        document.title = "Swap An NFT Instantly For Another Instantly - Yard Protocol"
    }, [])

    return (
        <>
            <AppContainer>
                <AppNavBar name={"swap"} />
                <SwapHeader />
                <SwapModal />
            </AppContainer>
        </>
    )
}