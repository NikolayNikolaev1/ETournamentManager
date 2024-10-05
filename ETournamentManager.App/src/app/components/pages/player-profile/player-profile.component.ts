import { environment } from 'environments/environment.development';
import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import Team from 'app/models/team.model';
import Tournament from 'app/models/tournament.model';
import UserProfile from 'app/models/user-profile.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import * as Constants from 'app/utils/constants';
import { convertTeamInfoCard, convertTournamentInfoCard } from 'app/utils/info-card-converter';
import { InfoCard } from 'app/utils/types';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss',
})
export class PlayerProfileComponent implements OnInit {
  constants = Constants;
  currentUserProfile: UserProfile | null = null;
  currentUserSub!: Subscription;
  teamsData: Team[] = [];
  tournamentsData: Tournament[] = [];
  userImageUrl: string = '';
  getTeamInfoCard = convertTeamInfoCard;
  getTournamentCard = convertTournamentInfoCard;

  constructor(
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // TODO: Fix not showing teams/tournaments after first refresh.
    setTimeout(() => {
      this.currentUserProfile = this.authService.getCurrentUser();

      this.apiService
        .request({ method: 'get', url: this.currentUserProfile!.id, isFile: true })
        .subscribe({
          error: (isValid) =>
            (this.userImageUrl = isValid
              ? `${environment.apiUrl}/UploadImages/${this.currentUserProfile!.id}.jpg`
              : 'assets/images/default-user-img.jpg'),
        });

      switch (this.currentUserProfile?.roleName) {
        case Constants.TOURNAMENT_PARTICIPANT_ROLE:
          this.apiService
            .request<Team[]>({
              method: 'get',
              url: Constants.SERVER_ROUTES.TEAM.GET_ALL,
              queryParams: {
                userIds: [this.currentUserProfile.id],
              },
            })
            .subscribe((response) => {
              this.teamsData = response;

              this.teamsData.forEach((t) => {
                this.apiService.request({ method: 'get', url: t.id, isFile: true }).subscribe({
                  error: (isValid) =>
                    (t.imgUrl = isValid
                      ? `${environment.apiUrl}/UploadImages/${t.id}.jpg`
                      : 'assets/images/default-team-img.jpg'),
                });
              });
            });
          break;
        case Constants.TOURNAMENT_CREATOR_ROLE:
          this.apiService
            .request<Tournament[]>({
              method: 'get',
              url: Constants.SERVER_ROUTES.TOURNAMENT.GET_ALL,
              queryParams: {
                userIds: [this.currentUserProfile.id],
              },
            })
            .subscribe((response) => {
              this.tournamentsData = response;

              this.tournamentsData.forEach((t) => {
                this.apiService.request({ method: 'get', url: t.id, isFile: true }).subscribe({
                  error: (isValid) =>
                    (t.imgUrl = isValid
                      ? `${environment.apiUrl}/UploadImages/${t.id}.jpg`
                      : 'assets/images/default-tournament-img.jpg'),
                });
              });
            });
          break;
      }
    }, 100);

    this.currentUserSub = this.authService.getCurrentUser$().subscribe((currentUser) => {
      this.currentUserProfile = currentUser;
    });
  }

  onCardSelect(id: string, route: string) {
    this.router.navigate([route, id]);
  }

  // getTeamInfoCard(team: Team): InfoCard {
  //   return {
  //     id: team.id,
  //     name: team.name,
  //     subname: team.tag,
  //     imageUrl: team.imgUrl ?? '',
  //   };
  // }

  // getTournamentCard(tournament: Tournament): InfoCard {
  //   return {
  //     id: tournament.id,
  //     name: tournament.name,
  //     imageUrl: tournament.imgUrl ?? '',
  //   };
  // }
}
