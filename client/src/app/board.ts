import { Deck } from "./deck";

export interface Board {
    id: string
    ownerId: string
    name: string
    decks: Deck[]
}

export type BoardItem = Pick<Board, 'id' | 'name'>