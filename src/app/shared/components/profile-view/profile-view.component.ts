import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../../core/models/userModel';
import { UserService } from '../../../services/userService';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
@Component({
  selector: 'app-profile-view',
  standalone: true,
  imports: [CardModule, PasswordModule, FormsModule, ButtonModule],
  templateUrl: './profile-view.component.html',
  styleUrl: './profile-view.component.css',
})
export class ProfileViewComponent implements OnInit {
  user!: UserModel;
  password?: string;
  userId!: number;
  disable = false;
  constructor(private userService: UserService) {}
  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.userService.getUserById(this.userId).subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => console.error(error),
    });
  }
  changePassword() {
    if (this.password) {
      this.disable = true;
      this.userService
        .changePassword({ userId: this.userId, password: this.password })
        .subscribe({
          next: (response) => {
            alert('Contraseña cambiada');
            this.disable = false;
            this.password = '';
          },
          error: (error) => {
            alert('Algo salió mal');
            console.error(error);
            this.disable = false;
          },
        });
    }
  }
}
