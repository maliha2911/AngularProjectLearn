import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string | null = null;
  public username: string = '';


  login(user: { username: string; password: string }): Promise<boolean> {
    return fetch('/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.accessToken) {
          this.token = data.accessToken;
          localStorage.setItem('authToken', data.accessToken);
          return this.fetchUserDetails();
        }
        return false;
      })
      .catch(error => {
        console.error("Login Error:", error);
        return false;
      });
  }

  fetchUserDetails(): Promise<boolean> {
    if (!this.token) return Promise.resolve(false);

    return fetch('/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${this.token}`
      },
      credentials: 'include'
    })
      .then(response => response.json())
      .then(data => {
        if (data.username) {
          this.username = data.username;
          return true;
        }
        return false;
      })
      .catch(error => {
        console.error("User Details Error:", error);
        return false;
      });
  }

  logout(): void {
    this.token = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('isLoggedIn');
    console.log("Logged out due to inactivity");

  }
}
