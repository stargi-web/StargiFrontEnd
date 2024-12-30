import { Component } from '@angular/core';
import { ClockComponent } from '../../../../shared/components/clock/clock.component';
import { AttendanceService } from '../../../../core/services/nestjs-services/attendanceService';
import { ButtonModule } from 'primeng/button';
import { AttendanceMonthSummaryComponent } from '../../../../shared/components/attendance-month-summary/attendance-month-summary.component';

@Component({
  selector: 'app-executive-register-attendance',
  standalone: true,
  imports: [ClockComponent, ButtonModule, AttendanceMonthSummaryComponent],
  templateUrl: './executive-register-attendance.component.html',
  styleUrl: './executive-register-attendance.component.css',
})
export class ExecutiveRegisterAttendanceComponent {
  constructor(private attendanceService: AttendanceService) {}

  registerAttendance() {
    const userId = Number(sessionStorage.getItem('userId'));
    if (userId) {
      this.attendanceService.registerAttendance(userId).subscribe({
        next: (response) => {
          const isoDate = response.date;
          console.log(isoDate);
          const peruvianDate = this.converttoPeruvianDate(isoDate);
          console.log(peruvianDate);
          alert(`Asistencia registrada con éxito el ${peruvianDate}`);
        },
        error: (error) =>
          alert('Error, probablemente ya registraste tu asistencia de hoy'),
      });
    }
  }
  converttoPeruvianDate(fechaISO: string): string {
    const fecha = new Date(fechaISO);
    return fecha.toLocaleString('es-PE', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'America/Lima',
    });
  }
}
