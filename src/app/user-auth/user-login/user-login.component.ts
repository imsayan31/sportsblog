import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { UserAuthService } from "../user-auth.service";
/* import { EventEmitter } from "events"; */
/* import { UserForgotPasswordComponent } from "../user-forgot-password/user-forgot-password.component"; */
/* import { UserSignUpComponent } from "../user-sign-up/user-sign-up.component"; */

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
  @Output() showforgotPass = new EventEmitter<boolean>();
  showPasswordVal = true;
  //@Output() showSignUp = new EventEmitter();
  loginForm: FormGroup;
  loginFormData: any;
  constructor(
    public dialogData: MatDialog,
    public dialogRef: MatDialogRef<UserLoginComponent>,
    private userAuthService: UserAuthService
  ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      user_email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      user_password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  closeModal() {
    //this.userAuthService.closeLoginModal();
    this.dialogRef.close();
  }

  openForgotPassword() {
    this.showforgotPass.emit(this.showPasswordVal);
  }

  onLoginSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.loginFormData = {
      email: this.loginForm.value.user_email,
      password: this.loginForm.value.user_password,
    };
    this.userAuthService.userLoginFunc(this.loginFormData).subscribe(
      (userSuccess) => {
        console.log(userSuccess);
        this.userAuthService.setToken(userSuccess.token);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
