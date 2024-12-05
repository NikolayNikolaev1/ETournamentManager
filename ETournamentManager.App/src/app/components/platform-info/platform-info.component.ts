import { Component } from '@angular/core';

import { BrandingService } from 'app/services/branding.service';

@Component({
  selector: 'app-platform-info',
  templateUrl: './platform-info.component.html',
  styleUrl: './platform-info.component.scss',
})
export class PlatformInfoComponent {
  name: string = '';
  url: string = '';
  email: string = '';

  constructor(private brandingService: BrandingService) {}

  onFormChange({ name, url, email }: any) {
    this.name = name;
    this.url = url;
    this.email = email;
  }

  onSubmit() {
    this.brandingService.updatePlatformInfoRequest({
      platformName: this.name,
      urlLink: this.url,
      emailLink: this.email,
    }).subscribe(() => {
      
    });
  }
}
