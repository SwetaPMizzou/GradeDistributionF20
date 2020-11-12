import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "src/app/services/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
loginFormGroup: FormGroup;
  registerFormGroup: FormGroup;
  constructor(
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.loginFormGroup = new FormGroup(
      {
        email: new FormControl(""),
        password: new FormControl("")
      },
      Validators.required
    );

    this.registerFormGroup = new FormGroup(
      {
        name: new FormControl(""),
        email: new FormControl("", Validators.email),
        password: new FormControl("", Validators.minLength(8))
      },
      Validators.required
    );
  }

  ngOnInit(): void {
  }

  login() {
    if (this.loginFormGroup.valid) {
      this.authService.login(
        this.loginFormGroup.get("email").value,
        this.loginFormGroup.get("password").value
      ).then(result => {
        if (result) {
          this.router.navigate([""]);
        }
        else {
          this.snackBar.open("Unable to login", null, { duration: 4000 });
        }
      }).catch(err => {
        this.snackBar.open("Unable to login", null, { duration: 4000 });
      });
    }
  }

  async register() {
    if (this.registerFormGroup.valid) {
      this.authService.signUp(
        this.registerFormGroup.get("email").value,
        this.registerFormGroup.get("password").value,
        this.registerFormGroup.get("name").value
      ).then(result => {
        this.router.navigate([""]);
      }).catch(err => {
        this.snackBar.open("Unable to register", null, { duration: 4000 });  
      }); 
    }
  }
}
