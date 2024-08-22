import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public loginFormGroup!: FormGroup;
  hide = true;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email, this.emailDomainValidator]),
      name: this.fb.control('', [Validators.required]),
      password: this.fb.control('', )
    });
  }

  emailDomainValidator(control: AbstractControl): { [key: string]: any } | null {
    const email: string = control.value;
    const domain = email.substring(email.lastIndexOf('@') + 1);
    if (domain !== 'hps-worldwide.com') {
      return { 'emailDomain': true };
    }
    return null;
  }

  register() {
    if (this.loginFormGroup.valid) {
      this.authService.createUser(this.loginFormGroup.value).subscribe(res => {
        this.snackBar.open('Account Created, Access Pending Administrator Approval!', 'Dismiss', {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "bottom"
        });
      }, error => {
        this.snackBar.open('Something Went Wrong!', 'Dismiss', {
          duration: 5000,
          horizontalPosition: "center",
          verticalPosition: "bottom"
        });
      });
    } else {
      this.snackBar.open('Please enter a valid email address with @hps-worldwide.com domain!', 'Dismiss', {
        duration: 5000,
        horizontalPosition: "center",
        verticalPosition: "bottom"
      });
    }
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}
