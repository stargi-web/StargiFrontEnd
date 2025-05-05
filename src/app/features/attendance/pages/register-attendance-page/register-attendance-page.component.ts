import { Component, ViewChild } from '@angular/core';
import { ClockComponent } from '../../components/clock/clock.component';
import { AttendanceService } from '../../services/attendanceService';
import { ButtonModule } from 'primeng/button';
import { AttendanceMonthSummaryComponent } from '../../components/attendance-month-summary/attendance-month-summary.component';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AccumulatedAnimationDialogComponent } from '../../../accumulated-sales/components/accumulated-animation-dialog/accumulated-animation-dialog.component';
import { MessageNotificationService } from '../../../../shared/services/message-toast.service';

@Component({
  selector: 'app-register-attendance-page',
  standalone: true,
  imports: [ButtonModule, ClockComponent, AttendanceMonthSummaryComponent],
  providers: [DialogService],
  templateUrl: './register-attendance-page.component.html',
  styleUrl: './register-attendance-page.component.css',
})
export class RegisterAttendancePageComponent {
  @ViewChild(AttendanceMonthSummaryComponent)
  private attendanceSummary!: AttendanceMonthSummaryComponent;
  ref: DynamicDialogRef | undefined;
  constructor(
    private attendanceService: AttendanceService,
    private sessionStorageService: SessionStorageService,
    private dialogService: DialogService,
    private messageNotificationService: MessageNotificationService
  ) {}

  ngOnInit() {
    this.showDialog();
  }

  registerAttendance() {
    const userId = Number(
      this.sessionStorageService.getItem(SESSION_ITEMS.USER_ID)
    );
    if (userId) {
      const now = new Date();
      const { hour, minute } = this.getPeruvianHours(now.toISOString());
      // Convert to minutes
      const currentMinutes = hour * 60 + minute;

      // Define the range in minutes
      const startMinutes = 8 * 60 + 25; // 8:25 AM
      const endMinutes = 12 * 60; // 6:00 PM

      const isWithinRange =
        currentMinutes >= startMinutes && currentMinutes <= endMinutes;

      console.log(`Is within range: ${isWithinRange}`);

      if (isWithinRange) {
        this.attendanceService.registerAttendance(userId).subscribe({
          next: (response) => {
            const isoDate = response.date;
            //console.log(isoDate);
            const peruvianDate = this.converttoPeruvianDate(isoDate);
            //console.log(peruvianDate);
            this.attendanceSummary.updateSummary();
          },
        });
      } else {
        this.messageNotificationService.showInfo(
          'No se puede marcar asistencia fuera del horario permitido (8:25 AM - 6:00 PM).'
        );
      }
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

  getPeruvianHours(fechaISO: string): { hour: number; minute: number } {
    const fecha = new Date(fechaISO);
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
      timeZone: 'America/Lima',
    };
    const [hour, minute] = new Intl.DateTimeFormat('es-PE', options)
      .formatToParts(fecha)
      .filter((part) => part.type === 'hour' || part.type === 'minute')
      .map((part) => parseInt(part.value, 10) || 0);

    return { hour, minute };
  }

  showDialog() {
    this.ref = this.dialogService.open(AccumulatedAnimationDialogComponent, {
      focusOnShow: false,
      showHeader: false,
      closable: true,
      contentStyle: {
        'background-color': 'var(--orange-300)',
      },
    });
  }
}
