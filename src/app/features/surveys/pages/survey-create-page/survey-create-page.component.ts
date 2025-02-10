import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SurveyService } from '../../services/survey.service';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';

@Component({
  selector: 'app-survey-create-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    DividerModule,
    InputTextareaModule,
    ReactiveFormsModule,
  ],
  providers: [],
  templateUrl: './survey-create-page.component.html',
  styleUrl: './survey-create-page.component.css',
})
export class SurveyCreatePageComponent {
  userId!: number;
  surveyForm: FormGroup;
  questionTypes = [
    { label: 'Respuesta abierta', value: 'text' },
    { label: 'Selección múltiple', value: 'multiple' },
  ];

  constructor(
    private fb: FormBuilder,
    private surveyService: SurveyService,
    private sessionStorageService: SessionStorageService
  ) {
    this.surveyForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      questions: this.fb.array([]),
    });
    // Agrega una pregunta vacía al iniciar
    this.addQuestion();
  }

  ngOnInit() {
    this.userId = Number(
      this.sessionStorageService.getItem(SESSION_ITEMS.USER_ID)
    );
  }
  get questions() {
    return this.surveyForm.get('questions') as FormArray;
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      text: ['', Validators.required],
      type: ['text', Validators.required],
      options: this.fb.array([]), // Inicializa como un FormArray vacío
    });
  }

  addQuestion() {
    this.questions.push(this.createQuestion());
  }

  getOptions(questionIndex: number): FormArray {
    return this.questions.at(questionIndex).get('options') as FormArray;
  }

  addOption(questionIndex: number) {
    const option = this.fb.control('', Validators.required);
    this.getOptions(questionIndex).push(option);
  }

  removeOption(questionIndex: number, optionIndex: number) {
    this.getOptions(questionIndex).removeAt(optionIndex);
  }
  removeQuestion(questionIndex: number) {
    this.questions.removeAt(questionIndex);
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      const formValue = {
        ...this.surveyForm.value,
        userId: this.userId,
        questions: this.surveyForm.value.questions.map((question: any) => ({
          text: question.text,
          options: question.type === 'text' ? [] : question.options,
        })),
      };
      console.log('Formulario a enviar:', formValue);

      this.surveyService.createSurvey(formValue).subscribe({
        next: (response) => {
          this.resetForm(); // Reiniciar el formulario
        },
      });
    }
  }

  resetForm() {
    this.surveyForm.reset();
    this.surveyForm.markAsPristine();
    this.surveyForm.markAsUntouched();
  }
}
