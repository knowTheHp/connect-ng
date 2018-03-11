import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../_models/User';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from '../../../_services/alertify.service';
import { NgForm } from '@angular/forms';
import { UserService } from '../../../_services/user.service';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  @ViewChild('editForm') editForm: NgForm;

  constructor(private route: ActivatedRoute, private alertify: AlertifyService, private userService: UserService, private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    });
  }

  updateUser() {
    this.userService.updateUser(this.authService.decodedToken.nameid, this.user)
      .subscribe(next => {
        this.alertify.success('profile updated successfuly');
        this.editForm.reset(this.user);
      }, error => {
        this.alertify.error(error);
      });
  }

}
