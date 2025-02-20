import { MenuItem } from 'primeng/api';

export const EXECUTIVE_LINKS: MenuItem[] = [
  {
    path: '/opportunities/user',
    label: 'Oportunidades',
    icon: 'pi pi-chart-line',
  },
  {
    path: '/opportunities/create',
    label: 'Registrar Oportunidad',
    icon: 'pi pi-plus-circle',
  },
  {
    path: '/attendance/register',
    label: 'Registrar Asistencia',
    icon: 'pi pi-calendar-plus',
    mobile: false, // No se muestra en dispositivos móviles
  },
  { path: '/files', label: 'Archivos', icon: 'pi pi-folder' },
  { path: '/surveys', label: 'Encuestas', icon: 'pi pi-clipboard' },
];
