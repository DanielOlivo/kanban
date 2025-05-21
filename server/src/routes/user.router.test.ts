import { describe, it, expect, afterAll } from '@jest/globals'
import request from 'supertest'
import express from 'express'
import User from '../models/user'
import { MongoClient, ObjectId } from 'mongodb'
import { usersRouter } from './user.router'
import { useClient } from '../services/database.service'



describe('users router', () => {

    const app = express()
    app.use('/user', usersRouter)

    const mongoUrl = 'mongodb://localhost:27017'
    const dbname = 'kanbandb'
    const { connect, close } = useClient()

    let userId: ObjectId

    beforeAll(async () => {
        await connect()
    })

    afterAll(async () => {
        await close()

        // clean db
        const client = new MongoClient(mongoUrl)
        await client.connect()
        const db = client.db(dbname)
        await db.collection('users').deleteMany({})
        await client.close()
    })


    it('get all (none)', async () => {
        const res = await request(app).get('/user')
        const users = res.body as User[]
        // console.log(users)
        expect(users).toBeDefined()
        expect( Array.isArray(users) ).toBeTruthy()
        expect(users.length).toEqual(0)
    })

    it('add user', async () => {
        const newUser: User = {
            username: 'user1',
            password: '1234',
            created: new Date().getMilliseconds()
        }

        const res = await request(app).post('/user').send(newUser)
        // console.log("res", res, res.error)

        expect(res.statusCode).toEqual(201)
    })

    it('get all (get one)', async () => {
        const res = await request(app).get('/user')
        const users = res.body as User[]
        expect(users).toBeDefined()
        expect( Array.isArray(users) ).toBeTruthy()
        expect(users.length).toEqual(1)

        userId = users[0].id!
    })



    it('sanity', () => expect(true).toBeTruthy())

})
