import { ModalData } from '@/types/modal-data'
import { Modals } from '@/types/modals'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useModal = create<ModalData>()(
    persist(
        (set) => ({
            currentModal: "",
            previousModal: "",
            setCurrentModal: (modal: Modals) => set({ currentModal: modal }),
            setPreviousModal: (modal: Modals) => set({ previousModal: modal }),
            removeCurrentModal: () => set({ currentModal: "" })
        }),
        {
            name: "modal-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)