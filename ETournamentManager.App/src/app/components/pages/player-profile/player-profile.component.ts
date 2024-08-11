import { environment } from 'environments/environment.development';
import { Subscription } from 'rxjs';

import { Component, OnInit } from '@angular/core';

import Team from 'app/models/team.model';
import UserProfile from 'app/models/user-profile.model';
import { ApiService } from 'app/services/api.service';
import { AuthService } from 'app/services/auth.service';
import * as Constants from 'app/utils/constants';

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrl: './player-profile.component.scss',
})
export class PlayerProfileComponent implements OnInit {
  currentUserProfile: UserProfile | null = null;
  currentUserSub!: Subscription;
  teamsData: Team[] = [];

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.currentUserProfile = this.authService.getCurrentUser();

      if (this.currentUserProfile?.roleName === Constants.TOURNAMENT_PARTICIPANT_ROLE) {
        this.apiService
          .request<Team[]>({
            method: 'get',
            url: Constants.SERVER_ROUTES.TEAM.GetAll,
            queryParams: {
              userIds: [this.currentUserProfile.id, 'test'],
            },
          })
          .subscribe((response) => {
            this.teamsData = response;

            this.teamsData.forEach((t) => {
              this.apiService.request({ method: 'get', url: t.id, isFile: true }).subscribe({
                error: (isValid) =>
                  (t.imgUrl = isValid
                    ? `${environment.apiUrl}/UploadImages/${t.id}.png`
                    : 'assets/images/default-team-img.jpg'),
              });
            });
          });
      }
    }, 100);

    this.currentUserSub = this.authService.getCurrentUser$().subscribe((currentUser) => {
      this.currentUserProfile = currentUser;
    });
  }
}
