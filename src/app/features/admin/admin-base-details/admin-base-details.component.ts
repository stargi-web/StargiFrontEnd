import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/clientService';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin-base-details',
  standalone: true,
  imports: [TableModule,FileUploadModule, ToastModule, CommonModule],
  providers: [MessageService],
  templateUrl: './admin-base-details.component.html',
  styleUrl: './admin-base-details.component.css'
})
export class AdminBaseDetailsComponent implements OnInit{
  uploadedFiles: any[] = [];
  disable=false;
  cols!: any[];
  clients!: any[];
  loading=true;
  collectionId!:number;
  userId!:number;
  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService
  ) {}
  ngOnInit(): void {
    this.collectionId = Number(this.route.snapshot.paramMap.get('id'));
    this.userId=Number(sessionStorage.getItem('userId'));
    this.clientService.getByCollectionId(this.collectionId).subscribe((data: any[]) => {
      this.clients = data;
      data.length===0?this.cols=[]:this.cols = this.getColumns(data[0].dataInfo);
  
      this.loading=false;
    });
  }
  getColumns(dataInfo: any): any[] {
    const dynamicCols = Object.keys(dataInfo).map(key => ({
      field: `dataInfo.${key}`,
      header: key
    }));

    return [
      { field: 'id', header: 'ID' },
      { field: 'stage', header: 'Estado' },
      ...dynamicCols
    ];
  }
  onBasicUploadAuto(event: any) {
    this.disable=true;
    const file = event.files[0];
    const collectionId = this.collectionId.toString();  
    const userId = this.userId.toString();  
    this.clientService.uploadClientFile(collectionId, userId, file).subscribe(
      response => {
        console.log('File uploaded successfully', response);
        window.location.reload();
      },
      error => {
        console.error('Error uploading file', error);
      }
    );
  }

}

