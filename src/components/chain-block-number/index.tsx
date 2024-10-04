import { isSupportedChain } from "@/utils/is-supported-chain";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import commaNumber from "comma-number"
import { getChainRPC } from "@/utils/get-chain-rpc";
import { getChainName } from "@/utils/get-chain-name";
import { ethers } from "ethers";
import "./style.css"

export default function ChainBlockNumber() {
    const { chain } = useAccount()
    const [blockNumber, setBlockNumber] = useState<number>(0)
    const [isOnSupportedChain,] = useState<boolean>(isSupportedChain(chain?.id))
    const [interval, setBInterval] = useState<any>(null)
    const ONE_MINUTE = 1000 * 60

    useEffect(function () {
        if (isOnSupportedChain) {
            getBlockNumber()
            setBlockNumberFetchInterval()
        } else {
            return function () {
                if (interval)
                    clearInterval(interval)
            }
        }
    }, [chain])

    function setBlockNumberFetchInterval() {
        const interval = setInterval(getBlockNumber, ONE_MINUTE)
        setBInterval(interval)
    }

    async function getBlockNumber() {
        const chainName = getChainName(chain?.id)
        const chainRPC = getChainRPC(chainName as string)
        const chainProvider = new ethers.JsonRpcProvider(chainRPC);
        const blockNumber = await chainProvider.getBlockNumber()
        setBlockNumber(Number(blockNumber))
    }

    return (
        <div className="text-text font-semibold mt-5 p-1 flex items-center justify-end">
            <div className="bg-button bg-opacity-20 w-fit h-[30px] rounded-full p-2 flex justify-start items-center">
                <div className="w-[15px] h-[15px] bg-button rounded-full blur-sm" id="block-number"></div>
                {
                    isOnSupportedChain &&
                    <span className="ml-2 text-xs text-text">
                        {commaNumber(blockNumber)}
                    </span>
                }
            </div>
        </div>
    )
}