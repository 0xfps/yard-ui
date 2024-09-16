import GradientDiv from "../gradient-div";
import TopNFTSelect from "../top-nft-select";
import { FaArrowAltCircleDown, FaToggleOn } from "react-icons/fa";
import BottomNFTSelect from "../bottom-nft-select";
import ToolTipDiv from "../tooltip";

export default function SwapModal() {
    const ARBITRARY_SWAP_CONTENT = "A few swaps are gonna meow meow meow, meow meow meow meow meow meow meow."

    return (
        <div className="w-screen">
            <div className="w-[554px] h-[495px] mt-8 rounded-[12px] m-auto">
                <GradientDiv>
                    <div className="w-full h-full px-5 bg-background rounded-[12px]">
                        <div className="w-full h-[60px] flex justify-end items-center text-xs cursor-pointer font-sf-light">
                            <ToolTipDiv trigger="Arbitrary swap" content={ARBITRARY_SWAP_CONTENT} />
                            <FaToggleOn className="text-3xl cursor-pointer ml-3" />
                        </div>
                        <div className="w-full h-[60%] rounded-[12px] flex flex-col justify-between relative">
                            <TopNFTSelect />
                            <>
                                <FaArrowAltCircleDown className="absolute top-0 bottom-0 left-0 right-0 m-auto text-xl" />
                                <BottomNFTSelect />
                            </>
                        </div>

                        <div className="w-full flex justify-center items-center mt-6 transition ease-in-out delay-0 hover:opacity-80">
                            <div className="w-full h-[70px] rounded-[12px] bg-button">
                                <GradientDiv>
                                    <button className="w-full h-full rounded-[12px] bg-button text-2xl">
                                        Swap
                                    </button>
                                </GradientDiv>
                            </div>
                        </div>
                    </div>
                </GradientDiv>
            </div>
        </div>
    )
}