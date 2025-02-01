import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LogInUser } from '../../../core/models/LogInUser';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ROLES } from '../../../core/models/roles';
import { UserService } from '../../../core/services/nestjs-services/userService';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserRole = new BehaviorSubject<string>(ROLES.EXECUTIVE);
  private userId = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService
  ) {
    // Recupera el rol desde sessionStorage al inicializar el servicio
    const storedRole = sessionStorage.getItem('role');
    if (storedRole) {
      this.currentUserRole.next(storedRole); // Actualiza el BehaviorSubject
    }
  }

  // Método para obtener el rol del usuario
  getCurrentUserRole() {
    return this.currentUserRole.asObservable();
  }

  // Método para cambiar el rol del usuario
  setUserRole(role: string) {
    this.currentUserRole.next(role);
  }

  logIn(body: LogInUser): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, body).pipe(
      tap((response) => {
        sessionStorage.setItem('userId', response.userId);
        sessionStorage.setItem('token', response.token);
        sessionStorage.setItem('name', response.name);
        sessionStorage.setItem('username', response.userName);
        sessionStorage.setItem('role', response.role);
        this.userId = response.userId;
        this.setUserRole(response.role);
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

      // Redirige a la ruta por defecto según el rol
      switch (role) {
        case 'admin':
          this.router.navigate(['/admin/users']); // Ruta por defecto para admin
          break;
        case 'supervisor':
          this.userService.getLeadingTeamInfo(this.userId).subscribe({
            next: (response) => {
              if (response.teamId) {
                sessionStorage.setItem('teamId', response.teamId);
              }
              this.router.navigate(['/team/members']); // Ruta por defecto para supervisor
            },
          });
          break;
        case 'executive':
        case 'executivegpon':
          this.router.navigate(['/opportunities/user']); // Ruta por defecto para executive
          break;
        case 'HHRR':
          this.router.navigate(['/attendance/users']); // Ruta por defecto para HHRR
          break;
        default:
          console.error('Rol no reconocido:', role);
          this.router.navigate(['/login']); // Redirige al login si el rol no es reconocido
          break;
      }
    } else {
      console.error('No se encontró el token en sessionStorage');
      this.router.navigate(['/login']); // Redirige al login si no hay token
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
