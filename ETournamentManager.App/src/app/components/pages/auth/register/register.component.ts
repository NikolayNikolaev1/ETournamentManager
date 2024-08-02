import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import {
  PASSWORD_LENGTH_ERROR,
  PASSWORD_MISSMATCH_ERROR,
  SERVER_ROUTES,
  TOKEN_KEY_NAME,
} from 'app/utils/constants';

import { REGISTER_FORM_MODEL, REGISTER_REQUEST_BODY, UserRoles } from './register.configuration';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  repeatPassword: string = '';
  roleName: UserRoles = UserRoles.TournamentParticipant;
  errorMessage: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  onFormChanged({ email, username, password, repeatPassword }: REGISTER_FORM_MODEL) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.repeatPassword = repeatPassword;
  }

  onRoleChange() {
    this.roleName =
      this.roleName === UserRoles.TournamentCreator
        ? UserRoles.TournamentParticipant
        : UserRoles.TournamentCreator;
  }

  onRegisterClick() {
    this.errorMessage = '';

    if (this.password !== this.repeatPassword) {
      this.errorMessage = PASSWORD_MISSMATCH_ERROR;
      return;
    }

    if (this.password.length < 6) {
      this.errorMessage = PASSWORD_LENGTH_ERROR;
      return;
    }

    this.apiService
      .request<{ token: string }, REGISTER_REQUEST_BODY>({
        method: 'post',
        url: SERVER_ROUTES.AUTH.REGISTER,
        body: {
          userName: this.username,
          email: this.email,
          password: this.password,
          roleName: this.roleName,
        },
      })
      .subscribe({
        next: (response) => {
          localStorage.setItem(TOKEN_KEY_NAME, response.token);
          this.authService.getUserProfile();
          this.router.navigate(['/']);
        },
        error: (error) => (this.errorMessage = error),
      });
  }
}
