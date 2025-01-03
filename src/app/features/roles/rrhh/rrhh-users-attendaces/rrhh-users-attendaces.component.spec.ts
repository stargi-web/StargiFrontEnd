import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhUsersAttendacesComponent } from './rrhh-users-attendaces.component';

describe('RrhhUsersAttendacesComponent', () => {
  let component: RrhhUsersAttendacesComponent;
  let fixture: ComponentFixture<RrhhUsersAttendacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RrhhUsersAttendacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhUsersAttendacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
