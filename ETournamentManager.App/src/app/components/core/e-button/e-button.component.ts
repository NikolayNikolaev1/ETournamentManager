import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-e-button',
  templateUrl: './e-button.component.html',
  styleUrl: './e-button.component.scss',
})
export class EButtonComponent {
  @Input() color: string = 'var(--primary-color)';
}
