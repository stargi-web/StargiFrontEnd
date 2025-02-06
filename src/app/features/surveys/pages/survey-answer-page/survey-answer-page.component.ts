import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SurveyService } from '../../services/survey.service';
import { Survey } from '../../models/survey.interface';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from 'primeng/radiobutton';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-survey-answer-page',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    RadioButtonModule,
    ReactiveFormsModule,
    InputTextModule,
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
    private router: Router
  ) {
    this.responseForm = this.fb.group({
      answers: this.fb.array([]),
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
