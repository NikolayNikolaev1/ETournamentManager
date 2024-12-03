import { Component } from '@angular/core';

import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

import { THEMES, ThemeColors, ThemeManagementModel } from './theme-picker.config';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss',
})
export class ThemePickerComponent {
  themes: ThemeColors[] = THEMES;
  selectedThemeIndex: number = 0;

  constructor(private apiSerivce: ApiService) {}

  onSaveClick() {
    const { primary, secondary, text, background } = this.themes[this.selectedThemeIndex];
    this.apiSerivce
      .request<null, ThemeManagementModel>({
        url: SERVER_ROUTES.BRANDING.UPDATE_THEME,
        method: 'patch',
        body: {
          primaryColor: primary,
          secondaryColor: secondary,
          textColor: text,
          backgroundColor: background,
        },
      })
      .subscribe();
  }
}
