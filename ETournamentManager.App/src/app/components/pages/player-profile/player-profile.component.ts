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
  teamsData: Team[] = [
    {
      id: '1',
      name: 'Tester',
      tag: 'TTT',
      imgUrl:
        'https://image.shutterstock.com/image-vector/dotted-spiral-vortex-royaltyfree-images-600w-2227567913.jpg',
      playersCount: 5,
      tournamentsWon: 3,
    },
    {
      id: '1',
      name: 'Tester',
      tag: 'TTT',
      imgUrl:
        'https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg?size=626&ext=jpg&ga=GA1.1.2113030492.1719619200&semt=ais_user',
      playersCount: 5,
      tournamentsWon: 3,
    },
    {
      id: '1',
      name: 'Tester',
      tag: 'TTT',
      imgUrl:
        'https://media.wired.com/photos/65382632fd3d190c7a1f5c68/16:9/w_2400,h_1350,c_limit/Google-Image-Search-news-Gear-GettyImages-824179306.jpg',
      playersCount: 5,
      tournamentsWon: 3,
    },
  ];

  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserSub = this.authService.getCurrentUser().subscribe((currentUser) => {
      this.currentUserProfile = currentUser;

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
    });
  }
}
