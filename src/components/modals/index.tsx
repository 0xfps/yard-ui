import { useModal } from "@/store/modal-store"
import ModalContainer from "../modal-container"

export default function Modals() {
    const { currentModal } = useModal()

    return (
        <ModalContainer>
            {currentModal == "TEST" && <div>Hola amigo</div>}
        </ModalContainer>
    )
}