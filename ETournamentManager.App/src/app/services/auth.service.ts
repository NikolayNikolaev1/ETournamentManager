import { Injectable } from '@angular/core';

import { ADMIN_ROLE } from '../utils/constants';
import { ApiService } from './api.service';
import { environment } from 'environments/environment.development';
import { BehaviorSubject } from 'rxjs';

import UserProfile from 'app/models/user-profile.model';
import { TOKEN_KEY_NAME } from 'app/utils/constants';

const LOGIN_ROUTE: string = 'Auth/Login';

type LOGIN_REQUEST_BODY = { username: string; password: string };
type LOGIN_RESPONSE_TYPE = { token: string };

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new BehaviorSubject<UserProfile | null>(null);
  currentUser$ = this.userSubject.asObservable();
  isAuthenticated: boolean = localStorage.getItem(TOKEN_KEY_NAME) !== null;
  isAdmin: boolean = false;

  constructor(private apiService: ApiService) {}

  getUserProfile() {
    const token = localStorage.getItem(TOKEN_KEY_NAME);

    if (token !== null) {
      this.apiService
        .request<UserProfile>({ url: 'User/GetProfile', method: 'get' })
        .subscribe((response) => this.updateCurrentUser(response));
    }
  }

  google() {
    let requestUrl = `${environment.apiUrl}/api/Auth/GoogleLogin`;
    const returnUrl = encodeURIComponent(`${window.location.origin}/auth-callback`);
    window.location.href = `${requestUrl}?returnUrl=${encodeURIComponent(returnUrl)}`;

    // this.apiService
    //   .request({
    //     url: 'Auth/GoogleLogin',
    //     method: 'get',
    //     queryParams: {
    //       returnUrl,
    //     },
    //   })
    //   .subscribe();
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
    this.isAdmin = user?.roleName === ADMIN_ROLE;
  }

  saveToken(token: string) {
    localStorage.setItem(TOKEN_KEY_NAME, token);
    this.getUserProfile();
  }
}
