import { Component, OnInit } from '@angular/core';

import Tournament from 'app/models/tournament.model';
import User from 'app/models/user.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES, TOURNAMENT_CREATOR_ROLE } from 'app/utils/constants';

@Component({
  selector: 'app-tournament-table',
  templateUrl: './tournament-table.component.html',
  styleUrl: './tournament-table.component.scss',
})
export class TournamentTableComponent implements OnInit {
  tournamentsData: any = [];
  searchUsersResult: { id: string; userName: string }[] = [];
  filteredCreators: { id: string; userName: string }[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .request<Tournament[]>({ url: SERVER_ROUTES.TOURNAMENT.GET_ALL, method: 'get' })
      .subscribe((response) => {
        this.tournamentsData = response.map((t) => ({
          name: t.name,
          creator: t.creator.userName,
          game: t.game.name,
        }));
      });
  }

  getUserNames() {
    return this.searchUsersResult.map((u) => u.userName);
  }

  selectUser(index: number) {
    this.filteredCreators.push(this.searchUsersResult[index]);
    this.searchUsersResult = [];

    this.apiService
      .request<Tournament[]>({
        url: SERVER_ROUTES.TOURNAMENT.GET_ALL,
        method: 'get',
        queryParams: {
          userIds: this.filteredCreators.map((f) => f.id),
        },
      })
      .subscribe((response) => {
        this.tournamentsData = response.map((t) => ({
          name: t.name,
          creator: t.creator.userName,
          game: t.game.name,
        }));
      });
  }

  onFilterRemove(id: string) {
    this.filteredCreators = this.filteredCreators.filter((c) => c.id !== id);

    this.apiService
      .request<Tournament[]>({
        url: SERVER_ROUTES.TOURNAMENT.GET_ALL,
        method: 'get',
        queryParams: {
          userIds: this.filteredCreators.map((f) => f.id),
        },
      })
      .subscribe((response) => {
        this.tournamentsData = response.map((t) => ({
          name: t.name,
          creator: t.creator.userName,
          game: t.game.name,
        }));
      });
  }

  getUsersByUsername(username: string) {
    this.apiService
      .request<User[]>({
        method: 'get',
        url: SERVER_ROUTES.USER.GET_ALL,
        queryParams: {
          search: username,
          role: TOURNAMENT_CREATOR_ROLE,
        },
      })
      .subscribe((response) => {
        this.searchUsersResult = response
          .map((r) => ({
            id: r.id,
            userName: r.userName,
          }))
          .filter((u) => !this.filteredCreators.map((f) => f.id).includes(u.id));
      });
  }
}
