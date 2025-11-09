import { Component, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';

import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { BrandingService } from './services/branding.service';
import { SERVER_ROUTES } from './utils/constants';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(
    private translate: TranslateService,
    private apiService: ApiService,
    private authService: AuthService,
    private brandingService: BrandingService
  ) {}

  ngOnInit() {
    this.translate.addLangs(['en', 'bg']);
    this.translate.setDefaultLang('en');
    this.translate.use(localStorage.getItem('lang') ?? 'en');

    this.authService.getUserProfile();
    this.brandingService.getBranding();
    this.updateTheme();
  }

  updateTheme() {
    this.apiService
      .request<{
        primaryColor: string;
        secondaryColor: string;
        textColor: string;
        backgroundColor: string;
      }>({ url: SERVER_ROUTES.BRANDING.GET, method: 'get' })
      .subscribe((response) => {
        const root = document.documentElement;

        root.style.setProperty('--primary-color', response.primaryColor);
        root.style.setProperty('--secondary-color', response.secondaryColor);
        root.style.setProperty('--text-color', response.textColor);
        root.style.setProperty('--background-color', response.backgroundColor);
      });
  }
}
