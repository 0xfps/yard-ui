import { useModal } from "@/store/modal-store"
import { useSwapData } from "@/store/swap-data-store"
import { LuRefreshCw } from "react-icons/lu"
import { getUrlForTransaction } from "@/utils/get-url"
import { SupportedChains } from "@/types/supported-chains"

export default function SuccessModal() {
    const {
        ownerNFTImage, ownerNFTName, ownerNFTID, swapChainId,
        selectedNFTImage, selectedNFTName, selectedNFTId, hash,
        clear
    } = useSwapData()
    const { setCurrentModal } = useModal()

    return (
        <div className="w-[554px] h-[495px] rounded-[12px]">
            <div className="w-[90%] h-full p-5 m-auto">
                <div className="w-full text-center flex mt-4 justify-center">
                    <img src="/images/success.svg" alt="Success" className="w-[90px] h-[90px]" />
                </div>
                <div className="text-center font-sf-bold text-2xl mt-4">
                    Swap Successful
                </div>
                <div className="w-full h-[30%] mt-8 flex flex-wrap">
                    <div className="w-[40%] h-full m-auto flex flex-col items-center">
                        <img src={ownerNFTImage} alt={ownerNFTName} className="w-[70px] h-[70px] rounded-[12px]" />
                        <div className="text-center mt-2">
                            <p className="text-[11px] font-sf-light">You sent</p>
                            <p className="text-[13px] font-sf-medium">{ownerNFTName}</p>
                            <p className="text-[13px] font-sf-medium">#{ownerNFTID}</p>
                        </div>
                    </div>
                    <div className="w-[20%] h-full m-auto flex items-center justify-center">
                        <LuRefreshCw className="text-5xl" />
                    </div>
                    <div className="w-[40%] h-full m-auto flex flex-col items-center">
                        <img src={selectedNFTImage} alt={selectedNFTName} className="w-[70px] h-[70px] rounded-[12px]" />
                        <div className="text-center mt-2">
                            <p className="text-[11px] font-sf-light">You received</p>
                            <p className="text-[13px] font-sf-medium">{selectedNFTName}</p>
                            <p className="text-[13px] font-sf-medium">#{selectedNFTId}</p>
                        </div>
                    </div>
                </div>
                <div className="mt-7 text-center">
                    <a href={getUrlForTransaction(swapChainId as SupportedChains, hash)} className="text-xs hover:opacity-80" target="_blank">View transaction</a>
                </div>
                <div className="w-full h-[60px] bg-button mt-5 rounded-[12px] hover:opacity-85" onClick={() => { setCurrentModal(""); clear() }}>
                    <div className="w-full h-full bg-button rounded-[12px] text-center flex justify-center items-center font-sf-medium text-2xl cursor-pointer">
                        Close
                    </div>
                </div>
            </div>
        </div>
    )
}