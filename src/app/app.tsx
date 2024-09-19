"use client"

import { Props } from "@/interfaces/props";

export default function App({ children }: Props) {
    return (
        <html lang="en">
            <head>
                <meta name="viewport" content="width=1024px, initial-scale=1.0"/>
                <link rel="icon" href="/images/yard.png" />
            </head>
            <body>{children}</body>
        </html>
    )
}