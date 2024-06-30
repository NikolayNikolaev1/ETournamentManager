import { Component, EventEmitter, Output } from '@angular/core';
import { ApiService } from 'services/api.service';

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
    console.log(this.username, this.password);
    this.apiService.login(this.username, this.password).subscribe((response) => {
      localStorage.setItem('token', response.token);
    });
  }
}
