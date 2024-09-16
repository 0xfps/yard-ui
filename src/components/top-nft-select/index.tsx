import { RiArrowDropDownLine } from "react-icons/ri";
import GradientDiv from "../gradient-div";
import { useModal } from "@/store/modal-store";

export default function TopNFTSelect() {
    const { setCurrentModal } = useModal()

    return (
        <div className="w-[100%] h-[145px] bg-[#192126] rounded-[12px] p-8 flex justify-between items-center">
            <img src="/images/arbitrum.png" alt="NFT From" className="w-[60px] h-[60px]" />
            <div className="w-[250px] h-[45px] rounded-[12px] cursor-pointer text-xs font-sf-light" onClick={() => setCurrentModal("SELECT_USER_NFT")}>
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