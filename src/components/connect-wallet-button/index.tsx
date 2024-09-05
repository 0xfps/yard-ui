"use client"

import GradientDiv from "../gradient-div"

export default function ConnectWalletButton() {
    return (
        <>
            <div className="w-[157px] h-[48px] rounded-[12px] relative" id="y-connect-wallet-button">
                <GradientDiv>
                    <button className="w-full h-full flex items-center text-lg font-sf-light justify-center bg-button rounded-[12px]">
                        Connect Wallet
                    </button>
                </GradientDiv>
                <div className="w-[200px] h-[300px] mt-2 rounded-[12px] absolute right-0" datatype="non-visible" id="y-connect-wallet-dropdown">
                    <GradientDiv>
                        <div className="w-full h-full p-3 font-sf-light bg-background rounded-[12px] flex flex-col justify-around">
                            <div className="text-center font-sf-medium">
                                Select Wallet
                            </div>

                            <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2">
                                <img src="/images/arbitrum.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Arbitrum</span>
                            </div>

                            <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2">
                                <img src="/images/base.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Base</span>
                            </div>

                            <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2">
                                <img src="/images/bsc.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">BSC</span>
                            </div>

                            <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2">
                                <img src="/images/scroll.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Scroll</span>
                            </div>

                            <div className="flex items-center w-[95%] m-auto hover:cursor-pointer hover:bg-button-light-rgb rounded-[12px] p-2">
                                <img src="/images/sepolia.png" alt="Arbitrum Image" className="w-[25px] h-[25px]" /> <span className="ml-3">Sepolia</span>
                            </div>
                        </div>
                    </GradientDiv>
                </div>
            </div>
        </>
    )
}