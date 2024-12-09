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
    contactLink: '',
    contactEmail: '',
  });
  accessPermissions$ = this.accessSubject.asObservable();
  platformInfo$ = this.platformInfoSubject.asObservable();

  constructor(private apiService: ApiService) {}

  updateAccessPermissions = (permissions: AccessManagementModel) => this.accessSubject.next(permissions);
  updatePlatformInfo = (platformInfo: InfoManagementModel) => this.platformInfoSubject.next(platformInfo);

  getBranding() {
    this.apiService
      .request<BrandingListingModel>({ url: SERVER_ROUTES.BRANDING.GET, method: 'get' })
      .subscribe(
        ({
          accessTeamDetails,
          accessTeamTable,
          accessTournamentDetails,
          accessTournamentTable,
          platformName,
          contactLink,
          contactEmail,
        }) => {
          this.accessSubject.next({
            accessTeamTable,
            accessTeamDetails,
            accessTournamentDetails,
            accessTournamentTable,
          });

          this.platformInfoSubject.next({
            contactEmail,
            contactLink,
            platformName,
          });
        }
      );
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
