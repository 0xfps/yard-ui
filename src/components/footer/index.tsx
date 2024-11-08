"use client"

import { FaGithub } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6"

export default function Footer() {
    return (
        <div className="w-[85%] m-auto mt-[150px] p-4">
            <div className="flex justify-center items-center">
                <a href="/" className="hover:brightness-[.85]">
                    <img src="/images/yard.png" alt="Yard Logo" className="w-[50px] h-[50px]" />
                </a>
            </div>
            <div className="w-[5%] mt-4 m-auto flex flex-row justify-between items-center text-text text-[25px]">
                <a href="https://github.com/0xfps/yard" target="_blank" className="hover:opacity-80"><FaGithub /></a>
                <a href="https://twitter.com/0xfps/swaponyard" target="_blank" className="hover:opacity-80"><FaXTwitter /></a>
            </div>
            <div className="text-center text-text font-sf-light text-[12px] mt-5 opacity-85">
                &copy; 2024 Yard.
            </div>
        </div>
    )
}