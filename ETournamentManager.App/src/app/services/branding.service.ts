import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

import { AccessManagementModel, InfoManagementModel } from 'app/configurations/branding.config';
import BrandingListingModel from 'app/models/branding.model';
import { SERVER_ROUTES } from 'app/utils/constants';

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
  private themeSubject = new BehaviorSubject<{
    primaryColor: string;
    secondaryColor: string;
    textColor: string;
    backgroundColor: string;
  }>({
    primaryColor: '',
    backgroundColor: '',
    secondaryColor: '',
    textColor: '',
  });
  accessPermissions$ = this.accessSubject.asObservable();
  platformInfo$ = this.platformInfoSubject.asObservable();
  theme$ = this.themeSubject.asObservable();

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
          primaryColor,
          secondaryColor,
          textColor,
          backgroundColor,
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

          this.themeSubject.next({
            primaryColor,
            secondaryColor,
            textColor,
            backgroundColor,
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
