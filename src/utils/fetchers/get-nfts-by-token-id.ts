import { SimpleHashNFTResponse } from "@/interfaces/simple-hash-nft-response";
import { SupportedChains } from "@/types/supported-chains";
import dotenv from "dotenv"
import data from "../../../public/json/chain-data.json"

dotenv.config()

export async function getNFTsById(
    address: string,
    chain: SupportedChains,
    ids: number[] | BigInt[]
): Promise<SimpleHashNFTResponse[] | undefined> {
    const chainName = (data.supportedChains as any)[chain.toString()]
    const alchemyAPIKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
    const alchemyUrl = `${(data.chains as any)[chainName].alchemyEndpoint}${alchemyAPIKey}`

    const promises: any = ids.map(async function (id: number | BigInt) {
        try {
            const simpleHashRequest = await fetch(`${alchemyUrl}/getNFTMetadata?contractAddress=${address}&tokenId=${id}`)
            const nft = await simpleHashRequest.json()
            const contract_address = nft.contract.address
            const token_id = Number(nft.id.tokenId).toString()
            const name = nft.contractMetadata.name
            const image_url = `https://gateway.pinata.cloud/${nft.metadata.image.slice(16)}`
            const data: SimpleHashNFTResponse = { contract_address, token_id, name, image_url }
            return data
        } catch { }
    })

    const nftData = await Promise.all(promises)
    return nftData
}