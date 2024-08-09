// password.component.ts
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent {
  passwordForm: FormGroup;
  hideOldPassword = true;
  hideNewPassword = true;

  constructor(private http: HttpClient, private fb: FormBuilder, private snackBar: MatSnackBar) {
    this.passwordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  changePassword() {
    const oldPassword = this.passwordForm.get('oldPassword')?.value;
    const newPassword = this.passwordForm.get('newPassword')?.value;
    const userId = 1; // Replace with dynamic user ID if needed

    this.http.put(`http://localhost:8080/api/users/${userId}/change-password?oldPassword=${oldPassword}&newPassword=${newPassword}`, {})
      .subscribe(response => {
        this.snackBar.open('Password changed successfully', 'Close', {
          duration: 3000
        });
      }, error => {
        this.snackBar.open('Error changing password', 'Close', {
          duration: 3000
        });
      });
  }
}
