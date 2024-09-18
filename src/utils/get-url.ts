import { SupportedChains } from "@/types/supported-chains";
import { getChainName } from "./get-chain-name";
import chainData from "../../public/json/chain-data.json"

function getUrl(chainId: SupportedChains): string {
    const chainName = getChainName(chainId)
    // @ts-ignore
    const chainInfo = chainData.chains[chainName]
    if (!chainInfo) return ""
    return chainInfo.explorerUrl
}

export function getUrlForAddress(chainId: SupportedChains, address: string): string {
    return `${getUrl(chainId)}/address/${address}`
}

export function getUrlForTransaction(chainId: SupportedChains, hash: string): string {
    return `${getUrl(chainId)}/tx/${hash}`
}