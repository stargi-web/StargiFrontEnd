import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class MessageNotificationService {
  constructor(private messageService: MessageService) {}

  showSuccess(message: string): void {
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: message,
    });
  }

  showError(message: string): void {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
    });
  }

  showInfo(message: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Información',
      detail: message,
    });
  }

  showWarn(message: string): void {
    this.messageService.add({
      severity: 'warn',
      summary: 'Advertencia',
      detail: message,
    });
  }
}
