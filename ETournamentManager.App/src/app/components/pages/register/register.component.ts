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

  onRegisterClick(registerModel: { email: string; username: string; passowrd: string; repeatPassword: string }) {
    console.log(registerModel)
  }
}
