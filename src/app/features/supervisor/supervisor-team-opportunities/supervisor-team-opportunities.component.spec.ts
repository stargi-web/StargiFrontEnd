import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorTeamOpportunitiesComponent } from './supervisor-team-opportunities.component';

describe('SupervisorTeamOpportunitiesComponent', () => {
  let component: SupervisorTeamOpportunitiesComponent;
  let fixture: ComponentFixture<SupervisorTeamOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorTeamOpportunitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorTeamOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
