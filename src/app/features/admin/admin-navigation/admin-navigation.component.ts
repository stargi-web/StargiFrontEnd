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
  constructor(private router:Router){}
  ngOnInit(): void {
    this.items=[
      {
        label:'Usuarios',
        icon:'pi pi-user',
        command:()=>{
          this.router.navigate(['/admin/users'])
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
