import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService } from '@ngneat/dialog';

import { ApiService } from 'app/services/api.service';
import { BrandingService } from 'app/services/branding.service';

@Component({
  selector: 'app-access-management',
  templateUrl: './access-management.component.html',
  styleUrl: './access-management.component.scss',
})
export class AccessManagementComponent implements OnInit, OnDestroy {
  accessTeamDetails: boolean = false;
  accessTeamTable: boolean = false;
  accessTournamentTable: boolean = false;
  accessTournamentDetails: boolean = false;
  accessSub!: Subscription;

  constructor(
    private dialogService: DialogService,
    private brandingService: BrandingService
  ) {}

  ngOnInit() {
    this.brandingService.accessPermissions$.subscribe((permissions) => {
      const { accessTeamDetails, accessTeamTable, accessTournamentTable, accessTournamentDetails } = permissions;

      this.accessTeamDetails = accessTeamDetails;
      this.accessTeamTable = accessTeamTable;
      this.accessTournamentDetails = accessTournamentDetails;
      this.accessTournamentTable = accessTournamentTable;
    });
  }

  ngOnDestroy() {
    this.accessSub.unsubscribe();
  }

  onSaveClick() {
    this.brandingService
      .updateAccessRequest({
        accessTeamDetails: this.accessTeamDetails,
        accessTeamTable: this.accessTeamTable,
        accessTournamentTable: this.accessTournamentTable,
        accessTournamentDetails: this.accessTournamentDetails,
      })
      .subscribe(() => {
        this.brandingService.updateAccessPermissions({
          accessTeamDetails: this.accessTeamDetails,
          accessTeamTable: this.accessTeamTable,
          accessTournamentTable: this.accessTournamentTable,
          accessTournamentDetails: this.accessTournamentDetails,
        });
        this.dialogService.closeAll();
      });
  }
}
