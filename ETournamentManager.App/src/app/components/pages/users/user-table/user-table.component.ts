import { Component, OnInit } from '@angular/core';

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
  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService.request<User[]>({ url: SERVER_ROUTES.USER.GET_ALL, method: 'get' }).subscribe(
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

  onUserStatusChange({ id, action }: { id: string; action: string }) {
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
  }
}
