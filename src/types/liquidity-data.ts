import { SupportedChains } from "./supported-chains"

export type LiquidityData = {
    nftAddress1: string
    nftImg1: string
    nftName1: string

    nftAddress2: string
    nftImg2: string
    nftName2: string

    pair: string | null
    liquidityNFTAddress: string
    liquidityNFTId: string
    liquidityNFTName: string
    
    liquidityChainId: SupportedChains | null

    setNftAddress1: (address: string) => void
    setNftImg1: (address: string) => void
    setNftName1: (address: string) => void

    setNftAddress2: (address: string) => void
    setNftImg2: (address: string) => void
    setNftName2: (address: string) => void

    setPair: (pair: string | null) => void
    setLiquidityNFTAddress: (address: string) => void
    setLiquidityNFTId: (address: string) => void
    setLiquidityNFTName: (address: string) => void

    setLiquidityChainId: (id: SupportedChains | null) => void
    clear: () => void
}