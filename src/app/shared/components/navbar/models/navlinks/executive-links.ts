import { MenuItem } from 'primeng/api';

export const EXECUTIVE_LINKS: MenuItem[] = [
  { path: '/opportunities/user', label: 'Oportunidades', icon: 'pi pi-home' },
  {
    path: '/opportunities/create',
    label: 'Registrar Oportunidad',
    icon: 'pi pi-plus-circle',
  },
  {
    path: '/attendance/register',
    label: 'Registrar Asistencia',
    icon: 'pi pi-calendar',
    mobile: false, // No se muestra en dispositivos móviles
  },
  { path: '/files', label: 'Archivos', icon: 'pi pi-file' },
];
