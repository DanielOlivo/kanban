import { Note } from "./note"

export interface Deck {
    id: string
    title: string
    notes: Note[]
}
