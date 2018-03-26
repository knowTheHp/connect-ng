import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { AuthService } from "../../_services/auth.service";
import { AlertifyService } from "../../_services/alertify.service";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { BsDatepickerConfig } from "ngx-bootstrap/datepicker";
import { User } from "../../_models/User";
import { Router } from "@angular/router";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  @Output() resetForm = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(
    private authService: AuthService,
    private alertify: AlertifyService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.bsConfig = {
      containerClass: "theme-dark-blue"
    };

    this.registrationForm();
  }

  //reactive registration form
  registrationForm() {
    this.registerForm = this.formBuilder.group(
      {
        firstname: ["", [Validators.required, Validators.minLength(2)]],
        lastname: ["", [Validators.required, Validators.minLength(2)]],
        username: ["", [Validators.required, Validators.minLength(4)]],
        gender: ["Male"],
        dateOfBirth: [null, Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: [
          "",
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(20)
          ]
        ],
        confirmPassword: ["", [Validators.required]]
      },
      { validator: this.passwordMatchValidator }
    );
  }

  //validate password and confirm password
  passwordMatchValidator(validatePasswordGroup: FormGroup) {
    return validatePasswordGroup.get("password").value ===
      validatePasswordGroup.get("confirmPassword").value
      ? null
      : { mismatch: true };
  }

  registerUser() {
    if (this.registerForm.valid) {
      this.user = Object.assign({}, this.registerForm.value);
      console.log(this.user);

      this.authService.register(this.user).subscribe(
        () => {
          this.alertify.success("registration successful");
        },
        error => {
          this.alertify.error(error);
        },
        () => {
          this.authService.login(this.user).subscribe(() => {
            this.router.navigate(["/users"]);
          });
        }
      );
    }
  }

  cancelRegistration() {
    this.resetForm.emit(false);
  }
}
