import { MenuItem } from 'primeng/api';

export const HHRR_LINKS: MenuItem[] = [
  { path: '/user/create', label: 'Crear Usuario', icon: 'pi pi-user-plus' },
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
];
