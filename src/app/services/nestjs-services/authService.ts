import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/environment';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { LogInUser } from '../../core/models/LogInUser';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient, private router: Router) {}

  logIn(body: LogInUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, body).pipe(
      tap((response) => {
        sessionStorage.setItem('userId', response.userId);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('name', response.name);
      }),
      catchError(this.handleError)
    );
  }
  decodeToken(token: string) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error('Error decodificando el token:', error);
      return null;
    }
  }
  redirectToRoleBasedComponent() {
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      const role = decodedToken?.role || [];
      sessionStorage.setItem('role', role);
      if (role === 'admin') {
        this.router.navigate(['/admin']);
      } else if (role === 'user') {
        this.router.navigate(['/user']);
      } else if (role === 'supervisor') {
        this.router.navigate(['/supervisor']);
      } else if (role === 'executive' || role === 'executivegpon') {
        this.router.navigate(['/executive']);
      } else if (role === 'HHRR') {
        this.router.navigate(['/HHRR']);
      } else {
        console.error('Rol no reconocido:', role);
      }
    } else {
      console.error('No se encontró el token en sessionStorage');
    }
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    } else {
      console.error('Backend retornó el código de estado ', error);
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }
}
