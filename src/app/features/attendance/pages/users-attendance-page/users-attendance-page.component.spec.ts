import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersAttendancePageComponent } from './users-attendance-page.component';

describe('UsersAttendancePageComponent', () => {
  let component: UsersAttendancePageComponent;
  let fixture: ComponentFixture<UsersAttendancePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsersAttendancePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersAttendancePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
