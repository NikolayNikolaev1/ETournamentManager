import { Component, OnInit } from '@angular/core';

import { DialogRef, DialogService } from '@ngneat/dialog';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrl: './confirmation.component.scss',
})
export class ConfirmationComponent implements OnInit {
  title: string = 'Are you sure?';
  constructor(
    private readonly dialogService: DialogService,
    private ref: DialogRef<{
      title: string;
      event: () => any;
    }>
  ) {}

  ngOnInit() {
    if (this.ref.data) {
      this.title = this.ref.data.title;
    }
  }

  onConfirmClick() {
    this.ref.data.event();
    this.dialogService.closeAll();
  }

  onCancel() {
    this.dialogService.closeAll();
  }
}
