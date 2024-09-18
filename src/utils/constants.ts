export const ARBITRUM_CHAIN_ID = 421614
export const BASE_CHAIN_ID = 84532
export const BSC_CHAIN_ID = 97
export const SCROLL_CHAIN_ID = 534351
export const SEPOLIA_CHAIN_ID = 11155111
export const DEFAULT_CHAIN_ID = ARBITRUM_CHAIN_ID
export const SUPPORTED_CHAIN_IDS = [ARBITRUM_CHAIN_ID, BASE_CHAIN_ID, BSC_CHAIN_ID, SCROLL_CHAIN_ID, SEPOLIA_CHAIN_ID]

export const APPROVE_BALANCE_OF_ABI = [{
    constant: false,
    inputs: [
        { name: '_spender', type: 'address' },
        { name: '_value', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
},
{
    "inputs": [
        {
            "internalType": "address",
            "name": "account",
            "type": "address"
        }
    ],
    "name": "balanceOf",
    "outputs": [
        {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }
    ],
    "stateMutability": "view",
    "type": "function"
}]

export const APPROVE_NFT_ABI = [{
    "inputs": [
        {
            "internalType": "address",
            "name": "to",
            "type": "address"
        },
        {
            "internalType": "uint256",
            "name": "tokenId",
            "type": "uint256"
        }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}]