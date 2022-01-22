import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  templateUrl: './drop-out-dialog.component.html',
})
export class DropOutDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DropOutDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  onStay(): void {
    this.dialogRef.close(false);
  }

  onLeave(): void {
    this.dialogRef.close(true);
  }
}
