"use client"

import { useAccount } from "wagmi"
import GradientDiv from "../gradient-div"
import { useCallback, useEffect, useState } from "react"
import { isSupportedChain } from "@/utils/is-supported-chain"
import deployments from "../../../public/json/deployments.json"
import abis from "../../../public/json/abis.json"
import chainData from "../../../public/json/chain-data.json"
import { getChainName } from "@/utils/get-chain-name"
import { ethers } from "ethers"
import { GoInbox } from "react-icons/go"
import Spinner from "../spinner"

export default function PositionsBox() {
    const { address, isConnected, chainId } = useAccount()
    const [lpPairs, setLpPairs] = useState<any[] | null>(null)

    const fetchPositions = useCallback(function () {
        if (!isConnected || !isSupportedChain(chainId)) return
        const chainName = getChainName(chainId)
        // @ts-ignore
        const { router } = deployments[chainName]
        const { router: routerAbi } = abis
        // @ts-ignore
        const rpc = chainData.chains[chainName].rpc
        const provider = new ethers.JsonRpcProvider(rpc)
        const YardRouter = new ethers.Contract(router, routerAbi as any, provider)
            ; (async function () {
                const liquidityProvidedPairs: any[] = await YardRouter.getLiquidityProvidedPairs(address)
                setLpPairs(liquidityProvidedPairs)
            })()
    }, [address, chainId])

    useEffect(function () {
        fetchPositions()
    }, [address, chainId, isConnected])

    return (
        <div className="mt-4 w-full h-fit flex justify-between items-center p-2">
            <GradientDiv>
                <div className="w-full h-full rounded-[12px] bg-background p-5">
                    {
                        (lpPairs === null) &&
                        <div className="w-full h-[260px]">
                            <div className="w-[40%] h-full m-auto text-center flex flex-col justify-center items-center">
                                <Spinner/>
                                <span className="font-sf-light text-sm mt-12">
                                    Fetching liquidity positions...
                                </span>
                            </div>
                        </div>
                    }

                    {
                        (lpPairs !== null && lpPairs.length == 0) &&
                        <div className="w-full h-[260px]">
                            <div className="w-[40%] h-full m-auto text-center flex flex-col justify-center items-center">
                                <GoInbox className="text-5xl" />
                                <span className="font-sf-light text-sm mt-12">
                                    Your active liquidity positions will appear here.
                                </span>
                            </div>
                        </div>
                    }
                </div>
            </GradientDiv>
        </div>
    )
}