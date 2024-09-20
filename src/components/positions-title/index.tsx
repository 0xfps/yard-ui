"use client"

import { FaPlus } from "react-icons/fa6"
import GradientDiv from "../gradient-div"

export default function PositionsTitle() {
    return (
        <div className="mt-12 w-full h-[60px] flex justify-between items-center p-2">
            <span className="font-sf-medium text-2xl">
                Positions
            </span>
            <div className="w-[110px] h-[90%] rounded-[12px] text-xs cursor-pointer">
                <GradientDiv>
                    <div className="w-full h-full rounded-[12px] bg-button flex justify-between items-center p-2">
                        <FaPlus className="text-xs"/> <span>Add Liquidity</span>
                    </div>
                </GradientDiv>
            </div>
        </div>
    )
}