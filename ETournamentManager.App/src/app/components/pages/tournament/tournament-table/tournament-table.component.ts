import { Component, OnInit } from '@angular/core';

import Game from 'app/models/game.model';
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
  searchGameResult: { id: string; name: string }[] = [];
  filteredCreators: { id: string; userName: string }[] = [];
  filteredGames: { id: string; name: string }[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getTournaments();
  }

  getUserNames() {
    return this.searchUsersResult.map((u) => u.userName);
  }

  getGameNames() {
    return this.searchGameResult.map((g) => g.name);
  }

  selectFilter(filterBy: string, index: number) {
    switch (filterBy) {
      case 'creator':
        this.filteredCreators.push(this.searchUsersResult[index]);
        break;
      case 'game':
        this.filteredGames.push(this.searchGameResult[index]);
        break;
    }

    this.searchUsersResult = [];
    this.searchGameResult = [];
    this.getTournaments();
  }

  onFilterRemove(filterBy: string, id: string) {
    switch (filterBy) {
      case 'creator':
        this.filteredCreators = this.filteredCreators.filter((c) => c.id !== id);
        break;
      case 'game':
        this.filteredGames = this.filteredGames.filter((g) => g.id !== id);
        break;
    }

    this.getTournaments();
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

  getGameByName(name: string) {
    this.apiService
      .request<Game[]>({
        method: 'get',
        url: SERVER_ROUTES.GAME.GET_ALL,
        queryParams: { search: name },
      })
      .subscribe((response) => {
        this.searchGameResult = response
          .map((r) => ({
            id: r.id,
            name: r.name,
          }))
          .filter((u) => !this.filteredGames.map((f) => f.id).includes(u.id));
      });
  }

  private getTournaments() {
    this.apiService
      .request<Tournament[]>({
        url: SERVER_ROUTES.TOURNAMENT.GET_ALL,
        method: 'get',
        queryParams: {
          userIds: this.filteredCreators.map((f) => f.id),
          gameIds: this.filteredGames.map((f) => f.id),
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
}
