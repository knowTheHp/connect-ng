import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerButtonClicked = false;
  constructor(private http: Http) { }

  ngOnInit() {
  }

  registerFormToggle() {
    this.registerButtonClicked = true;
  }

  cancelRegistration(cancelRegister: boolean) {
    this.registerButtonClicked = cancelRegister;
  }
}
