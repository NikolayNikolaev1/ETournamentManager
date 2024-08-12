import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InfoCard } from 'app/utils/types';

@Component({
  selector: 'app-e-info-card',
  templateUrl: './e-info-card.component.html',
  styleUrl: './e-info-card.component.scss',
})
export class EInfoCardComponent {
  @Input({ alias: 'cardData', required: true }) infoCard!: InfoCard;
  @Output() cardClicked = new EventEmitter<string>();

  onCardClick(id: string) {
    this.cardClicked.emit(id);
  }
}
