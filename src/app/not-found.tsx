"use client"

import GradientDiv from "@/components/gradient-div"
import { useEffect } from "react"

export default function NotFound() {
    useEffect(function () {
        document.title = "Page Not Found - Yard Protocol"
    }, [])

    return (
        <div className="w-screen h-screen bg-not-found bg-background p-5">
            <div className="w-[80%] m-auto mt-12">
                <div className="h-[80px] w-full flex justify-between items-center">
                    <div className="w-[15%] h-full flex items-center font-sf-light text-sm">
                        <a href="/"><img src="/images/yard.png" alt="Yard Logo" className="w-[55px] h-[55px]" /></a>
                    </div>
                </div>

                <div className="w-full h-[500px] p-3 mt-12 flex justify-between items-center">
                    <div className="w-[49%] h-full flex justify-start items-center text-text p-1">
                        <div>
                            <div className="text-[100px] font-bold w-fit">
                                404
                            </div>
                            <div className="text-[25px] font-normal mt-5">
                                Oops! You ran out of Oxygen.
                            </div>
                            <div className="text-[20px] font-thin mt-1">
                                The page you are looking for doesn't exist.
                            </div>
                            <div className="mt-6">
                                <a href="/">
                                    <button className="rounded-[12px]">
                                        <GradientDiv>
                                            <div className="w-full h-full p-3 bg-night font-light rounded-[12px]">
                                                Back to home
                                            </div>
                                        </GradientDiv>
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="w-[49%] h-full relative">
                        <div className="text-[300px] font-extrabold flex justify-center items-center text-text">
                            <img src="images/astronaut.svg" alt="" className="absolute" />
                            404
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}