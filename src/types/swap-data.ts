export type SwapData = {
    ownerNFTAddress: string
    ownerNFTID: number | null
    ownerNFTImage: string
    
    selectedNFTAddress: string
    selectedNFTId: number | null
    selectedNFTImage: string

    router: string

    setOwnerNFTAddress: (address: string) => void
    setOwnerNFTId: (id: number) => void
    setOwnerNFTImage: (img: string) => void

    setSelectedNFTAddress: (address: string) => void
    setSelectedNFTId: (id: number) => void
    setSelectedNFTImage: (img: string) => void

    setRouter: (router: string) => void
}