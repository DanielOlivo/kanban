import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Note } from '../note';
import { NoteMenuComponent } from '../note-menu/note-menu.component';

@Component({
  selector: 'note',
  imports: [CommonModule, FormsModule, NoteMenuComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})

export class NoteComponent {
  @Input() note: Note = { id: '0', title: '', content: ''}
  @Output() delete = new EventEmitter<Note>()

  onEdit: boolean = false

  get style(): string {
    return `height: 60px; resize: none; ${this.onEdit ? '' : 'pointer-events:none; margin-top:6px;'}`
  }


  menuOpen = false
  menuX = 0
  menuY = 0
  openMenu(event: MouseEvent, note: Note){
    event.preventDefault()
    this.menuOpen = true
    this.menuX = event.clientX
    this.menuY = event.clientY
  }

  onDelete(){
    this.delete.emit(this.note)
  }

  setEditable(){
    this.onEdit = true
  }

  applyChanges(){
    this.onEdit = false
  }
}
