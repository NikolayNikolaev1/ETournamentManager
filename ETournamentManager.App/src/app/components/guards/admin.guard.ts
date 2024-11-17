import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';

import { AuthService } from 'app/services/auth.service';

export const adminGuard: CanActivateFn = () => {
  return inject(AuthService).isAdmin;
};
