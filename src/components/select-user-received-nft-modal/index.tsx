import { useSwapData } from "@/store/swap-data-store"
import collections from "../../../public/json/collections.json"
import deployments from "../../../public/json/deployments.json"
import abis from "../../../public/json/abis.json"
import { useEffect, useState } from "react"
import { getChainName } from "@/utils/get-chain-name"
import { CollectionInterface } from "@/interfaces/collection"
import { getChainRPC } from "@/utils/get-chain-rpc"
import { ethers } from "ethers"
import { FaSearch, FaToggleOn } from "react-icons/fa"
import Spinner from "../spinner"
import { FcCancel } from "react-icons/fc"
import { getNFTsById } from "@/utils/fetchers/get-nfts-by-token-id"
import { SupportedChains } from "@/types/supported-chains"
import { SimpleHashNFTResponse } from "@/interfaces/simple-hash-nft-response"
import { titleCase } from "@/utils/title-case"
import { useModal } from "@/store/modal-store"
import { useSwapMode } from "@/store/swap-mode-store"
import ToolTipDiv from "../tooltip"
import { ARBITRARY_SWAP_CONTENT } from "@/utils/tooltips"
import { FaToggleOff } from "react-icons/fa6"
import Skeleton from "react-loading-skeleton"

export default function SelectUserReceivedNFTModal() {
    const {
        swapChainId, ownerNFTAddress, selectedNFTAddress,
        setSelectedNFTAddress, setSelectedNFTId, setSelectedNFTName,
        setSelectedNFTImage, setRouter, setPair
    } = useSwapData()
    const { removeCurrentModal } = useModal()
    const { isArbitrarySwap, setIsArbitrarySwap } = useSwapMode()
    const [nfts, setNfts] = useState<CollectionInterface[]>([])
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

    const [loading, setLoading] = useState<boolean>(false)
    const [pairExists, setPairExists] = useState<boolean | null>(null)
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

    function sortNFTs(e: any) {
        if ((e.target.value.slice(0, 2) == "0x") && (e.target.value.length == 42)) {
            loadData({ address: e.target.value } as CollectionInterface, Math.random())
            return
        }

        if (!allNftsInPair || allNftsInPair?.length == 0) return
        if (e.target.value.replace(/ /g, "") == "") {
            setNftsInPair(allNftsInPair)
            return
        }

        const filteredNFTs = allNftsInPair?.filter(function ({ name, token_id }) {
            return ((token_id.toLowerCase().includes(e.target.value) || name.toLowerCase().includes(e.target.value)))
        })

        setNftsInPair(filteredNFTs)
    }

    async function loadData({ address }: CollectionInterface, index: number) {
        if (!isArbitrarySwap) {
            if (selectedIndex == index) return
        }

        setLoading(true)
        setSelectedIndex(index)
        setNftsInPair([])
        setAllNftsInPair([])

        const chainName = getChainName(swapChainId as number)
        // @ts-ignore
        const { factory, router } = deployments[chainName]
        const { factory: factoryAbi, pair: pairAbi } = abis
        const rpc = getChainRPC(chainName as string)
        const provider = new ethers.JsonRpcProvider(rpc)
        const YardFactory = new ethers.Contract(factory, factoryAbi as any, provider)
        const pair = await YardFactory.getPair(ownerNFTAddress, address)

        if (pair == ethers.ZeroAddress) {
            setPairExists(false)
            setLoading(false)
            return
        }

        setPairExists(true)
        const YardPair = new ethers.Contract(pair, pairAbi as any, provider)
        const reserves = await YardPair.getReservesFor(address)
        // This is what a tuple returns, an array.
        const reserveNFTs = Object.values(reserves[1])
        const reserveNFTsData = await getNFTsById(address, swapChainId as SupportedChains, reserveNFTs as any)
        if (!reserveNFTsData || reserveNFTsData.length == 0) return

        if (isArbitrarySwap) {
            const length = reserveNFTsData.length
            const randomVal = Math.abs(Math.floor((Math.random() * 1_000_000) % length))
            selectSwapNFT(reserveNFTsData[randomVal])
        } else {
            setNftsInPair(reserveNFTsData)
            setAllNftsInPair(reserveNFTsData)
        }

        setRouter(router)
        setPair(pair)
        setSelectedNFTAddress(address)
        setLoading(false)
    }

    function selectSwapNFT(data: Omit<SimpleHashNFTResponse, "contract_address">) {
        setSelectedNFTId(parseInt(data.token_id))
        setSelectedNFTImage(data.image_url)
        setSelectedNFTName(data.name)
        removeCurrentModal()
    }

    function toggleArbitrarySwap() {
        setIsArbitrarySwap(!isArbitrarySwap)
    }

    useEffect(function () {
        if (!isArbitrarySwap) return

        if ((selectedIndex !== null) && (selectedNFTAddress != "")) {
            loadData({ address: selectedNFTAddress } as CollectionInterface, selectedIndex)
        }
    }, [isArbitrarySwap])

    return (
        <div className="w-[400px] max-h-[600px] py-5">
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
                <div className="w-full h-[60px] flex justify-end items-center text-xs cursor-pointer font-sf-light">
                    <ToolTipDiv trigger="Arbitrary swap" content={ARBITRARY_SWAP_CONTENT} />
                    {
                        isArbitrarySwap
                            ? <FaToggleOn className="text-3xl cursor-pointer ml-3 text-button" onClick={toggleArbitrarySwap} />
                            : <FaToggleOff className="text-3xl cursor-pointer ml-3 text-button opacity-70" onClick={toggleArbitrarySwap} />
                    }
                </div>
                <div className="w-full h-[60px] flex justify-center items-center relative">
                    <input type="text" className="w-full h-full rounded-md bg-[#192126] px-2 pe-10 text-[13px] tracking-wider font-sf-light border-none outline-none" placeholder="Search or paste collection address" onChange={sortNFTs} />
                    <FaSearch className="text-xs absolute right-0 mr-5" />
                </div>
                <div className="mt-4 w-full max-h-[320px] overflow-y-scroll">
                    <div className="w-full h-full">
                        {
                            loading === true &&
                            <div className="w-full h-full">
                                <Skeleton baseColor="#192126" highlightColor="#5a5d5e" />
                            </div>
                        }
                        {
                            (loading === false && pairExists === false) &&
                            <div className="w-full h-full flex flex-col justify-center items-center">
                                <FcCancel className="text-2xl" />
                                <span className="text-xs mt-2">Pair does not exist.</span>
                            </div>
                        }
                        {
                            ((loading === false) && nftsInPair?.length > 0 && !isArbitrarySwap) &&
                            <div className="w-full h-full">
                                {
                                    nftsInPair.map(function ({ image_url, name, token_id }: SimpleHashNFTResponse, index: number) {
                                        return (
                                            <div key={index} className="w-full h-fit m-auto my-2 rounded-md cursor-pointer flex items-center transition:ease-in-out delay-0 hover:bg-[#192126]" onClick={() => selectSwapNFT({ image_url, name, token_id })}>
                                                <img src={image_url} alt={titleCase(name ?? "")} className="w-[50px] h-[50px] rounded-md" />
                                                <p className="font-sf-medium text-sm ml-3">{name ?? ""} #{token_id}</p>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}