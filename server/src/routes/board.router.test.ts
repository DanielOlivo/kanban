import { describe, it, expect, afterAll } from '@jest/globals'
import request from 'supertest'
import express from 'express'
import Board, { BoardItem, Deck } from '../models/board'
import { authRouter } from './auth.router'
import { boardsRouter } from './board.router'
import { collections, useClient } from '../services/database.service'
import { seed } from '../services/seed'
import { getBoard } from '../utils/getBoard'
import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker/.'
import { authenticate } from '../middlewares/authenticate'


describe('board router', () => {
    const app = express()
    app.use('/', authRouter)
    app.use('/board', [authenticate], boardsRouter)

    const { connect, close } = useClient()
    let token: string

    let board: Board

    beforeAll(async () => {
        await seed()
        await connect()
    })

    afterAll(async () => {
        await close()
        await seed()
    })

    test('get token', async () => {
        const cred = { username: 'user1', password: '1234'}
        const res = await request(app)
            .post('/signin')
            .send(cred)
        token = res.body.token
        expect(token).toBeDefined()
        expect(token.length > 0).toBeTruthy()
    })

    test('get names', async() => {
        const res = await request(app)
            .get('/board/names')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(200)
        const data = res.body
        expect( Array.isArray(data) ).toBeTruthy()
        expect(data.length).toEqual(2)
        const item = data[0]
        expect('name' in item).toBeTruthy()
        expect('_id' in item).toBeTruthy()
    })

    test('create board', async () => {
        board = getBoard()
        const res = await request(app)
            .post('/board')
            .send(board)
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(201)

        const { id } = res.body
        expect(id).toBeDefined()
        board.id = id
    })  

    test('total amount of boards - 3', async () => {
        const res = await request(app)
            .get('/board/names')
            .set('Authorization', `Bearer ${token}`)
        const boards = res.body
        expect(boards.length).toEqual(3)
    })

    test('get all and then one by one', async () => {
        let res = await request(app)
            .get('/board/names')
            .set('Authorization', `Bearer ${token}`)

        const ids = (res.body as BoardItem[]).map(b => b.id)
        expect(ids.every(id => id !== undefined)).toBeTruthy()

        for(const id of ids){
            res = await request(app)
                .get(`/board/${id}`)
                .set('Authorization', `Bearer ${token}`)

            const b = res.body as Board
            expect(b).toBeDefined()
            expect(Object.keys(b).length > 0).toBeTruthy()
            expect(b.id).toEqual(id)
        }
    })

    test('retrieve freshly created board', async () => {
        const res = await request(app)
            .get(`/board/${board.id}`)
            .set('Authorization', `Bearer ${token}`)
        const b = res.body as Board
        expect(b).toBeDefined()
        // console.log("-============== b ", b)
        expect(['name', 'created', 'decks'].every(p => p in b)).toBeTruthy()
        expect(b.id).not.toEqual(b.ownerId)
    })

    test('add deck to board', async () => {
        const deck: Deck = {
            id: uuid(),
            name: faker.lorem.word(),
            created: 0,
            notes: []
        } 

        const len1 = board.decks.length
        board.decks.push(deck)
        
        // update 
        console.log('updating board with id', board.id)
        const res1 = await request(app)
            .put('/board/' + board.id).send(board)
            .set('Authorization', `Bearer ${token}`)

        expect(res1.statusCode).toEqual(200)

        // extract again
        const res2 = await request(app)
            .get('/board/' + board.id)
            .set('Authorization', `Bearer ${token}`)
        expect(res2.statusCode).toEqual(200)
        const boardUpd = res2.body
        console.log('boardUpd, ' + boardUpd)
        expect(boardUpd).toBeDefined()
        expect(boardUpd.decks.length).toEqual(5)
    })

})