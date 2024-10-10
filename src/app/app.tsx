"use client"

import { WagmiProvider } from "wagmi";
import "./globals.css";
import { wagmiConfig } from "../../public/config/wagmi-config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Modals from "@/components/modals";
import { Props } from "@/interfaces/props";
const queryClient = new QueryClient()

export default function App({ children }: Props) {
    return (
        <WagmiProvider config={wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <Modals />
                {children}
            </QueryClientProvider>
        </WagmiProvider>
    )
}