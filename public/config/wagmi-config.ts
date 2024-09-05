import { http, createConfig } from 'wagmi'
import { arbitrumSepolia, baseSepolia, bscTestnet, scrollSepolia, sepolia } from 'wagmi/chains'
import { connectors } from './wagmi-connectors'

export const wagmiConfig = createConfig({
    chains: [arbitrumSepolia, baseSepolia, bscTestnet, scrollSepolia, sepolia],
    connectors: connectors,
    transports: {
        [arbitrumSepolia.id]: http(),
        [baseSepolia.id]: http(),
        [bscTestnet.id]: http(),
        [scrollSepolia.id]: http(),
        [sepolia.id]: http()
    },
})