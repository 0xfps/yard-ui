import chainData from "../../public/json/chain-data.json"

export function isSupportedChain(chainId: number | undefined): boolean {
    if (!chainId) return false
    return Object.keys(chainData.supportedChains).includes(chainId.toString())
}