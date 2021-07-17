import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
/* import { UserLoginComponent } from "../user-login/user-login.component"; */

@Component({
  selector: "app-user-sign-up",
  templateUrl: "./user-sign-up.component.html",
  styleUrls: ["./user-sign-up.component.css"],
})
export class UserSignUpComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(
    public dialogData: MatDialog,
    public dialogRef: MatDialogRef<UserSignUpComponent>
  ) {}

  ngOnInit() {
    this.signUpForm = new FormGroup({
      first_name: new FormControl(null, {
        validators: [Validators.required, Validators.pattern("^[a-zA-Z]+$")],
      }),
      last_name: new FormControl(null, {
        validators: [Validators.required, Validators.pattern("^[a-zA-Z]+$")],
      }),
      email: new FormControl(null, {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            // "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$"
            "/^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/"
          ),
        ],
      }),
      confirm_password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  closeModal() {
    //this.userAuthService.closeSignUpModal();
    //this.dialogRef.close();
  }

  openLogin() {
    //this.closeModal();
    /* this.dialogData.open(UserLoginComponent, {
      width: "650px",
      // hasBackdrop: false,
      position: {
        top: "10%",
        right: "30%",
      },
    }); */
    //this.userAuthService.openLoginModal();
  }
}
