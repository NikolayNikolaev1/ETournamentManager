import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import Team from 'app/models/team.model';
import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrl: './team-details.component.scss',
})
export class TeamDetailsComponent implements OnInit {
  teamId: string = '';
  teamData: Team | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit() {
    this.teamId = this.route.snapshot.paramMap.get('id') ?? '';
    this.getTeamDetails();
  }

  private getTeamDetails() {
    this.apiService
      .request<Team>({ url: `${SERVER_ROUTES.TEAM.GET}/${this.teamId}`, method: 'get', queryParams: {search: 'test'} })
      .subscribe((response) => (this.teamData = response));
  }
}
