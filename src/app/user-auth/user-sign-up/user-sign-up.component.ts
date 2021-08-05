import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialog, MatDialogRef } from "@angular/material";
import { SpLoaderService } from "src/app/sp-loader/sp-loader.service";
import { UserAuthService } from "../user-auth.service";
/* import { UserLoginComponent } from "../user-login/user-login.component"; */

@Component({
  selector: "app-user-sign-up",
  templateUrl: "./user-sign-up.component.html",
  styleUrls: ["./user-sign-up.component.css"],
})
export class UserSignUpComponent implements OnInit {
  signUpForm: FormGroup;
  signUpFormData: any;
  constructor(
    public dialogData: MatDialog,
    public dialogRef: MatDialogRef<UserSignUpComponent>,
    public userAuthService: UserAuthService,
    private spLoader: SpLoaderService
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
      phone: new FormControl(null, {
        validators: [Validators.required],
      }),
      password: new FormControl(null, {
        validators: [
          Validators.required,
          Validators.minLength(8),
          /* Validators.pattern(
            // "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|]).{8,32}$"
            "/^(?=.*[A-Za-z])(?=.*d)(?=.*[$@$!%*#?&])[A-Za-zd$@$!%*#?&]{8,}$/"
          ), */
        ],
      }),
      confirm_password: new FormControl(null, {
        validators: [Validators.required],
      }),
    });
  }

  onSignUpSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
    this.signUpFormData = {
      first_name: this.signUpForm.value.first_name,
      last_name: this.signUpForm.value.last_name,
      email: this.signUpForm.value.email,
      phone: this.signUpForm.value.phone,
      password: this.signUpForm.value.password,
    };
    this.spLoader.show();
    /* let ss = this.userAuthService.addUser(this.signUpFormData);
    console.log(ss); */
    this.userAuthService.addUser(this.signUpFormData).subscribe(
      (userRegistered) => {
        this.spLoader.hide();
        console.log(userRegistered);
      },
      (userRegError) => {
        this.spLoader.hide();
        console.log(userRegError);
      }
    );
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
