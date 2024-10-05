import { environment } from 'environments/environment.development';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Team from 'app/models/team.model';
import UserProfile from 'app/models/user-profile.model';
import User, { UserBase } from 'app/models/user.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import { SERVER_ROUTES, TOURNAMENT_PARTICIPANT_ROLE } from 'app/utils/constants';
import { convertUserInfoCard } from 'app/utils/info-card-converter';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss',
})
export class TeamDetailsComponent implements OnInit {
  teamId: string = '';
  teamData: Team | null = null;
  teamImageUrl: string = '';
  searchUsers: User[] = [];
  searchUsernames: string[] = [];
  currentUserProfile: UserProfile | null = null;
  teamMembersData: UserBase[] = [];
  getUserInfoCard = convertUserInfoCard;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    setTimeout(() => (this.currentUserProfile = this.authService.getCurrentUser()), 100);

    this.teamId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTeamDetails();
  }

  private getTeamDetails() {
    this.apiService
      .request<Team>({
        url: `${SERVER_ROUTES.TEAM.GET}/${this.teamId}`,
        method: 'get',
      })
      .subscribe((response) => {
        this.teamData = response;

        this.apiService.request({ method: 'get', url: this.teamId, isFile: true }).subscribe({
          error: (isValid) =>
            (this.teamImageUrl = isValid
              ? `${environment.apiUrl}/UploadImages/${this.teamId}.jpg`
              : 'assets/images/default-team-img.jpg'),
        });

        this.teamData.members.forEach((t) => {
          this.apiService.request({ method: 'get', url: t.id, isFile: true }).subscribe({
            error: (isValid) =>
              (t.imgUrl = isValid
                ? `${environment.apiUrl}/UploadImages/${t.id}.jpg`
                : 'assets/images/default-user-img.jpg'),
          });
        });

        this.apiService
          .request({ method: 'get', url: this.teamData.captain.id, isFile: true })
          .subscribe({
            error: (isValid) =>
              (this.teamData!.captain.imgUrl = isValid
                ? `${environment.apiUrl}/UploadImages/${this.teamData!.captain.id}.jpg`
                : 'assets/images/default-user-img.jpg'),
          });

        this.teamMembersData = [this.teamData.captain, ...this.teamData.members];
      });
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
      .request<Team, { teamId: string; memberId: string }>({
        method: 'patch',
        url: SERVER_ROUTES.TEAM.ADD_MEMBER,
        body: {
          teamId: this.teamId,
          memberId: this.searchUsers[index].id,
        },
      })
      .subscribe((response) => (this.teamData = response));
  }

  onRemoveMemberClick(memberId: string) {
    this.apiService
      .request<null, { memberId: string; teamId: string }>({
        url: SERVER_ROUTES.TEAM.REMOVE_MEMBER,
        method: 'patch',
        body: {
          teamId: this.teamId,
          memberId,
        },
      })
      .subscribe(() => this.getTeamDetails());
  }
}
