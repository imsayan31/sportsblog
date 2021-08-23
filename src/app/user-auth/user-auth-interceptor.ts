import {
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserAuthService } from "./user-auth.service";

@Injectable()
export class UserAuthInterceptor implements HttpInterceptor {
  constructor(public userAuthService: UserAuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.userAuthService.getToken();
    const authRequest = req.clone({
      headers: req.headers.set("Authorization", "Bearer " + authToken),
    });
    return next.handle(authRequest);
  }
}
