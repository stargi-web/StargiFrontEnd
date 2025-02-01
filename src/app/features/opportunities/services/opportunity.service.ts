import { Injectable } from '@angular/core';
import { UserService } from '../../../core/services/nestjs-services/userService';
import { SelectItemGroup } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class OpportunityService {
  constructor(private userService: UserService) {}

  getCurrentUserRole(): string {
    return sessionStorage.getItem('role') || '';
  }

  getCurrentUserId(): number {
    return Number(sessionStorage.getItem('userId'));
  }

  getCurrentTeamId(): number {
    return Number(sessionStorage.getItem('teamId'));
  }

  loadUsers(): Promise<SelectItemGroup[]> {
    const role = this.getCurrentUserRole(); // Obtener el rol del usuario actual
    const teamId = this.getCurrentTeamId(); // Obtener el teamId del usuario actual

    // Definir la estructura base de groupedUsers
    const groupedUsers: SelectItemGroup[] = [
      {
        label: 'Ejecutivos',
        value: 'executives',
        items: [],
      },
      {
        label: 'Supervisores',
        value: 'supervisor',
        items: [],
      },
    ];

    // Cargar usuarios según el rol
    switch (role) {
      case 'admin':
        // Admin: Cargar todos los usuarios
        return this.userService
          .getUsers()
          .toPromise()
          .then((users: any[]) => {
            users.forEach((user: any) => {
              if (user.role === 'executive') {
                groupedUsers[0].items.push({
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                });
              } else if (user.role === 'supervisor') {
                groupedUsers[1].items.push({
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                });
              }
            });
            return groupedUsers;
          });

      case 'supervisor':
        // Supervisor: Cargar solo los usuarios de su equipo
        return this.userService
          .getUsersByTeamId(teamId)
          .toPromise()
          .then((users: any[]) => {
            users.forEach((user: any) => {
              if (user.role === 'executive') {
                groupedUsers[0].items.push({
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                });
              } else if (user.role === 'supervisor') {
                groupedUsers[1].items.push({
                  label: `${user.firstName} ${user.lastName}`,
                  value: user.id,
                });
              }
            });
            return groupedUsers;
          });

      case 'executive':
        // Executive: No cargar ningún usuario
        return Promise.resolve([]); // Devuelve la estructura vacía envuelta en una promesa

      default:
        // Rol no reconocido: No cargar ningún usuario
        return Promise.resolve([]); // Devuelve la estructura vacía
    }
  }

  getFilters(): Promise<any> {
    const role = this.getCurrentUserRole();
    const userId = this.getCurrentUserId();
    const teamId = this.getCurrentTeamId();

    const baseFilters = {
      isCurrent: { value: true },
      state: {
        value: [
          'Potenciales',
          'Prospecto',
          'Prospecto calificado',
          'Prospecto desarrollado',
        ],
      },
    };

    switch (role) {
      case 'admin':
        return Promise.resolve(baseFilters); // Admin puede ver todo sin filtros adicionales
      case 'supervisor':
        // Obtener los IDs de los usuarios del equipo
        return this.userService
          .getUsersByTeamId(teamId)
          .toPromise()
          .then((users: any[]) => {
            const userIds = users.map((user: any) => user.id);
            return { ...baseFilters, user: { value: userIds } }; // Filtra por los IDs de los usuarios del equipo
          });
      case 'executive':
        return Promise.resolve({ ...baseFilters, user: { value: userId } }); // Executive filtra por su ID
      default:
        return Promise.resolve(baseFilters);
    }
  }
}
