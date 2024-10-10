"use client"

import { useAccount } from "wagmi"
import ConnectWalletButton from "../connect-wallet-button"
import CurrentChain from "../current-chain"
import WalletInfo from "../wallet-info"
import { useEffect, useState } from "react"
import { DEFAULT_CHAIN_ID } from "@/utils/constants"
import { switchChain } from '@wagmi/core'
import { wagmiConfig } from "../../../public/config/wagmi-config"
import { isSupportedChain } from "@/utils/is-supported-chain"
import { ActivePage } from "@/interfaces/active-page"

export default function AppNavBar({ name }: ActivePage) {
    const { chainId, isConnected } = useAccount()
    const [userIsConnected, setUserIsConnected] = useState<boolean>(false)

    useEffect(function () {
        setUserIsConnected(isConnected)
        if (!isConnected) return

        if (!isSupportedChain(chainId)) {
            switchToDefaultChain()
        }
    }, [isConnected])

    async function switchToDefaultChain() {
        try {
            await switchChain(wagmiConfig, { chainId: DEFAULT_CHAIN_ID })
        } catch (e) { }
    }

    return (
        <div className="h-[80px] w-full p-2 flex justify-between items-center">
            <div className="w-[50%] p-1 h-full flex items-center justify-start font-sf-light text-sm">
                <a href="/swap"><img src="/images/yard.png" alt="Yard Logo" className="w-[55px] h-[55px]" /></a>
                <a href="/swap" className={`${name == "swap" && "y-active"} hover:opacity-90 ml-5`}>Swap</a>
                <a href="/faucet" target="_blank" className={`${name == "faucet" && "y-active"} hover:opacity-90 ml-5`}>Faucet</a>
            </div>
            <div className="w-[50%] p-1 h-full flex items-center justify-end">
                <CurrentChain />
                {(!userIsConnected || !isConnected) ? <ConnectWalletButton /> : <WalletInfo />}
            </div>
        </div>
    )
}