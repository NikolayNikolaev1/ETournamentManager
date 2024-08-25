import { DialogService } from '@ngneat/dialog';
import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import UserProfile from 'app/models/user-profile.model';
import { AuthService } from 'app/services/auth.service';
import * as Constants from 'app/utils/constants';

import { LoginComponent } from '../pages/auth/login/login.component';
import { RegisterComponent } from '../pages/auth/register/register.component';
import { TeamCreateComponent } from '../pages/team/team-create/team-create.component';
import { TournamentCreateComponent } from '../pages/tournament/tournament-create/tournament-create.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  private dialog = inject(DialogService);
  constants = Constants;
  currentUser: UserProfile | null = null;
  currentUserSub!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserSub = this.authService.getCurrentUser$().subscribe((currentUser) => {
      this.currentUser = currentUser;
    });
  }

  ngOnDestroy = () => this.currentUserSub.unsubscribe();

  onLogout() {
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  onLoginClick() {
    this.dialog.open(LoginComponent, {
      data: {
        title: '',
      },
    });
  }

  onRegisterClick() {
    this.dialog.open(RegisterComponent, {
      data: {
        title: '',
      },
    });
  }

  onTeamCreateClick() {
    this.dialog.open(TeamCreateComponent, {
      data: {
        title: '',
      },
    });
  }

  onTournamentCreateClick() {
    this.dialog.open(TournamentCreateComponent, {
      data: {
        title: '',
      },
    });
  }
}
