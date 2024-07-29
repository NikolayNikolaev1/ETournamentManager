import { Component } from '@angular/core';

import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

import { TEAM_CREATE_FORM_MODEL } from './team-create.configuration';

@Component({
  selector: 'app-team-create',
  templateUrl: './team-create.component.html',
  styleUrl: './team-create.component.scss',
})
export class TeamCreateComponent {
  name: string = '';
  tag: string = '';
  description: string = '';
  errorMessage: string = '';

  constructor(private apiService: ApiService) {}

  onFormChanged({ name, tag, description }: TEAM_CREATE_FORM_MODEL) {
    this.name = name;
    this.tag = tag;
    this.description = description;
  }

  onCreateClick() {
    this.apiService
      .request<string, TEAM_CREATE_FORM_MODEL>({
        url: SERVER_ROUTES.TEAM.CREATE,
        method: 'post',
        body: {
          name: this.name,
          tag: this.tag,
          description: this.description,
        },
      })
      .subscribe({
        error: (error) => (this.errorMessage = error),
      });
  }
}
