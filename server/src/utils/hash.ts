import { hash, compare } from 'bcryptjs'

export async function createHash(password: string): Promise<string> {
    const saltRounds = 10
    const hashed = await hash(password, saltRounds)
    return hashed
}

export async function validatePassword(password: string, hash: string): Promise<boolean>{
    const result = await compare(password, hash)
    return result
}