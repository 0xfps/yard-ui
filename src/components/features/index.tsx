"use client"

import GradientDiv from "../gradient-div"

export default function Features() {
    return (
        <div className="w-[85%] m-auto mt-[90px]">
            <div className="flex justify-center">
                <div className="w-[50%] text-text">
                    <div className="w-[70%] mt-20">
                        <div className="font-sf-bold text-[32px]">Swap NFTs Seamlessly</div>
                        <div className="mt-6 font-sf-light text-[20px]">
                            Discover a new way to grow your NFT collection. Easily swap your NFTs for other unique digital assets. Our platform offers a secure and efficient way to trade NFTs without hassle.
                        </div>
                        <a href="/swap" target="_blank">
                            <div className="h-[56px] w-[240px] rounded-[12px] mt-10 transition ease-in-out delay-150 hover:scale-95">
                                <GradientDiv>
                                    <div
                                        className="flex h-[100%] w-[100%] justify-center items-center rounded-[12px] bg-night"
                                    >
                                        Swap now
                                    </div>
                                </GradientDiv>
                            </div>
                        </a>
                    </div>
                </div>
                <div className="w-[50%]">
                    <div
                        className="flex h-[500px] w-[100%] justify-center items-center rounded-[12px] shadow-sm shadow-div-grad-start bg-background"
                    >
                        <img src="/images/nft-swap.svg" alt="" className="mb-10" />
                    </div>
                </div>
            </div>
        </div>
    )
}