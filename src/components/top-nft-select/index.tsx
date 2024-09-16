import { RiArrowDropDownLine } from "react-icons/ri";
import GradientDiv from "../gradient-div";
import { useModal } from "@/store/modal-store";
import { useAccount } from "wagmi";
import { useSwapData } from "@/store/swap-data-store";

export default function TopNFTSelect() {
    const { isConnected } = useAccount()
    const { setCurrentModal } = useModal()
    const { ownerNFTImage } = useSwapData()

    function displaySelectModal() {
        if (isConnected)
            setCurrentModal("SELECT_USER_NFT")
    }

    return (
        <div className="w-[100%] h-[145px] bg-[#192126] rounded-[12px] p-8 flex justify-between items-center">
            <img src={ownerNFTImage || "/images/nft-placeholder.png"} alt="NFT From" className="w-[60px] h-[60px] rounded-full" />
            <div className={`w-[250px] h-[45px] rounded-[12px] text-xs font-sf-light ${!isConnected ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} onClick={displaySelectModal}>
                <GradientDiv>
                    <div className="w-[full] h-[100%] bg-night rounded-[12px] flex justify-around items-center">
                        <span>Select collections and NFTs</span>
                        <RiArrowDropDownLine className="text-xl" />
                    </div>
                </GradientDiv>
            </div>
        </div>
    )
}