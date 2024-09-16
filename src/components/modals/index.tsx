import { useModal } from "@/store/modal-store"
import ModalContainer from "../modal-container"
import SelectUserNFTModal from "../select-user-nft-modal"

export default function Modals() {
    const { currentModal } = useModal()

    return (
        <ModalContainer>
            {currentModal == "SELECT_USER_NFT" && <SelectUserNFTModal />}
        </ModalContainer>
    )
}