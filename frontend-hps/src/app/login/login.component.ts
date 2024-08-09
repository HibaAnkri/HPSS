import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Route, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  public loginFormGroup! : FormGroup;
  hide = true;
  constructor(private fb : FormBuilder,
              private authService : AuthService,
              private router : Router,
              private snackBar: MatSnackBar) {
  }
  ngOnInit() {
    this.loginFormGroup = this.fb.group({
      email : this.fb.control(''),
      password : this.fb.control('')
    });
  }
  errorMessage: string | undefined;
  login() {

    this.authService.loginUser(this.loginFormGroup.value).subscribe(res=>{
      this.authService.authenticated = true;
      this.authService.loginDate = new Date();
      this.authService.roles = [res.role];
      this.router.navigateByUrl("admin/home");
    }, error=>{
      this.snackBar.open(error.error, 'Dismiss',  {
        duration: 5000, // Duration in milliseconds
        horizontalPosition: "center",
        verticalPosition: "bottom"
      });
    })

  }


  togglePasswordVisibility() {
    this.hide = !this.hide;
  }
}


