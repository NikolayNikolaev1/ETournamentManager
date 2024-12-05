import { BehaviorSubject } from 'rxjs';

import { Injectable } from '@angular/core';

import { AccessManagementModel, InfoManagementModel } from 'app/configurations/branding.config';
import BrandingListingModel from 'app/models/branding.model';
import { SERVER_ROUTES } from 'app/utils/constants';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class BrandingService {
  private accessSubject = new BehaviorSubject<AccessManagementModel>({
    accessTeamTable: false,
    accessTournamentTable: false,
    accessTeamDetails: false,
    accessTournamentDetails: false,
  });
  private platformInfoSubject = new BehaviorSubject<InfoManagementModel>({
    platformName: '',
    urlLink: '',
    emailLink: '',
  });
  accessPermissions$ = this.accessSubject.asObservable();
  platformInfo$ = this.platformInfoSubject.asObservable();

  constructor(private apiService: ApiService) {}

  updateAccessPermissions(permissions: AccessManagementModel) {
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

  updateAccessRequest = (model: AccessManagementModel) =>
    this.apiService.request<null, AccessManagementModel>({
      url: SERVER_ROUTES.BRANDING.UPDATE_ACCESS,
      method: 'patch',
      body: model,
    });

  updatePlatformInfoRequest = (model: InfoManagementModel) =>
    this.apiService.request<null, InfoManagementModel>({
      url: SERVER_ROUTES.BRANDING.UPDATE_INFO,
      method: 'patch',
      body: model,
    });
}
