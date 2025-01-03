import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../core/services/nestjs-services/userService';
import { AttendanceService } from '../../../../core/services/nestjs-services/attendanceService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { DeleteUserDialogComponent } from '../../../../shared/components/delete-user-dialog/delete-user-dialog.component';

@Component({
  selector: 'app-rrhh-users-attendaces',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
  providers: [DialogService],
  templateUrl: './rrhh-users-attendaces.component.html',
  styleUrl: './rrhh-users-attendaces.component.css',
})
export class RrhhUsersAttendacesComponent implements OnInit {
  users: any;
  loading = true;
  constructor(
    public dialogService: DialogService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private attendanceService: AttendanceService
  ) {}
  ref: DynamicDialogRef | undefined;

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
        this.loading = false;
      },
      error: (error) => console.error(error),
    });
  }

  deletUser(userId: number) {
    const config = {
      data: {
        userId,
      },
      Headers: 'Eliminar usuario',
      with: '60vw',
    };
    this.ref = this.dialogService.open(DeleteUserDialogComponent, config);
    this.ref.onClose.subscribe((response: boolean) => {
      if (response === true) {
        this.users = this.users.filter((user: any) => user.id !== userId);
        console.log(`Usuario con ID ${userId} eliminado.`);
      } else {
        console.log('Acción cancelada.');
      }
    });
  }

  goToMonthlyAttendanceSummary() {
    this.router.navigate(['/HHRR/monthly-attendance-summary']);
  }
  downloadExcel() {
    const month = 11;
    const year = 2024;
    this.attendanceService.getAttendanceExcelFile(month, year).subscribe(
      (response: Blob) => {
        saveAs(response, 'attendance.xlsx');
      },
      (error) => {
        console.error('Error al descargar el archivo Excel', error);
      }
    );
  }
}