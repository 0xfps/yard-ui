"use client"

import { useAccount } from "wagmi"
import ConnectWalletButton from "../connect-wallet-button"
import CurrentChain from "../current-chain"
import WalletInfo from "../wallet-info"
import { useEffect, useState } from "react"
import { DEFAULT_CHAIN_ID } from "@/utils/constants"
import { switchChain } from '@wagmi/core'
import { wagmiConfig } from "../../../public/config/wagmi-config"

export default function AppNavBar() {
    const { chainId, isConnected } = useAccount()
    const [userIsConnected, setUserIsConnected] = useState<boolean>(false)

    useEffect(function () {
        setUserIsConnected(isConnected)
        if (!isConnected) return
        
        if (chainId != DEFAULT_CHAIN_ID) {
            ; (async function () {
                try {
                    await switchChain(wagmiConfig, { chainId: DEFAULT_CHAIN_ID })
                } catch (e) { }
            })()
        }
    }, [isConnected])

    return (
        <div className="h-[80px] w-full p-2 flex justify-between items-center">
            {/* Logo and links. */}
            <div className="w-[15%] p-1 h-full flex justify-around items-center font-sf-light text-sm">
                <img src="/images/yard.png" alt="Yard Logo" className="w-[55px] h-[55px]" />
                <a href="/liquidity" className="hover:opacity-90">Provide liquidity</a>
                <a href="/liquidity" className="y-active hover:opacity-90">Swap</a>
            </div>
            {/* Connect Wallet And Chain */}
            <div className="w-[20%] p-1 h-full flex items-center justify-between">
                <CurrentChain />
                {(!userIsConnected || !isConnected) ? <ConnectWalletButton /> : <WalletInfo />}
            </div>
        </div>
    )
}