import { Component } from '@angular/core';

import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  imageFile: any;
  constructor(private apiServie: ApiService) {}

  handleFileInput(e: any) {
    this.imageFile = e.target.files;
  }

  Submit() {
    this.apiServie.uploadImage('tester', this.imageFile.item(0)).subscribe();
  }
}
