import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Team from 'app/models/team.model';
import User from 'app/models/user.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss',
})
export class TeamDetailsComponent implements OnInit {
  teamId: string = '';
  teamData: Team | null = null;
  searchUsers: User[] = [];
  searchUsernames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTeamDetails();
  }

  private getTeamDetails() {
    this.apiService
      .request<Team>({
        url: `${SERVER_ROUTES.TEAM.GET}/${this.teamId}`,
        method: 'get',
      })
      .subscribe((response) => (this.teamData = response));
  }

  getUsersByUsername(username: string) {
    this.apiService
      .request<User[]>({
        method: 'get',
        url: SERVER_ROUTES.USER.GET_ALL,
        queryParams: {
          search: username,
        },
      })
      .subscribe((response) => {
        this.searchUsers = response.filter(
          (u) => !this.teamData?.members.map((m) => m.id).includes(u.id.toLowerCase())
        );
        this.searchUsernames = this.searchUsers.map((r) => r.userName);
      });
  }

  selectUser(index: number) {
    this.apiService
      .request<Team, { teamId: string; memberId: string }>({
        method: 'patch',
        url: SERVER_ROUTES.TEAM.ADD_MEMBER,
        body: {
          teamId: this.teamId,
          memberId: this.searchUsers[index].id,
        },
      })
      .subscribe((response) => (this.teamData = response));
  }
}
