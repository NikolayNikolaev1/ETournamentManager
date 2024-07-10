import { Component } from '@angular/core';

import { ApiService } from 'app/services/api.service';
import { TOKEN_KEY_NAME } from 'app/utils/constants';

import { LOGIN_REQUEST_BODY, LOGIN_RESPONSE_TYPE, LOGIN_ROUTE } from './login.configuraiton';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  onLogin() {
    this.authService.login(this.username, this.password);
  }
}
