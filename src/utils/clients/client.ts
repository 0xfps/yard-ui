import dotenv from "dotenv"

dotenv.config()

export function initClient() {
    const apiKey = process.env.KEY
    if (!apiKey) return undefined
    return
}