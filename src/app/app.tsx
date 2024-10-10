"use client"

import AppContainer from "@/components/app-container";
import useWindowDimensions from "@/hooks/useWindowDimensions";
import { Props } from "@/interfaces/props";

export default function App({ children }: Props) {
    const { width } = useWindowDimensions()

    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=800, initial-scale=0.2" />
                <link rel="icon" href="/images/yard.png" />
            </head>
            <body>
                {
                    width != 0 ?
                        (width > 800)
                            ? children
                            : <AppContainer>
                                <div className="w-full h-full flex justify-center items-center text-3xl font-sf-bold">
                                    Yard is not supported on small screens.
                                </div>
                            </AppContainer>
                        : <></>
                }
            </body>
        </html>
    )
}