import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../auth.service";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private router: Router, private authService: AuthService) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then(success => {
      if (success) {
        console.log('Navigation to dashboard was successful');
      } else {
        console.error('Navigation to dashboard failed');
      }
    });
  }

}

