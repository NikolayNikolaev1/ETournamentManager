import { Component, EventEmitter, Input, Output } from '@angular/core';

import { InputType } from 'app/utils/types';

interface InputField {
  name: string;
  value: string;
  label: string;
  type?: InputType;
  required?: boolean;
}

@Component({
  selector: 'app-e-form',
  templateUrl: './e-form.component.html',
  styleUrl: './e-form.component.scss',
})
export class EFormComponent {
  @Input({ required: true }) title: string = '';
  @Input({ alias: 'buttonLabel' }) btnLabel: string = 'Submit';
  @Input({ alias: 'inputFields', required: true }) inputComponetData: InputField[] = [];
  @Input('error') errorMessage: string = '';
  @Output() formInputsChanged = new EventEmitter<any>();
  @Output() submitted = new EventEmitter();

  isSubmitBtnDisabled = () => this.inputComponetData.some((i: InputField) => i.required && i.value.length === 0);

  onInputChanged(index: number, newValue: string) {
    this.inputComponetData[index].value = newValue;
    let obj: any = {};

    this.inputComponetData.forEach((i) => (obj[i.name] = i.value));

    this.formInputsChanged.emit(obj);
  }

  onSubmitClick() {
    this.errorMessage = '';
    this.submitted.emit();
  }
}
