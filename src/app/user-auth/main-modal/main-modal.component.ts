import { Component, OnInit } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material";

@Component({
  selector: "app-main-modal",
  templateUrl: "./main-modal.component.html",
  styleUrls: ["./main-modal.component.css"],
})
export class MainModalComponent implements OnInit {
  showLogin: boolean = true;
  showSignUp: boolean = false;
  showforgotPass: boolean = false;
  modalHeading: string = "Login";
  constructor(private dialogRef: MatDialogRef<MainModalComponent>) {}

  ngOnInit() {}

  closeModal() {
    this.dialogRef.close();
  }

  showLoginModal() {
    this.modalHeading = "Login";
    this.showLogin = true;
    this.showforgotPass = false;
    this.showSignUp = false;
  }

  showCreateAccountModal() {
    this.modalHeading = "Create Account";
    this.showLogin = false;
    this.showforgotPass = false;
    this.showSignUp = true;
  }

  showForgotPasswordModal() {
    this.modalHeading = "Forgot Password";
    this.showLogin = false;
    this.showforgotPass = true;
    this.showSignUp = false;
  }
}
