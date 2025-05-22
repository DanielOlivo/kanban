import { Injectable } from '@angular/core';
import { Board, BoardItem } from './board';
import { Deck } from './deck';
import { Note } from './note';
import { faker } from '@faker-js/faker';
import { v4 as uuid } from 'uuid'
import axios, { AxiosInstance } from 'axios'
import { environment } from '../environments/environment';

const baseUrl = environment.apiUrl

export type Credentials = {
  username: string
  password: string
}

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
  ownerId: '',
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
  axiosInstance: AxiosInstance

  boards: Board[]
  currentBoard: Board | undefined

  boardList: BoardItem[]

  constructor() {
    const username = localStorage.getItem('username')
    const token = localStorage.getItem('token')

    if(username && username.length > 0 && token && token.length > 0){
      this.username = username
      this.token = token
      this.axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${token}`
        }        
      })
    }
    else {
      this.username = ''
      this.token = ''
      this.axiosInstance = axios.create({
        baseURL: baseUrl,
      })
    }


    this.fetchOnStart = true
    this.boardList = []
    this.boards = []


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

  async fetchList(): Promise<void>{
    try{
      const res = await this.axiosInstance.get('/board/names')
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
      const res = await this.axiosInstance.get(`/board/${id}`)
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
      const res = await this.axiosInstance.put(`/board/${this.currentBoard!.id}`, this.currentBoard)
      console.log('STATUS ',res.status)
    }
    catch (error){
      if(error instanceof Error){
        console.log('ERROR!', error.message)
      }
    }
  }

  async signin(credentials: Credentials): Promise<void> {
    try {
      const res = await this.axiosInstance.post('/signin', credentials)

      this.username = credentials.username
      this.token = res.data.token

      this.axiosInstance = axios.create({
        baseURL: baseUrl,
        headers: {
          Authorization: `Bearer ${res.data.token}`
        }
      })

      localStorage.setItem('username', this.username)
      localStorage.setItem('token', this.token)
    }
    catch(error){
      if(error instanceof Error)
        console.log(error.message)
    }
  }
}
