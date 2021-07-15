import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-user-login",
  templateUrl: "./user-login.component.html",
  styleUrls: ["./user-login.component.css"],
})
export class UserLoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(public dialogRef: MatDialogRef<UserLoginComponent>) {}

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
    this.dialogRef.close();
  }
}
