import { useSwapData } from "@/store/swap-data-store";
import { LuRefreshCw } from "react-icons/lu";
import GradientDiv from "../gradient-div";
import { useEffect, useState } from "react";
import abis from "../../../public/json/abis.json"
import deployments from "../../../public/json/deployments.json"
import { getChainName } from "@/utils/get-chain-name";
import { getChainRPC } from "@/utils/get-chain-rpc";
import { ethers } from "ethers";
import { truncateAddress } from "@/utils/truncate-address";
import { getChainImage } from "@/utils/get-chain-image";
import Spinner from "../spinner";
import { useAccount } from "wagmi";
import { titleCase } from "@/utils/title-case";
import { switchChain } from '@wagmi/core'
import { wagmiConfig } from "../../../public/config/wagmi-config";
import { SupportedChains } from "@/types/supported-chains";
import { getUrlForAddress } from "@/utils/get-url";
import { useModal } from "@/store/modal-store";
import { APPROVE_BALANCE_OF_ABI, APPROVE_NFT_ABI } from "@/utils/constants";
import { writeContract } from '@wagmi/core'
import { waitForTransactionReceipt } from '@wagmi/core'

export default function SwapDetails() {
    const { address, chainId } = useAccount()
    const [fee, setFee] = useState<number | null>(null)
    const [inProgress, setInProgress] = useState<boolean>(false)
    const [progressStatus, setProgressStatus] = useState<"Approving Fee" | "Approving NFT" | "Swapping">("Approving Fee")
    const [hasAgreed,] = useState<boolean>(localStorage.getItem("agreement") == "true" || false)
    const [balance, setBalance] = useState<number>(0)
    const [canSwap, setCanSwap] = useState<boolean>(false)

    const {
        ownerNFTImage, ownerNFTName, ownerNFTAddress, ownerNFTID,
        selectedNFTImage, selectedNFTName, selectedNFTAddress, selectedNFTId,
        swapChainId, pair, router
    } = useSwapData()
    const { setPreviousModal, setCurrentModal } = useModal()

    useEffect(function () {
        const { pair: pairAbi } = abis
        const chainName = getChainName(swapChainId as number)
        const rpc = getChainRPC(chainName as string)
        const provider = new ethers.JsonRpcProvider(rpc)
        const YardPair = new ethers.Contract(pair, pairAbi as any, provider)
        // @ts-ignore
        const feeToken = deployments[chainName].feeToken
        const FeeToken = new ethers.Contract(feeToken, APPROVE_BALANCE_OF_ABI, provider)

            ; (async function () {
                const fee = await YardPair.swapFee()
                const feeBase = Number(fee) / 1e6
                const balance = await FeeToken.balanceOf(address)
                setFee(feeBase)
                const balanceBase = Number(balance) / 1e6
                setBalance(balanceBase)
                setCanSwap(balanceBase >= feeBase)
            })()
    }, [])

    async function switchToChain(chainId: SupportedChains) {
        await switchChain(wagmiConfig, { chainId: chainId })
    }

    async function handleSwap() {
        if (inProgress) return
        if (!fee) return

        if (chainId != swapChainId) {
            try {
                await switchToChain(swapChainId as SupportedChains)
            } catch { }
            return
        }

        if (!hasAgreed) {
            setPreviousModal("SWAP_DETAILS")
            setCurrentModal("DISCLAIMER")
            return
        }

        setInProgress(true)
        const feeApproved = await feeApproval()

        if (feeApproved) {
            const nftApproved = await nftApproval()

            if (nftApproved) {
                const nftSwapped = await nftSwap()

                if (nftSwapped) {
                    setInProgress(false)
                    setCurrentModal("TRANSACTION_SUCCESSFUL")
                }
            }
        }

        setInProgress(false)
    }

    async function feeApproval(): Promise<boolean> {
        setProgressStatus("Approving Fee")
        const chainName = getChainName(swapChainId as number)
        // @ts-ignore
        const { feeToken, router } = deployments[chainName]
        let hash: any
        try {
            hash = await writeContract(wagmiConfig, {
                abi: APPROVE_BALANCE_OF_ABI,
                address: feeToken,
                functionName: "approve",
                args: [
                    router,
                    BigInt(fee! * 1e6)
                ]
            })

            if (hash) {
                const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, { hash })
                if (transactionReceipt) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } catch {
            return false
        }
    }

    async function nftApproval(): Promise<boolean> {
        setProgressStatus("Approving NFT")
        const chainName = getChainName(swapChainId as number)
        // @ts-ignore
        const { router } = deployments[chainName]
        let hash: any

        try {
            hash = await writeContract(wagmiConfig, {
                abi: APPROVE_NFT_ABI,
                address: ownerNFTAddress as any,
                functionName: "approve",
                args: [
                    router,
                    ownerNFTID
                ]
            })

            if (hash) {
                const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, { hash })
                if (transactionReceipt) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } catch {
            return false
        }
    }

    async function nftSwap(): Promise<boolean> {
        setProgressStatus("Swapping")
        const chainName = getChainName(swapChainId as number)
        // @ts-ignore
        const { router } = deployments[chainName]
        const { router: abi } = abis
        let hash: any
        try {
            hash = await writeContract(wagmiConfig, {
                abi,
                address: router,
                functionName: "swapNFTForExactNFT",
                args: [
                    [ownerNFTAddress, selectedNFTAddress],
                    ownerNFTID,
                    selectedNFTId,
                    address
                ]
            })

            if (hash) {
                const transactionReceipt = await waitForTransactionReceipt(wagmiConfig, { hash })
                if (transactionReceipt) {
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        } catch {
            return false
        }
    }

    return (
        <div className="w-[554px] h-[495px] rounded-[12px]">
            <div className="w-[90%] h-full p-5 bg-background m-auto">
                <div className="text-center font-sf-bold text-2xl">
                    Swap Details
                </div>
                <div className="w-full h-[30%] mt-10 flex flex-wrap">
                    <div className="w-[40%] h-full m-auto flex flex-col items-center">
                        <img src={ownerNFTImage} alt={ownerNFTName} className="w-[70px] h-[70px] rounded-[12px]" />
                        <div className="text-center mt-2">
                            <p className="text-[11px] font-sf-light">You send</p>
                            <p className="text-[13px] font-sf-medium">{ownerNFTName}</p>
                            <p className="text-[13px] font-sf-medium">#{ownerNFTID}</p>
                        </div>
                    </div>
                    <div className="w-[20%] h-full m-auto flex items-center justify-center">
                        <LuRefreshCw className="text-5xl" />
                    </div>
                    <div className="w-[40%] h-full m-auto flex flex-col items-center">
                        <img src={selectedNFTImage} alt={selectedNFTName} className="w-[70px] h-[70px] rounded-[12px]" />
                        <div className="text-center mt-2">
                            <p className="text-[11px] font-sf-light">You receive</p>
                            <p className="text-[13px] font-sf-medium">{selectedNFTName}</p>
                            <p className="text-[13px] font-sf-medium">#{selectedNFTId}</p>
                        </div>
                    </div>
                    <div className="w-full h-[150px] bg-text mt-5 rounded-[12px]">
                        <GradientDiv>
                            <div className="w-full h-full bg-background rounded-[12px] relative flex justify-center items-center">
                                {/* Blur. */}
                                <div className="w-[100px] h-[100px] bg-button absolute left-[17%] blur-3xl"></div>
                                <div className="w-[60%] h-[90%] p-1 flex flex-col justify-around">
                                    <div className="w-full h-[50%] flex justify-center items-center">
                                        <div className="align-middle flex justify-center items-center">
                                            <span className="font-sf-light">Swap fee:</span>
                                            <span className="ml-1 text-5xl font-sf-bold">{fee === null ? <Spinner /> : fee}</span>
                                            <img src="/images/usdc.svg" alt="USDC" className="inline w-[15px] h-[15px] ml-2" />
                                            <span className="ml-1 text-md font-sf-medium">
                                                yUSDC
                                            </span>
                                        </div>
                                    </div>
                                    <div className="w-full h-[15%] text-[11px] flex justify-start ps-8 items-center">
                                        <span className="cursor-pointer">Balance: <span>{balance} <img src="/images/usdc.svg" alt="yUSDC" className="w-[10px] h-[10px] inline mb-[2px]" /> yUSDC</span> <img src={getChainImage(swapChainId as number)} alt={getChainName(swapChainId as number)} className="w-[10px] h-[10px] inline mb-[2px]" /></span>
                                    </div>
                                    <div className="w-full h-[15%] text-[11px] flex justify-start ps-8 items-center">
                                        <a href={getUrlForAddress(swapChainId as SupportedChains, pair)} target="_blank"><span className="cursor-pointer">Pair: <span>{truncateAddress(pair, 10)}</span> <img src={getChainImage(swapChainId as number)} alt={getChainName(swapChainId as number)} className="w-[10px] h-[10px] inline mb-[2px]" /></span></a>
                                    </div>
                                    <div className="w-full h-[15%] text-[11px] flex justify-start ps-8 items-center">
                                        <a href={getUrlForAddress(swapChainId as SupportedChains, router)} target="_blank"><span className="cursor-pointer">Router: <span>{truncateAddress(router, 10)}</span> <img src={getChainImage(swapChainId as number)} alt={getChainName(swapChainId as number)} className="w-[10px] h-[10px] inline mb-[2px]" /></span></a>
                                    </div>
                                </div>
                            </div>
                        </GradientDiv>
                    </div>
                    <div
                        className="w-full h-[60px] bg-button mt-5 rounded-[12px] hover:opacity-85"
                        onClick={handleSwap}
                    >
                        <GradientDiv>
                            <div className="w-full h-full bg-button rounded-[12px] text-center flex justify-center items-center font-sf-medium text-2xl cursor-pointer">
                                {
                                    !inProgress && chainId != swapChainId
                                        ? `Switch to ${titleCase(getChainName(swapChainId as number) as string)}`
                                        : !hasAgreed
                                            ? "Agree"
                                            : inProgress
                                                ? <div className="w-full flex justify-center items-center">
                                                    {progressStatus}... <span className="ml-3"><Spinner /></span>
                                                </div>
                                                : <div className={`w-full h-full flex justify-center items-center ${!canSwap && "cursor-not-allowed opacity-40"}`}>
                                                    Approve and swap
                                                </div>
                                }
                            </div>
                        </GradientDiv>
                    </div>
                </div>
            </div>
        </div>
    )
}