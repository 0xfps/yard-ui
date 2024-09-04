"use client"

import { Props } from "@/interfaces/props"

export default function GradientDiv({ children }: Props) {
    return (
        <div className="p-[1px] w-[100%] h-[100%] bg-gradient-to-b from-div-grad-start from-50% to-div-grad-end rounded-[12px]">
            {children}
        </div>
    )
}