import { ObjectId } from 'mongodb'
import { useClient } from './database.service'
import User from '../models/user'
import Board, { Deck, Note } from '../models/board'
import {v4 as uuid} from 'uuid'
import { createHash } from '../utils/hash'
import { faker } from '@faker-js/faker/.'


export async function seed(){
    const { connect, close, client } = useClient()

    await connect()

    const usersCollection = client.db('kanbandb').collection('users')
    const boardCollection = client.db('kanbandb').collection('boards')

    await usersCollection.deleteMany({})
    await boardCollection.deleteMany({})

    const password = '1234'
    const hashed = await createHash(password)

    const user: User = {
        username: 'user1',
        password: hashed,
        created: 0     
    }

    const { insertedId: ownerId } = await usersCollection.insertOne(user)

    const boards: Board[] = Array.from({length: 2}, (): Board => ({
        name: faker.lorem.word(),
        ownerId: ownerId.toString(),
        created: 0,
        decks: Array.from({length: 4}, (): Deck => ({
            id: uuid(),
            created: 0,
            name: faker.lorem.word(),
            notes: Array.from({length: 6}, (): Note => ({
                id: uuid(),
                title: faker.lorem.words(),
                content: '',
                created: 0
            }))
        }))
    }))

    await boardCollection.insertMany(boards)

    await close()
}