import { Component, Input, Output, EventEmitter, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import type { Note } from '../note';
import { StateService } from '../state.service';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';

@Component({
  selector: 'note',
  imports: [
    CommonModule, FormsModule,
    MatMenuModule
  ],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})

export class NoteComponent {
  @Input() note!: Note
  state = inject(StateService)

  onEdit: boolean = false

  get style(): string {
    return `height: 60px; resize: none; ${this.onEdit ? '' : 'pointer-events:none; margin-top:6px;'}`
  }

  setEditable(){
    this.onEdit = true
  }

  applyChanges(){
    this.onEdit = false
  }


  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger
  menuPosition = {x: '0', y: '0'}

  onContextMenu(event: MouseEvent){
    console.log('note context!!!', this.menuTrigger)
    event.preventDefault()
    event.stopPropagation()
    this.menuPosition.x = event.clientX + 'px'
    this.menuPosition.y = event.clientY + 'px'
    this.menuTrigger.openMenu()
  }

  remove(){
    console.log('DELTE NOTE')
    this.state.removeNote(this.note)
  }
}
