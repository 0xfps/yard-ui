"use client"

import { useAccount } from "wagmi"
import GradientDiv from "../gradient-div"
import { useEffect, useState } from "react"
import { getChainName } from "@/utils/get-chain-name"
import { getChainImage } from "@/utils/get-chain-image"
import { DEFAULT_CHAIN_ID } from "@/utils/constants"
import { titleCase } from "@/utils/title-case"
import { RiArrowDropDownLine } from "react-icons/ri"

export default function CurrentChain() {
    // Wagmi automatically picks up and updates the chainId.
    const { chainId } = useAccount()
    const [chainImg, setChainImg] = useState<string>("/images/arbitrum.png")
    const [chainName, setChainName] = useState<string>("Arbitrum")

    /**
     * Change the name of the chain and the image of the chain if the user connects
     * to a chain that Yard is deployed on. If Yard is not deployed to that chain,
     * it defaults the name and image to Arbitrum.
     */
    useEffect(function () {
        const [chainName, chainImage] = [getChainName(chainId), getChainImage(chainId)]
        setChainImg(chainImage ?? getChainImage(DEFAULT_CHAIN_ID) as string)
        setChainName(chainName ?? getChainName(DEFAULT_CHAIN_ID) as string)
    }, [chainId])

    return (
        <>
            <div className="w-[157px] h-[48px] bg-button rounded-[12px] hover:opacity-90 transition ease-in-out delay-150">
                <GradientDiv>
                    <button className="w-full h-full flex items-center font-sf-light justify-center bg-night rounded-[12px]">
                        <img src={chainImg} alt="Default Chain Image" className="w-[20px] h-[20px]" />
                        <span className="ml-2">{titleCase(chainName)}</span>
                        <span><RiArrowDropDownLine className="text-3xl" /></span>
                    </button>
                </GradientDiv>
            </div>
        </>
    )
}