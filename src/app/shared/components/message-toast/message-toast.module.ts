import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageService } from 'primeng/api';
import { MessageModule } from 'primeng/message';
import { MessageNotificationService } from './message-toast.service'; // ajusta la ruta según tu estructura de directorios
import { ToastComponent } from './message-toast.component';
import { ToastModule } from 'primeng/toast';

@NgModule({
  declarations: [ToastComponent],
  imports: [CommonModule, MessageModule, ToastModule],
  providers: [MessageService, MessageNotificationService],
  exports: [MessageModule, ToastComponent, ToastModule],
})
export class MessageToastModule {}
