import { SwapData } from '@/types/swap-data'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useNFTData = create<SwapData>()(
    persist(
        (set) => ({
            ownerNFTAddress: "",
            ownerNFTID: null,
            ownerNFTImage: "",
            selectedNFTAddress: "",
            selectedNFTId: null,
            selectedNFTImage: "",
            router: "",
            setOwnerNFTAddress: (address: string) => set({ ownerNFTAddress: address }),
            setOwnerNFTId: (id: number) => set({ ownerNFTID: id }),
            setOwnerNFTImage: (img: string) => set({ ownerNFTImage: img }),
            setSelectedNFTAddress: (address: string) => set({ selectedNFTAddress: address }),
            setSelectedNFTId: (id: number) => set({ selectedNFTId: id }),
            setSelectedNFTImage: (img: string) => set({ selectedNFTImage: img }),
            setRouter: (router: string) => set({ router: router })
        }),
        {
            name: "swap-data-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)