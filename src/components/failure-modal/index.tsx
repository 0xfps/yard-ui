"use client"

import { useModal } from "@/store/modal-store"
import { useSwapData } from "@/store/swap-data-store"
import GradientDiv from "../gradient-div"

export default function FailureModal() {
    const {
        failureReason
    } = useSwapData()
    const { setCurrentModal, previousModal } = useModal()

    return (
        <div className="w-[554px] h-[495px] rounded-[12px]">
            <div className="w-[90%] h-full p-5 m-auto">
                <div className="w-full text-center flex mt-4 justify-center">
                    <img src="/images/failure.svg" alt="Success" className="w-[90px] h-[90px]" />
                </div>
                <div className="text-center font-sf-bold text-2xl mt-4">
                    Swap Failed
                </div>
                <div className="w-full h-[30%] mt-12 text-center tracking-wide">
                    {failureReason}
                </div>
                <div className="w-full h-[60px] bg-button mt-4 rounded-[12px] hover:opacity-85" onClick={() => setCurrentModal(previousModal)}>
                    <div className="w-full h-full bg-button rounded-[12px] text-center flex justify-center items-center font-sf-medium text-2xl cursor-pointer">
                        Close
                    </div>
                </div>
            </div>
        </div>
    )
}