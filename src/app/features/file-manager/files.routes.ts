import { Routes } from '@angular/router';
import { FileStorageComponent } from './pages/file-storage/file-storage.component';
import { roleGuard } from '../../core/guards/authGuard';

export const FILE_MANAGER_ROUTES: Routes = [
  {
    path: '',
    component: FileStorageComponent,
    pathMatch: 'full',
    canActivate: [roleGuard],
    data: {
      expectedRoles: ['executive', 'supervisor', 'admin', 'HHRR'],
    },
  },
];
