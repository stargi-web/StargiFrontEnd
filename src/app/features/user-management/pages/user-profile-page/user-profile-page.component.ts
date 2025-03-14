import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/userModel';
import { UserService } from '../../services/userService';
import { CardModule } from 'primeng/card';
import { PasswordModule } from 'primeng/password';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';

@Component({
  selector: 'app-user-profile-page',
  standalone: true,
  imports: [CardModule, PasswordModule, FormsModule, ButtonModule],
  templateUrl: './user-profile-page.component.html',
  styleUrl: './user-profile-page.component.css',
})
export class UserProfilePageComponent {
  user!: UserModel;
  password?: string;
  userId!: number;
  disable = false;
  constructor(
    private userService: UserService,
    private sessionStorageService: SessionStorageService
  ) {}
  ngOnInit(): void {
    this.userId = Number(
      this.sessionStorageService.getItem(SESSION_ITEMS.USER_ID)
    );
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
