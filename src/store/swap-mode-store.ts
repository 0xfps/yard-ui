import { SwapMode } from '@/types/swap-mode'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useNFTData = create<SwapMode>()(
    persist(
        (set) => ({
            isArbitrarySwap: false,
            setIsArbitrarySwap: (val: boolean) => set({ isArbitrarySwap: val })
        }),
        {
            name: "swap-mode-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)