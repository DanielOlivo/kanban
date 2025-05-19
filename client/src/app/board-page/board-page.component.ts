import { Component, inject } from '@angular/core';
import { BoardHeaderComponent } from '../board-header/board-header.component';
import { BoardComponent } from '../board/board.component';
import { ActivatedRoute } from '@angular/router';
import { StateService } from '../state.service';

@Component({
  selector: 'app-board-page',
  imports: [BoardComponent, BoardHeaderComponent],
  templateUrl: './board-page.component.html',
  styleUrl: './board-page.component.css'
})

export class BoardPageComponent {


  constructor(
    private route: ActivatedRoute,
    private service: StateService
  ){}

  ngOnInit(){
    this.route.paramMap.subscribe(params => {
      const id = params.get('id')
      console.log('id', id, 'if in ', this.service.boards.map(b => b.id))
      this.service.selectBoard(id!)
    })
  }
}
