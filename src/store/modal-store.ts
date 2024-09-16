import { ModalData } from '@/types/modal-data'
import { Modals } from '@/types/modals'
import { create } from 'zustand'

// export const useModal = create<ModalData>()((set) => ({
//     currentModal: "",
//     setCurrentModal: (modal: Modals) => set({ currentModal: modal }),
//     removeCurrentModal: () => set({ currentModal: "" })
// }))

// @todo Revert to unpersisted when done.
import { persist, createJSONStorage } from 'zustand/middleware'
export const useModal = create<ModalData>()(
    persist(
        (set) => ({
            currentModal: "",
            setCurrentModal: (modal: Modals) => set({ currentModal: modal }),
            removeCurrentModal: () => set({ currentModal: "" })
        }),
        {
            name: "modal-storage",
            storage: createJSONStorage(() => sessionStorage)
        }
    )
)