import { map, take } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import { LoginComponent } from 'app/components/pages/auth/login/login.component';
import { AuthService } from 'app/services/auth.service';
import { BrandingService } from 'app/services/branding.service';

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isAuthenticated;
};

export const tournamentDetailsGuard: CanActivateFn = () => {
  const isAuth = inject(AuthService).isAuthenticated;
  const dialogService = inject(DialogService);

  return inject(BrandingService).accessPermissions$.pipe(
    take(1),
    map(({ accessTournamentDetails }) => {
      if (!accessTournamentDetails && !isAuth) dialogService.open(LoginComponent);

      return accessTournamentDetails || isAuth;
    })
  );
};

export const teamDetailsGuard: CanActivateFn = () => {
  const isAuth = inject(AuthService).isAuthenticated;
  const dialogService = inject(DialogService);

  return inject(BrandingService).accessPermissions$.pipe(
    take(1),
    map(({ accessTeamDetails }) => {
      if (!accessTeamDetails && !isAuth) dialogService.open(LoginComponent);

      return accessTeamDetails || isAuth;
    })
  );
};

export const teamTableGuard: CanActivateFn = () => {
  const isAuth = inject(AuthService).isAuthenticated;
  const dialogService = inject(DialogService);

  return inject(BrandingService).accessPermissions$.pipe(
    take(1),
    map(({ accessTeamTable }) => {
      if (!accessTeamTable && !isAuth) dialogService.open(LoginComponent);

      return accessTeamTable || isAuth;
    })
  );
};

export const tournamentTableGuard: CanActivateFn = () => {
  const isAuth = inject(AuthService).isAuthenticated;
  const dialogService = inject(DialogService);

  return inject(BrandingService).accessPermissions$.pipe(
    take(1),
    map(({ accessTournamentTable }) => {
      if (!accessTournamentTable && !isAuth) dialogService.open(LoginComponent);

      return accessTournamentTable || isAuth;
    })
  );
};
