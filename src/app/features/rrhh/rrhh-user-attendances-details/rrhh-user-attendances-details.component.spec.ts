import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhUserAttendancesDetailsComponent } from './rrhh-user-attendances-details.component';

describe('RrhhUserAttendancesDetailsComponent', () => {
  let component: RrhhUserAttendancesDetailsComponent;
  let fixture: ComponentFixture<RrhhUserAttendancesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RrhhUserAttendancesDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhUserAttendancesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
