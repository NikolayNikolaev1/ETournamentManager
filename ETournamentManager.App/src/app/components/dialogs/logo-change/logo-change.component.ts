import { Component, OnInit } from '@angular/core';

import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'app-logo-change',
  templateUrl: './logo-change.component.html',
  styleUrl: './logo-change.component.scss',
})
export class LogoChangeComponent implements OnInit {
  logoUrl: string = '';

  constructor(private imageService: ImageService) {}

  ngOnInit() {
    this.imageService.getImageUrl('logo', '').subscribe((url) => (this.logoUrl = url));
  }
}
