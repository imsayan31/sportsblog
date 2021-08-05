import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { UserForgotPasswordComponent } from "./user-forgot-password/user-forgot-password.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserSignUpComponent } from "./user-sign-up/user-sign-up.component";

@Injectable({
  providedIn: "root",
})
export class UserAuthService {
  public apiURL = environment.apiEndpoint + "user-auth";
  public httpURL: string;
  constructor(private httpClient: HttpClient) {}

  addUser(signUpData) {
    this.httpURL = this.apiURL + "/add-user/";
    /* return this.httpURL; */
    return this.httpClient.post<{ status: number; message: string }>(
      this.httpURL,
      signUpData
    );
  }
}
