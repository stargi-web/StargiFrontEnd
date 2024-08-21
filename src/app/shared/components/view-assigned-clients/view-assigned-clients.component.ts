import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClientService } from '../../../services/clientService';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-view-assigned-clients',
  standalone: true,
  imports: [TableModule],
  templateUrl: './view-assigned-clients.component.html',
  styleUrl: './view-assigned-clients.component.css'
})
export class ViewAssignedClientsComponent {
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
    this.collectionId = Number(this.route.snapshot.paramMap.get('baseId'));
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
}
