import { Resolve, ActivatedRouteSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Injectable } from "@angular/core";
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

import { User } from "../_models/User";

import { UserService } from "../_services/user.service";
import { AlertifyService } from "../_services/alertify.service";

@Injectable()
export class UserResolver implements Resolve<User> {
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService) { }

    resolve(route: ActivatedRouteSnapshot): User | Observable<User> | Promise<User> {
        return this.userService.getUser(route.params['id'])
            .catch(error => {
                this.alertify.error(error);
                this.router.navigate(['/users']);
                return Observable.of(null);
            });
    }
}
