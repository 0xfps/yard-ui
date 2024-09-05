import chainData from "../../public/json/chain-data.json"

export function getChainName(chainId: number | undefined): string | undefined {
    if (!chainId) return undefined
    // @ts-ignore
    return chainData.supportedChains[chainId.toString()]
}