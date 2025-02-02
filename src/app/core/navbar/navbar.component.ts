import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api'; // Importa MenuItem de PrimeNG
import { MenubarModule } from 'primeng/menubar'; // Importa el módulo de Menubar
import { ROLES } from '../models/roles';
import { AuthService } from '../auth/services/authService';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, Button], // Importa MenubarModule
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userRole: string = ROLES.EXECUTIVE; // Rol inicial
  name?: string; // Nombre del usuario

  // Arreglo de enlaces con sus roles permitidos
  navLinks = [
    // Rutas de administración
    {
      path: '/user/list',
      label: 'Usuarios',
      roles: [ROLES.ADMIN],
      icon: 'pi pi-user',
    },
    {
      path: '/user/create',
      label: 'Crear Usuario',
      roles: [ROLES.ADMIN, ROLES.HHRR, ROLES.SUPERVISOR], // Múltiples roles
      icon: 'pi pi-user-plus',
    },
    {
      path: '/opportunities',
      label: 'Oportunidades',
      roles: [ROLES.ADMIN],
      icon: 'pi pi-envelope',
    },
    {
      path: '/admin/teams',
      label: 'Equipos',
      roles: [ROLES.ADMIN],
      icon: 'pi pi-users',
    },
    {
      path: '/admin/bases',
      label: 'Bases',
      roles: [ROLES.ADMIN],
      icon: 'pi pi-database',
    },
    {
      path: '/team/members',
      label: 'Equipo',
      roles: [ROLES.SUPERVISOR],
      icon: 'pi pi-users',
    },

    {
      label: 'Oportunidades',
      icon: 'pi pi-folder',
      roles: [ROLES.SUPERVISOR], // Múltiples roles
      items: [
        {
          label: 'Oportunidades del equipo',
          icon: 'pi pi-folder',
          path: '/opportunities',
        },
        {
          label: 'Mis oportunidades',
          icon: 'pi pi-file',
          path: '/opportunities/user',
        },
        {
          label: 'Registrar Oportunidad',
          icon: 'pi pi-plus-circle',
          path: '/opportunities/create',
        },
      ],
    },

    // Rutas de ejecutivos
    {
      path: '/opportunities/user',
      label: 'Oportunidades',
      roles: [ROLES.EXECUTIVE],
      icon: 'pi pi-home',
    },
    {
      path: '/opportunities/create',
      label: 'Registrar Oportunidad',
      roles: [ROLES.EXECUTIVE], // Múltiples roles
      icon: 'pi pi-plus-circle',
    },
    {
      path: '/attendance/users',
      label: 'Asistencias de Usuarios',
      roles: [ROLES.HHRR, ROLES.SUPERVISOR], // Múltiples roles
      icon: 'pi pi-home',
    },
    {
      path: '/attendance/register',
      label: 'Registrar Asistencia',
      roles: [ROLES.HHRR, ROLES.SUPERVISOR, ROLES.EXECUTIVE], // Múltiples roles
      icon: 'pi pi-calendar',
      mobile: false, // No se muestra en dispositivos móviles
    },
    {
      path: '/files',
      label: 'Archivos',
      roles: [ROLES.ADMIN, ROLES.HHRR, ROLES.SUPERVISOR, ROLES.EXECUTIVE], // Múltiples roles
      icon: 'pi pi-file',
    },
  ];
  // Arreglo de ítems para el menú de PrimeNG
  menuItems: MenuItem[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Obtén el nombre del usuario desde sessionStorage
    this.name = String(sessionStorage.getItem('name'));

    // Escucha los cambios en el rol del usuario
    this.authService.getCurrentUserRole().subscribe((role) => {
      console.log('Rol actual:', role);
      this.userRole = role;
      this.updateMenuItems(); // Actualiza los ítems del menú cuando cambia el rol
    });
  }

  updateMenuItems() {
    const isMobile = window.innerWidth <= 768; // Verifica si es un dispositivo móvil

    // Filtra y mapea los navLinks para generar los ítems del menú
    this.menuItems = this.navLinks
      .filter((link) => {
        // Verifica si el usuario tiene acceso al enlace
        const hasAccess = this.canAccess(link.roles);
        // Verifica si el enlace debe mostrarse en dispositivos móviles
        const isVisibleOnMobile = link.mobile !== false; // true por defecto
        return hasAccess && (isVisibleOnMobile || !isMobile);
      })
      .map((link) => ({
        label: link.label,
        icon: link.icon,
        routerLink: link.items ? undefined : link.path, // Usa routerLink si no tiene elementos anidados
        command: link.items
          ? undefined
          : () => this.router.navigate([link.path]), // Navega a la ruta si no tiene elementos anidados
        items: link.items
          ? link.items.map((subLink) => ({
              label: subLink.label,
              icon: subLink.icon,
              command: () => this.router.navigate([subLink.path]),
            }))
          : undefined, // Mapea los elementos anidados
      }));

    // Agrega el ítem de "Cerrar sesión" al final
    this.menuItems.push({
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
      command: () => {
        this.logout();
      },
    });
  }

  // Método para verificar si el usuario tiene acceso a un enlace
  canAccess(roles: string[]): boolean {
    // Si no hay roles definidos, el enlace es accesible para todos
    if (roles.length === 0) return true;
    // Verifica si el rol del usuario está en la lista de roles permitidos
    return roles.includes(this.userRole);
  }

  // Método para cerrar sesión
  logout() {
    // Limpia el sessionStorage
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('role');
    sessionStorage.removeItem('teamId');

    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }
}
