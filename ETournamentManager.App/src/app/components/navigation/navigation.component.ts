import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

import * as Constants from 'app/utils/constants';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
})
export class NavigationComponent implements OnInit, OnDestroy {
  constants = Constants;
  username: string | null = null;
  currentUserSub!: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.currentUserSub = this.authService.getCurrentUser().subscribe((currentUser) => {
      this.username = currentUser !== null ? currentUser.username : null;
    });
  }

  ngOnDestroy = () => this.currentUserSub.unsubscribe();

  onLogout = () => this.authService.logout();
}
