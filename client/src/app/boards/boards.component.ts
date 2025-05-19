import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'boards',
  imports: [RouterLink, MatListModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css'
})

export class BoardsComponent {
  state = inject(StateService)

  get boards() { return this.state.boards }

  constructor(){
    console.log('ids ', this.boards.map(b => b.id))
  }
}
