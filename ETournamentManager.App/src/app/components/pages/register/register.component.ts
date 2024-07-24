import { Component } from '@angular/core';

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
  roleName: 'TOURNAMENT_CREATOR' | 'TOURNAMENT_PARTICIPANT' = 'TOURNAMENT_PARTICIPANT';
  errorMessage: string = '';

  onFormChanged({ email, username, password, repeatPassword }: { email: string; username: string; password: string; repeatPassword: string }) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.repeatPassword = repeatPassword;
  }

  onRegisterClick() {
    this.errorMessage = '';

    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Password missmatch!';
      return;
    }
  }
}
