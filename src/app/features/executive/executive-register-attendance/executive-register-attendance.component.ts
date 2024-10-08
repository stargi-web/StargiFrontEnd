import { Component } from '@angular/core';
import { ClockComponent } from '../../../shared/components/clock/clock.component';
import { AttendanceService } from '../../../services/attendanceService';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-executive-register-attendance',
  standalone: true,
  imports: [ClockComponent,ButtonModule],
  templateUrl: './executive-register-attendance.component.html',
  styleUrl: './executive-register-attendance.component.css'
})
export class ExecutiveRegisterAttendanceComponent {
  constructor(private attendanceService:AttendanceService){}
  
  registerAttendance(){
    const userId=Number(sessionStorage.getItem('userId'));
    if(userId){
      this.attendanceService.registerAttendance(userId).subscribe({
        next:response=>{
          alert("Asistencia registrada con éxito")
        },
        error:error=>alert("Error, probablemente ya registraste tu asistencia de hoy")
      })
    }
  }
}
