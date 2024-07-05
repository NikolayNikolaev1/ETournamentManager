import { Injectable } from '@angular/core';

import UserProfile from 'app/models/user-profile.model';
import { TOKEN_KEY_NAME } from 'app/utils/constants';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser?: UserProfile;

  constructor(private apiService: ApiService) {}

  getCurrentUser = () => this.currentUser!;

  getUserProfile() {
    if (localStorage.getItem(TOKEN_KEY_NAME) && this.currentUser === undefined) {
      this.apiService.request<UserProfile>({ url: 'User/GetProfile', method: 'get' }).subscribe((response) => (this.currentUser = response));
    }
  }
}
