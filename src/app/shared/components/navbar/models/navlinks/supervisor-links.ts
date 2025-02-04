import { MenuItem } from 'primeng/api';

export const SUPERVISOR_LINKS: MenuItem[] = [
  { path: '/team/members', label: 'Equipo', icon: 'pi pi-users' },
  {
    label: 'Oportunidades',
    icon: 'pi pi-folder',
    items: [
      {
        path: '/opportunities',
        label: 'Oportunidades del equipo',
        icon: 'pi pi-folder',
      },
      {
        path: '/opportunities/user',
        label: 'Mis oportunidades',
        icon: 'pi pi-file',
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
    icon: 'pi pi-home',
  },
  {
    path: '/attendance/register',
    label: 'Registrar Asistencia',
    icon: 'pi pi-calendar',
    mobile: false, // No se muestra en dispositivos móviles
  },
  { path: '/files', label: 'Archivos', icon: 'pi pi-file' },
  { path: '/surveys', label: 'Encuestas', icon: 'pi pi-file' },
];
