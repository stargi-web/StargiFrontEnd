import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.interface';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-survey-response-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    ReactiveFormsModule,
    InputTextModule,
  ],
  templateUrl: './survey-response-page.component.html',
  styleUrl: './survey-response-page.component.css',
})
export class SurveyResponsePageComponent {
  userId!: number;
  survey!: Survey;
  surveyId!: number;
  responseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private surveyService: SurveyService
  ) {
    this.responseForm = this.fb.group({
      responses: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.userId = Number(sessionStorage.getItem('userId'));
    this.surveyId = Number(this.route.snapshot.paramMap.get('surveyId'));

    this.surveyService.getSurveyById(this.surveyId).subscribe((response) => {
      this.survey = response;
      this.initializeForm();
    });
  }

  initializeForm() {
    const responseArray = this.fb.array([]);
    this.survey.questions.forEach((question) => {
      if (question.type === 'multiple_choice') {
        responseArray.push(this.fb.control('', Validators.required)); // For multiple choice questions
      } else if (question.type === 'text') {
        responseArray.push(this.fb.control('', Validators.required)); // For text questions
      }
    });

    this.responseForm.setControl('responses', responseArray);
  }

  get responses() {
    return (this.responseForm.get('responses') as FormArray).controls;
  }

  onSubmit() {
    if (this.responseForm.valid) {
      const responses = this.responseForm.value.responses.map(
        (answer: string, index: number) => {
          return {
            questionId: this.survey.questions[index].id, // Usamos el ID de la pregunta
            answer: answer,
          };
        }
      );

      const surveyResponse = {
        userId: this.userId,
        responses: responses,
      };

      console.log('Respuestas enviadas:', surveyResponse);
      this.surveyService.sendSurveyResponse(surveyResponse).subscribe();
    }
  }
}
