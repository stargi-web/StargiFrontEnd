import { Component, OnInit } from '@angular/core';
import { TableModule } from 'primeng/table';
import { UserModel } from '../../../core/models/userModel';
import { UserService } from '../../../services/userService';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin-users-view',
  standalone: true,
  imports: [TableModule],
  templateUrl: './admin-users-view.component.html',
  styleUrl: './admin-users-view.component.css'
})
export class AdminUsersViewComponent implements OnInit {

  users!:UserModel[];
  loading=true;
  constructor(private userService:UserService,private router:Router){}
  ngOnInit() {
    this.loadUsers();
  }
  loadUsers(){
    this.userService.getUsers().subscribe(
      {
        next:(response)=>{
        this.users=response;
        this.loading=false;
      },
      error:error=>console.error(error)
      }
    )
  }
  viewOpportunities(userId:number) {
    this.router.navigate([`/admin/users-opp/${userId}`])
    }
}
