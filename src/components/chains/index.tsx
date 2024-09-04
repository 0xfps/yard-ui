"use client"

import Marquee from "react-fast-marquee"
import deployments from "../../../public/json/deployments.json"

export default function Chains() {
    const deploymentAddresses = {
        arbitrum: `https://sepolia.arbiscan.io/address/${deployments.arbitrum.router}`,
        base: `https://sepolia.basescan.org/address/${deployments.base.router}`,
        bsc: `https://testnet.bscscan.com/address/${deployments.bsc.router}`,
        scroll: `https://sepolia.scrollscan.com/address/${deployments.scroll.router}`,
        sepolia: `https://sepolia.etherscan.io/address/${deployments.sepolia.router}`
    }

    return (
        <div className="text-text mt-[120px] w-[85%] m-auto">
            <div className="font-sf-medium text-center text-[40px]">
                Find us on various chains
            </div>
            <div className="font-sf-light text-center text-[20px] opacity-70">
                Trade NFTs across multiple blockchain networks.
            </div>
            <Marquee className="flex flex-row justify-around items-center mt-[80px]" speed={14} gradient={true} gradientColor="#10191F" gradientWidth={800} pauseOnHover>
                <div className="w-screen flex justify-around items-center">
                    <a href={deploymentAddresses.arbitrum} target="_blank"><img src="/images/arbitrum.png" alt="Arbitrum" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.base} target="_blank"><img src="/images/base.png" alt="Base" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.bsc} target="_blank"><img src="/images/bsc.png" alt="BSC" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.scroll} target="_blank"><img src="/images/scroll.png" alt="Scroll" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.sepolia} target="_blank"><img src="/images/sepolia.png" alt="Sepolia" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.arbitrum} target="_blank"><img src="/images/arbitrum.png" alt="Arbitrum" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.base} target="_blank"><img src="/images/base.png" alt="Base" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.bsc} target="_blank"><img src="/images/bsc.png" alt="BSC" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.scroll} target="_blank"><img src="/images/scroll.png" alt="Scroll" className="w-[90px] h-[90px]" /></a>
                    <a href={deploymentAddresses.sepolia} target="_blank"><img src="/images/sepolia.png" alt="Sepolia" className="w-[90px] h-[90px]" /></a>
                </div>
            </Marquee>
        </div>
    )
}