import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AlertifyService } from '../../_services/alertify.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupModel: any = {};
  @Output() resetForm = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  registerUser() {
    this.authService.register(this.signupModel).subscribe(() => {
      this.alertify.success('registration successful');
      this.resetForm.emit(false);
    }, error => {
      this.alertify.error(error);
    });
  }

  cancelRegistration() {
    this.resetForm.emit(false);
  }
}
