import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api'; // Importa MenuItem de PrimeNG
import { MenubarModule } from 'primeng/menubar'; // Importa el módulo de Menubar
import { ROLES } from '../../models/roles';
import { AuthService } from '../../../core/auth/services/authService';
import { Button } from 'primeng/button';
import { ADMIN_LINKS } from './models/navlinks/admin-links';
import { SUPERVISOR_LINKS } from './models/navlinks/supervisor-links';
import { EXECUTIVE_LINKS } from './models/navlinks/executive-links';
import { HHRR_LINKS } from './models/navlinks/hhrr-links';
import { SessionStorageService } from '../../services/sessionStorage.service';
import { SESSION_ITEMS } from '../../models/session-items';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MenubarModule, Button],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  userRole: string = ''; // Rol inicial
  name?: string;

  // Arreglo de ítems para el menú de PrimeNG
  menuItems: MenuItem[] = [];
  isMobile: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768; // Safe to use window here
      console.log('Es móvil:', this.isMobile);
    }

    // Obtén el nombre del usuario desde sessionStorage
    this.name = String(this.sessionStorageService.getItem(SESSION_ITEMS.NAME));

    this.authService.getCurrentUserRole().subscribe((role) => {
      console.log('Rol actual:', role);
      this.userRole = role;
      this.updateMenuItems(); // Actualiza los ítems del menú cuando cambia el rol
    });
  }

  updateMenuItems() {
    switch (this.userRole) {
      case ROLES.ADMIN:
        this.menuItems = [...ADMIN_LINKS];
        break;
      case ROLES.SUPERVISOR:
        this.menuItems = [...SUPERVISOR_LINKS];
        break;
      case ROLES.EXECUTIVE:
        this.menuItems = [...EXECUTIVE_LINKS];
        break;
      case ROLES.HHRR:
        this.menuItems = [...HHRR_LINKS];
        break;
      default:
        this.menuItems = [];
        break;
    }
    const filteredMenuItems = this.menuItems.filter((link) => {
      // Si es un dispositivo móvil y el enlace no debe mostrarse en móviles, excluirlo
      if (this.isMobile && link['mobile'] === false) {
        return false;
      }
      // Incluir el enlace en todos los demás casos
      return true;
    });

    // Filtra y mapea los navLinks para generar los ítems del menú
    this.menuItems = filteredMenuItems.map((link) => ({
      label: link['label'],
      icon: link['icon'],
      routerLink: link['items'] ? undefined : link['path'], // Usa routerLink si no tiene elementos anidados
      command: link['items']
        ? undefined
        : () => this.router.navigate([link['path']]), // Navega a la ruta si no tiene elementos anidados
      items: link['items']
        ? link['items'].map((subLink) => ({
            label: subLink['label'],
            icon: subLink['icon'],
            command: () => this.router.navigate([subLink['path']]),
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

  // Método para cerrar sesión
  logout() {
    // Limpia todos los datos de la sesión
    this.sessionStorageService.clear();
    // Redirige al usuario a la página de login
    this.router.navigate(['/login']);
  }

  goToProfile() {
    this.router.navigate(['/user/profile']);
  }
}
