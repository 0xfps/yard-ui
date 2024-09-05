import { coinbaseWallet, injected, metaMask, walletConnect } from 'wagmi/connectors'
import dotenv from "dotenv"

dotenv.config()

export const connectors = [
    metaMask(),
    injected(),
    coinbaseWallet(),
    walletConnect({ projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_ID as string })
]