"use client"

import AppContainer from "@/components/app-container"
import AppNavBar from "@/components/app-navbar"
import PositionsBox from "@/components/positions-box"
import PositionsTitle from "@/components/positions-title"
import { useEffect } from "react"

export default function AddLiquidity() {
    useEffect(function () {
        document.title = "Provide Liquidity To An Existing Pair - Yard Protocol"
    }, [])

    return (
        <>
            <AppContainer>
                <AppNavBar name={"liquidity"} />
                <div className="w-[60%] m-auto">
                    <PositionsTitle />
                    <PositionsBox/>
                </div>
            </AppContainer>
        </>
    )
}