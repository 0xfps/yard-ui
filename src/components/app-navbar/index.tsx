"use client"

import { useAccount } from "wagmi"
import ConnectWalletButton from "../connect-wallet-button"
import CurrentChain from "../current-chain"
import WalletInfo from "../wallet-info"

export default function AppNavBar() {
    const { isConnected } = useAccount()
    
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
                {!isConnected ? <ConnectWalletButton/> : <WalletInfo/>}
            </div>
        </div>
    )
}