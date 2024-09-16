import { Modals } from "./modals"

export type ModalData = {
    currentModal: Modals
    setCurrentModal: (modal: Modals) => void
    removeCurrentModal: () => void
}