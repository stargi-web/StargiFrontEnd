import { MenuItem } from 'primeng/api';

export const ADMIN_LINKS: MenuItem[] = [
  { path: '/user/list', label: 'Usuarios', icon: 'pi pi-user' },
  { path: '/user/create', label: 'Crear Usuario', icon: 'pi pi-user-plus' },
  { path: '/opportunities', label: 'Oportunidades', icon: 'pi pi-chart-line' },
  { path: '/team/list', label: 'Equipos', icon: 'pi pi-users' },
  { path: '/annexes', label: 'Anexos', icon: 'pi pi-link' },
  { path: '/files', label: 'Archivos', icon: 'pi pi-folder' },
  { path: '/surveys', label: 'Encuestas', icon: 'pi pi-clipboard' },
  {
    path: '/deactivations',
    label: 'Base de Desactivaciones',
    icon: 'pi pi-bullseye',
  },
  {
    path: '/deleted',
    label: 'Papelera',
    icon: 'pi pi-trash',
  },
];
