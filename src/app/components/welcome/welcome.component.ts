import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {

  login = new FormControl();
  password = new FormControl();
  isLoginMessageVisible = false;

  constructor(private router: Router) {}

  onLoginClick() {

    if (this.login.value === 'test' && this.password.value === '1234') {
      console.log(this.login.value + ' ' + this.password.value);
      this.isLoginMessageVisible = false;
      this.router.navigate(['/home']);
    } else {
      this.isLoginMessageVisible = true;
    }
  }
}
