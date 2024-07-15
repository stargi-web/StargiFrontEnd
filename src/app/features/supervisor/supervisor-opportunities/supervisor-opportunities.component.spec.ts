import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorOpportunitiesComponent } from './supervisor-opportunities.component';

describe('SupervisorOpportunitiesComponent', () => {
  let component: SupervisorOpportunitiesComponent;
  let fixture: ComponentFixture<SupervisorOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorOpportunitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
