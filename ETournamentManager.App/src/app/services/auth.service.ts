import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import UserProfile from 'app/models/user-profile.model';
import { TOKEN_KEY_NAME } from 'app/utils/constants';

import { ApiService } from './api.service';

const LOGIN_ROUTE: string = 'Auth/Login';

type LOGIN_REQUEST_BODY = { username: string; password: string };
type LOGIN_RESPONSE_TYPE = { token: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  currentUser$ = this.userSubject.asObservable();
  isAuthenticated: boolean = false;

  constructor(private apiService: ApiService) {}

  getUserProfile() {
    const token = localStorage.getItem(TOKEN_KEY_NAME);

    if (token !== null) {
      this.apiService
        .request<UserProfile>({ url: 'User/GetProfile', method: 'get' })
        .subscribe((response) => this.updateCurrentUser(response));
    }
  }

  login(username: string, password: string) {
    return this.apiService.request<LOGIN_RESPONSE_TYPE, LOGIN_REQUEST_BODY>({
      url: LOGIN_ROUTE,
      method: 'post',
      body: { username, password },
    });
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY_NAME);
    this.updateCurrentUser(null);
  }

  private updateCurrentUser(user: UserProfile | null) {
    this.userSubject.next(user);
    this.isAuthenticated = user !== null;
  }
}
