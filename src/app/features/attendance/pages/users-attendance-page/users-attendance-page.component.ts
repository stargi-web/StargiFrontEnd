import { Component } from '@angular/core';
import { UserService } from '../../../user-management/services/userService';
import { AttendanceService } from '../../services/attendanceService';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { saveAs } from 'file-saver';
import { AttendanceTableComponent } from '../../components/attendance-table/attendance-table.component';

@Component({
  selector: 'app-users-attendance-page',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    AttendanceTableComponent,
  ],
  providers: [],
  templateUrl: './users-attendance-page.component.html',
  styleUrl: './users-attendance-page.component.css',
})
export class UsersAttendancePageComponent {
  showAttendanceTable = true;
  users: any;
  constructor(
    private userService: UserService,
    private attendanceService: AttendanceService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (error) => console.error(error),
    });
  }

  goToMonthlyAttendanceSummary() {
    this.showAttendanceTable = !this.showAttendanceTable;
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
