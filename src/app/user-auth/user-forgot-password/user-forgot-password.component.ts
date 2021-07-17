import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { UserLoginComponent } from "../user-login/user-login.component";

@Component({
  selector: "app-user-forgot-password",
  templateUrl: "./user-forgot-password.component.html",
  styleUrls: ["./user-forgot-password.component.css"],
})
export class UserForgotPasswordComponent implements OnInit {
  forgotPassForm: FormGroup;
  constructor(
    public dialogData: MatDialog,
    public dialogRef: MatDialogRef<UserForgotPasswordComponent>
  ) {}

  ngOnInit() {
    this.forgotPassForm = new FormGroup({
      user_email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
    });
  }

  closeModal() {
    //this.dialogRef.close();
    //this.userAuthService.closeForgotPasswordModal();
  }

  /* openLogin() {
    this.closeModal();
    this.dialogData.open(UserLoginComponent, {
      width: "650px",
      // hasBackdrop: false,
      position: {
        top: "10%",
        right: "30%",
      },
    });
    //this.userAuthService.openLoginModal();
  } */
}
