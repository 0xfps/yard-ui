import { SimpleHashNFTResponse } from "@/interfaces/simple-hash-nft-response";
import { SupportedChains } from "@/types/supported-chains";
import dotenv from "dotenv"

dotenv.config()

export async function getNFTsById(
    address: string,
    chain: SupportedChains,
    ids: number[] | BigInt[]
): Promise<SimpleHashNFTResponse[] | undefined> {
    const KEY = process.env.NEXT_PUBLIC_SIMPLE_HASH_API_KEY
    if (!KEY) return undefined

    const simpleHashChain = `eip155:${chain}`

    const promises: any = ids.map(async function (id: number | BigInt) {
        try {
            const simpleHashRequest = await fetch(
                `https://api.simplehash.com/api/v0/nfts/${simpleHashChain}/${address}/${id}`,
                {
                    method: "GET",
                    headers: {
                        "X-API-KEY": KEY,
                        "Content-Type": "application/json"
                    }
                }
            )
            const { contract_address, token_id, name, image_url } = await simpleHashRequest.json()
            const data: SimpleHashNFTResponse = { contract_address, token_id, name, image_url }
            return data
        } catch { }
    })

    const nftData = await Promise.all(promises)
    return nftData
}