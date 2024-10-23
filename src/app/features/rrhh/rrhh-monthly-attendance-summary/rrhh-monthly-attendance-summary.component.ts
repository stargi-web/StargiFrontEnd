import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule, DatePipe } from '@angular/common';
import { AttendanceService } from '../../../services/attendanceService';

interface AttendanceData {
  userId: number;
  firstName: string;
  lastName: string;
  attendances: string[];
}

@Component({
  selector: 'app-rrhh-monthly-attendance-summary',
  standalone: true,
  imports: [CommonModule, DatePipe],
  providers: [DatePipe],
  templateUrl: './rrhh-monthly-attendance-summary.component.html',
  styleUrls: ['./rrhh-monthly-attendance-summary.component.scss']
})
export class RrhhMonthlyAttendanceSummaryComponent implements OnInit {
  attendanceData: AttendanceData[] = [];
  weekdays: Date[] = [];
  month: number = 10;
  year: number = 2024;

  constructor(private attendanceService:AttendanceService, private datePipe: DatePipe) {}

  ngOnInit() {
    this.getAttendanceData();
    this.generateWeekdays();
  }

  getAttendanceData() {
    this.attendanceService.getAttendanceSummaryByRole(this.month,this.year).subscribe({
      next:response=>{
        this.attendanceData=response.data;
        this.processAttendances();
      },
      error:error=>console.error(error)
    })
  }

  generateWeekdays() {
    const date = new Date(this.year, this.month - 1, 1);
    while (date.getMonth() === this.month - 1) {
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        this.weekdays.push(new Date(date));
      }
      date.setDate(date.getDate() + 1);
    }
  }

  processAttendances() {
    this.attendanceData.forEach(user => {
      user.attendances = user.attendances.map(attendance => {
        const date = new Date(attendance);
        date.setHours(date.getHours() - 5); // Convertir a hora peruana
        return date.toISOString();
      });
    });
  }

  getAttendanceStatus(user: AttendanceData, date: Date): { status: string, class: string } {
    const attendance = user.attendances.find(a => this.datePipe.transform(a, 'yyyy-MM-dd') === this.datePipe.transform(date, 'yyyy-MM-dd'));
    if (!attendance) {
      return { status: 'F', class: 'absent' };
    }
    const attendanceTime = new Date(attendance);
    const limit = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 8, 35);
    if (attendanceTime <= limit) {
      return { status: 'A', class: 'on-time' };
    } else {
      return { status: 'T', class: 'late' };
    }
  }
}
