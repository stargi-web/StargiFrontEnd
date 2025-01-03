import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveRegisterAttendanceComponent } from './executive-register-attendance.component';

describe('ExecutiveRegisterAttendanceComponent', () => {
  let component: ExecutiveRegisterAttendanceComponent;
  let fixture: ComponentFixture<ExecutiveRegisterAttendanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveRegisterAttendanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveRegisterAttendanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
