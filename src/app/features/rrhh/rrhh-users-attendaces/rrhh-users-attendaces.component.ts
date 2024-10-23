import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/userService';
import { AttendanceService } from '../../../services/attendanceService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-rrhh-users-attendaces',
  standalone: true,
  imports: [CommonModule, TableModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './rrhh-users-attendaces.component.html',
  styleUrl: './rrhh-users-attendaces.component.css'
})
export class RrhhUsersAttendacesComponent implements OnInit{
  users:any;
  loading=true;
  constructor(private userService:UserService,private router:Router){}


  ngOnInit(): void {
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
  
  goToAttendances(userId:number){
    this.router.navigate([`/HHRR/user-attendaces-details/`, userId]);
  }

  goToMonthlyAttendanceSummary() {
    this.router.navigate(['/HHRR/monthly-attendance-summary']);
  }
}
