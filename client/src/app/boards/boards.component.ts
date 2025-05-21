import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { StateService } from '../state.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'boards',
  imports: [RouterLink, MatListModule, MatToolbarModule, MatButtonModule, MatIconModule, MatSidenavModule],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css'
})

export class BoardsComponent {
  state = inject(StateService)

  get username() { return this.state.username }
  get boards() { return this.state.boards }
  get boardList() { return this.state.boardList }

  constructor(){
    // console.log('ids ', this.boards.map(b => b.id))

    setTimeout(() => {
      this.state.fetchList()
    }, 200)
  }
}
