"use client"

import AppContainer from "@/components/app-container"
import AppNavBar from "@/components/app-navbar"
import ChainBlockNumber from "@/components/chain-block-number"
import FaucetHeader from "@/components/faucet-header"
import FaucetModal from "@/components/faucet-modal"
import { useEffect } from "react"

export default function Swap() {
    useEffect(function () {
        document.title = "Get Free NFTs And yUSDC - Yard Protocol"
    }, [])

    return (
        <AppContainer>
            <AppNavBar name={"faucet"} />
            <FaucetHeader />
            <FaucetModal />
            <ChainBlockNumber />
        </AppContainer>
    )
}