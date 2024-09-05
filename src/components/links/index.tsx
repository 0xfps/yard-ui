"use client"

import { GoArrowUpRight } from "react-icons/go"
import GradientDiv from "../gradient-div"

export default function Links() {
    return (
        <div className="w-[85%] flex justify-between m-auto mt-[200px] text-text">
            {/* Documentation. */}
            <div className="w-[48%] shadow-md shadow-div-grad-start h-[300px] bg-hero rounded-[12px] px-12 py-4">
                <div className="font-sf-medium text-[28px] text-button">
                    Superpowers for the liquidity providers
                </div>
                <div className="mt-[30px] text-[18px] font-sf-light">
                    Become a liquidity provider and earn rewards while helping others trade NFTs. By adding your NFTs to our liquidity pools, you contribute to a vibrant ecosystem and unlock exciting opportunities.
                </div>
                <a href="https://www.notion.so/0xfps/Introduction-a1fe1ca7706c4a369ce32206860c0835" className="float-end" target="_blank">
                    <div className="h-[56px] w-[240px] bg-night rounded-[12px] mt-10 transition ease-in-out delay-150 hover:scale-95">
                        <GradientDiv>
                            <div
                                className="flex h-[100%] w-[100%] justify-center items-center rounded-[12px] bg-night"
                            >
                                Documentation
                            </div>
                        </GradientDiv>
                    </div>
                </a>
            </div>
            {/* GitHub and Twitter. */}
            <div className="w-[48%] h-[300px] flex flex-col justify-between">
                <div className="shadow-md shadow-div-grad-start h[fit] bg-hero rounded-[12px] px-12 py-6">
                    <a href="https://github.com/0xfps/yard" target="_blank">
                        <div className="font-sf-medium text-[28px] text-button flex justify-between items-center">
                            GitHub <GoArrowUpRight />
                        </div>
                        <div className="mt-[15px] text-[16px] font-sf-light">
                            Want to contribute to our project? Our code is open-source and available on GitHub.
                        </div>
                    </a>
                </div>
                <div className="shadow-md shadow-div-grad-start h[fit] bg-hero rounded-[12px] px-12 py-6">
                    <a href="https://twitter.com/swaponyard" target="_blank">
                        <div className="font-sf-medium text-[28px] text-button flex justify-between items-center">
                            Twitter <GoArrowUpRight />
                        </div>
                        <div className="mt-[15px] text-[16px] font-sf-light">
                            Follow us on Twitter for the latest news, updates, and NFT tips!
                        </div>
                    </a>
                </div>
            </div>
        </div>
    )
}