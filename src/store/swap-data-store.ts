import { SwapData } from '@/types/swap-data'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useSwapData = create<SwapData>()(
    persist(
        (set) => ({
            ownerNFTAddress: "",
            ownerNFTID: null,
            ownerNFTImage: "",
            ownerNFTName: "",
            selectedNFTAddress: "",
            selectedNFTId: null,
            selectedNFTImage: "",
            selectedNFTName: "",
            swapChainId: null,
            router: "",
            pair: "",
            hash: "",
            failureReason: "",
            setOwnerNFTAddress: (address: string) => set({ ownerNFTAddress: address }),
            setOwnerNFTId: (id: number) => set({ ownerNFTID: id }),
            setOwnerNFTImage: (img: string) => set({ ownerNFTImage: img }),
            setOwnerNFTName: (name: string) => set({ ownerNFTName: name }),
            setSelectedNFTAddress: (address: string) => set({ selectedNFTAddress: address }),
            setSelectedNFTId: (id: number) => set({ selectedNFTId: id }),
            setSelectedNFTImage: (img: string) => set({ selectedNFTImage: img }),
            setSelectedNFTName: (name: string) => set({ selectedNFTName: name }),
            setSwapChainId: (id: number | null) => set({ swapChainId: id }),
            setRouter: (router: string) => set({ router: router }),
            setPair: (pair: string) => set({ pair: pair }),
            setFailureReason: (reason: string) => set({ failureReason: reason }),
            setHash: (hash: string) => set({ hash: hash }),
            clear: () => set({
                ownerNFTAddress: "",
                ownerNFTID: null,
                ownerNFTImage: "",
                ownerNFTName: "",
                selectedNFTAddress: "",
                selectedNFTId: null,
                selectedNFTImage: "",
                selectedNFTName: "",
                swapChainId: null,
                router: "",
                pair: "",
                hash: "",
                failureReason: ""
            })
        }),
        {
            name: "swap-data-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)