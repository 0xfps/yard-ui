import { SUPPORTED_CHAIN_IDS } from "./constants";

export function isSupportedChain(chainId: number): boolean {
    return SUPPORTED_CHAIN_IDS.includes(chainId)
}