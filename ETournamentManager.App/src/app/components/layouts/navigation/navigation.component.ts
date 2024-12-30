import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import { Subscription } from 'rxjs';

import { GameCreateComponent } from 'app/components/dialogs/game-create/game-create.component';
import { LoginComponent } from 'app/components/dialogs/login/login.component';
import { RegisterComponent } from 'app/components/dialogs/register/register.component';
import { TeamManagementComponent } from 'app/components/dialogs/team-management/team-management.component';
import { TournamentManagementComponent } from 'app/components/pages/tournament/tournament-management/tournament-management.component';
import UserProfile from 'app/models/user-profile.model';
import { AuthService } from 'app/services/auth.service';
import { BrandingService } from 'app/services/branding.service';
import { ImageService } from 'app/services/image.service';
import * as Constants from 'app/utils/constants';

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
  logoUrl: string = '';
  currentUserSub!: Subscription;
  infoSub!: Subscription;
  showDropdownMenu: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService,
    private brandingService: BrandingService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.imageService.getImageUrl('logo', '').subscribe((url) => (this.logoUrl = url));
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
    this.dialog.open(LoginComponent);
  }

  onRegisterClick() {
    this.dialog.open(RegisterComponent);
  }

  onTeamCreateClick() {
    this.dialog.open(TeamManagementComponent);
  }

  onGameCreateClick() {
    this.dialog.open(GameCreateComponent);
  }

  onTournamentCreateClick() {
    this.dialog.open(TournamentManagementComponent);
  }
}
