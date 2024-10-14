import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-rrhh-navigation',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './rrhh-navigation.component.html',
  styleUrl: './rrhh-navigation.component.css'
})
export class RrhhNavigationComponent implements OnInit{
  name?:string;
  items: MenuItem[] | undefined;
  
  constructor(private router:Router){}
  ngOnInit(): void {
    const isMobile = window.innerWidth <= 768;
    this.name=String(sessionStorage.getItem('name'));
    this.items=[
      {
        label:'Encuestas',
        icon:'pi pi-home',
        command:()=>{
          this.router.navigate(['/HHRR/encuestas'])
        }
      },
      {
        label:'Asistencias de Usuarios',
        icon:'pi pi-home',
        command:()=>{
          this.router.navigate(['/HHRR/users-attendances'])
        }
      },
      ...(isMobile ? [] : [
        {
          label: 'Registrar Asistencia(BETA)',
          icon: 'pi pi-calendar',
          command: () => {
            this.router.navigate(['/HHRR/register-attendance']);
          }
        }
      ]),
        
      {
        label:'Cerrar sesión',
        icon:'pi pi-sign-out',
        command:()=>{
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('name');
          sessionStorage.removeItem('role');
          this.router.navigate(['/login'])
        }
      }
    ]
  }
  goToProfile(){
    this.router.navigate(['/executive/profile']);
  }
}
