"use client"

import collections from "../../../public/json/collections.json"
import { useState } from "react"
import { useAccount } from "wagmi"
import Spinner from "../spinner"
import { isSupportedChain } from "@/utils/is-supported-chain"
import { erc20, erc721 } from "../../../public/json/abis.json"
import { writeContract } from '@wagmi/core'
import { wagmiConfig } from "../../../public/config/wagmi-config"
import { getChainName } from "@/utils/get-chain-name"
import { waitForTransactionReceipt } from '@wagmi/core'
import { useRouter } from "next/navigation"
import { titleCase } from "@/utils/title-case"
import { getUrlForTransaction } from "@/utils/get-url"
import { SupportedChains } from "@/types/supported-chains"

export default function FaucetModal() {
    const { isConnected, address, chainId } = useAccount()
    const router = useRouter()

    const nftCollectionsGeneralDataArray = collections.chains.arbitrum
    const [selectedImg, setSelectedImg] = useState<number | null>(null)
    const [isMinting, setIsMinting] = useState<boolean>(false)
    const [hasMinted, setHasMinted] = useState<boolean>(false)

    const [nftImg, setNFTImg] = useState<string>("")
    const [nftName, setNFTName] = useState<string>("")
    const [faucetChainId, setChainId] = useState<number>(0)
    const [hash, setHash] = useState<string>("")

    const MINT_AMOUNT_YNFT = BigInt(5)
    const MINT_AMOUNT_YUSDC = BigInt(500e6)
    const tokens = {
        "scroll": "0xB59B1fF0a14c1663c3Be8d97D0768BF9ff0D6B30",
        "base": "0xff34D590e9e709937a22F93cF53aaae3146ca0AF",
        "bsc": "0x3CC95c856c1B815Dda6AA3047D8d281e489Ed499",
        "sepolia": "0x2C95301AFd8b1BE3e71D5DBEa79238408c1a9c44",
        "arbitrum": "0x41a959d9341AE5e632B7e23E3D8BC8c5BFd63524"
    }

    function selectImage(index: number) {
        setSelectedImg(index)
    }

    async function mint() {
        setIsMinting(true)
        const hasMintedNFT = await mintNFT()
        if (hasMintedNFT) {
            const hasMintedTokens = await mintTokens()
            if (hasMintedTokens) {
                setHasMinted(true)
            }
        }
        setIsMinting(false)
    }

    async function mintNFT(): Promise<boolean> {
        const chainName = getChainName(chainId)
        if (!chainName) return false
        if (!selectedImg) return false
        // @ts-ignore
        const nftAddress = collections.chains[chainName][selectedImg].address
        const abi = erc721

        setChainId(chainId as number)
        // @ts-ignore
        setNFTImg(collections.chains[chainName][selectedImg].image)
        // @ts-ignore
        setNFTName(collections.chains[chainName][selectedImg].name)

        try {
            const hash = await writeContract(wagmiConfig, {
                abi,
                address: nftAddress,
                functionName: "mint",
                args: [
                    address,
                    MINT_AMOUNT_YNFT
                ],
            })

            if (hash) {
                setHash(hash)
                await waitForTransactionReceipt(wagmiConfig, { hash })
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    }

    async function mintTokens() {
        const chainName = getChainName(chainId)
        if (!chainName) return false
        // @ts-ignore
        const tokenAddress = tokens[chainName]
        const abi = erc20

        try {
            const hash = await writeContract(wagmiConfig, {
                abi,
                address: tokenAddress,
                functionName: "mint",
                args: [
                    address,
                    MINT_AMOUNT_YUSDC
                ]
            })

            if (hash) {
                await waitForTransactionReceipt(wagmiConfig, { hash })
                return true
            } else {
                return false
            }
        } catch {
            return false
        }
    }

    function openConnectWalletModal() {
        document.getElementById("y-connect-wallet-dropdown")?.setAttribute("datatype", "visible")
    }

    function openSwitchChainModal() {
        document.getElementById("y-chain-dropdown")?.setAttribute("datatype", "visible")
    }

    return (
        !hasMinted
            ? <div className="w-full">
                <div className="w-[554px] h-[495px] mt-8 rounded-[12px] m-auto">
                    <div className="w-full h-full p-5 bg-background rounded-[12px]">
                        <div className="w-full h-[60px] flex justify-center items-center text-center text-xl font-semibold">
                            Select NFT To Mint
                        </div>

                        <div className="mt-16 w-full p-3 flex justify-between items-center">
                            {
                                nftCollectionsGeneralDataArray.map(function ({ name, image }, i: number) {
                                    return (
                                        <img
                                            src={image}
                                            alt={name}
                                            className={`w-[80px] h-[80px] rounded-[12px] cursor-pointer ${selectedImg === i && "border-[3px] border-button"}`}
                                            key={i}
                                            onClick={() => selectImage(i)}
                                        />
                                    )
                                })
                            }
                        </div>
                        <div className="mt-10 p-2 w-full font-thin text-sm leading-6 tracking-wide">
                            By tapping 'Mint', you'll seamlessly sign the transactions to mint 5 of the chosen NFT and add 500 yUSDC fee tokens to your wallet.
                        </div>

                        <div>
                            <button
                                className={
                                    `mt-10 p-2 w-full bg-button font-semibold text-xl rounded-[12px]
                                ${(isConnected && isSupportedChain(chainId) && (selectedImg === null || isMinting)) && "opacity-50 cursor-not-allowed"}
                                flex justify-center`
                                }
                                onClick={() => {
                                    if (!isConnected) openConnectWalletModal()
                                    else if (isConnected && !isSupportedChain(chainId)) openSwitchChainModal()
                                    else mint()
                                }}
                            >
                                {
                                    isConnected
                                        ? isSupportedChain(chainId)
                                            ? isMinting
                                                ? <Spinner />
                                                : "Mint"
                                            : "Switch Chain"
                                        : "Connect Wallet"
                                }
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            : <div className="w-full">
                <div className="w-[554px] h-[495px] mt-8 rounded-[12px] m-auto">
                    <div className="w-full h-full p-5 bg-background rounded-[12px]">
                        <div className="mt-16 w-full p-3 flex justify-center items-center">
                            <img src={nftImg} alt={nftName} className="w-[150px] h-[150px] rounded-[12px]" />
                        </div>
                        <div className="mt-5 text-center text-sm font-thin">
                            You have received 5 {nftName}s and 500 yUSDC on {titleCase(getChainName(faucetChainId) ?? "")}.
                        </div>
                        <div className="mt-5 text-center text-sm font-thin">
                            <a href={getUrlForTransaction(faucetChainId as SupportedChains, hash)} className="text-button-light" target="_blank">
                                View transaction.
                            </a>
                        </div>
                        <div>
                            <button
                                className={
                                    `mt-12 p-2 w-full bg-button font-semibold text-xl rounded-[12px]
                                    flex justify-center`
                                }
                                onClick={() => {
                                    router.push("/swap")
                                }}
                            >
                                Start swapping
                            </button>
                        </div>
                    </div>
                </div>
            </div>
    )
}