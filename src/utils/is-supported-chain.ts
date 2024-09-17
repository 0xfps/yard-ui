import { SUPPORTED_CHAIN_IDS } from "./constants";

export function isSupportedChain(chainId: number | undefined): boolean {
    if (!chainId) return false
    return SUPPORTED_CHAIN_IDS.includes(chainId)
}