"use client"

import { Props } from "@/interfaces/props"

export default function GradientButton({ children }: Props) {
    return (
        <div className="p-[1px] w-fit bg-gradient-to-b from-button from-50% to-text rounded-[12px] hover:opacity-80">
            {children}
        </div>
    )
}