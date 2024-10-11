"use client"

import { FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function SwapFooter() {
    return (
        <div className="w-[85%] m-auto p-4">
            <div className="w-[8%] mt-4 m-auto flex flex-row justify-between items-center text-text text-[25px]">
                <img src="/images/yard.png" alt="Yard Logo" className="w-[25px] h-[25px]" />
                <a href="https://github.com/0xfps/yard" target="_blank" className="hover:opacity-80"><FaGithub className="text-lg"/></a>
                <a href="https://twitter.com/0xfps/swaponyard" target="_blank" className="hover:opacity-80"><FaXTwitter className="text-lg"/></a>
            </div>
            <div className="text-center text-text font-sf-light text-[12px] mt-5 opacity-85">
                &copy; 2024 Yard.
            </div>
        </div>
    )
}