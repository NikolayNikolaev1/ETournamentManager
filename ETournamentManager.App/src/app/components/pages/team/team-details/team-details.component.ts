import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import { TeamManagementComponent } from '../../../dialogs/team-management/team-management.component';

import { ConfirmationComponent } from 'app/components/core/confirmation/confirmation.component';
import { DEFAULT_IMG_PATHS } from 'app/configurations/image.config';
import Team from 'app/models/team.model';
import Tournament from 'app/models/tournament.model';
import UserProfile from 'app/models/user-profile.model';
import User, { UserBase } from 'app/models/user.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { ImageService } from 'app/services/image.service';
import { CLIENT_ROUTES, SERVER_ROUTES, TOURNAMENT_PARTICIPANT_ROLE, USER_ROLES } from 'app/utils/constants';
import { convertTournamentInfoCard, convertUserInfoCard } from 'app/utils/info-card-converter';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss',
})
export class TeamDetailsComponent implements OnInit {
  clientRoutes = CLIENT_ROUTES;
  teamId: string = '';
  teamData: Team | null = null;
  teamImageUrl: string = '';
  searchUsers: User[] = [];
  searchUsernames: string[] = [];
  currentUserProfile: UserProfile | null = null;
  hasCaptainPermissions: boolean = false;
  teamTournaments: Tournament[] = [];
  activeTournaments: Tournament[] = [];
  finishedTournaments: Tournament[] = [];
  futureTournaments: Tournament[] = [];
  filteredTournaments: Tournament[] = [];
  selectedTournamentFilter: string = '';
  isMember: boolean = false;
  getUserInfoCard = convertUserInfoCard;
  getTournamentInfoCard = convertTournamentInfoCard;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dialog: DialogService,
    private apiService: ApiService,
    private authService: AuthService,
    private imageService: ImageService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((profile) => {
      this.currentUserProfile = profile;

      this.hasCaptainPermissions =
        this.currentUserProfile?.id === this.teamData?.captain.id ||
        this.currentUserProfile?.roleName === USER_ROLES.ADMIN;
        console.log(this.currentUserProfile)
    });

