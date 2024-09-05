import chainData from "../../public/json/chain-data.json"

export function getChainId(chainName: string): number {
    // @ts-ignore
    return Number(chainData.chains[chainName].chainId)
}