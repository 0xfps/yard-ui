"use client"

import { Props } from "@/interfaces/props";

export default function App({ children }: Props) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=800, initial-scale=0.2"/>
                <link rel="icon" href="/images/yard.png" />
            </head>
            <body>{children}</body>
        </html>
    )
}