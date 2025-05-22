import { describe, it, expect } from "@jest/globals";
import { generateToken, getDataFromToken } from './token'
import { faker } from "@faker-js/faker/.";

describe('token', () => {

    it('create token and extract data', () => {
        const username = faker.internet.username()
        const token = generateToken(username)
        expect(token).toBeDefined()
        expect(typeof token === 'string').toBeTruthy()

        const extracted = getDataFromToken(token)
        expect(extracted).toEqual(username)

    })

})