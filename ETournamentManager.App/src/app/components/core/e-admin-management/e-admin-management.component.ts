import { Component, OnInit } from '@angular/core';

import Game from 'app/models/game.model';
import Team from 'app/models/team.model';
import { ApiService } from 'app/services/api.service';
import * as Constants from 'app/utils/constants';

@Component({
  selector: 'app-e-admin-management',
  templateUrl: './e-admin-management.component.html',
  styleUrl: './e-admin-management.component.scss',
})
export class EAdminManagementComponent implements OnInit {
  title = '';
  type: any = 'Table';
  tableData: any = [];
  columnNames: any = ['Name', 'Tag', 'Captain name', 'Members count', 'Tournaments won'];
  games: Game[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.getAllGames();

    this.apiService
      .request<Team[]>({ url: Constants.SERVER_ROUTES.TEAM.GET_ALL, method: 'get' })
      .subscribe((response) => {
        this.tableData = response.map((t) => [
          t.name,
          t.tag,
          t.captain?.userName ?? '',
          t.members.length,
          t.tournamentsWon,
        ]);
      });
  }

  private getAllGames() {
    this.apiService
      .request<Game[]>({ url: Constants.SERVER_ROUTES.GAME.GET_ALL, method: 'get' })
      .subscribe((response) => (this.games = response));
  }
}
