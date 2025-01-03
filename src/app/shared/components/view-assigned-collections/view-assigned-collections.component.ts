import { Component, OnInit } from '@angular/core';
import { ClientCollectionService } from '../../../core/services/nestjs-services/clientCollectionService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-assigned-collections',
  standalone: true,
  imports: [],
  templateUrl: './view-assigned-collections.component.html',
  styleUrl: './view-assigned-collections.component.css',
})
export class ViewAssignedCollectionsComponent implements OnInit {
  collections!: { id: number; name: string }[];
  constructor(
    private clientCollectionService: ClientCollectionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCollections();
  }
  loadCollections() {
    const userId = Number(sessionStorage.getItem('userId'));
    this.clientCollectionService
      .getCollectionsByAssignedUser(userId)
      .subscribe({
        next: (response) => {
          this.collections = response;
        },
        error: (error) => console.error(error),
      });
  }
  viewBaseClientsAssigned(id: number) {
    const basePath = this.router.url.split('/')[1];
    this.router.navigate([`/${basePath}/base/${id}/clients`]);
  }
}
