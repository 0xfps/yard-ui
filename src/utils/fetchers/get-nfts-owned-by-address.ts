import { SupportedChains } from "@/types/supported-chains";
import { NftAddressBalanceNftResponse } from "@covalenthq/client-sdk";
import { initGoldRushClient } from "../clients/covalent-client";

export async function getNFTsOwnedByAddress(
    address: string,
    chain: SupportedChains
): Promise<NftAddressBalanceNftResponse | undefined> {
    const client = initGoldRushClient()
    if (!client) return undefined
    const { error, data } = await client.NftService.getNftsForAddress(chain, address)
    if (error || !data) return undefined
    return data
}