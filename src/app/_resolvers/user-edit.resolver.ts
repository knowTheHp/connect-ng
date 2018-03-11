import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from "../_models/User";

import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";

@Injectable()
export class UserEditResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService, private authService: AuthService) { }

    resolve(route: ActivatedRouteSnapshot): User | Observable<User> | Promise<User> {
        return this.userService.getUser(this.authService.decodedToken.nameid)
            .catch(error => {
                this.alertify.error(error);
                this.router.navigate(['/users']);
                return Observable.of(null);
            });
    }
}
