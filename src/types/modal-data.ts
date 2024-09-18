import { Modals } from "./modals"

export type ModalData = {
    currentModal: Modals
    previousModal: Modals
    setCurrentModal: (modal: Modals) => void
    setPreviousModal: (modal: Modals) => void
    removeCurrentModal: () => void
}