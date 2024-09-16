import { Props } from "@/interfaces/props";
import { useModal } from "@/store/modal-store";
import GradientDiv from "../gradient-div";

export default function ModalContainer({ children }: Props) {
    const { currentModal } = useModal()
    return (
        currentModal != "" &&
        <div className="w-full h-full p-10 flex justify-center items-center backdrop-blur-md absolute z-10">
            <div>
                <GradientDiv>
                    <div className="w-full h-full bg-background rounded-[12px]">
                        {children}
                    </div>
                </GradientDiv>
            </div>
        </div>
    )
}