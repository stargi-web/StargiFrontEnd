import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TeamService } from '../../../team-management/services/teamService';
import { UserService } from '../../services/userService';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { catchError, map, of, switchMap } from 'rxjs';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';

@Component({
  selector: 'app-create-user-page',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    ReactiveFormsModule,
    DropdownModule,
  ],
  templateUrl: './create-user-page.component.html',
  styleUrl: './create-user-page.component.css',
})
export class CreateUserPageComponent {
  isSupervisor = false;
  teamId: number = Number(
    this.sessionStorageService.getItem(SESSION_ITEMS.TEAM_ID)
  );
  userForm: FormGroup;
  roles = [
    { label: 'Ejecutivo', value: 'executive' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Recursos Humanos', value: 'HHRR' },
  ];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private teamService: TeamService,
    private sessionStorageService: SessionStorageService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: [this.roles[0], Validators.required],
    });
  }

  ngOnInit() {
    if (
      this.sessionStorageService.getItem(SESSION_ITEMS.ROLE) === 'supervisor'
    ) {
      this.isSupervisor = true;
    }
  }
  onSubmit() {
    console.log('Creando...');
    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };
      formData.role = formData.role.value;
      this.userService
        .createUser(formData)
        .pipe(
          switchMap((response) => {
            // Verifica si isSupervisor es true
            if (this.isSupervisor) {
              return this.teamService.assignTeamToMember({
                memberId: response.id,
                teamId: this.teamId,
              });
            } else {
              // Si no es supervisor, devuelve un observable que emite la respuesta sin hacer nada más
              return of(response);
            }
          })
        )
        .subscribe({
          next: (response) => {
            alert('Usuario creado exitosamente');
          },
          error: (error) => {
            console.error(error);
          },
        });
    } else {
      alert('Complete el formulario');
    }
  }
}
