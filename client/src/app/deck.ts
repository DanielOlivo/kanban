import { Note } from "./note"

export interface Deck {
    id: string
    name: string
    notes: Note[]
}
