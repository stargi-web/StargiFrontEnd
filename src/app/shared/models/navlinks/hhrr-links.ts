import { MenuItem } from 'primeng/api';

export const HHRR_LINKS: MenuItem[] = [
  { path: '/user/create', label: 'Crear Usuario', icon: 'pi pi-user-plus' },
  {
    path: '/attendance/users',
    label: 'Asistencias de Usuarios',
    icon: 'pi pi-calendar',
  },
  {
    path: '/attendance/register',
    label: 'Registrar Asistencia',
    icon: 'pi pi-calendar-plus',
    mobile: false, // No se muestra en dispositivos móviles
  },
  { path: '/files', label: 'Archivos', icon: 'pi pi-folder' },
  { path: '/surveys', label: 'Encuestas', icon: 'pi pi-clipboard' },
  { path: '/annexes', label: 'Anexos', icon: 'pi pi-link' },
  {
    path: '/deactivations',
    label: 'Base de Desactivaciones',
    icon: 'pi pi-bullseye',
  },
  {
    path: '/accumulated-sales',
    label: 'Acumulado de Ventas',
    icon: 'pi pi-dollar',
  },
  {
    path: '/deleted',
    label: 'Papelera',
    icon: 'pi pi-trash',
  },
];
