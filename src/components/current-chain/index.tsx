"use client"

import { useAccount } from "wagmi"
import GradientDiv from "../gradient-div"
import { useEffect, useState } from "react"
import { getChainName } from "@/utils/get-chain-name"
import { getChainImage } from "@/utils/get-chain-image"
import { DEFAULT_CHAIN_ID } from "@/utils/constants"
import { titleCase } from "@/utils/title-case"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { VisibilityTypes } from "@/types/visibility"
import { getChainId } from "@/utils/get-chain-id"
import { switchChain } from '@wagmi/core'
import { wagmiConfig } from "../../../public/config/wagmi-config"

export default function CurrentChain() {
    // Wagmi automatically picks up and updates the chainId.
    const { isConnected, chainId } = useAccount()
    const [chainImg, setChainImg] = useState<string>("/images/arbitrum.png")
    const [chainName, setChainName] = useState<string>("Arbitrum")
    const [isVisible, setIsVisible] = useState<boolean>(false)
    // Click function should not work when any of these divs are clicked on.
    const clickFunctionDontWork = ["y-chain-button", "y-chain-dropdown"]

    async function switchToChain(chainId: number) {
        if (!isConnected) return
        try {
            await switchChain(wagmiConfig, { chainId: chainId as any })
        } catch { }
    }

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

    function showDropdown() {
        setIsVisible(!isVisible)
    }

    useEffect(function () {
        const dropdownDiv = document.getElementById("y-chain-dropdown")

        if (!isVisible)
            dropdownDiv?.setAttribute("datatype", "non-visible")
        else
            dropdownDiv?.setAttribute("datatype", "visible")
    }, [isVisible])

    useEffect(function () {
        const body = document.getElementsByTagName("body")[0]
        body.addEventListener("click", click)

        return function () {
            removeEventListener("click", click)
        }
    }, [])

    function click(e: any) {
        const dropdownDiv = document.getElementById("y-chain-dropdown")
        const visibility: VisibilityTypes = dropdownDiv?.getAttribute("datatype") as VisibilityTypes
        if ((visibility == "visible") && (!clickFunctionDontWork.includes(e.target.offsetParent?.id))) {
            setIsVisible(false)
        }
    }

    return (
        <>
            <div className="w-fit h-[48px] rounded-[12px] relative" id="y-chain-button">
                <button className="w-full h-full flex items-center font-sf-light justify-center bg-background rounded-[12px] p-3" onClick={showDropdown}>
                    <img src={chainImg} alt="Default Chain Image" className="w-[20px] h-[20px]" />
                    {/* <span className="ml-2">{titleCase(chainName) == "Bsc" ? "BSC" : titleCase(chainName)}</span> */}
                    <span>
                        {
                            !isVisible ?
                                <RiArrowDropDownLine className="text-3xl" />
                                :
                                <RiArrowDropUpLine className="text-3xl" />
                        }
                    </span>
                </button>
                <div className="w-[200px] h-[300px] mt-2 rounded-[12px] absolute right-0" datatype="non-visible" id="y-chain-dropdown">
                    <div className="w-full h-full p-3 font-sf-light bg-background rounded-[12px] flex flex-col justify-around">
                        <div className="text-left w-[95%] m-auto font-sf-medium text-[20px]">
                            Select Chain
                        </div>

                        <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("arbitrum"))}>
                            <img src="/images/arbitrum.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Arbitrum</span>
                        </div>

                        <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("base"))}>
                            <img src="/images/base.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Base</span>
                        </div>

                        <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("bsc"))}>
                            <img src="/images/bsc.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">BSC</span>
                        </div>

                        <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("scroll"))}>
                            <img src="/images/scroll.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Scroll</span>
                        </div>

                        <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("sepolia"))}>
                            <img src="/images/sepolia.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Sepolia</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}