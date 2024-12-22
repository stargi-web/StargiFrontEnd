import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-executive-navigation',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './executive-navigation.component.html',
  styleUrl: './executive-navigation.component.css',
})
export class ExecutiveNavigationComponent implements OnInit {
  name?: string;

  constructor(private router: Router) {}
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    const isMobile = window.innerWidth <= 768;
    this.name = String(sessionStorage.getItem('name'));
    this.items = [
      {
        label: 'Oportunidades',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/executive/dashboard']);
        },
      },
      {
        label: 'Oportunidades v2 (Beta)',
        icon: 'pi pi-home',
        command: () => {
          this.router.navigate(['/executive/opportunities-view']);
        },
      },
      {
        label: 'Registrar Oportunidad',
        icon: 'pi pi-plus-circle',
        command: () => {
          this.router.navigate(['/executive/create-opportunity']);
        },
      },
      ...(isMobile
        ? []
        : [
            {
              label: 'Registrar Asistencia',
              icon: 'pi pi-calendar',
              command: () => {
                this.router.navigate(['/executive/register-attendance']);
              },
            },
          ]),
      {
        label: 'Archivos',
        icon: 'pi pi-file',
        command: () => {
          this.router.navigate(['/executive/files']);
        },
      },
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('role');
          this.router.navigate(['/login']);
        },
      },
      {
        label: 'Archivos',
        icon: 'pi pi-file',
        command: () => {
          this.router.navigate(['/executive/files']);
        },
      },
    ];
  }
  goToProfile() {
    this.router.navigate(['/executive/profile']);
  }
}
