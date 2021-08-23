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
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserAuthInterceptor } from "./user-auth-interceptor";

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
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: UserAuthInterceptor, multi: true },
  ],
})
export class UserAuthModule {}