    this.teamId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTeamDetails();
    this.getTeamTournaments();
  }

  getUsersByUsername(username: string) {
    this.apiService
      .request<User[]>({
        method: 'get',
        url: SERVER_ROUTES.USER.GET_ALL,
        queryParams: {
          search: username,
          role: TOURNAMENT_PARTICIPANT_ROLE,
        },
      })
      .subscribe((response) => {
        this.searchUsers = response
          .filter((u) => !this.teamData?.members.map((m) => m.id).includes(u.id.toLowerCase()))
          .filter((u) => u.id.toLowerCase() !== this.teamData?.captain.id);
        this.searchUsernames = this.searchUsers.map((r) => r.userName);
      });
  }

  selectUser(index: number) {
    this.apiService
      .request<UserBase, { teamId: string; memberId: string }>({
        method: 'patch',
        url: SERVER_ROUTES.TEAM.ADD_MEMBER,
        body: {
          teamId: this.teamId,
          memberId: this.searchUsers[index].id,
        },
      })
      .subscribe((response) => {
        const newMember = response;

        this.imageService.getImageUrl(newMember.id, DEFAULT_IMG_PATHS.USER).subscribe((url) => {
          newMember.imgUrl = url;
          this.teamData?.members.push(newMember);
        });
      });
  }

  onRemoveMemberClick(memberId: string) {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to remove this member from the team?',
        event: () => {
          this.apiService
            .request<void, { memberId: string; teamId: string }>({
              url: SERVER_ROUTES.TEAM.REMOVE_MEMBER,
              method: 'patch',
              body: {
                teamId: this.teamId,
                memberId,
              },
            })
            .subscribe(() => (this.teamData!.members = this.teamData!.members.filter((m) => m.id !== memberId)));
        },
      },
    });
  }

  onEditClick() {
    if (!this.teamData) return;

    this.dialog.open(TeamManagementComponent, {
      data: {
        teamId: this.teamId,
        name: this.teamData.name,
        tag: this.teamData.tag,
        description: this.teamData.description,
        onEdit: (data: Team) => (this.teamData = data),
      },
    });
  }

  onDeleteClick() {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to delete the team?',
        event: () => {
          this.apiService
            .request({ url: `${SERVER_ROUTES.TEAM.DELETE}/${this.teamId}`, method: 'delete' })
            .subscribe(() => this.router.navigate([CLIENT_ROUTES.PROFILE]));
        },
      },
    });
  }

  onExitClick() {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to leave this team?',
        event: () => {
          if (this.currentUserProfile === null || this.currentUserProfile.id === this.teamData?.captain.id) return;

          this.apiService
            .request<void, { teamId: string; memberId: string }>({
              url: SERVER_ROUTES.TEAM.REMOVE_MEMBER,
              method: 'patch',
              body: {
                teamId: this.teamId,
                memberId: this.currentUserProfile.id,
              },
            })
            .subscribe(() => this.router.navigate([CLIENT_ROUTES.PROFILE]));
        },
      },
    });
  }

  onLeaveTournamentClick(tournamentId: string) {
    this.dialog.open(ConfirmationComponent, {
      data: {
        title: 'Are you sure you want to leave the tournament?',
        event: () => {
          this.apiService
            .request<null, { tournamentId: string; teamId: string }>({
              url: `${SERVER_ROUTES.TOURNAMENT.REMOVE_PARTICIPANT}`,
              method: 'patch',
              body: {
                tournamentId: tournamentId,
                teamId: this.teamId,
              },
            })
            .subscribe(() => (this.teamTournaments = this.teamTournaments.filter((t) => t.id !== tournamentId)));
        },
      },
    });
  }

  onTournamentNavSelect(filter: string) {
    this.selectedTournamentFilter = filter;

    switch (filter) {
      case 'active':
        this.filteredTournaments = this.teamTournaments.filter((t) => t.active);
        break;
      case 'past':
        this.filteredTournaments = this.teamTournaments.filter((t) => t.finished);
        break;
      case 'future':
        this.filteredTournaments = this.teamTournaments.filter((t) => !t.active && !t.finished);
        break;
    }
  }

  private getTeamDetails() {
    this.apiService
      .request<Team>({
        url: `${SERVER_ROUTES.TEAM.GET}/${this.teamId}`,
        method: 'get',
      })
      .subscribe((response) => {
        this.teamData = response;

        this.hasCaptainPermissions =
          this.currentUserProfile?.id === this.teamData.captain.id ||
          this.currentUserProfile?.roleName === USER_ROLES.ADMIN;

        this.imageService
          .getImageUrl(this.teamId, DEFAULT_IMG_PATHS.TEAM)
          .subscribe((url) => (this.teamImageUrl = url));

        this.imageService
          .getImageUrl(this.teamData.captain.id, DEFAULT_IMG_PATHS.USER)
          .subscribe((url) => (this.teamData!.captain.imgUrl = url));

        this.teamData.members.forEach((t) => {
          this.imageService.getImageUrl(t.id, DEFAULT_IMG_PATHS.USER).subscribe((url) => (t.imgUrl = url));
        });

        this.isMember =
          this.currentUserProfile !== null &&
          this.teamData.members.map((m) => m.id).includes(this.currentUserProfile.id);
      });
  }

  private getTeamTournaments() {
    this.apiService
      .request<Tournament[]>({
        url: `${SERVER_ROUTES.TOURNAMENT.GET_ALL}`,
        method: 'get',
        queryParams: {
          teamIds: [this.teamId],
        },
      })
      .subscribe((response) => {
        response.forEach((t) => {
          this.imageService.getImageUrl(t.id, DEFAULT_IMG_PATHS.TOURNAMENT).subscribe((url) => (t.imgUrl = url));
        });

        this.teamTournaments = response;

        this.activeTournaments = this.teamTournaments.filter((t) => t.active);
        this.finishedTournaments = this.teamTournaments.filter((t) => t.finished);
        this.futureTournaments = this.teamTournaments.filter((t) => !t.active && !t.finished);

        if (this.activeTournaments.length > 0) {
          this.filteredTournaments = this.activeTournaments;
          this.selectedTournamentFilter = 'active';
          return;
        }

        if (this.finishedTournaments.length > 0) {
          this.filteredTournaments = this.finishedTournaments;
          this.selectedTournamentFilter = 'past';
          return;
        }

        if (this.teamTournaments.length > 0) {
          this.filteredTournaments = this.teamTournaments;
          this.selectedTournamentFilter = 'future';
        }
      });
  }
}
