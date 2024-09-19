import { Props } from "@/interfaces/props";
import { useModal } from "@/store/modal-store";
import GradientDiv from "../gradient-div";
import { useSwapData } from "@/store/swap-data-store";
import "./styles.css"

export default function ModalContainer({ children }: Props) {
    const { currentModal, setCurrentModal } = useModal()
    const { clear } = useSwapData()

    function closeModal(e: any) {
        if (e.target.id == "modal-container") {
            setCurrentModal("")
            
            if (currentModal == "TRANSACTION_SUCCESSFUL") {
                clear()
            }
        }
    }

    return (
        currentModal != "" &&
        <div className="w-full h-full p-10 flex justify-center items-center backdrop-blur-md absolute z-10" id="modal-container" onClick={closeModal}>
            <div id="modal-box">
                <GradientDiv>
                    <div className="w-full h-full bg-background rounded-[12px] p-5 text-text font-sf-light">
                        {children}
                    </div>
                </GradientDiv>
            </div>
        </div>
    )
}