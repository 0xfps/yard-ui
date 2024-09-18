import { useModal } from "@/store/modal-store"
import ModalContainer from "../modal-container"
import SelectUserNFTModal from "../select-user-nft-modal"
import SelectUserReceivedNFTModal from "../select-user-received-nft-modal"
import SwapDetails from "../swap-details"
import Agreement from "../agreement"

export default function Modals() {
    const { currentModal } = useModal()

    return (
        <ModalContainer>
            {currentModal == "SELECT_USER_NFT" && <SelectUserNFTModal />}
            {currentModal == "SELECT_PAIR_NFT" && <SelectUserReceivedNFTModal />}
            {currentModal == "SWAP_DETAILS" && <SwapDetails />}
            {currentModal == "DISCLAIMER" && <Agreement/>}
        </ModalContainer>
    )
}