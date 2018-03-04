import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/observable';
import { User } from '../_models/User';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class UserService {
  baseUrl = environment.apiUrl;
  constructor(private authHttp: AuthHttp) { }

  getUsers(): Observable<User[]> {
    return this.authHttp.get(this.baseUrl + 'user')
      .map(response => <User[]>response.json())
      .catch(this.handleError);
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
