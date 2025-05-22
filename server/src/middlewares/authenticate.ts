import { Request, Response, NextFunction } from "express";
import { getDataFromToken } from "../utils/token";
import { TokenPayload } from "../models/tokenPayload";

export function authenticate(req: Request, res: Response, next: NextFunction){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    

    if(token == null){
        res.sendStatus(401)
        return
    }

    const payload = getDataFromToken<TokenPayload>(token)

    if(payload == null){
        res.sendStatus(403)
        return
    }

    req.token = payload
    next()
}