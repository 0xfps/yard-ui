import { RiArrowDropDownLine } from "react-icons/ri";
import GradientDiv from "../gradient-div";
import { useAccount } from "wagmi";
import { useSwapData } from "@/store/swap-data-store";

export default function BottomNFTSelect() {
    const { isConnected } = useAccount()
    const { ownerNFTID, selectedNFTImage } = useSwapData()

    return (
        <div className="w-[100%] h-[145px] bg-[#192126] rounded-[12px] p-8 flex justify-between items-center">
            <img src={selectedNFTImage || "/images/nft-placeholder.png"} alt="NFT Receive" className="w-[60px] h-[60px] rounded-full" />
            <div
                className={
                    `w-[250px] h-[45px] rounded-[12px] text-xs font-sf-light ${!isConnected && "opacity-50 cursor-not-allowed"} 
                    ${(ownerNFTID === null) ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`
                }
            >
                <GradientDiv>
                    <div className="w-[full] h-[100%] bg-night rounded-[12px] flex justify-around items-center">
                        <span>Select NFT to receive</span>
                        <RiArrowDropDownLine className="text-xl" />
                    </div>
                </GradientDiv>
            </div>
        </div>
    )
}