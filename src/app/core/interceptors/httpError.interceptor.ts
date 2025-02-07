import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { MessageNotificationService } from '../../shared/services/message-toast.service';

export const httpErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageNotificationService);

  return next(req).pipe(
    catchError((error) => {
      //console.error('HTTP Error:', error);
      messageService.showError(error); //Toast message error
      return throwError(() => error);
    })
  );
};
