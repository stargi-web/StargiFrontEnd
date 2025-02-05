import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyAnswerPageComponent } from './survey-answer-page.component';

describe('SurveyResponsePageComponent', () => {
  let component: SurveyAnswerPageComponent;
  let fixture: ComponentFixture<SurveyAnswerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyAnswerPageComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SurveyAnswerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
