import { TokenPayload } from "../../models/tokenPayload"

export {}

declare global {
    namespace Express {
        export interface Request {
            token: TokenPayload
        }
    }
}