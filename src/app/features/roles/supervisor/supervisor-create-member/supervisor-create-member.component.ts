import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../core/services/nestjs-services/userService';
import { TeamService } from '../../../../core/services/nestjs-services/teamService';
import { switchMap } from 'rxjs';
import { error } from 'console';
@Component({
  selector: 'app-supervisor-create-member',
  standalone: true,
  imports: [InputTextModule, PasswordModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './supervisor-create-member.component.html',
  styleUrl: './supervisor-create-member.component.css',
})
export class SupervisorCreateMemberComponent {
  userForm: FormGroup;
  teamId: number;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private teamService: TeamService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['executive'],
    });
    this.teamId = Number(sessionStorage.getItem('teamId'));
  }
  onSubmit() {
    console.log('Creando...');
    if (this.userForm.valid) {
      this.userService
        .createUser(this.userForm.value)
        .pipe(
          switchMap((response) =>
            this.teamService.assignTeamToMember({
              memberId: response.id,
              teamId: this.teamId,
            })
          )
        )
        .subscribe({
          next: (response) => {
            alert('Usuario creado exitosamente');
          },
          error: (error) => {
            console.error(error);
          },
        });
    }
  }
}
