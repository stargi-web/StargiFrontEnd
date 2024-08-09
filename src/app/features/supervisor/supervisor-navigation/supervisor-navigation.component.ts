import { Component, OnInit } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { UserService } from '../../../services/userService';
@Component({
  selector: 'app-supervisor-navigation',
  standalone: true,
  imports: [MenubarModule],
  templateUrl: './supervisor-navigation.component.html',
  styleUrl: './supervisor-navigation.component.css'
})
export class SupervisorNavigationComponent implements OnInit{
  items: MenuItem[] | undefined;
  name?:string;
  constructor(private router:Router,private userService:UserService){}
  goToProfile(){
    this.router.navigate(['/supervisor/profile']);
  }
  ngOnInit(): void {
    this.name=String(sessionStorage.getItem('name'));
    const userId=Number(sessionStorage.getItem("userId"))
    this.userService.getLeadingTeamInfo(userId).subscribe(
      {
        next:response=>{
          if(response.teamId){
            sessionStorage.setItem("teamId",response.teamId);
          }
        }
      }
    )
    this.items=[
      {
        label:'Equipo',
        icon:'pi pi-users',
        command:()=>{
          this.router.navigate(['/supervisor/team'])
        }
      },
      {
        label:'Oportunidades',
        icon:'pi pi-folder',
        items:[
          {
            label:'Oportunidades del equipo',
            icon:'pi pi-folder',
            command:()=>{
              this.router.navigate(['/supervisor/team-opportunities'])
            }
          },
          {
            label:'Mis oportunidades',
            icon:'pi pi-file',
            command:()=>{
              this.router.navigate(['/supervisor/opportunities'])
            }
          },
          {
            label:'Registrar Oportunidad',
            icon:'pi pi-plus-circle',
            command:()=>{
              this.router.navigate(['/supervisor/create-opportunity'])
            }
          },
        ]
      },
      
      {
        label:'Crear usuario',
        icon:'pi pi-user-plus',
        command:()=>{
          this.router.navigate(['/supervisor/create-user'])
        }
      },
      
      {
        label:'Bases',
        icon:'pi pi-plus-circle',
        command:()=>{
          this.router.navigate(['/supervisor/bases'])
        }
      },
      {
        label:'Cerrar sesión',
        icon:'pi pi-sign-out',
        command:()=>{
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('teamId');
          sessionStorage.removeItem('role');
          sessionStorage.removeItem('name');
          this.router.navigate(['/login'])
        }
      }
    ]
  }

}
