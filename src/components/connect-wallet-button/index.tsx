"use client"

import { useEffect, useState } from "react"
import GradientDiv from "../gradient-div"
import { VisibilityTypes } from "@/types/visibility"
import { MdKeyboardArrowRight } from "react-icons/md"
import { connectors } from "../../../public/config/wagmi-connectors"
import { connect } from '@wagmi/core'
import { wagmiConfig } from "../../../public/config/wagmi-config"

export default function ConnectWalletButton() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    // Click function should not work when any of these divs are clicked on.
    const clickFunctionDontWork = ["y-connect-wallet-button", "y-connect-wallet-dropdown"]
    const [metamask, rabby, coinbase, walletConnect] = connectors
    const connectorsMap = {
        metamask,
        rabby,
        coinbase,
        walletConnect,
    }

    function showDropdown() {
        setIsVisible(!isVisible)
    }

    useEffect(function () {
        const dropdownDiv = document.getElementById("y-connect-wallet-dropdown")

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
        const dropdownDiv = document.getElementById("y-connect-wallet-dropdown")
        const visibility: VisibilityTypes = dropdownDiv?.getAttribute("datatype") as VisibilityTypes
        if ((visibility == "visible") && (!clickFunctionDontWork.includes(e.target.offsetParent?.id))) {
            setIsVisible(false)
            dropdownDiv?.setAttribute("datatype", "non-visible")
        }
    }

    async function connectWallet(wallet: string) {
        try {
            // @ts-ignore
            await connect(wagmiConfig, { connector: connectorsMap[wallet] })
        } catch (e) { }
    }

    return (
        <>
            <div className="w-[157px] h-[48px] rounded-[12px] relative" id="y-connect-wallet-button">
                <button className="w-full h-full flex items-center text-lg font-sf-light justify-center bg-button rounded-[12px]" onClick={showDropdown}>
                    Connect Wallet
                </button>
                <div className="w-[350px] h-[300px] mt-2 rounded-[12px] absolute right-0" datatype="non-visible" id="y-connect-wallet-dropdown">
                    <div className="w-full h-full p-3 font-sf-light bg-background rounded-[12px] flex flex-col justify-around">
                        <div className="text-left w-[95%] m-auto font-sf-medium text-[20px]">
                            Select Wallet
                        </div>

                        <div className="flex items-center w-[95%] border-night-light border m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => connectWallet("metamask")}>
                            <div className="w-[90%] h-full rounded-full flex items-center">
                                <img src="/images/metamask.png" alt="Arbitrum Image" className="w-[25px] h-[25px] rounded-[6px]" /> <span className="ml-3">Metamask</span>
                            </div>
                            <MdKeyboardArrowRight className="text-2xl" />
                        </div>

                        <div className="flex items-center w-[95%] border-night-light border m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => connectWallet("rabby")}>
                            <div className="w-[90%] h-full rounded-full flex items-center">
                                <img src="/images/rabby.png" alt="Arbitrum Image" className="w-[25px] h-[25px] rounded-[6px]" /> <span className="ml-3">Rabby</span>
                            </div>
                            <MdKeyboardArrowRight className="text-2xl" />
                        </div>

                        <div className="flex items-center w-[95%] border-night-light border m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => connectWallet("coinbase")}>
                            <div className="w-[90%] h-full rounded-full flex items-center">
                                <img src="/images/coinbase.webp" alt="Arbitrum Image" className="w-[25px] h-[25px] rounded-[6px]" /> <span className="ml-3">Coinbase</span>
                            </div>
                            <MdKeyboardArrowRight className="text-2xl" />
                        </div>

                        <div className="flex items-center w-[95%] border-night-light border m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2" onClick={() => connectWallet("walletConnect")}>
                            <div className="w-[90%] h-full rounded-full flex items-center">
                                <img src="/images/wallet-connect.jpeg" alt="Arbitrum Image" className="w-[25px] h-[25px] rounded-[6px]" /> <span className="ml-3">Wallet Connect</span>
                            </div>
                            <MdKeyboardArrowRight className="text-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}