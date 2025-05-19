import { Deck } from "./deck";

export interface Board {
    id: string
    name: string
    decks: Deck[]
}
