import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

export interface EditDeckDialog {
  name: string
  color: string
}

@Component({
  selector: 'app-edit-deck-dialog',
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
  templateUrl: './edit-deck-dialog.component.html',
  styleUrl: './edit-deck-dialog.component.css'
})

export class EditDeckDialogComponent {
  readonly dialogRef = inject(MatDialogRef<EditDeckDialogComponent>)
  readonly data = inject<EditDeckDialog>(MAT_DIALOG_DATA)

  readonly name = model(this.data.name)
  readonly color = model(this.data.color)

  onApply(): void {
    this.dialogRef.close({
      name: this.name(),
      color: this.color()
    })
  }

  onNoClick(): void {
    this.dialogRef.close()
  }
}
