import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface ProtocoleDialogData {
  id: number;
  nomprotocole: string;
  description: string;
  version: string;
}

@Component({
  selector: 'app-add-protocole-dialog',
  templateUrl: './add-protocole-dialog.component.html',
  styleUrls: ['./add-protocole-dialog.component.css']
})
export class AddProtocoleDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddProtocoleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ProtocoleDialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
