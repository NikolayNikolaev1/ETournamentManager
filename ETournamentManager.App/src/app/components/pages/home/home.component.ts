import { Component, OnInit } from '@angular/core';

import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  imageFile: File | null = null;
  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {
    // this.apiServie.request({ url: `Image/Delete/tester`, method: 'delete' }).subscribe();
  }

  handleFileInput(event: Event) {
    this.imageFile = (event.target as HTMLInputElement).files?.item(0) ?? null;
  }

  Submit() {
    this.apiServie
      .request<null, { entityId: string; file: any }>({
        method: 'post',
        url: SERVER_ROUTES.IMAGE.UPLOAD,
        body: {
          entityId: 'testing',
          file: this.imageFile,
        },
        isFile: true,
      })
      .subscribe();
    // this.apiServie.uploadImage('tester', this.imageFile.item(0)).subscribe();
  }
}
