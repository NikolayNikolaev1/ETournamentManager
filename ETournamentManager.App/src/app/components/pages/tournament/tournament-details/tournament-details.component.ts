import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Tournament from 'app/models/tournament.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss',
})
export class TournamentDetailsComponent {
  tournamentId: string = '';
  tournamentData: Tournament | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTournamentDetails();
  }

  private getTournamentDetails() {
    this.apiService
      .request<Tournament>({
        url: `${SERVER_ROUTES.TOURNAMENT.GET}/${this.tournamentId}`,
        method: 'get',
      })
      .subscribe((response) => (this.tournamentData = response));
  }
}
