import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-element-value-dialog',
  templateUrl: './edit-element-value-dialog.component.html',
  styleUrls: ['./edit-element-value-dialog.component.css']
})
export class EditElementValueDialogComponent implements OnInit {
  editForm: FormGroup;
  positions: { position: string; description_p: string }[] = [];
  hidePositionFields: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditElementValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.positions = data.positions;
    this.hidePositionFields = data.elementnumber === 24 || data.elementnumber === 25;
    this.editForm = this.fb.group({
      id: [data.id],
      elementnumber: [data.elementnumber, Validators.required],
      position: [data.position, this.hidePositionFields ? [] : Validators.required],
      description_p: [{ value: data.description_p, disabled: this.hidePositionFields }, this.hidePositionFields ? [] : Validators.required],
      code: [data.code, Validators.required],
      description_c: [data.description_c, Validators.required],
      in_message: [data.in_message],
      nomprotocole: [data.nomprotocole],
      service: [data.service],
      servicecode: [data.servicecode]
    });
  }

  ngOnInit(): void {
    if (!this.hidePositionFields) {
      this.editForm.get('position')?.valueChanges.subscribe(value => {
        const selectedPosition = this.positions.find(p => p.position === value);
        if (selectedPosition) {
          this.editForm.get('description_p')?.setValue(selectedPosition.description_p);
        }
      });
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    if (this.editForm.valid) {

      const result = {
        ...this.editForm.getRawValue(),
        position: this.data.position,
        description_p: this.data.description_p
      };
      this.dialogRef.close(result);
    }
  }
}
