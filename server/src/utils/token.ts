import { config } from 'dotenv'
import { sign, verify } from 'jsonwebtoken'

config()

const secret = process.env.JWTSECRET || 'JWTSECRET'

type PayloadType = string | object

export function generateToken<T extends PayloadType>(payload: T): string {
    return sign( payload, secret, { expiresIn: '7d' } )
}

export function getDataFromToken<T extends PayloadType>(token: string): T | null {
    try {
        const payload = verify(token, secret) as T
        return payload
    }
    catch {
        return null
    }
}