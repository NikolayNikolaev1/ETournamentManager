import { Component } from '@angular/core';

import { DialogService } from '@ngneat/dialog';

import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-password-change',
  templateUrl: './password-change.component.html',
  styleUrl: './password-change.component.scss',
})
export class PasswordChangeComponent {
  oldPassword: string = '';
  newPassword: string = '';
  errorMessage: string = '';

  constructor(
    private dialogService: DialogService,
    // private router: Router,
    private apiService: ApiService
  ) {}

  onFormChange({ oldPassword, newPassword }: any) {
    this.oldPassword = oldPassword;
    this.newPassword = newPassword;
  }

  onPasswordChange() {
    if (this.oldPassword === this.newPassword) {
      this.errorMessage = 'Old password can not be the same as the new password!';
      return;
    }

    this.errorMessage = '';
    this.apiService
      .request<null, { oldPassword: string; newPassword: string }>({
        url: SERVER_ROUTES.AUTH.PASSWORD_CHANGE,
        method: 'patch',
        body: {
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        },
      })
      .subscribe({
        next: () => {
          this.dialogService.closeAll();
        },
        error: (error) => {
          console.log(this.errorMessage);
          
          this.errorMessage = error;
        },
      });
  }
}
