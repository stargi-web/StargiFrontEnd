import { AfterViewChecked, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { AttendanceService } from '../../../services/attendanceService';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomCalendarComponent } from '../../../shared/components/custom-calendar/custom-calendar.component';

@Component({
  selector: 'app-rrhh-user-attendances-details',
  standalone: true,
  imports: [CalendarModule,ButtonModule,CommonModule,FormsModule,CustomCalendarComponent],
  templateUrl: './rrhh-user-attendances-details.component.html',
  styleUrl: './rrhh-user-attendances-details.component.css'
})
export class RrhhUserAttendancesDetailsComponent implements OnInit{
  userId?:number;
  startDate!: Date ;
  endDate!: Date;
  attendanceDates: Date[] = [];
  selectedDate: Date | undefined;
  constructor(private attendanceService:AttendanceService,private route: ActivatedRoute){

  }
  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('userId'));
  }

  loadAttendancesByDate(){
    if(this.userId && this.startDate && this.endDate){
      const startDateISO = this.startDate.toISOString().split('T')[0];
      const endDateISO = this.endDate.toISOString().split('T')[0];
      this.attendanceService.getAttendancesByUserAndDates(this.userId,startDateISO,endDateISO).subscribe({
        next:response=>{
          this.attendanceDates = response.attendances.map((dateString: string) => {
            const dateUTC = new Date(dateString);
            return this.convertToPeruTime(dateUTC);
          });
        },
        error:error=>console.error(error)
      })
    }
  }
  convertToPeruTime(dateUTC: Date): Date {
    const peruTimeOffset = -5 * 60; 
    const localTime = new Date(dateUTC.getTime() + peruTimeOffset * 60 * 1000);
    return localTime;
  }

}
