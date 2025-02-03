import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyResponsePageComponent } from './survey-response-page.component';

describe('SurveyResponsePageComponent', () => {
  let component: SurveyResponsePageComponent;
  let fixture: ComponentFixture<SurveyResponsePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SurveyResponsePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SurveyResponsePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
