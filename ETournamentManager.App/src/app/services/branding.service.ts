import { BehaviorSubject, of } from 'rxjs';

import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BrandingService {
  tournamentDetails = new BehaviorSubject<boolean>(false);
  tourSub$ = this.tournamentDetails.asObservable();

  constructor(private apiService: ApiService) {}

  get() {
    setTimeout(() => this.tournamentDetails.next(true), 1000);
  }
}
