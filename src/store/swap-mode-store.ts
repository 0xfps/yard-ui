import { SwapMode } from '@/types/swap-mode'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useSwapMode = create<SwapMode>()(
    persist(
        (set, get) => ({
            isArbitrarySwap: get()?.isArbitrarySwap ?? false,
            setIsArbitrarySwap: (val: boolean) => set({ isArbitrarySwap: val })
        }),
        {
            name: "swap-mode-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)