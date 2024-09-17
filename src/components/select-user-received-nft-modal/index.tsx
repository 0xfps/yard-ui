import { useSwapData } from "@/store/swap-data-store"
import collections from "../../../public/json/collections.json"
import deployments from "../../../public/json/deployments.json"
import abis from "../../../public/json/abis.json"
import { useEffect, useState } from "react"
import { getChainName } from "@/utils/get-chain-name"
import { CollectionInterface } from "@/interfaces/collection"
import { getChainRPC } from "@/utils/get-chain-rpc"
import { ethers } from "ethers"

export default function SelectUserReceivedNFTModal() {
    const { swapChainId, ownerNFTAddress, setSelectedNFTAddress, setSelectedNFTId, setSelectedNFTName, setSelectedNFTImage } = useSwapData()
    const [nfts, setNfts] = useState<CollectionInterface[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const [nftsInPair, setNftsInPair] = useState<any[]>([])
    const [allNftsInPair, setAllNftsInPair] = useState<any[]>([])

    useEffect(function () {
        const chainName = getChainName(swapChainId as number)
        // @ts-ignore
        const collection: CollectionInterface[] = collections.chains[chainName]
        if (!collection) return

        const filteredCollections = collection.map(function ({ name, image, address }: CollectionInterface) {
            return { name, image, address }
        })

        setNfts(filteredCollections)
    }, [])

    async function loadData({ name, image, address }: CollectionInterface, index: number) {
        setSelectedIndex(index)
        const chainName = getChainName(swapChainId as number)
        // @ts-ignore
        const { router } = deployments[chainName]
        const { router: routerAbi, pair: pairAbi } = abis
        const rpc = getChainRPC(chainName as string)
        const provider = new ethers.JsonRpcProvider(rpc)
        const YardRouter = new ethers.Contract(router, routerAbi as any, provider)
        let pair: string | undefined
        try {
            pair = await YardRouter.getPair(ownerNFTAddress, address)
        } catch (e) { }

        if (!pair) {
            // Do stuff here.
            return
        }

        const YardPair = new ethers.Contract(pair, pairAbi as any, provider)
        const reserves = await YardPair.getReservesFor(address)
        console.log({ reserves })
        setSelectedNFTAddress(address)
    }

    return (
        <div className="w-[400px] h-[600px] py-5">
            <div className="w-full h-full text-text">
                <div className="w-full font-sf-bold text-xl">
                    Select NFT Collection
                </div>
                <div className="w-full h-fit mt-4 py-2 flex justify-around flex-wrap">
                    {
                        nfts.map(function ({ name, image, address }: CollectionInterface, index: number) {
                            return (
                                <div
                                    key={index}
                                    className={`
                                        w-[70px] h-[70px] rounded-md flex flex-col justify-center items-center cursor-pointer transition:ease-in-out delay-0 hover:bg-[#192126]
                                        ${selectedIndex === index && "border-button border-[1px]"}
                                    `}
                                    onClick={() => loadData({ name, image, address }, index)}
                                >
                                    <img src={image} alt={name} className="w-[60px] h-[60px] rounded-md" />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}