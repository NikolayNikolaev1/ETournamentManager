import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import UserProfile from 'app/models/user-profile.model'
import { TOKEN_KEY_NAME } from 'app/utils/constants'

import { ApiService } from './api.service'

const LOGIN_ROUTE: string = 'Auth/Login'

type LOGIN_REQUEST_BODY = { username: string; password: string }
type LOGIN_RESPONSE_TYPE = { token: string }

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUser: UserProfile | null = null
  private currentUserSource = new Subject<UserProfile | null>()
  currentUser$ = this.currentUserSource.asObservable()

  constructor(private apiService: ApiService) {}

  getCurrentUser = () => this.currentUser$

  getUserProfile() {
    const token = localStorage.getItem(TOKEN_KEY_NAME)
    if (token !== null && this.currentUser === null) {
      this.apiService
        .request<UserProfile>({ url: 'User/GetProfile', method: 'get' })
        .subscribe((response) => this.setCurrentUser(response))
    }
  }

  login(username: string, password: string) {
    return this.apiService.request<LOGIN_RESPONSE_TYPE, LOGIN_REQUEST_BODY>({
      url: LOGIN_ROUTE,
      method: 'post',
      body: { username, password },
    })
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY_NAME)
    this.setCurrentUser(null)
  }

  private setCurrentUser(user: UserProfile | null) {
    this.currentUserSource.next(user)
    this.currentUser = user
  }
}
