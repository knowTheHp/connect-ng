import { Injectable } from "@angular/core";
import { Http, RequestOptions, Headers, Response } from "@angular/http";
import { tokenNotExpired, JwtHelper } from "angular2-jwt";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";
import { User } from "../_models/User";

@Injectable()
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();
  currentUser: User;
  private photoUrl = new BehaviorSubject<string>("../../assets/user.png");
  currentPhotoUrl = this.photoUrl.asObservable();

  constructor(private http: Http) {}

  //register service
  register(user: User) {
    return this.http
      .post(this.baseUrl + "register", user, this.requestHeaderOptions())
      .catch(this.handleError);
  }

  //update user photo
  changeUserPhoto(photoUrl: string) {
    this.photoUrl.next(photoUrl);
  }

  //login service
  login(loginModel: any) {
    return this.http
      .post(this.baseUrl + "login", loginModel, this.requestHeaderOptions())
      .map((response: Response) => {
        const user = response.json();
        console.log(user);
        if (user) {
          localStorage.setItem("token", user.tokenString);
          localStorage.setItem("user", JSON.stringify(user.userDto));
          this.currentUser = user.userDto;
          this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
          if (this.currentUser.photoUrl != null) {
            this.changeUserPhoto(this.currentUser.photoUrl);
          } else {
            this.changeUserPhoto("../../assets/user.png");
          }
        }
      })
      .catch(this.handleError);
  }

  //loggedIn
  loggedIn() {
    return tokenNotExpired("token");
  }

  //header options
  private requestHeaderOptions() {
    const headers = new Headers({
      "Content-type": "application/json"
    });
    return new RequestOptions({ headers: headers });
  }

  //handle api errors
  private handleError(error: any) {
    //application error
    const applicationError = error.headers.get("Application-Error");
    if (applicationError) return Observable.throw(applicationError);
    //server error
    const serverError = error.json();
    let modelStateErrors = "";
    if (serverError) {
      for (let key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + "\n";
        }
      }
    }
    return Observable.throw(modelStateErrors || "Server error");
  }
}
