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
  name?:string;
  constructor(private router:Router){}
  items: MenuItem[] | undefined;
  ngOnInit(): void {
    this.name=String(sessionStorage.getItem('name'));
    this.items=[
      {
        label:'Oportunidades',
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
        label:'Bases',
        icon:'pi pi-book',
        command:()=>{
          this.router.navigate(['/executive/bases'])
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
    this.router.navigate(['/executive/profile']);
  }
}
