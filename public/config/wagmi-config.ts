import { http, createConfig } from 'wagmi'
import { arbitrumSepolia, baseSepolia, bscTestnet, scrollSepolia, sepolia } from 'wagmi/chains'

export const wagmiConfig = createConfig({
    chains: [arbitrumSepolia, baseSepolia, bscTestnet, scrollSepolia, sepolia],
    transports: {
        [arbitrumSepolia.id]: http(),
        [baseSepolia.id]: http(),
        [bscTestnet.id]: http(),
        [scrollSepolia.id]: http(),
        [sepolia.id]: http()
    },
})