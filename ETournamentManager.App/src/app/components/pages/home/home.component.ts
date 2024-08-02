import { Component, OnInit } from '@angular/core';

import { ApiService } from 'app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  imageFile: any;
  constructor(private apiServie: ApiService) {}

  ngOnInit(): void {
    this.apiServie.request({ url: `Image/Delete/tester`, method: 'delete' }).subscribe();
  }

  handleFileInput(e: any) {
    this.imageFile = e.target.files;
  }

  Submit() {
    this.apiServie.uploadImage('tester', this.imageFile.item(0)).subscribe();
  }
}
