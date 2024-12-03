import { map, take } from 'rxjs';

import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthService } from 'app/services/auth.service';
import { BrandingService } from 'app/services/branding.service';

export const authGuard: CanActivateFn = () => {
  return inject(AuthService).isAuthenticated;
};

export const permissionGuard: CanActivateFn = () => {
  return inject(BrandingService).tourSub$.pipe(
    take(1),
    map((status) => {
      return status;
    })
  );
};
