import { useAccount } from "wagmi"
import { wagmiConfig } from "../../../public/config/wagmi-config"
import { switchChain } from '@wagmi/core'
import { ARBITRUM_CHAIN_ID, BASE_CHAIN_ID, BSC_CHAIN_ID, SCROLL_CHAIN_ID, SEPOLIA_CHAIN_ID } from "@/utils/constants"
import { useEffect, useState } from "react"
import { isSupportedChain } from "@/utils/is-supported-chain"
import { SupportedChains } from "@/types/supported-chains"

export default function SelectUserNFTModal() {
    const { address, isConnected, chainId } = useAccount()
    const [isOnSupportedChain, setIsOnSupportedChain] = useState<boolean>(false)

    async function switchToChain(chainId: number) {
        if (!isConnected) return
        try {
            await switchChain(wagmiConfig, { chainId: chainId as any })
        } catch { }
    }

    useEffect(function () {
        const isOnSupportedChain = isSupportedChain(chainId)
        setIsOnSupportedChain(isOnSupportedChain)

        if (!chainId) return
        if (!isOnSupportedChain || !isConnected || !address) return
            ; (async function () {
                // Load up NFTs here.
            })()
    }, [chainId])


    return (
        <div className="w-[350px] h-[400px] p-5">
            {
                !isOnSupportedChain
                    ? <>
                        <div className="text-text text-center font-sf-bold text-lg">
                            <p>You're Not On A Supported Chain</p>
                        </div>

                        <div className="flex justify-between items-center h-[80px] mt-12 px-2">
                            <img src="/images/arbitrum.png" title="Arbitrum Sepolia Testnet" alt="Arbitrum" className="w-[40px] h-[40px] cursor-pointer" onClick={() => switchToChain(ARBITRUM_CHAIN_ID)} />
                            <img src="/images/base.png" title="Base Sepolia Testnet" alt="Base" className="w-[40px] h-[40px] cursor-pointer" onClick={() => switchToChain(BASE_CHAIN_ID)} />
                            <img src="/images/bsc.png" title="BSC Testnet" alt="BSC" className="w-[40px] h-[40px] cursor-pointer" onClick={() => switchToChain(BSC_CHAIN_ID)} />
                            <img src="/images/scroll.png" title="Scroll Sepolia Testnet" alt="Scroll" className="w-[40px] h-[40px] cursor-pointer" onClick={() => switchToChain(SCROLL_CHAIN_ID)} />
                            <img src="/images/sepolia.png" title="Ethereum Sepolia Testnet" alt="Sepolia" className="w-[40px] h-[40px] cursor-pointer" onClick={() => switchToChain(SEPOLIA_CHAIN_ID)} />
                        </div>

                        <div className="text-sm font-sf-light mt-12 text-center">
                            We discovered that you are not connected to a chain that Yard supports, please click on one
                            of the chains above that we support to access the features of Yard.
                        </div>
                    </>
                    : <>
                    </>
            }
        </div>
    )
}