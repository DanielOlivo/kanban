import { ObjectId } from "mongodb";

export type Note = {
    id: string
    title: string
    content: string,
    created: number
}

export type Deck = {
    id: string
    name: string
    notes: Note[],
    created: number
}

export default class Board {

    constructor(
        public ownerId: string,
        public name: string,
        public decks: Deck[],
        public created: number,
        public id?: ObjectId
    ){}

}

export type BoardItem = {
    id: string
    name: string
}