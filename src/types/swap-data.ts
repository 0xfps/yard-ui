export type SwapData = {
    ownerNFTAddress: string
    ownerNFTID: number | null
    ownerNFTImage: string
    ownerNFTName: string
    
    selectedNFTAddress: string
    selectedNFTId: number | null
    selectedNFTImage: string
    selectedNFTName: string
    
    swapChainId: number | null
    router: string
    pair: string

    setOwnerNFTAddress: (address: string) => void
    setOwnerNFTId: (id: number) => void
    setOwnerNFTImage: (img: string) => void
    setOwnerNFTName: (name: string) => void
    
    setSelectedNFTAddress: (address: string) => void
    setSelectedNFTId: (id: number) => void
    setSelectedNFTImage: (img: string) => void
    setSelectedNFTName: (name: string) => void
    
    setSwapChainId: (id: number | null) => void
    setRouter: (router: string) => void
    setPair: (pair: string) => void
}