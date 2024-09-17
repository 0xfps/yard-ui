import { SimpleHashNFTResponse } from "@/interfaces/simple-hash-nft-response";
import { SupportedChains } from "@/types/supported-chains";
import dotenv from "dotenv"

dotenv.config()

export async function getNFTsOwnedByAddress(
    address: string,
    chain: SupportedChains
): Promise<SimpleHashNFTResponse[] | undefined> {
    const KEY = process.env.NEXT_PUBLIC_SIMPLE_HASH_API_KEY
    if (!KEY) return undefined

    const simpleHashChain = `eip155:${chain}`
    let simpleHashRequest: any

    try {
        simpleHashRequest = await fetch(
            `https://api.simplehash.com/api/v0/nfts/owners?chains=${simpleHashChain}&wallet_addresses=${address}&limit=50`,
            {
                method: "GET",
                headers: {
                    "X-API-KEY": KEY,
                    "Content-Type": "application/json"
                }
            }
        )
    } catch { }

    if (!simpleHashRequest) return undefined
    const { nfts } = await simpleHashRequest.json()

    if (nfts.length == 0) return []

    const usersNFTs: SimpleHashNFTResponse[] = nfts.map(function ({ contract_address, token_id, name, image_url }: SimpleHashNFTResponse) {
        return { contract_address, token_id, name, image_url }
    })

    return usersNFTs
}