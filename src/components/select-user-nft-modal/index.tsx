import { useAccount } from "wagmi"
import { useEffect, useState } from "react"
import { isSupportedChain } from "@/utils/is-supported-chain"
import { SupportedChains } from "@/types/supported-chains"
import { getNFTsOwnedByAddress } from "@/utils/fetchers/get-nfts-owned-by-address"
import { SimpleHashNFTResponse } from "@/interfaces/simple-hash-nft-response"
import UserNotOnSupportedChainForSwap from "../user-not-on-supported-chain-for-swap"
import { FaBoxOpen, FaSearch } from "react-icons/fa"
import Spinner from "../spinner"
import { getChainName } from "@/utils/get-chain-name"
import { titleCase } from "@/utils/title-case"
import { useSwapData } from "@/store/swap-data-store"
import { useModal } from "@/store/modal-store"
import Skeleton from "react-loading-skeleton"

export default function SelectUserNFTModal() {
    const { address, isConnected, chainId } = useAccount()
    const [isOnSupportedChain, setIsOnSupportedChain] = useState<boolean>(isSupportedChain(chainId))
    /**
     * `null` when loading.
     * `[]` if there was an error in fetching the NFTs.
     * `SimpleHashNFTResponse[]` (length >= 0) if data is fetched.
     */
    const [usersOwnedNFTs, setUsersOwnedNFTs] = useState<SimpleHashNFTResponse[] | null>(null)
    const [allNFTs, setAllNFTs] = useState<SimpleHashNFTResponse[]>([])
    const { setOwnerNFTAddress, setOwnerNFTId, setOwnerNFTImage, setOwnerNFTName, setSwapChainId } = useSwapData()
    const { removeCurrentModal } = useModal()

    useEffect(function () {
        const isOnSupportedChain = isSupportedChain(chainId)
        setIsOnSupportedChain(isOnSupportedChain)

        if (!chainId) return
        if (!isOnSupportedChain || !isConnected || !address) return

        (async function () {
            setUsersOwnedNFTs(null)
            const nfts = await getNFTsOwnedByAddress(address, chainId as SupportedChains)
            if (!nfts) {
                setUsersOwnedNFTs([])
                return
            }

            setUsersOwnedNFTs(nfts)
            setAllNFTs(nfts)
        })()
    }, [chainId])

    function sortNFTs(e: any) {
        if (!allNFTs || allNFTs?.length == 0) return
        if (e.target.value.replace(/ /g, "") == "") {
            setUsersOwnedNFTs(allNFTs)
            return
        }

        const filteredNFTs = allNFTs?.filter(function ({ name, token_id }) {
            return ((token_id.toLowerCase().includes(e.target.value) || name.toLowerCase().includes(e.target.value)))
        })

        setUsersOwnedNFTs(filteredNFTs)
    }

    function setOwnerNFTData(data: SimpleHashNFTResponse) {
        setOwnerNFTAddress(data.contract_address)
        setOwnerNFTId(parseInt(data.token_id))
        setOwnerNFTImage(data.image_url)
        setOwnerNFTName(data.name)
        setSwapChainId(chainId!)
        removeCurrentModal()
    }

    return (
        <div className="w-[350px] h-[400px] p-5">
            {
                !isOnSupportedChain
                    ? <UserNotOnSupportedChainForSwap />
                    : <div className="w-full h-full text-text">
                        <div className="w-full font-sf-bold text-xl">
                            Select NFT
                        </div>

                        <div className="mt-3 w-full h-[13%] flex justify-center items-center relative">
                            <input type="text" className="w-full h-full rounded-md bg-[#192126] px-2 pe-10 text-[13px] tracking-wider font-sf-light border-none outline-none" placeholder="Search" onChange={sortNFTs} />
                            <FaSearch className="text-xs absolute right-0 mr-5" />
                        </div>
                        <div className="w-full h-[70%] mt-5 overflow-y-scroll">
                            {
                                usersOwnedNFTs === null &&
                                <div className="w-full h-[full]">
                                    <Skeleton baseColor="#192126" highlightColor="#5a5d5e" count={5} height={40} className="mt-2"/>
                                </div>
                            }
                            {
                                ((usersOwnedNFTs !== null) && usersOwnedNFTs?.length == 0) &&
                                <div className="w-full h-full flex flex-col justify-center items-center">
                                    <FaBoxOpen className="text-2xl text-text" />
                                    <span className="text-xs mt-2">No NFTs found on {titleCase(getChainName(chainId) ?? "")}.</span>
                                </div>
                            }
                            {
                                ((usersOwnedNFTs !== null) && usersOwnedNFTs?.length > 0) &&
                                <div className="w-full h-full">
                                    {
                                        usersOwnedNFTs.map(function ({ contract_address, image_url, name, token_id }: SimpleHashNFTResponse, index: number) {
                                            return (
                                                <div key={index} className="w-full h-fit m-auto my-2 rounded-md cursor-pointer flex items-center transition:ease-in-out delay-0 hover:bg-[#192126]" onClick={() => setOwnerNFTData({ contract_address, image_url, name, token_id })}>
                                                    <img src={image_url} alt={titleCase(name ?? "")} className="w-[50px] h-[50px] rounded-md" />
                                                    <p className="font-sf-medium text-sm ml-3">{name ?? ""} #{token_id ?? ""}</p>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            }
                        </div>
                    </div>
            }
        </div>
    )
}