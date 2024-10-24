import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Team from 'app/models/team.model';
import User from 'app/models/user.model';
import { ApiService } from 'app/services/api.service';
import {
  SERVER_ROUTES,
  TOURNAMENT_CREATOR_ROLE,
  TOURNAMENT_PARTICIPANT_ROLE,
} from 'app/utils/constants';

@Component({
  selector: 'app-team-table',
  templateUrl: './team-table.component.html',
  styleUrl: './team-table.component.scss',
})
export class TeamTableComponent implements OnInit {
  teamsData: any = [];
  searchUsersResult: { id: string; userName: string }[] = [];
  filteredMembers: { id: string; userName: string }[] = [];

  constructor(
    private router: Router,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.getTeams();
  }

  getUserNames() {
    return this.searchUsersResult.map((u) => u.userName);
  }

  getUsersByUsername(username: string) {
    this.apiService
      .request<User[]>({
        method: 'get',
        url: SERVER_ROUTES.USER.GET_ALL,
        queryParams: {
          search: username,
          role: TOURNAMENT_PARTICIPANT_ROLE,
        },
      })
      .subscribe((response) => {
        this.searchUsersResult = response
          .map((r) => ({
            id: r.id,
            userName: r.userName,
          }))
          .filter((u) => !this.filteredMembers.map((f) => f.id).includes(u.id));
      });
  }

  selectFilter(filterBy: string, index: number) {
    switch (filterBy) {
      case 'member':
        this.filteredMembers.push(this.searchUsersResult[index]);
        break;
    }

    this.searchUsersResult = [];
    this.getTeams();
  }

  onFilterRemove(filterBy: string, id: string) {
    switch (filterBy) {
      case 'member':
        this.filteredMembers = this.filteredMembers.filter((c) => c.id !== id);
        break;
    }

    this.getTeams();
  }

  onTeamClick(id: string) {
    this.router.navigate(['/team', id]);
  }

  private getTeams() {
    this.apiService
      .request<Team[]>({
        url: SERVER_ROUTES.TEAM.GET_ALL,
        method: 'get',
        queryParams: {
          userIds: this.filteredMembers.map((f) => f.id),
        },
      })
      .subscribe((response) => {
        this.teamsData = response.map((t) => ({
          id: t.id,
          name: t.name,
          tag: t.tag,
          captain: t.captain?.userName ?? '',
          members: t.members.length,
          wins: t.tournamentsWon,
        }));
      });
  }
}
