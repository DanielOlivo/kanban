import { Injectable } from '@angular/core';
import { Board, BoardItem } from './board';
import { Deck } from './deck';
import { Note } from './note';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid'
import axios from 'axios'
import { environment } from '../environments/environment';

const baseUrl = environment.apiUrl

export const getCard = (): Note => ({
  id: uuid(),
  title: faker.lorem.word(),
  content: ''
})

export const getDeck = (): Deck => ({
  id: uuid(),
  name: faker.lorem.word(),
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

  fetchOnStart: boolean

  boards: Board[]
  currentBoard: Board | undefined

  boardList: BoardItem[]

  constructor() {
    // console.log('STATE CONSTRUCTOR')
    this.fetchOnStart = true
    this.username = faker.internet.username()
    this.token = ''
    this.boardList = []
    // this.boards = Array.from({length: 2}, getBoard)

    this.boards = []
    // if(this.fetchOnStart){
    //   this.fetchBoards() 
    // }
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
      name: 'new deck',
      notes: []
    })
  }

  removeDeck(id: string){
    if(this.currentBoard)
      this.currentBoard.decks = this.currentBoard?.decks.filter(d => d.id !== id)
  }

  async fetchBoards(): Promise<void>{
    try{
      const url = new URL('/board', baseUrl).href
      console.log('fetching boards from ', url)
      const res = await axios.get(url)
      // const boards: Board[] = res.data
      console.log('fetched: ', res.data)
      this.boards = res.data as Board[] 
    }
    catch(error){
      if(error instanceof Error)
        console.log('ERROR!: ', error.message)
    }
  }

  async fetchList(): Promise<void>{
    try{
      const url = new URL('/board/names', baseUrl).href
      const res = await axios.get(url)
      this.boardList = res.data as BoardItem[]
      console.log('status', res.status, 'list fetched; ',this.boardList)
      console.log(Object.entries(this.boardList[0]))
    }
    catch(error){
      if(error instanceof Error)
        console.log('ERROR!! ', error.message)
    }
  }

  async fetchBoard(id: string): Promise<void> {
    try {
      const url = new URL(`/board/${id}`, baseUrl).href
      console.log('fetching board with id ', id)
      const res = await axios.get(url)
      const board: Board = res.data
      console.log('board ', board)
      this.currentBoard = board
    }
    catch(error){
      if(error instanceof Error){
        console.log('ERROR!', error.message)
      }
    }
  }

  async updateCurrentBoard(): Promise<void> {
    try{
      const url = new URL(`/board/${this.currentBoard?.id}`, baseUrl).href
      console.log('updating board ', url)
      const res = await axios.put(url, this.currentBoard)
      console.log('STATUS ',res.status)
    }
    catch (error){
      if(error instanceof Error){
        console.log('ERROR!', error.message)
      }
    }
  }
}
