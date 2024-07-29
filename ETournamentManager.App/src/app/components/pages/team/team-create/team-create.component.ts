import { Component } from '@angular/core';

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

  onFormChanged({ name, tag, desciption }: TEAM_CREATE_FORM_MODEL) {
    this.name = name;
    this.tag = tag;
    this.description = desciption;
  }

  onCreateClick() {}
}
