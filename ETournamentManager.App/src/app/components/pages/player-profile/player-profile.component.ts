import { environment } from 'environments/environment.development';
import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import { ConfirmationComponent } from 'app/components/core/confirmation/confirmation.component';
import Team from 'app/models/team.model';
import Tournament from 'app/models/tournament.model';
import UserProfile from 'app/models/user-profile.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import * as Constants from 'app/utils/constants';
import { convertTeamInfoCard, convertTournamentInfoCard } from 'app/utils/info-card-converter';

import { PasswordChangeComponent } from '../auth/password-change/password-change.component';
import { ThemePickerComponent } from 'app/components/theme-picker/theme-picker.component';

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
  ownedTeams: Team[] = [];
  joinedTeams: Team[] = [];
  filteredTeams: Team[] = [];
  selectedTeamFilter: string = '';
  tournamentsData: Tournament[] = [];
  userImageUrl: string = '';
  getTeamInfoCard = convertTeamInfoCard;
  getTournamentCard = convertTournamentInfoCard;
  isLoading: boolean = false;
  showUsernameEdit: boolean = false;
  newUsername: string = '';

  constructor(
    private router: Router,
    private dialog: DialogService,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((profile) => {
      this.currentUserProfile = profile;

      this.apiService.request({ method: 'get', url: this.currentUserProfile!.id, isFile: true }).subscribe({
        error: (isValid) =>
          (this.userImageUrl = isValid
            ? `${environment.apiUrl}/UploadImages/${this.currentUserProfile!.id}.jpg`
            : 'assets/images/default-user-img.jpg'),
      });

      this.isLoading = true;
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

              this.ownedTeams = this.teamsData.filter(
                (t) => t.captain.id.toLowerCase() === this.currentUserProfile!.id.toLowerCase()
              );

              this.joinedTeams = this.teamsData.filter(
                (t) => t.captain.id.toLowerCase() !== this.currentUserProfile!.id.toLowerCase()
              );

              this.isLoading = false;

              this.teamsData.forEach((t) => {
                this.apiService.request({ method: 'get', url: t.id, isFile: true }).subscribe({
                  error: (isValid) =>
                    (t.imgUrl = isValid
                      ? `${environment.apiUrl}/UploadImages/${t.id}.jpg`
                      : 'assets/images/default-team-img.jpg'),
                });
              });

              if (this.ownedTeams.length > 0) {
                this.filteredTeams = this.ownedTeams;
                this.selectedTeamFilter = 'captain';
                return;
              }

              if (this.joinedTeams.length > 0) {
                this.filteredTeams = this.joinedTeams;
                this.selectedTeamFilter = 'member';
              }
            });
          break;
        case Constants.TOURNAMENT_CREATOR_ROLE:
        case Constants.ADMIN_ROLE:
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
              this.isLoading = false;

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
    });
  }

  onCardSelect(id: string, route: string) {
    this.router.navigate([route, id]);
  }

  onUsernameChange(newUsername: string) {
    if (this.currentUserProfile) this.currentUserProfile.username = newUsername;
  }

  onChangeUsernameClick() {
    if (this.currentUserProfile === null || this.newUsername.length === 0) return;

    this.apiService
      .request<null, { username: string }>({
        method: 'patch',
        url: Constants.SERVER_ROUTES.USER.EDIT_USERNAME,
        body: {
          username: this.newUsername,
        },
      })
      .subscribe(() => {
        this.currentUserProfile!.username = this.newUsername;
        this.showUsernameEdit = false;
      });
  }

  onPasswordChangeClick() {
    this.dialog.open(PasswordChangeComponent);
  }

  onThemeChangeClick() {
    this.dialog.open(ThemePickerComponent);
  }

  onTeamNavSelect(filter: string) {
    if (this.currentUserProfile === null) return;

    this.selectedTeamFilter = filter;

    switch (filter) {
      case 'captain':
        this.filteredTeams = this.teamsData.filter(
          (t) => t.captain.id.toLowerCase() === this.currentUserProfile!.id.toLowerCase()
        );
        break;
      case 'member':
        this.filteredTeams = this.teamsData.filter(
          (t) => t.captain.id.toLowerCase() !== this.currentUserProfile!.id.toLowerCase()
        );
        break;
    }
  }

  onExitClick(selectedTeamId: string) {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to leave the team?',
        event: () => {
          if (this.currentUserProfile === null) return;

          this.apiService
            .request<null, { teamId: string; memberId: string }>({
              url: Constants.SERVER_ROUTES.TEAM.REMOVE_MEMBER,
              method: 'patch',
              body: {
                teamId: selectedTeamId,
                memberId: this.currentUserProfile.id,
              },
            })
            .subscribe(() => {
              this.teamsData = this.teamsData.filter((t) => t.id !== selectedTeamId);

              this.onTeamNavSelect('member');
            });
        },
      },
    });
  }
}
