import { Component } from '@angular/core';
import { TOURNAMENT_CREATOR_ROLE, TOURNAMENT_PARTICIPANT_ROLE } from 'app/utils/constants';

enum UserRoles {
  TournamentCreator = TOURNAMENT_CREATOR_ROLE,
  TournamentParticipant = TOURNAMENT_PARTICIPANT_ROLE,
}

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
  on: boolean = true;
  errorMessage: string = '';

  onFormChanged({ email, username, password, repeatPassword }: { email: string; username: string; password: string; repeatPassword: string }) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.repeatPassword = repeatPassword;
  }

  onRoleChange() {
    this.roleName = this.roleName === UserRoles.TournamentCreator
      ? UserRoles.TournamentParticipant
      : UserRoles.TournamentCreator;
  }

  onRegisterClick() {
    this.errorMessage = '';

    if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Password missmatch!';
      return;
    }
  }
}
