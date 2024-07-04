import { Component, Input } from '@angular/core';

import Team from 'app/models/team.model';

@Component({
  selector: 'app-teams-section',
  templateUrl: './teams-section.component.html',
  styleUrl: './teams-section.component.scss',
})
export class TeamsSectionComponent {
  @Input('title') sectionTitle: string = 'Teams';
  @Input({ alias: 'teams', required: true }) teamsList: Team[] = [];
}
