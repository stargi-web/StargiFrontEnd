import { Component, OnInit } from '@angular/core';
import { ClientCollection } from '../../../../core/models/collectionModel';
import { ClientCollectionService } from '../../../../core/services/nestjs-services/clientCollectionService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-collections-page',
  standalone: true,
  imports: [],
  templateUrl: './client-collections-page.component.html',
  styleUrl: './client-collections-page.component.css',
})
export class ClientCollectionsPageComponent {
  collections: ClientCollection[] = [];
  constructor(
    private clientCollectionService: ClientCollectionService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.clientCollectionService.getAllCollections().subscribe({
      next: (response) => {
        this.collections = response;
      },
      error: (error) => console.error(error),
    });
  }
  viewDetails(id: string) {
    this.router.navigate(['/client/collection', id]);
  }
}
