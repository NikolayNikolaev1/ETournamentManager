import { map, take } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { BrandingService } from 'app/services/branding.service';

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isAuthenticated;
};

export const tournamnetDetailsGuard: CanActivateFn = () => {
  return inject(BrandingService).accessPermissions$.pipe(
    take(1),
    map((permission) => permission.accessTournamentDetails)
  );
};
export const teamDetailsGuard: CanActivateFn = () => {
  return inject(BrandingService).accessPermissions$.pipe(
    take(1),
    map((permission) => permission.accessTeamDetails)
  );
};
export const teamTableGuard: CanActivateFn = () => {
  return inject(BrandingService).accessPermissions$.pipe(
    take(1),
    map((permission) => permission.accessTeamTable)
  );
};
export const tournamnetTableGuard: CanActivateFn = () => {
  return inject(BrandingService).accessPermissions$.pipe(
    take(1),
    map((permission) => permission.accessTournamentTable)
  );
};
