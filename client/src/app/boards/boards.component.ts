import { ChangeDetectionStrategy, Component, inject, signal, ViewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { StateService } from '../state.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu'
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';


import { BoardItem } from '../board';
import { CreateBoardDialogComponent } from '../create-board-dialog/create-board-dialog.component';

@Component({
  selector: 'boards',
  imports: [  RouterLink, MatListModule, MatToolbarModule,
              MatButtonModule, MatIconModule, MatSidenavModule,
              MatMenuModule ],
  templateUrl: './boards.component.html',
  styleUrl: './boards.component.css',
  // changeDetection: ChangeDetectionStrategy.OnPush
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

  @ViewChild(MatMenuTrigger) contextMenu!: MatMenuTrigger
  menuPosition = { x: '0', y: '0'}

  onContextMenu(event: MouseEvent, item: BoardItem){
    event.preventDefault()
    console.log('onContextMenu: ', item, "event", event, 'contextMenu', this.contextMenu)
    this.menuPosition.x = event.clientX + 'px'
    this.menuPosition.y = event.clientY + 'px'
    this.contextMenu.menuData = {'item': item}
    // this.contextMenu.menu?.focusFirstItem('mouse')
    this.contextMenu.openMenu()
  }

  onDeleteClick(item: BoardItem){
    // console.log('to delete', item)
    this.state.removeBoard(item)
  }

  readonly boardName = signal('')
  readonly dialog = inject(MatDialog)

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateBoardDialogComponent, {
      data: { name: this.boardName() }
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log("the dialog was closed")
      if(result && result.length > 0){
        this.boardName.set(result)
        console.log('result', result)
        this.state.createBoard(result)
      }
    })
  }

  createBoard(){
    console.log('create board: ', this.boardName)
  }
}
