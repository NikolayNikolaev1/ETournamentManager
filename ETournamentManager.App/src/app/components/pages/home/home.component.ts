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
    this.apiServie
      .request({ url: `User/GetAll`, method: 'get', queryParams: { search: 'test' } })
      .subscribe();
  }
}
