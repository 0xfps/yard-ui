"use client"

import GradientDiv from "../gradient-div"

export default function ConnectWalletButton() {
    return (
        <>
            <div className="w-[157px] h-[48px] bg-button rounded-[12px] hover:opacity-90 transition ease-in-out delay-150">
                <GradientDiv>
                    <button className="w-full h-full flex items-center text-lg font-sf-light justify-center bg-button rounded-[12px]">
                        Connect Wallet
                    </button>
                </GradientDiv>
            </div>
        </>
    )
}