import { Component } from '@angular/core';

import { ApiService } from 'app/services/api.service';

import { LOGIN_REQUEST_BODY, LOGIN_RESPONSE_TYPE, LOGIN_ROUTE } from './login.configuraiton';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private apiService: ApiService) {}

  onLogin() {
    this.apiService
      .request<
        LOGIN_RESPONSE_TYPE,
        LOGIN_REQUEST_BODY
      >({ url: LOGIN_ROUTE, method: 'post', body: { username: this.username, password: this.password } })
      .subscribe((response) => localStorage.setItem('jwt_token', response.token));
  }

  onLogout() {
    localStorage.removeItem('jwt_token');
  }
}
