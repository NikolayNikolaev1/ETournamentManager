import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import UserProfile from 'app/models/user-profile.model';
import { AuthService } from 'app/services/auth.service';
import { BrandingService } from 'app/services/branding.service';
import * as Constants from 'app/utils/constants';

import { LoginComponent } from '../pages/auth/login/login.component';
import { RegisterComponent } from '../pages/auth/register/register.component';
import { GameCreateComponent } from '../pages/game/game-create/game-create.component';
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
  platformName: string = '';
  currentUserSub!: Subscription;
  infoSub!: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private brandingService: BrandingService
  ) {}

  ngOnInit() {
    this.brandingService.platformInfo$.subscribe(({ platformName }) => (this.platformName = platformName));

    setTimeout(() => {
      this.currentUserSub = this.authService.currentUser$.subscribe((profile) => (this.currentUser = profile));
    }, 100);
  }

  ngOnDestroy() {
    this.currentUserSub.unsubscribe();
    this.infoSub.unsubscribe();
  }

  onLogout() {
    this.router.navigate(['/']);
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
    this.dialog.open(RegisterComponent);
  }

  onTeamCreateClick() {
    this.dialog.open(TeamCreateComponent);
  }

  onGameCreateClick() {
    this.dialog.open(GameCreateComponent);
  }

  onTournamentCreateClick() {
    this.dialog.open(TournamentCreateComponent);
  }
}
