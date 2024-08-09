import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ProtocoleDialogData {
  id: number;
  nomprotocole: string;
  description: string;
  version: string;
}

@Component({
  selector: 'app-edit-protocole-dialog',
  templateUrl: './edit-protocole-dialog.component.html',
  styleUrls: ['./edit-protocole-dialog.component.css']
})
export class EditProtocoleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditProtocoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocoleDialogData
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.data);
  }
}
