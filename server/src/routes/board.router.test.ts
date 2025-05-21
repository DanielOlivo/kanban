import { describe, it, expect, afterAll } from '@jest/globals'
import request from 'supertest'
import express from 'express'
import Board, { Deck } from '../models/board'
import { boardsRouter } from './board.router'
import { useClient } from '../services/database.service'
import { seed } from '../services/seed'
import { getBoard } from '../utils/getBoard'
import { v4 as uuid } from 'uuid'
import { faker } from '@faker-js/faker/.'


describe('board router', () => {
    const app = express()
    app.use('/board', boardsRouter)

    const mongoUrl = 'mongodb://localhost:27017'
    const dbname = 'kanbandb'
    const { connect, close } = useClient()

    let board: Board

    beforeAll(async () => {
        await seed()
        await connect()
    })

    afterAll(async () => {
        await close()
        await seed()
    })

    test('get all boards', async () => {
        const res = await request(app).get('/board')
        const boards = res.body as Board[]
        expect(boards).toBeDefined()
        expect( Array.isArray(boards) ).toBeTruthy()
        expect( boards.length ).toEqual(2)
    }) 

    test('get names', async() => {
        const res = await request(app).get('/board/names')
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
        const res = await request(app).post('/board').send(board)
        expect(res.statusCode).toEqual(201)

        const { id } = res.body
        expect(id).toBeDefined()
        board.id = id
    })  

    test('total amount of boards - 3', async () => {
        const res = await request(app).get('/board')
        const boards = res.body as Board[]
        expect(boards.length).toEqual(3)
    })

    test('get all and then one by one', async () => {
        let res = await request(app).get('/board')
        const ids = (res.body as Board[]).map(b => b.id)
        expect(ids.every(id => id !== undefined)).toBeTruthy()

        for(const id of ids){
            res = await request(app).get(`/board/${id}`)
            const b = res.body as Board
            expect(b).toBeDefined()
            expect(Object.keys(b).length > 0).toBeTruthy()
            expect(b.id).toEqual(id)
        }
    })

    test('retrieve freshly created board', async () => {
        const res = await request(app).get(`/board/${board.id}`)
        const b = res.body as Board
        expect(b).toBeDefined()
        // console.log("-============== b ", b)
        expect(['name', 'created', 'decks'].every(p => p in b)).toBeTruthy()
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
        let res = await request(app).put('/board/' + board.id).send(board)

        expect(res.statusCode).toEqual(200)

        // extract again
        res = await request(app).get('/board/' + board.id)
        const boardUpd = res.body
        expect(boardUpd).toBeDefined()
        expect(boardUpd.decks.length).toEqual(5)
    })

})