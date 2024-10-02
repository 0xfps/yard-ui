import { LiquidityData } from '@/types/liquidity-data'
import { SupportedChains } from '@/types/supported-chains'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useLiquidityData = create<LiquidityData>()(
    persist(
        (set) => ({
            nftAddress1: "",
            nftImg1: "",
            nftName1: "",

            nftAddress2: "",
            nftImg2: "",
            nftName2: "",

            pair: null,
            liquidityNFTAddress: "",
            liquidityNFTId: "",
            liquidityNFTName: "",

            liquidityChainId: null,

            setNftAddress1: (address: string) => set({ nftAddress1: address }),
            setNftImg1: (img: string) => set({ nftImg1: img }),
            setNftName1: (name: string) => set({ nftName1: name }),

            setNftAddress2: (address: string) => set({ nftAddress2: address }),
            setNftImg2: (img: string) => set({ nftImg2: img }),
            setNftName2: (name: string) => set({ nftName2: name }),

            setPair: (pair: string | null) => set({ pair: pair }),
            setLiquidityNFTAddress: (address: string) => set({ liquidityNFTAddress: address }),
            setLiquidityNFTId: (id: string) => set({ liquidityNFTId: id }),
            setLiquidityNFTName: (name: string) => set({ liquidityNFTName: name }),

            setLiquidityChainId: (id: SupportedChains | null) => set({liquidityChainId: id}),
            clear: () => set({
                nftAddress1: "",
                nftImg1: "",
                nftName1: "",
                nftAddress2: "",
                nftImg2: "",
                nftName2: "",
                pair: null,
                liquidityNFTAddress: "",
                liquidityNFTId: "",
                liquidityNFTName: "",
                liquidityChainId: null
            })
        }),
        {
            name: "liquidity-data-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)