import { SupportedChains } from "@/types/supported-chains";
import { initClient } from "../clients/client";

export async function getNFTsOwnedByAddress(
    address: string,
    chain: SupportedChains
) {
    const client = initClient()
    if (!client) return undefined
    return
}