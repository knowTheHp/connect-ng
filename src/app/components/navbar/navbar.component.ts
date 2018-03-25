import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../_services/auth.service";
import { AlertifyService } from "../../_services/alertify.service";

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"]
})
export class NavbarComponent implements OnInit {
  userLoginModel: any = {};
  photoUrl: string;
  constructor(
    public authService: AuthService,
    private alertify: AlertifyService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => {
      this.photoUrl = photoUrl;
    });
  }

  loginUser() {
    this.authService.login(this.userLoginModel).subscribe(
      data => {
        this.alertify.success("logged in successfully");
      },
      error => {
        this.alertify.error("failed to login");
      },
      () => {
        this.router.navigate(["/user/edit"]);
      }
    );
  }

  logoutUser() {
    this.authService.userToken = null;
    this.authService.currentUser = null;

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.alertify.message("logged out");
  }

  //check if user is loggedin
  loggedIn() {
    return this.authService.loggedIn();
  }
}
