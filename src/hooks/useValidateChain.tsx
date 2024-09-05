"use client"

import chainData from "../../public/json/chain-data.json"

/**
 * This hook will return true or false if a user is not on a chain that Yard has
 * been deployed to.
 * 
 * @param chainId ChainID.
 */
export default function useValidateChain(chainId: number | undefined) {
    if (!chainId) return false

    // @ts-ignore
    return chainData.supportedChains[chainId.toString()] != undefined
}