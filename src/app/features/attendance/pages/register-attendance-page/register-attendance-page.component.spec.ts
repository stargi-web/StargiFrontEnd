import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAttendancePageComponent } from './register-attendance-page.component';

describe('RegisterAttendancePageComponent', () => {
  let component: RegisterAttendancePageComponent;
  let fixture: ComponentFixture<RegisterAttendancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAttendancePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAttendancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
