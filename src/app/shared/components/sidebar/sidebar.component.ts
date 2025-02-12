import { Component, Inject, input, output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ROLES } from '../../models/roles';
import { AuthService } from '../../../core/auth/services/authService';
import { SessionStorageService } from '../../services/sessionStorage.service';
import { SESSION_ITEMS } from '../../models/session-items';
import { EXECUTIVE_LINKS } from '../navbar/models/navlinks/executive-links';
import { HHRR_LINKS } from '../navbar/models/navlinks/hhrr-links';
import { SUPERVISOR_LINKS } from '../navbar/models/navlinks/supervisor-links';
import { ADMIN_LINKS } from '../navbar/models/navlinks/admin-links';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  name?: string;
  userRole: string = ''; // Rol inicial
  isMobile: boolean = false;

  expandedIndex: number | null = null; // Controla qué submenú está expandido
  isLeftSidebarCollapsed = input.required<boolean>();
  changeIsLeftSidebarCollapsed = output<boolean>();

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
      //console.log('Rol actual:', role);
      this.userRole = role;
      this.updateMenuItems(); // Actualiza los ítems del menú cuando cambia el rol
    });
  }
  items: MenuItem[] = [];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  toggleSubMenu(index: number): void {
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  updateMenuItems() {
    switch (this.userRole) {
      case ROLES.ADMIN:
        this.items = [...ADMIN_LINKS];
        break;
      case ROLES.SUPERVISOR:
        this.items = [...SUPERVISOR_LINKS];
        break;
      case ROLES.EXECUTIVE:
        this.items = [...EXECUTIVE_LINKS];
        break;
      case ROLES.HHRR:
        this.items = [...HHRR_LINKS];
        break;
      default:
        this.items = [];
        break;
    }
    if (this.isMobile) {
      this.items = this.items.filter((item) => item['mobile'] !== false);
    }

    // Agrega el ítem de "Cerrar sesión" al final
    this.items.push({
      path: '/login',
      label: 'Cerrar sesión',
      icon: 'pi pi-sign-out',
    });
  }

  goToProfile() {
    this.router.navigate(['/user/profile']);
  }
}
