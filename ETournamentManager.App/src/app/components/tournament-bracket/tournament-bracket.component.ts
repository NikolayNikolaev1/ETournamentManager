import { Component, Input } from '@angular/core';

import { DialogService } from '@ngneat/dialog';

import Round from 'app/models/round.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

import { ConfirmationComponent } from '../core/confirmation/confirmation.component';

@Component({
  selector: 'app-tournament-bracket',
  templateUrl: './tournament-bracket.component.html',
  styleUrl: './tournament-bracket.component.scss',
})
export class TournamentBracketComponent {
  @Input({ required: true }) tournamentId: string = '';
  @Input({ required: true }) roundsData: Round[] = [];
  @Input() canChooseWinner: boolean = false;
  finalsRoundData: Round | null = null;

  constructor(
    private apiService: ApiService,
    private dialog: DialogService
  ) {}

  getFinalsRoundData() {
    this.finalsRoundData = this.roundsData[6] ? this.roundsData[6] : null;
  }

  onTeamClick(roundId: string, teamId: string) {
    if (!this.canChooseWinner) {
      return;
    }

    if (this.roundsData.find((r) => r.id === roundId)!.winnerId === teamId) {
      // Can not chose the same team as winner again.
      return;
    }

    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to choose this winner?',
        event: () => {
          this.apiService
            .request<null, { roundId: string; winnerId: string }>({
              method: 'patch',
              url: SERVER_ROUTES.ROUND.END,
              body: {
                roundId: roundId,
                winnerId: teamId,
              },
            })
            .subscribe(() => {
              this.getRoundsData();
            });
        },
      },
    });
  }

  private getRoundsData() {
    this.apiService
      .request<Round[]>({
        url: `${SERVER_ROUTES.ROUND.GET_ALL}/${this.tournamentId}`,
        method: 'get',
      })
      .subscribe((response) => (this.roundsData = response));
  }
}
