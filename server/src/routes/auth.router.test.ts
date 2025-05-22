import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { authRouter } from "./auth.router";
import { seed } from '../services/seed'
import request from 'supertest'
import express from 'express'
import { faker } from '@faker-js/faker/.'
import { Credentials } from "../models/user";
import { useClient } from "../services/database.service";

describe('auth router', () => {

    const app = express()
    app.use('/', authRouter)

    const { connect, close } = useClient()

    const cred: Credentials = {
        username: faker.internet.username(),
        password: faker.internet.password()
    }

    beforeAll(async () => {
        await seed()
        await connect()
    })

    afterAll(async() => {
        await close()
        await seed()
    })

    it('sign up', async () => {
        const res = await request(app).post('/signup').send(cred)  
        expect(res.statusCode).toEqual(201)
    })

    it('sign in and signout', async () => {
        let res = await request(app).post('/signin').send(cred)
        expect(res.statusCode).toEqual(200)
        
        const { token } = res.body
        expect( token ).toBeDefined()
        expect( typeof token === 'string' ).toBeTruthy()

        res = await request(app).delete('/')
            .set('Authorization', `Bearer ${token}`)
        expect(res.statusCode).toEqual(201)
    })

    it('sign out with invalid token', async () => {
        const res = await request(app).delete('/')
            .set('Authorization', 'Bearer thisisabadtoken')
        expect(res.statusCode).toEqual(403)
    })

})