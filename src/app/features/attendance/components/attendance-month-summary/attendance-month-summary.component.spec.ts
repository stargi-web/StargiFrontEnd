import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendanceMonthSummaryComponent } from './attendance-month-summary.component';

describe('AttendanceMonthSummaryComponent', () => {
  let component: AttendanceMonthSummaryComponent;
  let fixture: ComponentFixture<AttendanceMonthSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendanceMonthSummaryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendanceMonthSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
