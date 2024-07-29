import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { TOKEN_KEY_NAME } from 'app/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  onFormChange({ username, password }: any) {
    this.username = username;
    this.password = password;
  }

  onLogin() {
    this.errorMessage = '';
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        localStorage.setItem(TOKEN_KEY_NAME, response.token);
        this.authService.getUserProfile();
        this.router.navigate(['/']);
      },
      error: (error) => (this.errorMessage = error),
    });
  }
}
