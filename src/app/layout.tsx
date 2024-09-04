"use client"

import { WagmiProvider } from "wagmi";
import App from "./app";
import "./globals.css";
import { wagmiConfig } from "../../public/config/wagmi-config";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <App>
            {children}
          </App>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}
