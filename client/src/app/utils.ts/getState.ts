import { faker } from "@faker-js/faker";
import { v4 as uuid } from 'uuid'
import { Board } from "../board";
import { Deck } from "../deck";
import { Note } from "../note";
import { StateService } from "../state.service";

export const getCard = (): Note => ({
  id: uuid(),
  title: faker.lorem.word(),
  content: ''
})

export const getDeck = (): Deck => ({
  id: uuid(),
  title: faker.lorem.word(),
  notes: Array.from({length: 5}, getCard)
})

export const getBoard = (): Board => ({
  id: uuid(),
  name: faker.lorem.word(),
  decks: Array.from({length: 4}, getDeck)
})

export function getState(){
    const state: StateService = new StateService(

    )

}