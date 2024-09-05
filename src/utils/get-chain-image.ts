import chainData from "../../public/json/chain-data.json"

export function getChainImage(chainId: number | undefined): string | undefined {
    if (!chainId) return undefined
    // @ts-ignore
    return chainData.chainImages[chainId.toString()]
}