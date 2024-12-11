import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import { TournamentManagementComponent } from '../tournament-management/tournament-management.component';
import { TournamentType } from '../tournament-management/tournament-management.configuration';

import { ConfirmationComponent } from 'app/components/core/confirmation/confirmation.component';
import { DEFAULT_IMG_PATHS } from 'app/configurations/image.config';
import Round, { RoundStage } from 'app/models/round.model';
import Team, { TeamBase } from 'app/models/team.model';
import Tournament from 'app/models/tournament.model';
import UserProfile from 'app/models/user-profile.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { ImageService } from 'app/services/image.service';
import { SERVER_ROUTES } from 'app/utils/constants';
import { convertTeamInfoCard } from 'app/utils/info-card-converter';

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
  ranking: { place: string; name: string }[] = [];

  getTeamInfoCard = convertTeamInfoCard;

  private dialog = inject(DialogService);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((profile) => (this.currentUserProfile = profile));

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
          isPrivate: this.tournamentData?.tournamentType === TournamentType.SinglePlayer,
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
      .request<TeamBase, { tournamentId: string; teamId: string }>({
        method: 'patch',
        url: SERVER_ROUTES.TOURNAMENT.ADD_PARTICIPANT,
        body: {
          tournamentId: this.tournamentId,
          teamId: this.searchTeams[index].id,
        },
      })
      .subscribe((response) => {
        const newParticipant = response;

        this.imageService
          .getImageUrl(
            newParticipant.id,
            this.tournamentData?.tournamentType === TournamentType.SinglePlayer
              ? DEFAULT_IMG_PATHS.USER
              : DEFAULT_IMG_PATHS.TEAM
          )
          .subscribe((url) => {
            newParticipant.imgUrl = url;
            this.tournamentData?.teams.push(newParticipant);
          });
      });
  }

  onStartClick() {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to start this tournament?',
        event: () => {
          this.apiService
            .request<Round[]>({
              method: 'post',
              url: `${SERVER_ROUTES.ROUND.GENERATE}/${this.tournamentId}`,
            })
            .subscribe({
              next: (response) => (this.roundsData = response),
              error: (errorMessage) => (this.startTournamentError = errorMessage),
            });
        },
      },
    });
  }

  onCardSelect(id: string, route: string) {
    this.router.navigate([route, id]);
  }

  onRemoveTeamClick(teamId: string) {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to remove this participant from the tournament?',
        event: () => {
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
        },
      },
    });
  }

  onEditClick() {
    if (!this.tournamentData) return;

    const dialogRef = this.dialog
      .open(TournamentManagementComponent, {
        data: {
          tournamentId: this.tournamentId,
          name: this.tournamentData.name,
          description: this.tournamentData.description,
          minTeamMembers: this.tournamentData.minTeamMembers,
          type: this.tournamentData.teams.length === 0 ? this.tournamentData.tournamentType : undefined,
          game: this.tournamentData.game,
        },
      })
      .afterClosed$.subscribe(() => {
        this.getTournamentDetails();

        dialogRef.unsubscribe();
      });
  }

  onDeleteClick() {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to delete this tournament?',
        event: () => {
          this.apiService
            .request({ url: `${SERVER_ROUTES.TOURNAMENT.DELETE}/${this.tournamentId}`, method: 'delete' })
            .subscribe(() => this.router.navigate(['/profile']));
        },
      },
    });
  }

  onEndClick() {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to end this tournament?',
        event: () => {
          this.apiService
            .request({ url: `${SERVER_ROUTES.TOURNAMENT.FINISH}/${this.tournamentId}`, method: 'patch' })
            .subscribe(() => this.getRanking());
        },
      },
    });
  }
  showEndButton() {
    return (
      this.roundsData.filter((r) => r.stage === RoundStage.Finals && r.winnerId !== null).length !== 0 &&
      !this.tournamentData?.finished
    );
  }

  private getRanking() {
    this.ranking = this.roundsData.map((tr, i) => ({
      place: i < 4 ? '5-8' : i < 6 ? '3-4' : '2',
      name: tr.teams.find((t) => t.id !== tr.winnerId)!.name,
    }));

    const lastRound = this.roundsData[this.roundsData.length - 1];

    this.ranking = [
      ...this.ranking,
      {
        place: '1',
        name: lastRound.teams.find((t) => t.id === lastRound.winnerId)!.name,
      },
    ];
  }

  private getTournamentDetails() {
    this.apiService
      .request<Tournament>({
        url: `${SERVER_ROUTES.TOURNAMENT.GET}/${this.tournamentId}`,
        method: 'get',
      })
      .subscribe((response) => {
        this.tournamentData = response;

        this.getRoundsData();

        this.imageService
          .getImageUrl(this.tournamentId, DEFAULT_IMG_PATHS.TOURNAMENT)
          .subscribe((url) => (this.tournamentImageUrl = url));

        this.tournamentData.teams.forEach((t) => {
          this.imageService
            .getImageUrl(
              t.id,
              this.tournamentData?.tournamentType === TournamentType.SinglePlayer
                ? DEFAULT_IMG_PATHS.USER
                : DEFAULT_IMG_PATHS.TEAM
            )
            .subscribe((url) => (t.imgUrl = url));
        });
      });
  }

  private getRoundsData() {
    this.apiService
      .request<Round[]>({
        url: `${SERVER_ROUTES.ROUND.GET_ALL}/${this.tournamentId}`,
        method: 'get',
      })
      .subscribe((response) => {
        this.roundsData = response;

        if (this.tournamentData?.finished) {
          this.getRanking();
        }
      });
  }
}
