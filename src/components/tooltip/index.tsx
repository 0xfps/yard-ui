import { ToolTip } from "@/interfaces/tooltip";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import "./styles.css"

export default function ToolTipDiv({ trigger, content }: ToolTip) {
    return (
        <div className="tooltip-container flex">
            <span className="tooltip-trigger flex justify-around items-center">{trigger}<HiOutlineQuestionMarkCircle className="text-sm ml-1" /></span>
            <span className="tooltip-text">{content}</span>
        </div>
    )
}