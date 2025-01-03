import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../core/services/nestjs-services/attendanceService';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'primeng/tooltip';

interface Attendance {
  date: string;
  state: string;
}

@Component({
  selector: 'app-attendance-month-summary',
  standalone: true,
  imports: [CommonModule, TooltipModule],
  templateUrl: './attendance-month-summary.component.html',
  styleUrls: ['./attendance-month-summary.component.css'],
})
export class AttendanceMonthSummaryComponent implements OnInit {
  weekDaysInMonth: { date: Date }[] = [];
  attendances: Attendance[] = [];
  userId!: number;

  constructor(private attendanceService: AttendanceService) {}

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
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

    this.attendanceService
      .getAttendancesByUserAndDates(this.userId, startDate, endDate)
      .subscribe((response) => {
        console.log(response);
        this.attendances = response.attendances.map(
          (attendance: Attendance) => ({
            ...attendance,
            date: this.convertToLocalDate(new Date(attendance.date)),
          })
        );
      });
  }

  convertToLocalDate(date: Date): string {
    const peruOffset = -5 * 60;
    const localDate = new Date(date.getTime() + peruOffset * 60000);
    return localDate.toISOString();
  }

  getAttendanceClass(date: Date): string {
    const today = new Date();
    if (date > today) {
      return '';
    }
    const attendance = this.attendances.find(
      (att) => new Date(att.date).toDateString() === date.toDateString()
    );

    if (attendance) {
      switch (attendance.state) {
        case 'Asistencia':
          return 'green';
        case 'Tardanza':
          return 'orange';
        case 'Falta':
          return 'red';
        case 'Justificado':
          return 'blue';
        default:
          return '';
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
      (att) => new Date(att.date).toDateString() === date.toDateString()
    );

    if (attendance) {
      switch (attendance.state) {
        case 'Asistencia':
          return 'A';
        case 'Tardanza':
          return 'T';
        case 'Falta':
          return 'F';
        case 'Justificado':
          return 'J';
        default:
          return '';
      }
    } else {
      return 'F';
    }
  }

  generateTooltip(attendanceDate: Date): string {
    const attendance = this.attendances.find(
      (att) =>
        new Date(att.date).toDateString() === attendanceDate.toDateString()
    );

    if (attendance) {
      const localDate = new Date(attendance.date);
      const day = localDate.getDate();
      const month = localDate.toLocaleString('es-ES', { month: 'long' });
      const year = localDate.getFullYear();
      const hours = String(localDate.getHours()).padStart(2, '0');
      const minutes = String(localDate.getMinutes()).padStart(2, '0');
      const seconds = String(localDate.getSeconds()).padStart(2, '0');

      return `${day} de ${month} del ${year} a las ${hours}:${minutes}:${seconds}`;
    }

    return 'No tiene registrada la asistencia para este día';
  }
}
