import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { User } from '../_models/User';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private http: Http) { }

  getUsers(): Observable<User[]> {
    return this.http.get(this.baseUrl + 'user', this.jwt())
      .map(response => <User[]>response.json())
      .catch(this.handleError);
  }

  //get token
  private jwt() {
    let token = localStorage.getItem('token');
    if (token) {
      let headers = new Headers({ 'Authorization': 'Bearer ' + token });
      headers.append('Content-type', 'application/json');
      return new RequestOptions({ headers: headers });
    }
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
