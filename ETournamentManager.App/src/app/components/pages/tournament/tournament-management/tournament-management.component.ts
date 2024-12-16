import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogRef, DialogService } from '@ngneat/dialog';

import {
  TOURNAMENT_CREATE_FORM,
  TOURNAMENT_MANAGEMENT_REQUEST_BODY,
  TournamentType,
} from 'app/components/pages/tournament/tournament-management/tournament-management.configuration';
import Game from 'app/models/game.model';
import { TournamentBase } from 'app/models/tournament.model';
import { ApiService } from 'app/services/api.service';
import { CLIENT_ROUTES, SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-tournament-management',
  templateUrl: './tournament-management.component.html',
  styleUrl: './tournament-management.component.scss',
})
export class TournamentManagementComponent implements OnInit {
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
      onEdit: (data: TournamentBase) => void;
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
    this.type = this.type === TournamentType.SinglePlayer ? TournamentType.Team : TournamentType.SinglePlayer;
  }

  onSubmitClick() {
    this.errorMessage = '';
    if (this.selectedGame === null) {
      this.errorMessage = 'Must select game first';
      return;
    }

    this.apiService
      .request<TournamentBase, TOURNAMENT_MANAGEMENT_REQUEST_BODY>({
        url: this.isEdit ? `${SERVER_ROUTES.TOURNAMENT.UPDATE}/${this.tournamentId}` : SERVER_ROUTES.TOURNAMENT.CREATE,
        method: this.isEdit ? 'patch' : 'post',
        body: {
          name: this.name,
          description: this.description,
          type: this.type,
          minTeamMembers: 1,
          gameId: this.selectedGame.id,
        },
      })
      .subscribe({
        next: (response) => {
          if (this.isEdit) {
            this.ref.data.onEdit(response);
          } else {
            this.router.navigate([CLIENT_ROUTES.TOURNAMENT_DETAILS(), response.id]);
          }

          this.dialogService.closeAll();
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
