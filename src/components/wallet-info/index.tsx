"use client"

import { useAccount } from "wagmi"
import GradientDiv from "../gradient-div"
import { useEffect, useState } from "react"
import { getChainName } from "@/utils/get-chain-name"
import { getChainImage } from "@/utils/get-chain-image"
import { DEFAULT_CHAIN_ID } from "@/utils/constants"
import { truncateAddress } from "@/utils/truncate-address"
import { FaPowerOff, FaRegCopy } from "react-icons/fa"
import { FiExternalLink } from "react-icons/fi"
import chainData from "../../../public/json/chain-data.json"
import { disconnect } from '@wagmi/core'
import { wagmiConfig } from "../../../public/config/wagmi-config"
import { VisibilityTypes } from "@/types/visibility"

export default function WalletInfo() {
    // Wagmi automatically picks up and updates the chainId.
    const { isConnected, chainId, address } = useAccount()
    const [chainImg, setChainImg] = useState<string>("/images/arbitrum.png")
    const [chainName, setChainName] = useState<string>("Arbitrum")
    const [isVisible, setIsVisible] = useState<boolean>(false)
    // Click function should not work when any of these divs are clicked on.
    const clickFunctionDontWork = ["y-wallet-info-button", "y-wallet-info-dropdown"]

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

    function getUserWalletURL() {
        const chainName = getChainName(chainId)
        if (!chainName) return "#"
        // @ts-ignore
        const explorerURl = chainData.chains[chainName].explorerUrl
        return `${explorerURl}/address/${address}`
    }

    async function disconnectWallet() {
        if (!isConnected) return
        await disconnect(wagmiConfig)
    }

    async function copyAddress() {
        await navigator.clipboard.writeText(address as string)
    }

    function showDropdown() {
        setIsVisible(!isVisible)
    }

    useEffect(function () {
        const dropdownDiv = document.getElementById("y-wallet-info-dropdown")

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
        const dropdownDiv = document.getElementById("y-wallet-info-dropdown")
        const visibility: VisibilityTypes = dropdownDiv?.getAttribute("datatype") as VisibilityTypes
        if ((visibility == "visible") && (!clickFunctionDontWork.includes(e.target.offsetParent?.id))) {
            setIsVisible(false)
        }
    }

    return (
        <>
            <div className="w-[157px] h-[48px] rounded-[12px] relative" id="y-wallet-info-button">
                <GradientDiv>
                    <button className="w-full h-full flex px-2 items-center font-sf-light justify-around bg-night rounded-[12px]" onClick={showDropdown}>
                        <img src="/images/jazzicon.png" alt="Jazzicon" className="w-[20px] h-[20px] rounded-full" />
                        <span>
                            {truncateAddress(address as string, 5)}
                        </span>
                    </button>
                </GradientDiv>
                <div className="w-[400px] h-[200px] mt-2 rounded-[12px] absolute right-0" datatype="non-visible" id="y-wallet-info-dropdown">
                    <GradientDiv>
                        <div className="w-full h-full py-3 font-sf-light bg-background rounded-[12px] flex flex-col justify-around">
                            <div className="w-full h-full p-4 flex">
                                <div className="w-[40%] h-full flex justify-center items-center">
                                    <div className="flex w-[120px] h-[120px] justify-center items-center relative">
                                        <img src="/images/jazzicon.png" alt="Jazzicon" className="w-full h-full rounded-full" />
                                        <img src={chainImg} alt={chainName} className="absolute w-[25px] h-[25px] right-0 bottom-0" />
                                    </div>
                                </div>
                                <div className="w-[60%] h-full flex justify-center">
                                    <div className="w-full h-[60px] mt-5">
                                        <div className="w-full h-[50px] rounded-[12px] cursor-pointer" onClick={copyAddress}>
                                            <GradientDiv>
                                                <div className="w-full h-full rounded-[12px] bg-night flex justify-around items-center font-sf-bold">
                                                    <span>
                                                        <span>{truncateAddress(address as string, 7)}</span>
                                                    </span>
                                                    <FaRegCopy />
                                                </div>
                                            </GradientDiv>
                                        </div>
                                        <div className="flex justify-around mt-4">
                                            <div className="w-[30%] h-[40px] rounded-[12px]">
                                                <GradientDiv>
                                                    <a href={getUserWalletURL()} target="_blank">
                                                        <button className="w-full h-full rounded-[12px] bg-night flex justify-center items-center">
                                                            <FiExternalLink />
                                                        </button>
                                                    </a>
                                                </GradientDiv>
                                            </div>
                                            <div className="w-[30%] h-[40px] rounded-[12px]" onClick={disconnectWallet}>
                                                <GradientDiv>
                                                    <button className="w-full h-full rounded-[12px] bg-night flex justify-center items-center">
                                                        <FaPowerOff />
                                                    </button>
                                                </GradientDiv>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </GradientDiv>
                </div>
            </div >
        </>
    )
}