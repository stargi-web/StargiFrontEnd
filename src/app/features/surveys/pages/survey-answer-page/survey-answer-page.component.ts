import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.interface';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { SessionStorageService } from '../../../../shared/services/sessionStorage.service';
import { SESSION_ITEMS } from '../../../../shared/models/session-items';

@Component({
  selector: 'app-survey-answer-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
  ],
  templateUrl: './survey-answer-page.component.html',
  styleUrl: './survey-answer-page.component.css',
})
export class SurveyAnswerPageComponent {
  userId!: number;
  survey!: Survey;
  surveyId!: number;
  responseForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private surveyService: SurveyService,
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) {
    this.responseForm = this.fb.group({
      answers: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.userId = Number(
      this.sessionStorageService.getItem(SESSION_ITEMS.USER_ID)
    );
    this.surveyId = Number(this.route.snapshot.paramMap.get('surveyId'));

    this.surveyService.getSurveyById(this.surveyId).subscribe((response) => {
      this.survey = response;
      this.initializeForm();
    });
  }

  initializeForm() {
    const answerArray = this.fb.array([]);
    this.survey.questions.forEach((question) => {
      if (question.type === 'multiple_choice') {
        answerArray.push(this.fb.control('', Validators.required)); // For multiple choice questions
      } else if (question.type === 'text') {
        answerArray.push(this.fb.control('', Validators.required)); // For text questions
      }
    });

    this.responseForm.setControl('answers', answerArray);
  }

  get answers() {
    return (this.responseForm.get('answers') as FormArray).controls;
  }

  onSubmit() {
    if (this.responseForm.valid) {
      const answers = this.responseForm.value.answers.map(
        (answer: string, index: number) => {
          return {
            questionId: this.survey.questions[index].id, // Usamos el ID de la pregunta
            answer: answer,
          };
        }
      );

      const surveyResponse = {
        userId: this.userId,
        answers: answers,
      };

      console.log('Respuestas enviadas:', surveyResponse);
      this.surveyService
        .sendSurveyResponse(surveyResponse)
        .subscribe((response) => {
          // Si la respuesta es exitosa, redirige al list page
          this.goToSurveyListPage();
        });
    }
  }
  goToSurveyListPage() {
    this.router.navigate([`/surveys/list`]);
  }
}
