import { faker } from "@faker-js/faker/.";
import { v4 as uuid } from 'uuid'
import Board from "../models/board";

export function getBoard(decks: number = 4, notes: number = 6): Board {
    return {
        name: faker.lorem.word(),
        ownerId: '',
        created: 0,
        decks: Array.from( {length: decks}, () => ({
            id: uuid(),
            name: faker.lorem.word(),
            created: 0,
            notes: Array.from( {length: notes}, () => ({
                id: uuid(),
                title: faker.lorem.words(),
                content: '',
                created: 0
            }) )
        }))
    } 
}