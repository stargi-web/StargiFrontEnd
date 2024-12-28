import { Component } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/authService';
import { LogInUser } from '../core/models/LogInUser';
import { MessageNotificationService } from '../shared/services/message-toast.service';
import { MessageModule } from 'primeng/message';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    InputTextModule,
    PasswordModule,
    ButtonModule,
    FormsModule,
    MessageModule,
    ToastModule,
  ],
  providers: [MessageService, MessageNotificationService],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
export class AuthComponent {
  userName: string = '';
  password: string = '';

  constructor(
    private router: Router,
    private authService: AuthService,
    private messageNotificationService: MessageNotificationService
  ) {}
  logIn() {
    const logInUser: LogInUser = {
      userName: this.userName,
      password: this.password,
    };
    console.log('logInUser', logInUser);
    this.authService.logIn(logInUser).subscribe({
      next: (response) => {
        this.authService.redirectToRoleBasedComponent();
      },
      error: (error) => {
        this.messageNotificationService.showError(error.message);
      },
    });
  }
}
