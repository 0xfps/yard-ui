import chainData from "../../public/json/chain-data.json"

export function getChainRPC(chainName: string): string { 
    // @ts-ignore
    return chainData.chains[chainName].rpc
}