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
    let username = '' 
    let token = '' 

    if(typeof window !== 'undefined'){
      const myStorage = window.localStorage
      username = myStorage.getItem('username') || ''
      token = myStorage.getItem('token') || ''
    }

    if(username.length > 0 && token.length > 0){
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


  // removeNote(deck: Deck, id: string){
  //   deck.notes = deck.notes.filter(n => n.id !== id) 
  // }
  
  // addDeck(){
  //   this.currentBoard?.decks.push({
  //     id: uuid(),
  //     name: 'new deck',
  //     notes: []
  //   })
  // }

  // removeDeck(id: string){
  //   if(this.currentBoard)
  //     this.currentBoard.decks = this.currentBoard?.decks.filter(d => d.id !== id)
  // }

  async fetchList(): Promise<void>{
    try{
      const res = await this.axiosInstance.get('/board/names')
      this.boardList = res.data as BoardItem[]
      console.log('status', res.status, 'list fetched; ',this.boardList)
      // console.log(Object.entries(this.boardList[0]))
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

  async createBoard(name: string){
    try {
      const newBoard: Board = {
        id: '',
        ownerId: '',
        name,
        decks: []
      }
      const res = await this.axiosInstance.post('/board', newBoard)
      const { id } = res.data

      this.boardList.push({id, name})
    }
    catch(error){
      if(error instanceof Error){
        console.log(error.message)
      }
    }
  }

  async removeBoard(item: BoardItem){
    try{
      console.log('requesting removal of ', item)
      const res = await this.axiosInstance.delete(`/board/${item.id}`)

      this.boardList = this.boardList.filter(i => i.id !== item.id) 
    }
    catch(error){
      if(error instanceof Error)
        console.log(error)
    }

  }

  async createDeck(){
    try{
      if(!this.currentBoard){
        return
      }

      const deck: Deck = {
        id: uuid(),
        name: 'deck',
        notes: []
      }

      if(!this.currentBoard.decks || this.currentBoard.decks.length === 0){
        const decks: Deck[] = [ deck ]
        this.currentBoard.decks = decks
      }
      else {
        this.currentBoard.decks.push(deck)
      }


      const res = await this.axiosInstance.put(`/board/${this.currentBoard.id}`, this.currentBoard)
      console.log(res.status)
    }
    catch(error){
      if(error instanceof Error){
        console.log('ERROR', error.message)
      }
    }
  }

  async removeDeck(deck: Deck){
    try{
      if(!this.currentBoard){
        return
      }
      this.currentBoard.decks = this.currentBoard.decks.filter(d => d.id !== deck.id)

      const res = await this.axiosInstance.put(`/board/${this.currentBoard.id}`, this.currentBoard)
    }
    catch(error){
      if(error instanceof Error){
        console.log('Error!!!', error.message)
      }
    }
  }

  async addNote(deck: Deck){
    try{
      const note: Note = {
        id: uuid(),
        title: 'new note',
        content: ''
      }

      deck.notes.push(note)

      console.log('added note', this.currentBoard)
      await this.updateCurrentBoard() 
      
    }
    catch(error){
      if(error instanceof Error){
        console.log(error.message)
      }
    }
  }

  async removeNote(note: Note){
    try{
      if(!this.currentBoard){
        return
      }
      for(let i = 0; i < this.currentBoard.decks.length; i++){
        const deck = this.currentBoard.decks[i]
        deck.notes = deck.notes.filter(n => n.id !== note.id)
      }

      await this.updateCurrentBoard()
    }
    catch(error){
      if(error instanceof Error){
        console.log(error.message)
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

      if(typeof window !== 'undefined'){
        const myStorage = window.localStorage
        myStorage.setItem('username', this.username)
        myStorage.setItem('token', this.token)
      }
    }
    catch(error){
      if(error instanceof Error)
        console.log(error.message)
    }
  }

  async signout(){
    try{
      const res = await this.axiosInstance.delete('/')

      this.username = ''
      this.token = ''

      localStorage.clear()
    }
    catch(error){
      if(error instanceof Error)
        console.log(error.message)
    }


  }
}
