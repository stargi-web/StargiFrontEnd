import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api'; // Importa MenuItem de PrimeNG
import { MenubarModule } from 'primeng/menubar'; // Importa el módulo de Menubar
import { Button } from 'primeng/button';
import { SessionStorageService } from '../../services/sessionStorage.service';
import { SESSION_ITEMS } from '../../models/session-items';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { Menu, MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MenubarModule,
    Button,
    SidebarComponent,
    TieredMenuModule,
    AvatarModule,
    AvatarGroupModule,
    MenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  @ViewChild('menu') menu!: Menu; // Referencia al menú
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;
  name?: string;
  userRole: string = ''; // Rol inicial
  // Arreglo de ítems para el menú de PrimeNG
  menuItems: MenuItem[] = [];
  profileMenuItems: MenuItem[] = [];

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {}

  ngOnInit() {
    // Obtén el nombre del usuario desde sessionStorage
    this.name = String(this.sessionStorageService.getItem(SESSION_ITEMS.NAME));
    this.updateMenuItems();
    this.userRole = String(
      this.sessionStorageService.getItem(SESSION_ITEMS.ROLE)
    );
  }

  updateMenuItems() {
    this.profileMenuItems = [
      {
        label: 'Perfil',
        icon: 'pi pi-user-edit',
        command: () => this.goToProfile(),
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => this.logout(),
      },
    ];
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

  // Mostrar menú al hacer hover
  showMenu(event: Event) {
    this.menu.show(event); // Muestra el menú
  }

  // Ocultar menú al dejar de hacer hover
  hideMenu() {
    this.menu.hide(); // Oculta el menú
  }
}
