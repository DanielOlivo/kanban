import * as mongoDB from 'mongodb'
import * as dotenv from 'dotenv'

export const collections: {
    users?: mongoDB.Collection,
    boards?: mongoDB.Collection
} = {}

export function useClient () {
    dotenv.config()

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.CONNECTIONSTRING || 'mongodb://localhost:27017')

    return {
        connect: async () => {
            await client.connect()
            const db: mongoDB.Db = client.db(process.env.DBNAME || 'kanbandb')

            const usersCollection: mongoDB.Collection = db.collection(process.env.USERS || 'users')
            collections.users = usersCollection

            const boardsCollection: mongoDB.Collection = db.collection(process.env.BOARDS || 'boards')
            collections.boards = boardsCollection

            // console.log(`connected, ${db.databaseName}; ${usersCollection.collectionName}`)
        },
        close: async() => await client.close(),
        client
    }
}