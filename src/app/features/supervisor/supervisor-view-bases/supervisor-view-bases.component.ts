import { Component, OnInit } from '@angular/core';
import { BaseCardComponent } from "../../../shared/components/base-card/base-card.component";
import { ClientCollectionService } from '../../../services/clientCollectionService';

@Component({
  selector: 'app-supervisor-view-bases',
  standalone: true,
  imports: [BaseCardComponent],
  templateUrl: './supervisor-view-bases.component.html',
  styleUrl: './supervisor-view-bases.component.css'
})
export class SupervisorViewBasesComponent implements OnInit{
  clientCollections: any[] = [];
  constructor(private clientCollectionService: ClientCollectionService) {}

  ngOnInit() {
    const userId = Number(sessionStorage.getItem('userId')); 
    this.clientCollectionService.getCollectionsByUserId(userId).subscribe({
      next:response=>{
        this.clientCollections=response;
      },
      error:error=>console.error(error)
    })
  }
}
