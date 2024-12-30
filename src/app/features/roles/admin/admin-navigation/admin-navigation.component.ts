import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';

@Component({
  selector: 'app-admin-navigation',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './admin-navigation.component.html',
  styleUrl: './admin-navigation.component.css'
})
export class AdminNavigationComponent implements OnInit {
  items?:MenuItem[]
  name?:string;
  constructor(private router:Router){}
  ngOnInit(): void {
    this.name=String(sessionStorage.getItem('name'));
    this.items=[
      {
        label:'Usuarios',
        icon:'pi pi-user',
        command:()=>{
          this.router.navigate(['/admin/users'])
        }
      },
      {
        label:'Crear Usuario',
        icon:'pi pi-user',
        command:()=>{
          this.router.navigate(['/admin/create-user'])
        }
      },
      {
        label:'Oportunidades',
        icon:'pi pi-envelope',
        command:()=>{
          this.router.navigate(['/admin/opportunities'])
        }
      },
      {
        label:'Equipos',
        icon:'pi pi-users',
        command:()=>{
          this.router.navigate(['/admin/teams-view']);
        }
      },
      {
        label:'Bases',
        icon:'pi pi-users',
        command:()=>{
          this.router.navigate(['/admin/bases']);
        }
      },
      {
        label:'Archivos',
        icon:'pi pi-file',
        command:()=>{
          this.router.navigate(['/admin/files']);
        }
      },
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
    this.router.navigate(['/admin/profile']);
  }
}
