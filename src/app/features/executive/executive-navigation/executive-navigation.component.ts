import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
@Component({
  selector: 'app-executive-navigation',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './executive-navigation.component.html',
  styleUrl: './executive-navigation.component.css'
})
export class ExecutiveNavigationComponent implements OnInit{
  constructor(private router:Router){}
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.items=[
      {
        label:'Dashboard',
        icon:'pi pi-home',
        command:()=>{
          this.router.navigate(['/executive/dashboard'])
        }
      },
      {
        label:'Registrar Oportunidad',
        icon:'pi pi-plus-circle',
        command:()=>{
          this.router.navigate(['/executive/create-opportunity'])
        }
      },
      {
        label:'Cerrar sesión',
        icon:'pi pi-sign-out',
        command:()=>{
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userId');
          this.router.navigate(['/login'])
        }
      }
    ]
  }

}
