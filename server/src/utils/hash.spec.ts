import { describe, it, expect } from "@jest/globals";
import { createHash, validatePassword } from './hash'
import { faker } from "@faker-js/faker/.";

describe('hashing', () => {

    it('create hash and validate it', async () => {
        const password = faker.internet.password()
        const hash = await createHash(password)

        const otherPassword = faker.internet.password()

        expect(await validatePassword(password, hash)).toBeTruthy
        expect(await validatePassword(otherPassword, hash)).toBeFalsy()
    })

})