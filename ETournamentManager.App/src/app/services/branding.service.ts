import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { AccessManagementModel } from 'app/components/access-management/access-management.config';
import BrandingListingModel from 'app/models/branding.model';
import { SERVER_ROUTES } from 'app/utils/constants';

import { ApiService } from './api.service';

type AccessManagement = {
  accessTeamTable: boolean;
  accessTournamentTable: boolean;
  accessTeamDetails: boolean;
  accessTournamentDetails: boolean;
};

@Injectable({
  providedIn: 'root',
})
export class BrandingService {
  private accessSubject = new BehaviorSubject<AccessManagement>({
    accessTeamTable: true,
    accessTournamentTable: true,
    accessTeamDetails: true,
    accessTournamentDetails: true,
  });
  accessPermissions$ = this.accessSubject.asObservable();

  constructor(private apiService: ApiService) {}

  updateAccessPermissions(permissions: AccessManagement) {
    this.accessSubject.next(permissions);
  }

  getBranding() {
    this.apiService
      .request<BrandingListingModel>({ url: SERVER_ROUTES.BRANDING.GET, method: 'get' })
      .subscribe((response) => {
        const { accessTeamDetails, accessTeamTable, accessTournamentDetails, accessTournamentTable } = response;

        this.accessSubject.next({
          accessTeamTable,
          accessTeamDetails,
          accessTournamentDetails,
          accessTournamentTable,
        });
      });
  }

  updateAccessRequest(
    accessTeamDetails: boolean,
    accessTeamTable: boolean,
    accessTournamentTable: boolean,
    accessTournamentDetails: boolean
  ) {
    return this.apiService.request<null, AccessManagementModel>({
      url: SERVER_ROUTES.BRANDING.UPDATE_ACCESS,
      method: 'patch',
      body: {
        accessTeamDetails,
        accessTeamTable,
        accessTournamentTable,
        accessTournamentDetails,
      },
    });
  }
}
