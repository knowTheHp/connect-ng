import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authSerivice: AuthService, private router: Router, private alertify: AlertifyService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authSerivice.loggedIn()) {
      return true;
    }
    // this.alertify.error('You need to be logged in.');
    this.router.navigate(['/home']);
    return false;
  }
}
