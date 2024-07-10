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
import { OpportunityService } from '../../../services/opportunityService';
@Component({
  selector: 'app-executive-create-opportunity',
  standalone: true,
  imports: [ReactiveFormsModule,InputTextModule,InputNumberModule,DropdownModule,ButtonModule,FormsModule,CalendarModule,InputTextareaModule],
  templateUrl: './executive-create-opportunity.component.html',
  styleUrl: './executive-create-opportunity.component.css'
})
export class ExecutiveCreateOpportunityComponent implements OnInit {
  onSubmit() {
    if(this.opportunityForm.valid){
      console.log(this.opportunityForm.value)
      this.opportunityService.createOpportunity(this.opportunityForm.value).subscribe(
        {
          next:response=>{
            alert("Creación exitosa");
            this.opportunityForm.reset();
          },
          error:error=>console.error(error)
        }
      );
      
    }
    else{
      alert("Los valores no son validos");
    }
    
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
    { label: 'Prospecto calificado', value: 'Prospecto calificado' },
    { label: 'Prospecto desarrollado', value: 'Prospecto desarrollado' },
    { label: 'Cierre', value: 'Cierre' },
    { label: 'No cierre', value: 'No cierre' }
  ];

  constructor(private fb: FormBuilder,private opportunityService:OpportunityService) {
    const userId=Number(sessionStorage.getItem("userId"));
    this.opportunityForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      businessName: ['', Validators.required],
      SfaNumber: ['', Validators.required],
      oppSfaDateCreation: ['', Validators.required],
      type: ['', Validators.required],
      product: ['', Validators.required],
      otherDetails: [''],
      state: ['', Validators.required],
      estimatedClosingDate: ['', Validators.required],
      commentary: [''],
      contactName:[''],
      contactNumber:[''],
      userId:userId
    });
  }
  ngOnInit(): void {
    
  }

}
