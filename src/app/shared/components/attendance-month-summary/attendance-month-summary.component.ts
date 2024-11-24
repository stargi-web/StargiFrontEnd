import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../services/attendanceService';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

@Component({
  selector: 'app-attendance-month-summary',
  standalone: true,
  imports: [CommonModule,TooltipModule],
  templateUrl: './attendance-month-summary.component.html',
  styleUrl: './attendance-month-summary.component.css'
})
export class AttendanceMonthSummaryComponent implements OnInit {
  weekDaysInMonth:{ date: Date }[] = [];
  attendances: Date[] = [];
  userId!:number;
  constructor(private attendanceService:AttendanceService){}
  ngOnInit(): void {
    this.userId=Number(sessionStorage.getItem("userId"))
    this.initializeWeekdaysInMonth();
    this.fetchAttendances();
  }
  initializeWeekdaysInMonth() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        this.weekDaysInMonth.push({ date });
      }
    }
  }

  fetchAttendances() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth();
    const startDate = new Date(year, month, 1).toISOString();
    const endDate = new Date(year, month + 1, 0).toISOString();

    this.attendanceService.getAttendancesByUserAndDates(this.userId,startDate,endDate)
      .subscribe((response) => {
        this.attendances = response.attendances.map(
          (attendance: string) => new Date(attendance)
        );
      });
  }

  getAttendanceClass(date: Date): string {
    const today = new Date();
    if (date > today) {
      return ''; 
    }
    const attendance = this.attendances.find(
      (att) => att.toDateString() === date.toDateString()
    );

    if (attendance) {
      const hour = attendance.getHours();
      if (hour < 9) {
        return 'green';
      } else {
        return 'orange';
      }
    } else {
      return 'red';
    }
  }

  getAttendanceLetter(date: Date): string {
    const today = new Date();
    if (date > today) {
      return ''; 
    }
    const attendance = this.attendances.find(
      (att) => att.toDateString() === date.toDateString()
    );

    if (attendance) {
      const hour = attendance.getHours();
      if (hour < 9) {
        return 'A';
      } else {
        return 'T';
      }
    } else {
      return 'F';
    }
  }
  generateTooltip(attendanceDate: Date ): string {
    const attendance = this.attendances.find(
      (att) => att.toDateString() === attendanceDate.toDateString()
    );
    if(attendance){
      const day = attendance.getDate();
      const month = attendance.toLocaleString('es-ES', { month: 'long' });
      const year = attendance.getFullYear();
      const hours = String(attendance.getHours()).padStart(2, '0');
      const minutes = String(attendance.getMinutes()).padStart(2, '0');
      const seconds = String(attendance.getSeconds()).padStart(2, '0');

      return `${day} de ${month} del ${year} a las ${hours}:${minutes}:${seconds}`;

    }
    return 'No tiene registrada la asistencia para este día';
  }
}
