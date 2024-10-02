"use client"

import { Props } from "@/interfaces/props";

export default function AppContainer({ children }: Props) {
    return (
        <div className="text-text bg-background bg-swap-hero h-screen w-screen">
            <div className="w-full h-full bg-background-cover p-10">
                {children}
            </div>
        </div>
    )
}