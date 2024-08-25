import { DialogService } from '@ngneat/dialog';

import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
export class TournamentCreateComponent {
  name: string = '';
  description: string = '';
  type: TournamentType = TournamentType.SinglePlayer;
  minTeamMembers: number = 1;
  gameId: string = '508894B2-5CA4-4872-AD1D-3A316F2BB862'; // TODO: Remove hardcoded id.
  errorMessage: string = '';

  constructor(
    private router: Router,
    private apiService: ApiService,
    private readonly dialogService: DialogService
  ) {}

  onFormChanged({ name, description, minTeamMembers }: TOURNAMENT_CREATE_FORM) {
    this.name = name;
    this.description = description;
    this.minTeamMembers = minTeamMembers;
  }

  onTypeChange() {
    this.type =
      this.type === TournamentType.SinglePlayer ? TournamentType.Team : TournamentType.SinglePlayer;
  }

  onCreateClick() {
    this.apiService
      .request<string, TOURNAMENT_CREATE_REQUEST_BODY>({
        url: SERVER_ROUTES.TOURNAMENT.CREATE,
        method: 'post',
        body: {
          name: this.name,
          description: this.description,
          type: this.type,
          minTeamMembers: this.minTeamMembers,
          gameId: this.gameId,
        },
      })
      .subscribe({
        next: (id) => {
          console.log(id);
          this.dialogService.closeAll();
          this.router.navigate(['/tournament', id]);
        },
        error: (error) => (this.errorMessage = error),
      });
  }
}
