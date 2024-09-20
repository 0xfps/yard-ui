"use client"

import { RiArrowDropDownLine } from "react-icons/ri"
import GradientDiv from "../gradient-div"

export function AddLiquidityModal() {
    return (
        <div className="w-[500px] h-fit p-5 m-auto">
            <div className="w-full h-full bg-background rounded-[12px]">
                <div className="text-center font-sf-bold text-2xl">
                    Add Liquidity
                </div>
                <div className="w-full mt-7">
                    <div className="font-sf-medium text-xl">
                        Select pair and NFT
                    </div>
                    <div className="w-full flex justify-between items-center mt-8">
                        <div className="w-[45%] h-[50px] rounded-[12px] cursor-pointer">
                            <GradientDiv>
                                <div className="w-full h-full bg-night rounded-[12px] flex justify-around items-center text-sm">
                                    <span>Select Pair</span>
                                    <RiArrowDropDownLine className="text-xl" />
                                </div>
                            </GradientDiv>
                        </div>
                        <div className="w-[45%] h-[50px] rounded-[12px] cursor-pointer">
                            <GradientDiv>
                                <div className="w-full h-full bg-night rounded-[12px] flex justify-around items-center p-3 text-sm">
                                    <span>Select NFT From Wallet</span>
                                    <RiArrowDropDownLine className="text-xl" />
                                </div>
                            </GradientDiv>
                        </div>
                    </div>
                </div>
                {/* NFT Display */}
                <div>

                </div>
                <div className="w-[full] h-[60px] rounded-[12px] mt-8">
                    <GradientDiv>
                        <div className="w-full h-full bg-button rounded-[12px] flex justify-around items-center text-xl">
                            Add liquidity
                        </div>
                    </GradientDiv>
                </div>
            </div>
        </div>
    )
}