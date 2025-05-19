import type { Meta, StoryObj } from "@storybook/angular";
import { BoardComponent } from "./board.component";
import { faker } from '@faker-js/faker'
import { v4 as uuid } from 'uuid'
import { Note } from "../note";
import { Deck } from "../deck";
import { Board } from "../board";


const meta: Meta<BoardComponent> = {
  title: 'Kanban/Board',
  component: BoardComponent,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<BoardComponent>;


const genNote = (): Note => ({
    id: '000',
    title: faker.lorem.words(),
    content: ''
})

const genDeck = (): Deck => ({
    id: uuid(),
    title: faker.lorem.word(),
    notes: Array.from({length: 4}, genNote)
})

const genBoard = (): Board => ({
    id: '00',
    name: faker.lorem.word(),
    decks: Array.from({length: 4}, genDeck)
})

export const Primary: Story = {
    args: {
        board: genBoard()
    }
}