import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Team from 'app/models/team.model';
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
  searchTeams: Team[] = [];
  searchTeamNames: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.tournamentId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTournamentDetails();
  }

  getTeamByName(name: string) {
    this.apiService
      .request<Team[]>({
        method: 'get',
        url: SERVER_ROUTES.TEAM.GET_ALL,
        queryParams: {
          search: name,
        },
      })
      .subscribe((response) => {
        this.searchTeams = response.filter(
          (t) => !this.tournamentData?.teams.map((m) => m.id).includes(t.id.toLowerCase())
        );
        this.searchTeamNames = this.searchTeams.map((r) => r.name);
      });
  }

  selectTeam(index: number) {
    this.apiService
      .request<Tournament, { tournamentId: string; teamId: string }>({
        method: 'patch',
        url: SERVER_ROUTES.TOURNAMENT.ADD_PARTICIPANT,
        body: {
          tournamentId: this.tournamentId,
          teamId: this.searchTeams[index].id,
        },
      })
      .subscribe((response) => (this.tournamentData = response));
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
