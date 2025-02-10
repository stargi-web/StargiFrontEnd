import { Component } from '@angular/core';
import { ClockComponent } from '../../components/clock/clock.component';
import { AttendanceService } from '../../services/attendanceService';
import { ButtonModule } from 'primeng/button';
import { AttendanceMonthSummaryComponent } from '../../components/attendance-month-summary/attendance-month-summary.component';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';

@Component({
  selector: 'app-register-attendance-page',
  standalone: true,
  imports: [ButtonModule, ClockComponent, AttendanceMonthSummaryComponent],
  templateUrl: './register-attendance-page.component.html',
  styleUrl: './register-attendance-page.component.css',
})
export class RegisterAttendancePageComponent {
  constructor(
    private attendanceService: AttendanceService,
    private sessionStorageService: SessionStorageService
  ) {}
  registerAttendance() {
    const userId = Number(
      this.sessionStorageService.getItem(SESSION_ITEMS.USER_ID)
    );
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
