import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Note } from '../note';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule} from '@angular/material/list'
import { MatButtonModule } from '@angular/material/button'

@Component({
  selector: 'note-menu',
  imports: [CommonModule, MatCardModule,  MatListModule, MatButtonModule],
  templateUrl: './note-menu.component.html',
  styleUrl: './note-menu.component.css'
})

export class NoteMenuComponent {
  @Input() x = 0
  @Input() y = 0
  @Input() note!: Note
  @Output() delete = new EventEmitter<void>()
  @Output() close = new EventEmitter<void>()
}
