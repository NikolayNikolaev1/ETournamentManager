import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DialogService } from '@ngneat/dialog';

import { AuthService } from 'app/services/auth.service';
import { USER_ROLES } from 'app/utils/constants';
import { NavPanelItem } from 'app/utils/types';

@Component({
  selector: 'app-navigation-panel',
  templateUrl: './navigation-panel.component.html',
  styleUrl: './navigation-panel.component.scss',
})
export class NavigationPanelComponent implements OnInit {
  @Input() panelItems: NavPanelItem[] = [];
  userRole: string = '';

  constructor(
    private router: Router,
    private dialogService: DialogService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.authService.currentUser$.subscribe((profile) => (this.userRole = profile?.roleName || USER_ROLES.GUEST));
  }

  onPanelItemClick(route: string, dialogComponent: any) {
    if (dialogComponent === undefined) {
      this.router.navigate([route]);
    } else {
      this.dialogService.open(dialogComponent);
    }
  }
}
