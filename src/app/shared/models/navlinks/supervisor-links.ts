import { MenuItem } from 'primeng/api';

export const SUPERVISOR_LINKS: MenuItem[] = [
  { path: '/user/create', label: 'Crear Usuario', icon: 'pi pi-user-plus' },
  { path: '/team/members', label: 'Equipo', icon: 'pi pi-users' },
  {
    label: 'Oportunidades',
    icon: 'pi pi-chart-line',
    items: [
      {
        path: '/opportunities',
        label: 'Oportunidades del equipo',
        icon: 'pi pi-chart-line',
      },
      {
        path: '/opportunities/user',
        label: 'Mis oportunidades',
        icon: 'pi pi-chart-line',
      },
      {
        path: '/opportunities/create',
        label: 'Registrar Oportunidad',
        icon: 'pi pi-plus-circle',
      },
    ],
  },
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
  { path: '/annexes', label: 'Anexos', icon: 'pi pi-link' },
  { path: '/files', label: 'Archivos', icon: 'pi pi-folder' },
  { path: '/surveys', label: 'Encuestas', icon: 'pi pi-clipboard' },
];
