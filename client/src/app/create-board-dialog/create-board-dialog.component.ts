import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogModule, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface CreateBoardDialog {
  name: string
}

@Component({
  selector: 'create-board-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose

  ],
  templateUrl: './create-board-dialog.component.html',
  styleUrl: './create-board-dialog.component.css'
})

export class CreateBoardDialogComponent {
  readonly dialogRef = inject(MatDialogRef<CreateBoardDialogComponent>)
  readonly data = inject<CreateBoardDialog>(MAT_DIALOG_DATA)
  readonly name = model(this.data.name)

  onNoClick(): void {
    this.dialogRef.close()
  }
}
