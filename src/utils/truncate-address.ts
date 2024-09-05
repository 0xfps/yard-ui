export function truncateAddress(address: string, limit = 5): string {
    return `${address.slice(0, limit)}...${address.slice(-1 * limit)}`
}