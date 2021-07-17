import { Injectable } from "@angular/core";
import { UserForgotPasswordComponent } from "./user-forgot-password/user-forgot-password.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserSignUpComponent } from "./user-sign-up/user-sign-up.component";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  constructor() {}
}
