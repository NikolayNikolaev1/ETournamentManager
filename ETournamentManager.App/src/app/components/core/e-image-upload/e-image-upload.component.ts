import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ApiService } from 'app/services/api.service';
import { SERVER_ROUTES } from 'app/utils/constants';

@Component({
  selector: 'app-e-image-upload',
  templateUrl: './e-image-upload.component.html',
  styleUrl: './e-image-upload.component.scss',
})
export class EImageUploadComponent {
  @Input() entityId: string = '';
  @Output() changedImage = new EventEmitter<File | null>();
  imageFile: File | null = null;

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  constructor(private apiServie: ApiService) {}

  getImageUrl() {
    return window.URL.createObjectURL(this.imageFile!);
  }

  triggerFileChange() {
    this.fileInputRef.nativeElement.click();
  }

  onFileChange(event: Event) {
    this.imageFile = (event.target as HTMLInputElement).files?.item(0) ?? null;
    this.changedImage.emit(this.imageFile);

    this.apiServie
      .request<null, { entityId: string; file: any }>({
        method: 'post',
        url: SERVER_ROUTES.IMAGE.UPLOAD,
        body: {
          entityId: this.entityId,
          file: this.imageFile,
        },
        isFile: true,
      })
      .subscribe();
  }

  onDeleteClick() {
    this.apiServie
      .request({ url: `${SERVER_ROUTES.IMAGE.DELETE}/${this.entityId}`, method: 'delete' })
      .subscribe(() => {
        this.imageFile = null;
        this.changedImage.emit(null);
      });
  }
}
