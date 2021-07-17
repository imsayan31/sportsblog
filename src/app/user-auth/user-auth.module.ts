import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UserSignUpComponent } from "./user-sign-up/user-sign-up.component";
import { UserLoginComponent } from "./user-login/user-login.component";
import { UserForgotPasswordComponent } from "./user-forgot-password/user-forgot-password.component";
import {
  MatButtonModule,
  MatIconModule,
  MatInputModule,
} from "@angular/material";
import { ReactiveFormsModule } from "@angular/forms";
import { MainModalComponent } from "./main-modal/main-modal.component";

@NgModule({
  declarations: [
    UserSignUpComponent,
    UserLoginComponent,
    UserForgotPasswordComponent,
    MainModalComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  entryComponents: [
    UserLoginComponent,
    UserSignUpComponent,
    UserForgotPasswordComponent,
    MainModalComponent,
  ],
  providers: [],
})
export class UserAuthModule {}
