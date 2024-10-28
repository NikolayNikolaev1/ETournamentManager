import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogRef, DialogService } from '@ngneat/dialog';

import Game from 'app/models/game.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

import {
  TOURNAMENT_CREATE_FORM,
  TOURNAMENT_CREATE_REQUEST_BODY,
  TournamentType,
} from './tournament-create.configuration';

@Component({
  selector: 'app-tournament-create',
  templateUrl: './tournament-create.component.html',
  styleUrl: './tournament-create.component.scss',
})
export class TournamentCreateComponent implements OnInit {
  name: string = '';
  description: string = '';
  type: TournamentType = TournamentType.SinglePlayer;
  minTeamMembers: number = 1;
  errorMessage: string = '';
  games: Game[] = [];
  selectedGame: Game | null = null;
  searchGames: string[] = [];
  hideType = false;
  tournamentId: string = '';
  isEdit: boolean = false;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private readonly dialogService: DialogService,
    private ref: DialogRef<{
      tournamentId: string;
      name: string;
      description: string;
      minTeamMembers: number;
      type?: number;
      game: Game;
    }>
  ) {}

  ngOnInit() {
    if (this.ref.data) {
      this.tournamentId = this.ref.data.tournamentId;
      this.isEdit = true;
      this.name = this.ref.data.name;
      this.description = this.ref.data.description;
      this.minTeamMembers = this.ref.data.minTeamMembers;

      if (this.ref.data.type === undefined) {
        this.hideType = true;
      } else {
        this.type = this.ref.data.type;
      }

      this.selectedGame = this.ref.data.game;
    }
  }

  onFormChanged({ name, description, minTeamMembers }: TOURNAMENT_CREATE_FORM) {
    this.name = name;
    this.description = description;
    this.minTeamMembers = minTeamMembers;
  }

  onTypeChange() {
    this.type =
      this.type === TournamentType.SinglePlayer ? TournamentType.Team : TournamentType.SinglePlayer;
  }

  onSubmitClick() {
    this.errorMessage = '';
    if (this.selectedGame === null) {
      this.errorMessage = 'Must select game first';
      return;
    }

    this.apiService
      .request<string, TOURNAMENT_CREATE_REQUEST_BODY>({
        url: this.isEdit
          ? `${SERVER_ROUTES.TOURNAMENT.UPDATE}/${this.tournamentId}`
          : SERVER_ROUTES.TOURNAMENT.CREATE,
        method: this.isEdit ? 'patch' : 'post',
        body: {
          name: this.name,
          description: this.description,
          type: this.type,
          minTeamMembers: this.minTeamMembers,
          gameId: this.selectedGame.id,
        },
      })
      .subscribe({
        next: (id) => {
          this.dialogService.closeAll();
          this.router.navigate(['/tournament', id]);
        },
        error: (error) => (this.errorMessage = error),
      });
  }

  getAllGamesByName(gameName: string) {
    this.apiService
      .request<Game[]>({
        method: 'get',
        url: SERVER_ROUTES.GAME.GET_ALL,
        queryParams: {
          search: gameName,
        },
      })
      .subscribe((response) => {
        this.games = response;
        this.searchGames = this.games.map((g) => g.name);
      });
  }

  selectGame(index: number) {
    this.selectedGame = this.games[index]; //TODO: add validation for submit when game is not selected
  }
}
