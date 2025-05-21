import {faker} from '@faker-js/faker'
import { useClient } from './database.service'
import User from '../models/user'
import Board, { Deck, Note } from '../models/board'
import {v4 as uuid} from 'uuid'


export async function seed(){
    const { connect, close, client } = useClient()

    await connect()

    const usersCollection = client.db('kanbandb').collection('users')
    const boardCollection = client.db('kanbandb').collection('boards')

    await usersCollection.deleteMany({})
    await boardCollection.deleteMany({})

    const users: User[] = Array.from({length: 5}, ()=> ({
        username: faker.internet.username(),
        password: faker.internet.password(),
        created: 0     
    }))

    const boards: Board[] = Array.from({length: 2}, (): Board => ({
        name: faker.lorem.word(),
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

    await usersCollection.insertMany(users)
    await boardCollection.insertMany(boards)

    await close()
}