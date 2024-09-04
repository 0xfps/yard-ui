"use client"

import Marquee from "react-fast-marquee"

export default function Chains() {
    return (
        <div className="text-text mt-[120px]">
            <div className="font-sf-medium text-center text-[40px]">
                Find us on various chains
            </div>
            <div className="font-sf-light text-center text-[20px] opacity-70">
                Trade NFTs across multiple blockchain networks.
            </div>
            <Marquee className="flex flex-row justify-around items-center mt-[80px]" speed={10} gradient={true} gradientColor="#10191F" gradientWidth={800} pauseOnHover>
                <div className="w-screen flex justify-around items-center">
                    <a href="https://sepolia.arbiscan.io" target="_blank"><img src="/images/arbitrum.png" alt="Arbitrum" className="w-[90px] h-[90px]" /></a>
                    <a href="https://sepolia.basescan.org" target="_blank"><img src="/images/base.png" alt="Base" className="w-[90px] h-[90px]" /></a>
                    <a href="https://testnet.bscscan.com" target="_blank"><img src="/images/bsc.png" alt="BSC" className="w-[90px] h-[90px]" /></a>
                    <a href="https://sepolia.scrollscan.com" target="_blank"><img src="/images/scroll.png" alt="Scroll" className="w-[90px] h-[90px]" /></a>
                    <a href="https://sepolia.etherscan.io" target="_blank"><img src="/images/sepolia.png" alt="Sepolia" className="w-[90px] h-[90px]" /></a>
                    <a href="https://sepolia.arbiscan.io" target="_blank"><img src="/images/arbitrum.png" alt="Arbitrum" className="w-[90px] h-[90px]" /></a>
                    <a href="https://sepolia.basescan.org" target="_blank"><img src="/images/base.png" alt="Base" className="w-[90px] h-[90px]" /></a>
                    <a href="https://testnet.bscscan.com" target="_blank"><img src="/images/bsc.png" alt="BSC" className="w-[90px] h-[90px]" /></a>
                    <a href="https://sepolia.scrollscan.com" target="_blank"><img src="/images/scroll.png" alt="Scroll" className="w-[90px] h-[90px]" /></a>
                    <a href="https://sepolia.etherscan.io" target="_blank"><img src="/images/sepolia.png" alt="Sepolia" className="w-[90px] h-[90px]" /></a>
                </div>
            </Marquee>
        </div>
    )
}