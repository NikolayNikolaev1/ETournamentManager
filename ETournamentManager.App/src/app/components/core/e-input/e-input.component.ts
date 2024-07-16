import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';

import { InputType } from 'app/utils/types';

@Component({
  selector: 'app-e-input',
  templateUrl: './e-input.component.html',
  styleUrl: './e-input.component.scss',
})
export class EInputComponent {
  @Input({ required: true }) value: string = '';
  @Input({ required: true }) label: string = '';
  @Input() type: InputType = 'text';
  @Output() inputChanged = new EventEmitter<string>();

  onInputChange() {
    this.inputChanged.emit(this.value);
  }
}
