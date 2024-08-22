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
  isSpecialElementNumber: boolean = false;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditElementValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.positions = data.positions;
    this.isSpecialElementNumber = [48, 55, 61, 62, 127].includes(data.elementnumber);
    this.hidePositionFields = data.elementnumber === 24 || data.elementnumber === 25 || data.elementnumber === 39;

    if (this.isSpecialElementNumber) {
      this.editForm = this.fb.group({
        tag: [data.tag, Validators.required],
        nom: [data.nom],
        format: [data.format],
        longueur: [data.longueur],
        description: [data.description, Validators.required]
      });
    } else {
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
  }

  ngOnInit(): void {
    if (!this.hidePositionFields && !this.isSpecialElementNumber) {
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
      this.dialogRef.close(this.editForm.getRawValue());
    }
  }
}
