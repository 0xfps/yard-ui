"use client"

import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { getChainImage } from "@/utils/get-chain-image"
import { DEFAULT_CHAIN_ID } from "@/utils/constants"
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri"
import { VisibilityTypes } from "@/types/visibility"
import { getChainId } from "@/utils/get-chain-id"
import { switchChain } from '@wagmi/core'
import { wagmiConfig } from "../../../public/config/wagmi-config"
import { isSupportedChain } from "@/utils/is-supported-chain"
import { CiWarning } from "react-icons/ci"

export default function CurrentChain() {
    const { isConnected, chainId } = useAccount()
    const [chainImg, setChainImg] = useState<string>("/images/arbitrum.png")
    const [isVisible, setIsVisible] = useState<boolean>(false)
    // Click function should not work when any of these divs are clicked on.
    const clickFunctionDontWork = ["y-chain-button", "y-chain-dropdown"]

    async function switchToChain(chainId: number) {
        if (!isConnected) return
        try {
            await switchChain(wagmiConfig, { chainId: chainId as any })
        } catch { }
    }

    useEffect(function () {
        const chainImage = getChainImage(chainId)
        setChainImg(chainImage ?? getChainImage(DEFAULT_CHAIN_ID) as string)
    }, [chainId])

    function showDropdown() {
        if (isConnected) {
            setIsVisible(!isVisible)
        }
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
            dropdownDiv?.setAttribute("datatype", "non-visible")
        }
    }

    return (
        <div className="w-fit h-[48px] rounded-[12px] relative mr-5" id="y-chain-button">
            {
                (isConnected && isSupportedChain(chainId))
                    ? <button className="w-full h-full flex items-center font-sf-light justify-center bg-background rounded-[12px] p-3" onClick={showDropdown}>
                        <img src={chainImg} alt="Default Chain Image" className="w-[20px] h-[20px]" />
                        <span>
                            {
                                !isVisible ?
                                    <RiArrowDropDownLine className="text-3xl" />
                                    :
                                    <RiArrowDropUpLine className="text-3xl" />
                            }
                        </span>
                    </button>
                    : <button className="w-full h-full flex items-center font-sf-light justify-center bg-background rounded-[12px] p-3" onClick={showDropdown}>
                        <CiWarning className="text-2xl text-[#FF8A00]" />
                        <span>
                            {
                                !isVisible ?
                                    <RiArrowDropDownLine className="text-3xl" />
                                    :
                                    <RiArrowDropUpLine className="text-3xl" />
                            }
                        </span>
                    </button>
            }

            <div className="w-[230px] h-[250px] mt-2 rounded-[12px] absolute right-0" datatype="non-visible" id="y-chain-dropdown">
                <div className="w-full h-full p-3 font-sf-light bg-background rounded-[12px] flex flex-col justify-around">
                    <div className="text-left w-[95%] m-auto font-sf-medium text-[20px]">
                        Select Chain
                    </div>

                    <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("arbitrum"))}>
                        <img src="/images/arbitrum.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Arbitrum Sepolia</span>
                    </div>

                    <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("base"))}>
                        <img src="/images/base.png" alt="Base Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Base Sepolia</span>
                    </div>

                    <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("bsc"))}>
                        <img src="/images/bsc.png" alt="BSC Image" className="w-[25px] h-[25px]" /> <span className="ml-3">BSC Testnet</span>
                    </div>

                    {/* <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("scroll"))}>
                        <img src="/images/scroll.png" alt="Scroll Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Scroll</span>
                    </div> */}

                    <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => switchToChain(getChainId("sepolia"))}>
                        <img src="/images/sepolia.png" alt="Ethereum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Ethereum Sepolia</span>
                    </div>
                </div>
            </div>
        </div>
    )
}