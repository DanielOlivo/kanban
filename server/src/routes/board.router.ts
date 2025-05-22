import express, { Request, Response } from 'express'
import { ObjectId } from 'mongodb'
import { collections } from '../services/database.service'
import Board, { BoardItem } from '../models/board'

export const boardsRouter = express.Router()
boardsRouter.use(express.json())

function getError(err: any){
    return err instanceof Error ? err.message : 'unknown error'
}

boardsRouter.get('/names', async (req: Request, res: Response) => {
    try {
        const { id: ownerId } = req.token
        const items = await collections.boards?.find(
            { ownerId },
            { projection: {  name: 1, id: "$_id", } }
        ).toArray() 
        res.status(200).send(items)
    }
    catch(error){
        res.status(500).send(getError(error))
    }
})

boardsRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const { id: ownerId } = req.token
        const id = req?.params?.id
        const query = {
            _id: new ObjectId(id),
            ownerId
        }
        const dbBoard = await collections.boards?.findOne( query )

        if(!dbBoard){
            res.status(404).send('board not found')
            return
        }

        const board: Board = {
            id: dbBoard._id,
            ownerId: req.token.id,
            name: dbBoard.name,
            created: dbBoard.created,
            decks: dbBoard.decks
        }
        res.status(200).send(board)
    }
    catch(error){
        const err = getError(error)
        console.log(err)
        res.status(500).send(err)
    }
})

boardsRouter.post('/', async (req: Request, res: Response) => {
    try{
        const newBoard = req.body as Board
        newBoard.ownerId = req.token.id
        const result = await collections.boards?.insertOne(newBoard)
        if(result)
            res.status(201).json({ id: result.insertedId })
        else 
            res.status(500).send('failed')
    }
    catch(error){
        res.status(500).send(error instanceof Error ? error.message : 'unknown error')
    }
})

boardsRouter.put('/:id', async(req: Request, res: Response) => {
    const id = req?.params?.id
    try{
        const updated = req.body as Board
        const { id: ownerId } = req.token
        const query = { 
            _id: new ObjectId( id ),
            ownerId
        }
        const result = await collections.boards?.updateOne( query, {$set: {
            decks: updated.decks
        }} )
        if(result)
            res.status(200).send('success')
        else
            res.status(304).send('board was not updated')
    }
    catch(error){
        res.status(500).send(error instanceof Error ? error.message : 'unknown error')
    }
})

boardsRouter.delete('/:id', async(req: Request, res: Response) => {
    const id = req?.params?.id

    try{
        const query = { _id: new ObjectId(id) }
        const result = await collections.boards?.deleteOne(query)

        if(result && result.deletedCount){
            res.status(202).send('successfully removed')
        }
        else if(!result){
            res.status(400).send('failed to remove board with id ' + id)
        }
        else if(!result.deletedCount){
            res.status(404).send('board does not exist with id ' + id)
        }
    }
    catch(error){
        res.status(500).send(error instanceof Error ? error.message : 'unknown error')
    }
})
