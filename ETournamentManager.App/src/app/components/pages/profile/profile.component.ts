import { Component, OnInit } from '@angular/core';

import { DialogService } from '@ngneat/dialog';
import { TranslateService } from '@ngx-translate/core';

import { ConfirmationComponent } from 'app/components/core/confirmation/confirmation.component';
import { PasswordChangeComponent } from 'app/components/dialogs/password-change/password-change.component';
import { ChangeUsernameRequest, PLATFORM_CONFIGS, PlatformConfig } from 'app/components/pages/profile/profile.config';
import { DEFAULT_IMG_PATHS } from 'app/configurations/image.config';
import Team from 'app/models/team.model';
import Tournament from 'app/models/tournament.model';
import UserProfile from 'app/models/user-profile.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { ImageService } from 'app/services/image.service';
import { CLIENT_ROUTES, SERVER_ROUTES, USER_ROLES } from 'app/utils/constants';
import { convertTeamInfoCard, convertTournamentInfoCard } from 'app/utils/info-card-converter';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  userRoles = USER_ROLES;
  clientRoutes = CLIENT_ROUTES;
  platformConfigs = PLATFORM_CONFIGS;
  currentUserProfile: UserProfile | null = null;
  userImageUrl: string = '';
  isParticipant: boolean = false;
  isLoading: boolean = false;
  showUsernameEdit: boolean = false;
  newUsername: string = '';
  usernameErrorMsg: string = '';
  selectedTeamFilter: string = '';
  teamsData: Team[] = [];
  ownedTeams: Team[] = [];
  joinedTeams: Team[] = [];
  filteredTeams: Team[] = [];
  tournamentsData: Tournament[] = [];
  getTeamInfoCard = convertTeamInfoCard;
  getTournamentCard = convertTournamentInfoCard;
  selectedLang: string = 'en';

  constructor(
    private translate: TranslateService,
    private dialog: DialogService,
    private apiService: ApiService,
    private authService: AuthService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.selectedLang = localStorage.getItem('lang') ?? 'en';

    this.authService.currentUser$.subscribe((profile) => {
      if (profile === null) return;

      this.isLoading = true;
      this.currentUserProfile = profile;
      this.newUsername = this.currentUserProfile.username;

      this.isParticipant = this.currentUserProfile.roleName === USER_ROLES.TOURNAMENT_PARTICIPANT;

      if (this.currentUserProfile.roleName === USER_ROLES.TOURNAMENT_PARTICIPANT) {
        this.imageService
          .getImageUrl(this.currentUserProfile.id, DEFAULT_IMG_PATHS.USER)
          .subscribe((url) => (this.userImageUrl = url));

        this.getUserTeams(this.currentUserProfile.id);
        return;
      }

      this.getUserTournaments(this.currentUserProfile.id);
    });
  }

  onUserNameSaveClick() {
    if (this.newUsername.length === 0) return;

    this.apiService
      .request<null, ChangeUsernameRequest>({
        method: 'patch',
        url: SERVER_ROUTES.USER.EDIT_USERNAME,
        body: {
          username: this.newUsername,
        },
      })
      .subscribe({
        next: () => {
          this.currentUserProfile!.username = this.newUsername;
          this.showUsernameEdit = false;
        },
        error: (error) => {
          this.usernameErrorMsg = error;
          this.newUsername = '';
        },
      });
  }

  onPlatformConfigClick(config: PlatformConfig) {
    this.dialog.open(config.component);
  }

  onPasswordChangeClick() {
    this.dialog.open(PasswordChangeComponent);
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
              url: SERVER_ROUTES.TEAM.REMOVE_MEMBER,
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

  switchLanguage(isEnglish: boolean) {
    this.translate.use(isEnglish ? 'en' : 'bg');
    localStorage.setItem('lang', isEnglish ? 'en' : 'bg');
  }

  private getUserTeams(userId: string) {
    this.apiService
      .request<Team[]>({
        method: 'get',
        url: SERVER_ROUTES.TEAM.GET_ALL,
        queryParams: {
          userIds: [userId],
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

        this.teamsData.forEach((t) =>
          this.imageService.getImageUrl(t.id, DEFAULT_IMG_PATHS.TEAM).subscribe((url) => (t.imgUrl = url))
        );

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
  }

  private getUserTournaments(userId: string) {
    this.apiService
      .request<Tournament[]>({
        method: 'get',
        url: SERVER_ROUTES.TOURNAMENT.GET_ALL,
        queryParams: {
          userIds: [userId],
        },
      })
      .subscribe((response) => {
        this.tournamentsData = response;
        this.isLoading = false;

        this.tournamentsData.forEach((t) =>
          this.imageService.getImageUrl(t.id, DEFAULT_IMG_PATHS.TOURNAMENT).subscribe((url) => (t.imgUrl = url))
        );
      });
  }
}
