import { GoldRushClient } from "@covalenthq/client-sdk";
import dotenv from "dotenv"

dotenv.config()

export function initGoldRushClient(): GoldRushClient | undefined {
    const apiKey = process.env.NEXT_PUBLIC_GOLD_RUSH_API_KEY
    if (!apiKey) return undefined
    return new GoldRushClient(apiKey)
}