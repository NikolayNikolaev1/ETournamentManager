import { finalize } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import { DialogService } from '@ngneat/dialog';

import { ConfirmationComponent } from 'app/components/core/confirmation/confirmation.component';
import User from 'app/models/user.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES, TOURNAMENT_CREATOR_ROLE } from 'app/utils/constants';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrl: './user-table.component.scss',
})
export class UserTableComponent implements OnInit {
  usersData: { id: string; username: string; email: string; role: string; status: boolean }[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: DialogService
  ) {}

  isLoading: boolean = false;

  ngOnInit() {
    this.getUsers();
  }

  onUserStatusChange({ id, action }: { id: string; action: string }) {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to change the user status?',
        event: () => {
          if (action === 'status') {
            this.apiService
              .request<
                null,
                {
                  id: string;
                }
              >({ method: 'patch', url: SERVER_ROUTES.USER.CHANGE_STATUS, body: { id } })
              .subscribe(() => {
                this.usersData = this.usersData.map((u) =>
                  u.id === id
                    ? {
                        ...u,
                        status: !u.status,
                      }
                    : u
                );
              });
          }
        },
      },
    });
  }

  private getUsers() {
    this.isLoading = true;
    this.apiService
      .request<User[]>({ url: SERVER_ROUTES.USER.GET_ALL, method: 'get' })
      .pipe(finalize(() => (this.isLoading = false)))
      .subscribe(
        (response) =>
          (this.usersData = response.map((u) => ({
            id: u.id,
            username: u.userName,
            email: u.email,
            role: u.roleName === TOURNAMENT_CREATOR_ROLE ? 'Creator' : 'Participant',
            status: u.disabled,
          })))
      );
  }
}
