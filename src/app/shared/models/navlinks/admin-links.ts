import { MenuItem } from 'primeng/api';

export const ADMIN_LINKS: MenuItem[] = [
  { path: '/user/list', label: 'Usuarios', icon: 'pi pi-user' },
  { path: '/user/create', label: 'Crear Usuario', icon: 'pi pi-user-plus' },
  { path: '/opportunities', label: 'Oportunidades', icon: 'pi pi-envelope' },
  { path: '/team/list', label: 'Equipos', icon: 'pi pi-users' },
  { path: '/client/collection', label: 'Bases', icon: 'pi pi-database' },
  { path: '/files', label: 'Archivos', icon: 'pi pi-file' },
  { path: '/surveys', label: 'Encuestas', icon: 'pi pi-clipboard' },
];
