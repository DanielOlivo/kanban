import { Component, inject, OnInit } from '@angular/core';
import { BoardHeaderComponent } from '../board-header/board-header.component';
import { BoardComponent } from '../board/board.component';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../state.service';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-board-page',
  imports: [BoardComponent, MatSidenavModule, MatToolbarModule,
    MatIconModule, MatButtonModule, RouterLink
  ],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.css'
})

export class BoardPageComponent implements OnInit {

  get board() { return this.service.currentBoard }
  get username(){ return this.service.username }

  constructor(
    private route: ActivatedRoute,
    private service: StateService
  ){
    console.log('BoardComponent constructor')
  }

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = this.route.snapshot.paramMap.get('id')
      console.log('BOARD to load is ', id)
      if(id)
        this.service.fetchBoard(id)
    })
  }

  logout(){

  }
}
