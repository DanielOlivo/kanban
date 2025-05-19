import { Injectable } from '@angular/core';
import { Board } from './board';
import { Deck } from './deck';
import { Note } from './note';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid'

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



@Injectable({
  providedIn: 'root'
})
export class StateService {

  username: string 
  token: string

  boards: Board[]
  currentBoard: Board | undefined

  constructor() {
    console.log('STATE CONSTRUCTOR')
    this.username = faker.internet.username()
    this.token = ''
    this.boards = Array.from({length: 2}, getBoard)
  }

  selectBoard(id: string){
    this.currentBoard = this.boards.find(b => b.id === id)
  } 

  addNote(deck: Deck){
    deck.notes.push({
      id: uuid(),
      title: 'new note',
      content: ''
    })
  }

  removeNote(deck: Deck, id: string){
    deck.notes = deck.notes.filter(n => n.id !== id) 
  }
  
  addDeck(){
    this.currentBoard?.decks.push({
      id: uuid(),
      title: 'new deck',
      notes: []
    })
  }

  removeDeck(id: string){
    if(this.currentBoard)
      this.currentBoard.decks = this.currentBoard?.decks.filter(d => d.id !== id)
  }
}
