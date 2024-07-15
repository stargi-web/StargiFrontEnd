import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTeamMembersComponent } from './supervisor-team-members.component';

describe('SupervisorTeamMembersComponent', () => {
  let component: SupervisorTeamMembersComponent;
  let fixture: ComponentFixture<SupervisorTeamMembersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorTeamMembersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorTeamMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
