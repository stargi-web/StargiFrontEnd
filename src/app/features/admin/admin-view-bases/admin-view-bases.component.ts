import { Component, OnInit } from '@angular/core';
import { ClientCollection } from '../../../core/models/collectionModel';
import { ClientCollectionService } from '../../../services/clientCollectionService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-view-bases',
  standalone: true,
  imports: [],
  templateUrl: './admin-view-bases.component.html',
  styleUrl: './admin-view-bases.component.css'
})
export class AdminViewBasesComponent implements OnInit {
  collections: ClientCollection[] = [];
  constructor(private clientCollectionService:ClientCollectionService,private router: Router){}
  ngOnInit(): void {
    this.clientCollectionService.getAllCollections().subscribe({
      next:response=>{
        this.collections=response;
      },
      error:error=>console.error(error)
    })
  }
  viewDetails(id:string){
    this.router.navigate(['/admin/base-detail', id]);
  }
}
