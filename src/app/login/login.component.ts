import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})


export class LoginComponent {

  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router, private authService: AuthService) {
  }

  login() {
    this.authService.login({
      username: this.username,
      password: this.password
    }).then(isLoggedIn => localStorage.setItem('isLoggedIn', String(isLoggedIn)))
    if (localStorage.getItem('isLoggedIn') === 'true') {
      this.router.navigate(['/products']).then(success => {
        if (success) {
          console.log('Navigation to dashboard was successful');
        } else {
          console.error('Navigation to dashboard failed');
        }
      });
    } else {
      this.errorMessage = 'Invalid username or password';
    }
  }
}

