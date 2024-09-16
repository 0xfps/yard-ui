import { ModalData } from '@/types/modal-data'
import { Modals } from '@/types/modals'
import { create } from 'zustand'

export const useModal = create<ModalData>()((set) => ({
    currentModal: "",
    setCurrentModal: (modal: Modals) => set({ currentModal: modal }),
    removeCurrentModal: () => set({ currentModal: "" })
}))