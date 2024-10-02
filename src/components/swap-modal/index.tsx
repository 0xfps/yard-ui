"use client"

import TopNFTSelect from "../top-nft-select";
import BottomNFTSelect from "../bottom-nft-select";
import ToolTipDiv from "../tooltip";
import { useSwapMode } from "@/store/swap-mode-store";
import { FaCircleArrowDown, FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { useAccount } from "wagmi";
import { useSwapData } from "@/store/swap-data-store";
import { ARBITRARY_SWAP_CONTENT } from "@/utils/tooltips";
import { useModal } from "@/store/modal-store";

export default function SwapModal() {
    const { isConnected } = useAccount()
    const { isArbitrarySwap, setIsArbitrarySwap } = useSwapMode()
    const { ownerNFTID, selectedNFTId } = useSwapData()
    const { setCurrentModal } = useModal()

    function toggleArbitrarySwap() {
        setIsArbitrarySwap(!isArbitrarySwap)
    }

    function showWalletConnectDropDown() {
        document.getElementById("y-connect-wallet-dropdown")?.setAttribute("datatype", "visible")
    }

    function showSwapDetailsModalIfIdsAreSet() {
        if ((ownerNFTID === null || selectedNFTId === null)) return
        setCurrentModal("SWAP_DETAILS")
    }

    return (
        <div className="w-full">
            <div className="w-[554px] h-[495px] mt-8 rounded-[12px] m-auto">
                <div className="w-full h-full px-5 bg-background rounded-[12px]">
                    <div className="w-full h-[60px] flex justify-end items-center text-xs cursor-pointer font-sf-light">
                        <ToolTipDiv trigger="Arbitrary swap" content={ARBITRARY_SWAP_CONTENT} />
                        {
                            isArbitrarySwap
                                ? <FaToggleOn className="text-3xl cursor-pointer ml-3 text-button" onClick={toggleArbitrarySwap} />
                                : <FaToggleOff className="text-3xl cursor-pointer ml-3 text-button opacity-70" onClick={toggleArbitrarySwap} />
                        }
                    </div>
                    <div className="w-full h-[60%] rounded-[12px] flex flex-col justify-between relative">
                        <TopNFTSelect />
                        <FaCircleArrowDown className="absolute top-0 bottom-0 left-0 right-0 m-auto text-2xl text-button opacity-50" />
                        <BottomNFTSelect />
                    </div>

                    <div className="w-full flex justify-center items-center mt-6">
                        <div className="w-full h-[70px] rounded-[12px] text-2xl font-normal tracking-wide">
                            {
                                isConnected
                                    ? <button
                                        className={
                                            `w-full h-full rounded-[12px] bg-button 
                                            ${(ownerNFTID === null || selectedNFTId === null)
                                                ? "cursor-not-allowed opacity-50"
                                                : "transition ease-in-out delay-0 hover:opacity-80"
                                            }`
                                        }
                                        onClick={showSwapDetailsModalIfIdsAreSet}
                                    >
                                        Proceed
                                    </button>
                                    : <button className="w-full h-full rounded-[12px] bg-button cursor-pointer transition ease-in-out delay-0 hover:opacity-80" onClick={showWalletConnectDropDown}>
                                        Connect wallet
                                    </button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}