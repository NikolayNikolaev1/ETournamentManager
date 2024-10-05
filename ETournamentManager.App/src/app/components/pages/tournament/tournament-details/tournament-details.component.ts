import { environment } from 'environments/environment.development';

import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import Round from 'app/models/round.model';
import Team from 'app/models/team.model';
import Tournament from 'app/models/tournament.model';
import UserProfile from 'app/models/user-profile.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { SERVER_ROUTES } from 'app/utils/constants';
import { convertTeamInfoCard } from 'app/utils/info-card-converter';

import { TournamentCreateComponent } from '../tournament-create/tournament-create.component';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrl: './tournament-details.component.scss',
})
export class TournamentDetailsComponent {
  tournamentId: string = '';
  tournamentData: Tournament | null = null;
  tournamentImageUrl: string = '';
  tournamentTeamsData: Team[] = [];
  roundsData: Round[] = [];
  searchTeams: Team[] = [];
  searchTeamNames: string[] = [];
  currentUserProfile: UserProfile | null = null;
  startTournamentError: string = '';

  getTeamInfoCard = convertTeamInfoCard;

  private dialog = inject(DialogService);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    setTimeout(() => (this.currentUserProfile = this.authService.getCurrentUser()), 100);

    this.tournamentId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTournamentDetails();
    this.getRoundsData();
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

  onStartClick() {
    this.apiService
      .request<Round[]>({
        method: 'post',
        url: `${SERVER_ROUTES.ROUND.GENERATE}/${this.tournamentId}`,
      })
      .subscribe({
        next: (response) => (this.roundsData = response),
        error: (errorMessage) => (this.startTournamentError = errorMessage),
      });
  }

  onCardSelect(id: string, route: string) {
    this.router.navigate([route, id]);
  }

  onRemoveTeamClick(teamId: string) {
    this.apiService
      .request<null, { tournamentId: string; teamId: string }>({
        url: SERVER_ROUTES.TOURNAMENT.REMOVE_PARTICIPANT,
        method: 'patch',
        body: {
          tournamentId: this.tournamentId,
          teamId,
        },
      })
      .subscribe(() => this.getTournamentDetails());
  }

  onEditClick() {
    this.dialog.open(TournamentCreateComponent, {
      data: {
        title: '',
      },
    });
  }

  private getTournamentDetails() {
    this.apiService
      .request<Tournament>({
        url: `${SERVER_ROUTES.TOURNAMENT.GET}/${this.tournamentId}`,
        method: 'get',
      })
      .subscribe((response) => {
        this.tournamentData = response;

        this.apiService.request({ method: 'get', url: this.tournamentId, isFile: true }).subscribe({
          error: (isValid) =>
            (this.tournamentImageUrl = isValid
              ? `${environment.apiUrl}/UploadImages/${this.tournamentId}.jpg`
              : 'assets/images/default-tournament-img.jpg'),
        });

        this.getTournamentTeams();
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

  private getTournamentTeams() {
    this.apiService
      .request<Team[]>({
        url: SERVER_ROUTES.TEAM.GET_ALL,
        method: 'get',
        queryParams: {
          tournamentIds: [this.tournamentId],
        },
      })
      .subscribe((response) => {
        this.tournamentTeamsData = response;

        this.tournamentTeamsData.forEach((t) => {
          this.apiService.request({ method: 'get', url: t.id, isFile: true }).subscribe({
            error: (isValid) =>
              (t.imgUrl = isValid
                ? `${environment.apiUrl}/UploadImages/${t.id}.jpg`
                : 'assets/images/default-team-img.jpg'),
          });
        });
      });
  }
}
