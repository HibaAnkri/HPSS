import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-element-value-dialog',
  templateUrl: './add-element-value-dialog.component.html',
  styleUrls: ['./add-element-value-dialog.component.css']
})
export class AddElementValueDialogComponent implements OnInit {
  addElementValueForm: FormGroup;
  errorMessage: string | null = null;
  hidePositionFields: boolean;

  constructor(
    public dialogRef: MatDialogRef<AddElementValueDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.hidePositionFields = this.data.elementnumber === 24 || this.data.elementnumber === 25;

    this.addElementValueForm = this.fb.group({
      position: [{ value: '', disabled: this.hidePositionFields }, Validators.required],
      description_p: [{ value: '', disabled: this.hidePositionFields }, Validators.required],
      code: ['', Validators.required],
      description_c: ['', Validators.required],
      nomprotocole: [{ value: data.nomprotocole, disabled: true }]
    });
  }

  ngOnInit(): void {
    if (!this.hidePositionFields) {
      this.addElementValueForm.get('position')?.valueChanges.subscribe((position) => {
        const description = this.data.positions.find((p: any) => p.position === position)?.description_p;
        this.addElementValueForm.patchValue({ description_p: description || '' });
      });
    }
  }

  onSubmit(): void {
    if (this.addElementValueForm.valid) {
      const formData = this.addElementValueForm.getRawValue();
      this.checkIfCodeExists(formData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  private checkIfCodeExists(formData: any): void {
    const url = `http://localhost:8080/api/element-values/check-exists?elementnumber=${this.data.elementnumber}&position=${formData.position}&code=${formData.code}`;
    this.http.get<boolean>(url).subscribe({
      next: (exists) => {
        if (exists) {
          this.errorMessage = 'Code already exists for the given position';
        } else {
          this.dialogRef.close(formData);
        }
      },
      error: (err) => {
        console.error('Error checking if code exists:', err);
        this.errorMessage = 'An error occurred while checking the code';
      }
    });
  }
}
