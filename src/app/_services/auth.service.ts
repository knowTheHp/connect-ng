import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {
  baseUrl = "http://localhost:5000/api/auth/";
  userToken: any;
  decodedToken: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) {
  }

  //register service
  register(registerModel: any) {
    return this.http.post(this.baseUrl + 'register', registerModel, this.requestHeaderOptions()).catch(this.handleError);
  }

  //login service
  login(loginModel: any) {
    return this.http.post(this.baseUrl + 'login', loginModel, this.requestHeaderOptions()).map((response: Response) => {
      const user = response.json();
      if (user) {
        localStorage.setItem('token', user.tokenString);
        this.decodedToken = this.jwtHelper.decodeToken(user.tokenString);
        console.log(this.decodedToken);
        this.userToken = user.tokenString;
      }
    }).catch(this.handleError);
  }

  //loggedIn
  loggedIn() {
    return tokenNotExpired('token');
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
    const applicationError = error.headers.get('Application-Error');
    if (applicationError) return Observable.throw(applicationError);
    //server error
    const serverError = error.json();
    let modelStateErrors = '';
    if (serverError) {
      for (let key in serverError) {
        if (serverError[key]) {
          modelStateErrors += serverError[key] + '\n';
        }
      }
    }
    return Observable.throw(
      modelStateErrors || 'Server error'
    );
  }
}