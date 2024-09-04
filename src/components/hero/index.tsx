"use client"

import GradientButton from "../gradient-button"

export default function Hero() {
    return (
        <div className="mt-[120px] text-text text-center">
            <div className="text-center text-[80px] font-sf-bold">
                Swap NFTs Instantly With <br /> Liquidity Pools
            </div>
            <div className="text-[26px] mt-6 font-sf-light">
                Experience a new way of swapping NFTs.
            </div>
            <div className="mt-6 flex justify-center items-center hover:cursor-pointer">
                <a href="/swap" target="_blank">
                    <GradientButton>
                        <div className="bg-button w-[220px] h-[62px] text-text rounded-[12px] text-lg font-sf-light flex justify-center items-center">
                            Start Swapping
                        </div>
                    </GradientButton>
                </a>
            </div>
        </div>
    )
}