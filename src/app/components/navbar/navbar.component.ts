import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  userLoginModel: any = {};
  constructor(public authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  loginUser() {
    this.authService.login(this.userLoginModel).subscribe(data => {
      this.alertify.success('logged in successfully');
    }, error => {
      this.alertify.error('failed to login');
    }, () => {
      this.router.navigate(['/users']);
    });
  }

  logoutUser() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('logged out');
  }

  //check if user is loggedin
  loggedIn() {
    return this.authService.loggedIn();
  }
}
