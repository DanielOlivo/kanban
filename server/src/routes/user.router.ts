import express, { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { collections } from '../services/database.service'
import User from '../models/user'

export const usersRouter = express.Router()
usersRouter.use(express.json())

usersRouter.get('/', async (_req: Request, res: Response) => {
    try {
        const dbUsers = await collections!.users!.find({}).toArray()
        const users: User[] = dbUsers.map((doc: any) => ({
            _id: doc._id,
            username: doc.username,
            password: doc.password,
            created: doc.created
        }))
        res.status(200).send(users)
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message)
        } else {
            res.status(500).send('An unknown error occurred')
        }
    }
})

usersRouter.get('/:id', async (req: Request, res: Response) => {
    const id = req?.params?.id

    try {
        const query = { _id: new ObjectId(id) }
        const dbUser = await collections.users!.findOne(query)
        if (!dbUser) {
            res.status(404).send('User not found')
            return
        }
        const user: User = {
            id: dbUser._id,
            username: dbUser.username,
            password: dbUser.password,
            created: dbUser.created
        }
        res.status(200).send(user)
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).send(error.message)
        } else {
            res.status(500).send('An unknown error occurred')
        }
    }
})


usersRouter.post('/', async (req: Request, res: Response) => {
    try {
        const newUser = req.body as User
        const result = await collections.users?.insertOne(newUser)
        if(result)
            res.status(201).send('success')
        else
            res.status(500).send('failed')
    }
    catch(error){
        res.status(400).send(error instanceof Error ? error.message : 'unknown error')
    }
})
