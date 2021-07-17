import { Component, Input, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
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
  constructor(
    public dialogData: MatDialog,
    public dialogRef: MatDialogRef<UserLoginComponent>
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
    //this.closeModal();
    //this.userAuthService.openForgotPasswordModal();
    /* this.dialogData.open(UserForgotPasswordComponent, {
      width: "650px",
      // hasBackdrop: false,
      position: {
        top: "10%",
        right: "30%",
      },
    }); */
  }

  /* openCreateAccount() {
    this.closeModal();
    //this.userAuthService.openSignUpModal();
    this.dialogData.open(UserSignUpComponent, {
      width: "750px",
      // hasBackdrop: false,
      position: {
        top: "10%",
        right: "25%",
      },
    });
  } */
}
