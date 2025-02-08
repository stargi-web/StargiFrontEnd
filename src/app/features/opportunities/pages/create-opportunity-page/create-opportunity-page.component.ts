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
import { OpportunityService } from '../../services/opportunityService';
import { CommonModule } from '@angular/common';
import {
  offers,
  opportunityTypes,
  products,
  productTypes,
  states,
} from '../../models/constants';
interface FieldError {
  field: string;
  message: string;
}

@Component({
  selector: 'app-create-opportunity-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    ButtonModule,
    FormsModule,
    CalendarModule,
    InputTextareaModule,
  ],
  templateUrl: './create-opportunity-page.component.html',
  styleUrl: './create-opportunity-page.component.css',
})
export class CreateOpportunityPageComponent {
  userId!: number;
  errors!: FieldError[];
  opportunityForm: FormGroup;
  opportunityTypes = opportunityTypes;
  productTypes = productTypes;
  products = products;
  states = states;
  offers = offers;

  constructor(
    private fb: FormBuilder,
    private opportunityService: OpportunityService
  ) {
    this.opportunityForm = this.fb.group({
      ruc: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      businessName: ['', Validators.required],
      SfaNumber: ['', Validators.required],
      oppSfaDateCreation: ['', Validators.required],
      type: ['', Validators.required],
      amount: ['0', Validators.required],
      product: ['', Validators.required],
      state: ['', Validators.required],
      estimatedClosingDate: ['', Validators.required],
      commentary: ['', Validators.required],
      contactName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      email: ['', Validators.required],
      units: ['0', Validators.required],
      offer: ['', Validators.required],
    });
    this.errors = Object.keys(this.opportunityForm.controls).map((key) => ({
      field: key,
      message: '',
    }));
  }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
  }
  onSubmit() {
    console.log(this.opportunityForm.value);
    if (this.opportunityForm.valid) {
      const formValue = {
        ...this.opportunityForm.value,
        userId: this.userId,
      };

      console.log(this.opportunityForm.value);
      this.opportunityService.createOpportunity(formValue).subscribe({
        next: (response) => {
          this.resetForm();

          this.errors.forEach((error) => (error.message = ''));
        },
        error: (error) => {
          console.error(error);
        },
      });
    } else {
      this.updateErrorMessages();
    }
  }
  isFieldInvalid(field: string): boolean | null {
    const control = this.opportunityForm.get(field);
    return control && !control.valid && (control.dirty || control.touched);
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
    this.errors.forEach((error) => {
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

  resetForm() {
    this.opportunityForm.reset({
      amount: '0',
      units: '0',
    });

    this.opportunityForm.markAsPristine();
    this.opportunityForm.markAsUntouched();
  }
}
