"use client"

import GradientButton from "../gradient-button"

export default function NavBarHome() {
    return (
        <div className="h-[80px] sticky top-0">
            <div className="w-[85%] h-full m-auto flex p-[10px]">
                {/* Yard logo. */}
                <div className="w-[10%] h-full flex flex-row justify-center items-center">
                    <a href="/" className="hover:brightness-[.85]">
                        <img src="/images/yard.png" alt="Yard Logo" className="w-[50px] h-[50px]"/>
                    </a>
                </div>
                {/* Yard navigation. */}
                {/* @todo Remember to use this for modals. */}
                <div className="w-[70%] h-full flex flex-row justify-center items-center">
                    <div className="relative w-[50%] h-full bg-transparent rounded-[12px] flex flex-row justify-around items-center text-text font-sf-light backdrop-blur-lg">
                        <a href="/" className="rounded-[10px] w-fit p-[10px] hover:bg-night-light hover:bg-opacity-[.05] hover:backdrop-blur-lg text-lg">Home</a>
                        <a href="/swap" className="rounded-[10px] w-fit p-[10px] hover:bg-night-light hover:bg-opacity-[.05] hover:backdrop-blur-lg text-lg">Swap</a>
                        <a href="/liquidity" className="rounded-[10px] w-fit p-[10px] hover:bg-night-light hover:bg-opacity-[.05] hover:backdrop-blur-lg text-lg">Liquidity</a>
                        <a href="/about" className="rounded-[10px] w-fit p-[10px] hover:bg-night-light hover:bg-opacity-[.05] hover:backdrop-blur-lg text-lg">About</a>
                    </div>
                </div>
                {/* Yard launch button.*/}
                <div className="w-[20%] h-full flex flex-row justify-center items-center">
                    <a href="/swap" target="_blank">
                        <GradientButton>
                            <div className="bg-button w-[160px] h-[48px] text-text rounded-[12px] text-lg font-sf-light hover:opacity-[.90] flex flex-row justify-center items-center">
                                Launch App
                            </div>
                        </GradientButton>
                    </a>
                </div>
            </div>
        </div>
    )
}