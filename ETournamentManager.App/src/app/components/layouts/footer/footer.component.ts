import { Component, OnInit } from '@angular/core';

import { BrandingService } from 'app/services/branding.service';
import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  logoUrl: string = '';
  contactLink: string = '';
  contactEmail: string = '';

  constructor(
    private imageService: ImageService,
    private brandingService: BrandingService
  ) {}

  ngOnInit() {
    this.brandingService.platformInfo$.subscribe(({ contactLink, contactEmail }) => {
      this.contactLink = contactLink;
      this.contactEmail = contactEmail;
    });
    this.imageService.getImageUrl('logo', '').subscribe((url) => (this.logoUrl = url));
  }
}
