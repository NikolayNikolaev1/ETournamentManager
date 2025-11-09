import { Subscription } from 'rxjs';

import { Component, OnDestroy, OnInit } from '@angular/core';

import { BrandingService } from 'app/services/branding.service';

@Component({
  selector: 'app-platform-info',
  templateUrl: './platform-info.component.html',
  styleUrl: './platform-info.component.scss',
})
export class PlatformInfoComponent implements OnInit, OnDestroy {
  name: string = '';
  url: string = '';
  email: string = '';
  infoSub!: Subscription;

  constructor(private brandingService: BrandingService) {}

  ngOnInit() {
    this.brandingService.platformInfo$.subscribe((info) => {
      this.name = info.platformName;
      this.email = info.contactEmail;
      this.url = info.contactLink;
    });
  }

  ngOnDestroy() {
    this.infoSub.unsubscribe();
  }

  onFormChange({ name, url, email }: any) {
    this.name = name;
    this.url = url;
    this.email = email;
  }

  onSubmit() {
    this.brandingService
      .updatePlatformInfoRequest({
        platformName: this.name,
        contactLink: this.url,
        contactEmail: this.email,
      })
      .subscribe(() => location.reload());
  }
}
