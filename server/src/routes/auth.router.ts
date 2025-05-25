import express, { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { collections } from '../services/database.service'
import { Credentials } from '../models/user'
import User from '../models/user'
import { createHash, validatePassword } from '../utils/hash'
import { generateToken } from '../utils/token'
import { authenticate } from '../middlewares/authenticate'
import { TokenPayload } from '../models/tokenPayload'
import path from 'path'

export const authRouter = express.Router()
authRouter.use(express.json())

authRouter.post('/signup', async (req: Request, res: Response) => {
    try {
        const cred: Credentials = req.body 
        const existing = await collections.users?.find({username: cred.username}).toArray()

        if(existing && existing?.length > 0){
            res.status(303).json({message: 'User already exists'}) 
            return
        }

        const hash = await createHash(cred.password)
        const newUser: User = {...cred, password: hash, created: new Date().getTime()}

        const result = await collections.users?.insertOne(newUser) 
        res.status(201).json({message: 'success'})
    }
    catch(error){
        if(error instanceof Error)
            console.log(error.message)
    }
})

authRouter.post('/signin', async (req: Request, res: Response) => {
    console.log('SIGNIN')
    try{
        const cred: Credentials = req.body
        const existing = await collections.users?.findOne(
            {username: cred.username}, 
            { projection: { password: 1, _id: 1} }
        ) 
        console.log('existing: ', existing)
        if(!existing){
            res.status(500).send('failed')
            return
        }

        const { password  } = existing

        const isValid = await validatePassword(cred.password, password)

        console.log('isValid', isValid)
        if(!isValid){
            res.status(500).send('failed')
            return
        }

        // create token
        const token = generateToken<TokenPayload>({
            username: cred.username,
            id: existing._id.toString()
        })
        res.status(200).json({token})
    }
    catch(error){
        if(error instanceof Error)
            console.log(error.message)
    }
})

authRouter.delete('/', [authenticate],  async (req: Request, res: Response) => {
    // add token to black list
    try{
        console.log('singing out...')
        // res.redirect('/signin')
        res.sendStatus(200)
        console.log('...signed out')
        // res.sendStatus(201)
    }
    catch(error){
        res.status(500).send(error instanceof Error ? error.message : 'unknown')
    }
})

// authRouter.delete('*', (req: Request, res: Response) => {
//     console.log('I have got delete request')
//     res.sendStatus(200)
// })

const relPath = '../../../client/dist/client'

authRouter.use(express.static(path.join(__dirname, relPath)))

authRouter.get('*', (req: Request, res: Response) => {
    console.log('returning html...')
    res.sendFile(path.join(__dirname, relPath, 'index.html'))
})