import { Component, ElementRef, Input, ViewChild } from '@angular/core';

import { ImageService } from 'app/services/image.service';

@Component({
  selector: 'app-e-image-upload',
  templateUrl: './e-image-upload.component.html',
  styleUrl: './e-image-upload.component.scss',
})
export class EImageUploadComponent {
  @Input() entityId: string = '';
  @Input() imgUrl: string | null = null;
  @Input() hideActions: boolean = false;
  imageFile: File | null = null;
  errorMessage: string = '';

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(private imageService: ImageService) {}

  getImageUrl = () => window.URL.createObjectURL(this.imageFile!);

  triggerFileChange() {
    this.errorMessage = '';
    this.imgUrl = null;
    this.fileInputRef.nativeElement.click();
  }

  onFileChange(event: Event) {
    this.imageFile = (event.target as HTMLInputElement).files?.item(0)!;

    this.imageService.upload(this.entityId, this.imageFile).subscribe({
      error: (error) => {
        this.errorMessage = error;
        this.imageFile = null;
      },
    });
  }

  onDeleteClick() {
    this.imgUrl = null;

    this.imageService.delete(this.entityId).subscribe(() => (this.imageFile = null));
  }
}
