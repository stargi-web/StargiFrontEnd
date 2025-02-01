import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAttendanceDetailsDialogComponent } from './user-attendance-details-dialog.component';

describe('UserAttendanceDetailsDialogComponent', () => {
  let component: UserAttendanceDetailsDialogComponent;
  let fixture: ComponentFixture<UserAttendanceDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAttendanceDetailsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserAttendanceDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
