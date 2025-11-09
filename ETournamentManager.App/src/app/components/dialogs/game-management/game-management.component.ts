import { Component, OnInit } from '@angular/core';

import Game from 'app/models/game.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-game-management',
  templateUrl: './game-management.component.html',
  styleUrl: './game-management.component.scss',
})
export class GameManagementComponent implements OnInit {
  games: Game[] = [];

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.apiService
      .request<Game[]>({ method: 'get', url: SERVER_ROUTES.GAME.GET_ALL })
      .subscribe((response) => (this.games = response));
  }

  onGameEdit(id: string, value: string) {
    this.apiService
      .request<
        void,
        { name: string }
      >({ method: 'patch', url: `${SERVER_ROUTES.GAME.UPDATE}/${id}`, body: { name: value } })
      .subscribe();
  }
}
