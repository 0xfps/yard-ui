"use client"

import { RiArrowDropDownLine } from "react-icons/ri";
import { useModal } from "@/store/modal-store";
import { useAccount } from "wagmi";
import { useSwapData } from "@/store/swap-data-store";

export default function TopNFTSelect() {
    const { isConnected } = useAccount()
    const { setCurrentModal } = useModal()
    const { ownerNFTImage, ownerNFTName, ownerNFTID } = useSwapData()

    function displaySelectModal() {
        if (isConnected)
            setCurrentModal("SELECT_USER_NFT")
    }

    return (
        <div className="w-[100%] h-[145px] bg-[#192126] rounded-[12px] p-8 flex justify-between items-center">
            <div className={`w-fit h-fit p-1 bg-background flex flex-row items-center justify-around rounded-[12px] ${!isConnected ? " opacity-50 cursor-not-allowed" : "cursor-pointer"}`} onClick={displaySelectModal} >
                <img src={ownerNFTImage || "/images/nft-placeholder.png"} alt="NFT From" className="w-[50px] h-[50px] rounded-[12px]" />
                <RiArrowDropDownLine className="text-3xl" />
            </div>
            <div className={`w-[300px] h-[100px] rounded-[12px] text-xs font-sf-light`}>
                <div className="w-[full] h-[100%] bg-background rounded-[12px] flex flex-col justify-around px-3 py-1 items-end">
                    <span className="text-xs font-thin text-text text-opacity-50">
                        You send
                    </span>
                    <span className={`text-[25px] font-semibold text-text ${ownerNFTName == "" && "text-opacity-30"}`}>
                        {ownerNFTName || "Brown Apes Club"}
                    </span>
                    <span className={`text-lg font-thin text-text ${ownerNFTName == "" && "text-opacity-30"}`}>#{ownerNFTID === null ? 8888 : ownerNFTID}</span>
                </div>
            </div>
        </div>
    )
}