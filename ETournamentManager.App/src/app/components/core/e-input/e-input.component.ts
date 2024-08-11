import { Subject, debounceTime } from 'rxjs';

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { InputType } from 'app/utils/types';

@Component({
  selector: 'app-e-input',
  templateUrl: './e-input.component.html',
  styleUrl: './e-input.component.scss',
})
export class EInputComponent implements OnInit {
  @Input() value: string = '';
  @Input({ required: true }) label: string = '';
  @Input() type: InputType = 'text';
  @Input() required: boolean = false;
  @Input() isSearch: boolean = false;
  @Input() searchResult: string[] = [];
  @Output() inputChanged = new EventEmitter<string>();
  @Output() searchResultSelected = new EventEmitter<number>();
  invalid: boolean = false;
  searchValue = new Subject<string>();

  ngOnInit() {
    this.searchValue
      .pipe(debounceTime(300))
      .subscribe((searchValue) => this.inputChanged.emit(searchValue));
  }

  onInputChange() {
    this.inputChanged.emit(this.value);
  }
  onInput() {
    //TODO: fix showing all results on empty input.
    this.value = this.value.trim();
    if (this.value.length === 0) {
      this.searchResult = [];
      return;
    }

    this.searchValue.next(this.value);
  }

  onInputBlur() {
    if (this.required) this.invalid = this.value.length === 0;
  }

  onSearchResultClick(index: number) {
    this.searchResultSelected.emit(index);
    this.value = '';
    this.searchResult = [];
  }
}
