import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-executive-create-opportunity',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextModule,InputNumberModule,DropdownModule,ButtonModule,FormsModule,CalendarModule,InputTextareaModule],
  templateUrl: './executive-create-opportunity.component.html',
  styleUrl: './executive-create-opportunity.component.css'
})
export class ExecutiveCreateOpportunityComponent implements OnInit {
  onSubmit() {
    
  }
  
  opportunityForm: FormGroup;
  opportunityTypes = [
    { label: 'Básico', value: 'Básico' },
    { label: 'Estandar', value: 'Estandar' },
    { label: 'No estandar', value: 'No estandar' }
  ];
  products = [
    { label: 'DBI-Fibra Óptica', value: 'DBI-Fibra Óptica' },
    { label: 'DBI-Radio Enlace', value: 'DBI-Radio Enlace' },
    { label: 'DBI-GPON', value: 'DBI-GPON' },
    { label: 'Nube Pública', value: 'Nube Pública' },
    { label: 'Antivirus', value: 'Antivirus' },
    { label: 'Cloud Backup', value: 'Cloud Backup' },
    { label: 'Central telefónica', value: 'Central telefónica' },
    { label: 'Otros', value: 'Otros' }
  ];
  states = [
    { label: 'Potenciales', value: 'Potenciales' },
    { label: 'Prospecto', value: 'Prospecto' },
    { label: 'Prospecto Calificado', value: 'Prospecto Calificado' },
    { label: 'Prospecto Desarrollo', value: 'Prospecto Desarrollo' },
    { label: 'Cierre', value: 'Cierre' },
    { label: 'No Cierre', value: 'No Cierre' },
    { label: 'No Contactado', value: 'No Contactado' }
  ];

  constructor(private fb: FormBuilder) {
    this.opportunityForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      businessName: ['', Validators.required],
      sfaOpportunityNumber: ['', Validators.required],
      creationDateSfaOpp: ['', Validators.required],
      opportunityType: ['', Validators.required],
      product: ['', Validators.required],
      otherDetails: [''],
      createdAt: ['', Validators.required],
      status: ['', Validators.required],
      estimatedClosingDate: ['', Validators.required],
      commentary: ['']
    });
  }
  ngOnInit(): void {
    
  }
}
