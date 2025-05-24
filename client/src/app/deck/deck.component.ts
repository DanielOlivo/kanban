import { v4 as uuid } from 'uuid'
import { Component, ElementRef, inject, Input, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu'

import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop'
import type { Deck } from '../deck';
import type { Note } from '../note';
import { StateService } from '../state.service';

@Component({
  selector: 'deck',
  imports: [
    NoteComponent, MatCardModule, CdkDropList, CdkDrag,
    MatMenuModule
  ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})

export class DeckComponent {

  private service = inject(StateService)

  @Input() deck!: Deck
  // @Input() connectedDropLists!: (id: string) => string[]
  @Input() connectedDropLists!: string[]
  @Input() onDrop!: (event: CdkDragDrop<any[]>) => void

  onNoteDrop(event: CdkDragDrop<any[]>){
    if(event.previousContainer !== event.container){
      this.onDrop(event)
      return
    }
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex,)
    this.service.updateCurrentBoard()
  }

  // handleDelete(note: Note){
  //   this.service.removeNote(this.deck, note.id)
  // }

  textareas: number[] = []
  @ViewChildren('noteTextArea') noteAreaRefs!: QueryList<ElementRef>

  async addNewNote(){
    await this.service.addNote(this.deck)

    setTimeout(() => {
      const last = this.noteAreaRefs.last;
      last?.nativeElement.focus()
    }, 100)

    // notify service
  }

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger
  menuPosition = { x: '0', y: '0'}

  onContextMenu(event: MouseEvent){
    event.preventDefault() 
    // event.stopPropagation()
    this.menuPosition.x = event.clientX + 'px'
    this.menuPosition.y = event.clientY + 'px'
    this.contextMenu.openMenu()
  }

  removeDeck(){
    // console.log('DELETE ME') 
    this.service.removeDeck(this.deck)
  }
}
