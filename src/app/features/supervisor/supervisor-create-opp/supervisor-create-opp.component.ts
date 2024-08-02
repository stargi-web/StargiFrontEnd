import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { OpportunityService } from '../../../services/opportunityService';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';

interface FieldError{
  field:string,
  message:string
}
@Component({
  selector: 'app-supervisor-create-opp',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,InputTextModule,InputNumberModule,DropdownModule,ButtonModule,FormsModule,CalendarModule,InputTextareaModule],
  templateUrl: './supervisor-create-opp.component.html',
  styleUrl: './supervisor-create-opp.component.css'
})
export class SupervisorCreateOppComponent implements OnInit{
  errors!:FieldError[]
  opportunityForm: FormGroup;
  opportunityTypes = [
    { label: 'Básica', value: 'Básica' },
    { label: 'Estandar', value: 'Estandar' },
    { label: 'No estandar', value: 'No estandar' }
  ];
  productTypes=[
    {label:'Porta',value:'Porta'},
    {label:'Venta',value:'Venta'},
    {label:'Porta-Venta',value:'Porta-Venta'},
    {label:'BAM',value:'BAM'},
    {label:'Localizador',value:'Localizador'},
    {label:'SMS',value:'SMS'},
    {label:'Licencias Google',value:'Licencias Google'},
    {label:'Licencias Microsoft',value:'Licencias Microsoft'},
    {label:'GPON',value:'GPON'},
    {label:'Fibra Plus',value:'Fibra Plus'},
    {label:'Otros',value:'Otros'}
  ]
  products! : any[];
  states = [
    
    { label: 'Potenciales', value: 'Potenciales' },
    { label: 'Prospecto', value: 'Prospecto' },
    { label: 'Prospecto calificado', value: 'Prospecto calificado' },
    { label: 'Prospecto desarrollado', value: 'Prospecto desarrollado' },
    { label: 'Cierre', value: 'Cierre' },
    { label: 'No cierre', value: 'No cierre' }
  ];
  disable=false;

  constructor(private fb: FormBuilder,private opportunityService:OpportunityService) {
    const userId=Number(sessionStorage.getItem("userId"));
    this.opportunityForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      businessName: ['', Validators.required],
      SfaNumber: ['', Validators.required],
      oppSfaDateCreation: ['', Validators.required],
      type: ['', Validators.required],
      amount:['',Validators.required],
      product: ['', Validators.required],
      otherDetails: ['',Validators.required],
      state: ['', Validators.required],
      estimatedClosingDate: ['', Validators.required],
      commentary: ['',Validators.required],
      contactName:['',Validators.required],
      contactNumber:['',Validators.required],
      units:['',Validators.required],
      productType:['',Validators.required],
      userId:userId
    });
    this.errors = Object.keys(this.opportunityForm.controls).map(key => ({
      field: key,
      message: ''
    }));
  }
  ngOnInit(): void {
      this.products=[
        { label: 'DBI-Fibra Óptica', value: 'DBI-Fibra Óptica' },
        { label: 'DBI-Radio Enlace', value: 'DBI-Radio Enlace' },
        { label:'DBI-Fija',value:'DBI-Fija'},
        { label: 'DBI-GPON', value: 'DBI-GPON' },
        { label: 'Nube Pública', value: 'Nube Pública' },
        { label: 'Antivirus', value: 'Antivirus' },
        { label: 'Cloud Backup', value: 'Cloud Backup' },
        { label: 'Central telefónica', value: 'Central telefónica' },
        {label:'Venta',value:'Venta'},
        {label:'Portabilidad',value:'Portabilidad'},
        {label:'GPON',value:'GPON'},
        {label:'DBI',value:'DBI'},
        {label:'SVA',value:'SVA'},
        {label:'Móvil',value:'Móvil'},
        { label: 'Otros', value: 'Otros' }
      ];
  }
  onSubmit() {
    if (this.opportunityForm.valid) {
      this.disable=true;
      console.log(this.opportunityForm.value);
      this.opportunityService.createOpportunity(this.opportunityForm.value).subscribe({
        next: response => {
          alert("Creación exitosa");
          this.opportunityForm.reset();
          this.disable=false;
          this.errors.forEach(error => error.message = '');
        },
        error: error => console.error(error)
      });
    } else {
      this.disable=false;
      this.updateErrorMessages();
    }
  }
  isFieldInvalid(field: string): boolean|null {
    const control = this.opportunityForm.get(field);
    return (
      control &&
      !control.valid &&
      (control.dirty || control.touched)
    );
  }
  getFieldErrorMessage(field: string): string {
    const control = this.opportunityForm.get(field);
    if (control!.errors!['required']) {
      return 'Este campo es requerido';
    } else if (control!.errors!['pattern']) {
      return 'Debe ser un número de 11 dígitos';
    }
    return '';
  }

  updateErrorMessages() {
    this.errors.forEach(error => {
      const control = this.opportunityForm.get(error.field);
      if (control && control.errors) {
        if (control.errors!['required']) {
          error.message = 'Este campo es requerido';
        } else if (control.errors['pattern']) {
          error.message = 'Debe ser un número de 11 dígitos';
        } else {
          error.message = '';
        }
      } else {
        error.message = '';
      }
    });
  }
}
