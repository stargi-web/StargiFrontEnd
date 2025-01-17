import { Component, OnInit } from '@angular/core';
import { AttendanceService } from '../../../../../../core/services/nestjs-services/attendanceService';
import { CommonModule, formatDate } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { JustificationDialogComponent } from '../justification-dialog/justification-dialog.component';
@Component({
  selector: 'app-attendance-table',
  standalone: true,
  imports: [CommonModule, TooltipModule, ConfirmDialogModule],
  providers: [DialogService],
  templateUrl: './attendance-table.component.html',
  styleUrl: './attendance-table.component.css',
})
export class AttendanceTableComponent implements OnInit {
  attendanceData: any[] = [];
  weekdays: Date[] = [];

  monthNames = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ];
  textMonth = '';
  textYear = '';

  constructor(
    public dialogService: DialogService,
    private attendanceService: AttendanceService
  ) {}
  ref: DynamicDialogRef | undefined;
  ngOnInit(): void {
    this.initializeWeekdays();
    this.loadAttendanceData();
    this.textMonth = this.monthNames[new Date().getMonth()];
    this.textYear = new Date().getFullYear().toString();
  }

  initializeWeekdays(): void {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        this.weekdays.push(date);
      }
    }
  }

  loadAttendanceData(): void {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    this.attendanceService
      .getAttendanceSummaryByRole(month, year)
      .subscribe((response) => {
        if (response.success) {
          this.attendanceData = response.data.map((user: any) => ({
            ...user,
            attendances: user.attendances.map((attendance: any) => ({
              ...attendance,

              registerDate: this.adjustToLimaTimezone(
                new Date(attendance.registerDate)
              ),
            })),
          }));
        }
      });
  }
  private adjustToLimaTimezone(date: Date): Date {
    const utcOffset = -5 * 60;
    const localOffset = date.getTimezoneOffset();
    const totalOffset = utcOffset + localOffset;

    return new Date(date.getTime() + totalOffset * 60000);
  }
  getAttendanceLabel(user: any, day: Date): string {
    const today = new Date();

    if (day > today) {
      return '';
    }
    const attendance = user.attendances.find(
      (att: any) =>
        formatDate(att.registerDate, 'yyyy-MM-dd', 'en-US') ===
        formatDate(day, 'yyyy-MM-dd', 'en-US')
    );

    if (!attendance) {
      return 'F';
    }

    if (attendance.status === 'Falta') {
      return 'F';
    }

    if (attendance.status === 'Asistencia') {
      return 'A';
    }

    if (attendance.status === 'Tardanza') {
      return 'T';
    }

    if (attendance.status === 'Justificado') {
      return 'J';
    }

    const registerDate = new Date(attendance.registerDate);
    const hours = registerDate.getHours();
    const minutes = registerDate.getMinutes();

    if (hours < 9 || (hours === 9 && minutes === 0)) {
      return 'A';
    } else {
      return 'T';
    }
  }

  getAttendanceClass(user: any, day: Date): string {
    const today = new Date();

    if (day > today) {
      return '';
    }
    const attendance = user.attendances.find(
      (att: any) =>
        formatDate(att.registerDate, 'yyyy-MM-dd', 'en-US') ===
        formatDate(day, 'yyyy-MM-dd', 'en-US')
    );

    if (!attendance || attendance.status === 'Falta') {
      return 'falta';
    }

    if (attendance.status === 'Asistencia') {
      return 'asistencia';
    }

    if (attendance.status === 'Tardanza') {
      return 'tardanza';
    }

    if (attendance.status === 'Justificado') {
      return 'justificado';
    }

    const registerDate = new Date(attendance.registerDate);
    const hours = registerDate.getHours();
    const minutes = registerDate.getMinutes();

    if (hours < 9 || (hours === 9 && minutes === 0)) {
      return 'asistencia';
    } else {
      return 'tardanza';
    }
  }
  getTooltipText(user: any, day: Date): string {
    const attendance = user.attendances.find((att: any) => {
      const registerDate = new Date(att.registerDate);
      return (
        !isNaN(registerDate.getTime()) &&
        formatDate(registerDate, 'yyyy-MM-dd', 'en-US') ===
          formatDate(day, 'yyyy-MM-dd', 'en-US')
      );
    });

    if (attendance) {
      const registerDate = new Date(attendance.registerDate);
      return `Marcado el ${registerDate.toLocaleDateString('es-PE', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })} a las ${registerDate.toLocaleTimeString('es-PE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      })}`;
    }

    return 'No hay registro para este día';
  }

  openJustificationDialog(user: any, day: Date): void {
    const attendance = user.attendances.find(
      (att: any) =>
        new Date(att.registerDate).toDateString() === day.toDateString()
    );

    if (!attendance) {
      return;
    }

    this.ref = this.dialogService.open(JustificationDialogComponent, {
      header: 'Confirmar Justificación',
      width: '400px',
      data: {
        user,
        date: day,
        attendanceId: attendance.attendanceId,
      },
    });

    this.ref.onClose.subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.attendanceService
          .justifyAttendance(attendance.attendanceId)
          .subscribe({
            next: () => {
              attendance.status = 'Justificado';
            },
            error: (err) => {
              console.error('Error al justificar el attendance:', err);
            },
          });
      }
    });
  }
}
