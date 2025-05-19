import { Component, inject, Input } from '@angular/core';
import { NoteComponent } from '../note/note.component';
import { MatCardModule } from '@angular/material/card';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList
} from '@angular/cdk/drag-drop'
import { Deck } from '../deck';
import { Note } from '../note';
import { StateService } from '../state.service';

@Component({
  selector: 'deck',
  imports: [NoteComponent, MatCardModule, CdkDropList, CdkDrag ],
  templateUrl: './deck.component.html',
  styleUrl: './deck.component.css'
})

export class DeckComponent {

  service = inject(StateService)

  @Input() deck: Deck = {id: '0', title: 'Deck', notes: []}
  @Input() connectedDropLists!: (id: string) => string[]
  @Input() onDrop!: (event: CdkDragDrop<any[]>) => void

  handleDelete(note: Note){
    this.service.removeNote(this.deck, note.id)
  }

  addNewNote(){
    this.service.addNote(this.deck)
  }
}
