import { Component, EventEmitter, Input, Output } from '@angular/core';

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
  @Input() required: boolean = false;
  @Output() inputChanged = new EventEmitter<string>();
  invalid: boolean = false;

  onInputChange() {
    this.inputChanged.emit(this.value);
  }

  onInputBlur() {
    
    if (this.required) this.invalid = this.value.length === 0;
    console.log(this.value.length);
    console.log(this.required);
  }
}
