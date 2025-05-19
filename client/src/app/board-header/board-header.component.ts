import { Component, inject, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon'
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { StateService } from '../state.service';


@Component({
  selector: 'board-header',
  imports: [MatIconModule, MatButtonModule, MatToolbarModule],
  templateUrl: './board-header.component.html',
  styleUrl: './board-header.component.css'
})

export class BoardHeaderComponent {

  state = inject(StateService)
  username = this.state.username
  boardName = this.state.currentBoard?.name ?? 'UNKNOWN BOARD'

}
