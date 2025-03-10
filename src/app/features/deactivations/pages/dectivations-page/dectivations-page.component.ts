import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FileUpload,
  FileUploadHandlerEvent,
  FileUploadModule,
} from 'primeng/fileupload';
import { DeactivationService } from '../../services/deactivation.service';
import { TableModule } from 'primeng/table';
import { Deactivation } from '../../models/dactivation.interface';

@Component({
  selector: 'app-dectivations-page',
  standalone: true,
  imports: [CommonModule, FileUploadModule, ButtonModule, TableModule],
  templateUrl: './dectivations-page.component.html',
  styleUrl: './dectivations-page.component.css',
})
export class DectivationsPageComponent {
  deactivationList: Deactivation[] = [];
  uploadedFiles: any[] = [];

  constructor(private deactivationService: DeactivationService) {}

  ngOnInit() {
    this.getDeactivationList();
  }

  getDeactivationList() {
    this.deactivationService.getAllDeactivations().subscribe((response) => {
      this.deactivationList = response;
    });
  }

  onUpload(event: FileUploadHandlerEvent, fileUpload: FileUpload) {
    for (let file of event.files) {
      this.deactivationService.uploadFile(file).subscribe(() => {
        this.getDeactivationList();
        fileUpload.clear();
      });
    }
  }
}
