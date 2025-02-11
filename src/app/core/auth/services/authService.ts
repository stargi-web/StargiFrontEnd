import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../env/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LogInUser } from '../models/LogInUser';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { ROLES } from '../../../shared/models/roles';
import { UserService } from '../../../features/user-management/services/userService';
import { SessionStorageService } from '../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../shared/models/session-items';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserRole = new BehaviorSubject<string>('');
  private userId = 0;
  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private sessionStorageService: SessionStorageService
  ) {
    // Recupera el rol desde sessionStorage al inicializar el servicio
    const storedRole = this.sessionStorageService.getItem(SESSION_ITEMS.ROLE);
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
        this.sessionStorageService.setItem(
          SESSION_ITEMS.USER_ID,
          response.userId
        );
        this.sessionStorageService.setItem(SESSION_ITEMS.TOKEN, response.token);
        this.sessionStorageService.setItem(SESSION_ITEMS.NAME, response.name);
        this.sessionStorageService.setItem(
          SESSION_ITEMS.USERNAME,
          response.userName
        );
        this.sessionStorageService.setItem(SESSION_ITEMS.ROLE, response.role);

        this.userId = response.userId;
        this.setUserRole(response.role);
      }),
      catchError((error) => {
        return throwError(() => new Error('Error al iniciar sesión'));
      })
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
    const token = this.sessionStorageService.getItem(SESSION_ITEMS.TOKEN);
    if (token) {
      const decodedToken: any = this.decodeToken(token);
      const role = decodedToken?.role || [];
      this.sessionStorageService.setItem(SESSION_ITEMS.ROLE, role);

      // Redirige a la ruta por defecto según el rol
      switch (role) {
        case 'admin':
          this.router.navigate(['/user']); // Ruta por defecto para admin
          break;
        case 'supervisor':
          this.userService.getLeadingTeamInfo(this.userId).subscribe({
            next: (response) => {
              if (response.teamId) {
                this.sessionStorageService.setItem(
                  SESSION_ITEMS.TEAM_ID,
                  response.teamId
                );
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
}
