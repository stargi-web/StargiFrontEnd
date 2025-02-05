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
  showError(error: any): void {
    let errorMessage: string;

    console.log('Error:', error);

    // Verificar si el error es un string
    if (typeof error === 'string') {
      errorMessage = error;
    }
    // Si el error es un objeto de tipo Error
    else if (error instanceof Error) {
      errorMessage = error.message;
    }
    // Verificar si el error es un objeto con un mensaje estructurado
    else if (error && typeof error === 'object') {
      // Intenta acceder a los campos comunes como 'message', 'error', 'detail'
      errorMessage =
        error.error.message ||
        error.message ||
        error.error ||
        error.detail ||
        'Error desconocido';
    }
    // En caso de que no se pueda determinar el tipo de error
    else {
      errorMessage = 'Error desconocido';
    }
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: errorMessage,
      life: 9000,
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
