import { Injectable } from '@angular/core';
import { UserService } from '../../user-management/services/userService';
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

  loadUsers(teamId?: number): Promise<SelectItemGroup[]> {
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

    if (!teamId) {
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
    } else {
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
    }
  }

  getFilters(teamId?: number): Promise<any> {
    const role = this.getCurrentUserRole();
    const userId = this.getCurrentUserId();

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
        if (!teamId) {
          return Promise.resolve(baseFilters);
        }
        return this.userService
          .getUsersByTeamId(teamId)
          .toPromise()
          .then((users: any[]) => {
            const userIds =
              users.length > 0 ? users.map((user: any) => user.id) : [0];
            return { ...baseFilters, user: { value: userIds } }; // Si está vacío, devuelve [0]
          });

      case 'supervisor':
        if (!teamId) {
          teamId = this.getCurrentTeamId();
        }
        // Obtener los IDs de los usuarios del equipo
        return this.userService
          .getUsersByTeamId(teamId)
          .toPromise()
          .then((users: any[]) => {
            const userIds =
              users.length > 0 ? users.map((user: any) => user.id) : [0];
            return { ...baseFilters, user: { value: userIds } }; // Si está vacío, devuelve [0]
          });
      case 'executive':
        return Promise.resolve({ ...baseFilters, user: { value: userId } }); // Executive filtra por su ID
      default:
        return Promise.resolve(baseFilters);
    }
  }
}
