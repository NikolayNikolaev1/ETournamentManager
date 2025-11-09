import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { DialogService } from '@ngneat/dialog';

import { BrandingService } from 'app/services/branding.service';

@Component({
  selector: 'app-access-permissions',
  templateUrl: './access-permissions.component.html',
  styleUrl: './access-permissions.component.scss',
})
export class AccessPermissionsComponent implements OnInit, OnDestroy {
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
