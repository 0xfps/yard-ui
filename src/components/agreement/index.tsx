import { useState } from "react";
import GradientDiv from "../gradient-div";
import { useModal } from "@/store/modal-store";

export default function Agreement() {
    const [checked, setChecked] = useState<boolean>(false)
    const { setCurrentModal, previousModal } = useModal()

    function handleChange(e: any) {
        setChecked(e.target.checked);
    }
    return (
        <div className="w-[350px] h-[400px] p-5">
            <div className="text-center font-sf-bold text-2xl">
                Disclaimer
            </div>

            <div className="text-justify font-sf-light mt-3">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi debitis, est, eaque ipsa quasi voluptatum quas numquam aut aspernatur, ipsam voluptates. Accusamus ea magnam optio corporis cumque deserunt excepturi eligendi, nulla similique! Totam ducimus aperiam iste veritatis et ab culpa aliquam sit, corrupti cupiditate neque illo optio consectetur natus accusantium.
            </div>

            <div className="mt-3 flex justify-start items-center">
                <input type="checkbox" name="agree" id="checkbox" onChange={handleChange} /> <span className="font-sf-light text-xs ml-2">I agree to these terms.</span>
            </div>

            <div className={`w-full h-[40px] mt-3 text-center font-sf-light rounded-[12px] ${!checked ? "cursor-not-allowed" : "cursor-pointer"}`} onClick={() => {
                if (checked) {
                    localStorage.setItem("agreement", "true")
                    setCurrentModal(previousModal)
                }
            }}>
                <GradientDiv>
                    <div className="w-full h-full bg-button rounded-[12px] flex justify-center items-center">
                        Proceed
                    </div>
                </GradientDiv>
            </div>
        </div>
    )
}