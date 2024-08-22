import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'app-update-requirement-dialog',
  templateUrl: './update-requirement-dialog.component.html',
  styleUrls: ['./update-requirement-dialog.component.css']
})
export class UpdateRequirementDialogComponent {
  newValue: string;

  constructor(
    public dialogRef: MatDialogRef<UpdateRequirementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {
    this.newValue = data.specificAttributeValue;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    const url = `http://localhost:8080/update?elementNumber=${this.data.elementNumber}&attributeName=specificAttributeValue&newValue=${this.newValue}`;
    this.http.put(url, {}).subscribe(
      () => {
        console.log('Update successful');
        this.dialogRef.close({ newValue: this.newValue });
      },
      error => {
        console.error('Update failed', error);
      }
    );
  }
}
