import { Board } from '../board';
import { Deck } from '../deck';
import { Note } from '../note';
import { StateService } from '../state.service';
import { Component, inject, Input, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DeckComponent } from '../deck/deck.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card'
import { RouterModule} from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop'

@Component({
  selector: 'board',
  imports: [DeckComponent, CdkDropList, CdkDrag, MatCardModule, MatButtonModule, RouterModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})

export class BoardComponent {

  service = inject(StateService)

  get name() { return this.service.selectBoard.name }
  get board() {
    if(!this.service.currentBoard){
      return { decks: [] }
    }
    return this.service.currentBoard
  }


  addNewNote(deck: Deck){
    const note: Note = {
      id: '0000',
      title: 'new note',
      content: ''
    }
    deck.notes.push(note)
  }

  handleDelete(note: Note){
    console.log('TO DELETE: ', note)
  }

  connectedDropLists(currentId: string): string[] {
    return this.board!.decks.map(deck => deck.id).filter(id => id !== currentId)
  }

  onDrop(event: CdkDragDrop<any[]>){
    if(event.previousContainer === event.container){
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    }
    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      )
    }
    this.service.updateCurrentBoard()
  }

  onDeckDrop(event: CdkDragDrop<Deck[]>){
    moveItemInArray(this.board!.decks, event.previousIndex, event.currentIndex)
    this.service.updateCurrentBoard()
  }
}
