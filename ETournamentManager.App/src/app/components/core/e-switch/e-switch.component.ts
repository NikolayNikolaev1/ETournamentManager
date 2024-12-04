import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-e-switch',
  templateUrl: './e-switch.component.html',
  styleUrl: './e-switch.component.scss',
  animations: [
    trigger('toggleTrigger', [
      state('off', style({ transform: 'translateX(0%)' })),
      state('on', style({ transform: 'translateX(85%)' })),
      transition('on <=> off', [animate('120ms ease-in-out')]),
    ]),
  ],
})
export class ESwitchComponent {
  @Input('on') switchOn = false;
  @Input('label') mainLabel: string = '';
  @Input() switchLabels: { on: string; off: string } = { on: 'On', off: 'Off' };
  @Input() colors: { on: string; off: string } = { on: 'initial', off: 'initial' };
  @Output() toggled = new EventEmitter<boolean | undefined>();

  onSwitchClick() {
    this.switchOn = !this.switchOn;
    this.toggled.emit(this.switchOn);
  }
}
