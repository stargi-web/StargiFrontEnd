import { Component } from '@angular/core';
import { DeletedUsersComponentComponent } from '../../components/deleted-users-component/deleted-users-component.component';

@Component({
  selector: 'app-view-deleted-page',
  standalone: true,
  imports: [DeletedUsersComponentComponent],
  templateUrl: './view-deleted-page.component.html',
  styleUrl: './view-deleted-page.component.css',
})
export class ViewDeletedPageComponent {}
