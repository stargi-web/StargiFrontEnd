import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeamService } from '../../../services/teamService';
import { UserService } from '../../../services/userService';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-admin-create-user',
  standalone: true,
  imports: [InputTextModule,PasswordModule,ButtonModule,ReactiveFormsModule,DropdownModule],
  templateUrl: './admin-create-user.component.html',
  styleUrl: './admin-create-user.component.css'
})
export class AdminCreateUserComponent {
  userForm:FormGroup;
  roles = [
    { label: 'Ejecutivo', value: 'executive' },
    { label: 'Supervisor', value: 'supervisor' },
    { label: 'Recursos Humanos', value: 'HHRR' },
  ];
  constructor(private fb:FormBuilder,private userService:UserService){
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      role: ['',Validators.required], 
    });
  }
  onSubmit(){
    console.log(this.userForm.value);
    console.log("Creando...");
    if(this.userForm.valid){
      const formData= {...this.userForm.value};
      formData.role=formData.role.value;
      this.userService.createUser(formData).subscribe(
        {
          next:response=>{
            alert("Usuario creado exitosamente");
          },
          error:error=>{alert("Error, usuario no creado")}
        }
      )
    }
  }
}
