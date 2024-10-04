"use client"

import { useState } from "react";
import { useModal } from "@/store/modal-store";

export default function Agreement() {
    const [checked, setChecked] = useState<boolean>(false)
    const { setCurrentModal, previousModal } = useModal()

    function handleChange(e: any) {
        setChecked(e.target.checked);
    }

    return (
        <div className="w-[350px] h-[320px] p-5">
            <div className="text-center font-sf-bold text-2xl">
                Disclaimer
            </div>

            <div className="font-sf-light text-sm mt-5 t tracking-wide">
                Yard is an NFT swapping protocol designed to enable secure and efficient asset
                exchanges. To facilitate swaps, Yard requires approval solely for the specific
                NFT intended for exchange, ensuring minimal permissions and user control over
                their assets. This is a one time action.
            </div>

            <div className="mt-8 flex justify-start items-center">
                <input type="checkbox" name="agree" id="checkbox" className="cursor-pointer" onChange={handleChange} /> <span className="font-sf-light text-xs ml-2">I agree to these terms.</span>
            </div>

            <div className={`w-full h-[40px] mt-3 text-center font-sf-light rounded-[12px] ${!checked ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`} onClick={() => {
                if (checked) {
                    localStorage.setItem("agreement", "true")
                    setCurrentModal(previousModal)
                }
            }}>
                <div className="w-full h-full bg-button rounded-[12px] flex justify-center items-center">
                    Proceed
                </div>
            </div>
        </div>
    )
}