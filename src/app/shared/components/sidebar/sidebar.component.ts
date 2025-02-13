import { Component, Inject, input, output, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { ROLES } from '../../models/roles';
import { AuthService } from '../../../core/auth/services/authService';
import { SessionStorageService } from '../../services/sessionStorage.service';
import { SESSION_ITEMS } from '../../models/session-items';
import { EXECUTIVE_LINKS } from '../../models/navlinks/executive-links';
import { HHRR_LINKS } from '../../models/navlinks/hhrr-links';
import { SUPERVISOR_LINKS } from '../../models/navlinks/supervisor-links';
import { ADMIN_LINKS } from '../../models/navlinks/admin-links';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';
import { TooltipModule } from 'primeng/tooltip';
@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterModule,
    CommonModule,
    AvatarModule,
    AvatarGroupModule,
    ButtonModule,
    RippleModule,
    StyleClassModule,
    SidebarItemComponent,
    TooltipModule,
  ],
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
    }

    // Obtén el nombre del usuario desde sessionStorage
    this.name = String(this.sessionStorageService.getItem(SESSION_ITEMS.NAME));
    this.userRole = String(
      this.sessionStorageService.getItem(SESSION_ITEMS.ROLE)
    );
    this.updateMenuItems();
  }
  items: MenuItem[] = [];

  toggleCollapse(): void {
    this.changeIsLeftSidebarCollapsed.emit(!this.isLeftSidebarCollapsed());
  }

  closeSidenav(): void {
    this.changeIsLeftSidebarCollapsed.emit(true);
  }

  toggleSubMenu(index: number) {
    // Si ya está expandido, colapsarlo; si no, expandirlo
    this.expandedIndex = this.expandedIndex === index ? null : index;
  }

  isSubMenuActive(subItems: MenuItem[]): boolean {
    return subItems.some((item) => this.router.url.includes(item['path']));
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
  }

  logout() {
    this.sessionStorageService.clear();
    this.router.navigate(['/login']);
  }
  goToProfile() {
    this.router.navigate(['/user/profile']);
  }
}
