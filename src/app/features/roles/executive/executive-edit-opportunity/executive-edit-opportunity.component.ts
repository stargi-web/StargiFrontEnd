import { Component, Input } from '@angular/core';
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
  selector: 'app-executive-edit-opportunity',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextModule,InputNumberModule,DropdownModule,ButtonModule,FormsModule,CalendarModule,InputTextareaModule],
  templateUrl: './executive-edit-opportunity.component.html',
  styleUrl: './executive-edit-opportunity.component.css'
})
export class ExecutiveEditOpportunityComponent {
  @Input() ruc!: string;
  @Input() businessName!: string;
  @Input() SfaNumber!: number;
  @Input() oppSfaDateCreation!: Date;
  @Input() type!: string;
  @Input() product!: string;
  @Input() otherDetails!: string;
  @Input() estimatedClosingDate!: Date;
  @Input() state!: string;
  @Input() commentary!: string;
  opportunityForm: FormGroup;
  constructor(private fb: FormBuilder){
    this.opportunityForm = this.fb.group({
      state: [this.state, Validators.required],
      commentary: [this.commentary]
    });
  }
  onSubmit() {
  throw new Error('Method not implemented.');
  }
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
    { label: 'No contactado', value: 'No contactado' },
    { label: 'Potenciales', value: 'Potenciales' },
    { label: 'Prospecto', value: 'Prospecto' },
    { label: 'Prospecto calificado', value: 'Prospecto calificado' },
    { label: 'Prospecto desarrollado', value: 'Prospecto desarrollado' },
    { label: 'Cierre', value: 'Cierre' },
    { label: 'No cierre', value: 'No cierre' }
  ];
}
