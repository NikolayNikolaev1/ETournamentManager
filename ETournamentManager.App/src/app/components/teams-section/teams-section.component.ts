import { Component, EventEmitter, Input, Output } from '@angular/core';

import Team from 'app/models/team.model';

interface InfoCard {
  id: string;
  name: string;
  subname?: string;
  imageUrl: string;
}

@Component({
  selector: 'app-teams-section',
  templateUrl: './teams-section.component.html',
  styleUrl: './teams-section.component.scss',
})
export class TeamsSectionComponent {
  @Input('title') sectionTitle: string = 'Teams';
  @Input({ alias: 'infoCards', required: true }) infoCardsList: InfoCard[] = [];
  @Output() cardClicked = new EventEmitter<string>();

  onCardClick(id: string) {
    this.cardClicked.emit(id);
  }
}
