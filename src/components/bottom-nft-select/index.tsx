"use client"

import { RiArrowDropDownLine } from "react-icons/ri";
import { useAccount } from "wagmi";
import { useSwapData } from "@/store/swap-data-store";
import { useModal } from "@/store/modal-store";
import { useEffect, useState } from "react";

export default function BottomNFTSelect() {
    const { isConnected } = useAccount()
    const { ownerNFTID, selectedNFTImage, selectedNFTId, selectedNFTName } = useSwapData()
    const { setCurrentModal } = useModal()
    const [userCanClickOnImage, setUserCanClickOnImage] = useState<boolean>(false)

    useEffect(function () {
        if (ownerNFTID !== null && isConnected) {
            setUserCanClickOnImage(true)
        } else {
            setUserCanClickOnImage(false)
        }
    }, [isConnected, ownerNFTID])

    function showSelectPairNFTModal() {
        if (userCanClickOnImage) setCurrentModal("SELECT_PAIR_NFT")
    }

    return (
        <div className="w-[100%] h-[145px] bg-[#192126] rounded-[12px] p-8 flex justify-between items-center">
            <div
                className={
                    `w-fit h-fit p-1 bg-background flex flex-row items-center justify-around rounded-[12px]
                    ${userCanClickOnImage ? "cursor-pointer" : "opacity-50 cursor-not-allowed"}`
                }
                onClick={showSelectPairNFTModal}
            >
                <img src={selectedNFTImage || "/images/nft-placeholder.png"} alt="NFT Receive" className="w-[50px] h-[50px] rounded-[12px]" />
                <RiArrowDropDownLine className="text-3xl" />
            </div>
            <div className={`w-[300px] h-[100px] rounded-[12px] text-xs font-sf-light `}>
                <div className="w-[full] h-[100%] bg-background rounded-[12px] flex flex-col justify-around px-3 py-1 items-end">
                    <span className="text-xs font-thin text-text text-opacity-50">
                        You receive
                    </span>
                    <span className={`text-[25px] font-semibold text-text ${selectedNFTName == "" && "text-opacity-30"}`}>
                        {selectedNFTName || "Zombie Monkey Club"}
                    </span>
                    <span className={`text-lg font-thin text-text ${selectedNFTName == "" && "text-opacity-30"}`}>#{selectedNFTId === null ? 6666 : selectedNFTId}</span>
                </div>
            </div>
        </div>
    )
}