import { SimpleHashNFTResponse } from "@/interfaces/simple-hash-nft-response";
import { SupportedChains } from "@/types/supported-chains";
import dotenv from "dotenv"
import data from "../../../public/json/chain-data.json"

dotenv.config()

export async function getNFTsOwnedByAddress(
    address: string,
    chain: SupportedChains
): Promise<SimpleHashNFTResponse[] | undefined> {
    const chainName = (data.supportedChains as any)[chain.toString()]
    const alchemyAPIKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    const alchemyUrl = `${(data.chains as any)[chainName].alchemyEndpoint}${alchemyAPIKey}`

    let simpleHashRequest: any

    try {
        simpleHashRequest = await fetch(`${alchemyUrl}/getNFTsForOwner?owner=${address}&pageSize=5`)
    } catch { }

    if (!simpleHashRequest) return undefined
    const { ownedNfts: nfts } = await simpleHashRequest.json()

    if (nfts.length == 0) return []

    const usersNFTs = []

    for (const nft of nfts) {
        const contract_address = nft.contract.address
        const token_id = Number(nft.id.tokenId).toString()
        const name = nft.contractMetadata.name
        const uri = `https://gateway.pinata.cloud/${nft.tokenUri.gateway.slice(16)}`

        const metadataResponse = await fetch(uri);
        const response = await metadataResponse.json();

        const image_url = `/nfts/${response.id}.jpg`

        usersNFTs.push({ contract_address, token_id, name, image_url })
    }

    return usersNFTs
}