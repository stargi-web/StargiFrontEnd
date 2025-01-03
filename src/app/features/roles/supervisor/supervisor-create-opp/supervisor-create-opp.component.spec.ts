import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCreateOppComponent } from './supervisor-create-opp.component';

describe('SupervisorCreateOppComponent', () => {
  let component: SupervisorCreateOppComponent;
  let fixture: ComponentFixture<SupervisorCreateOppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorCreateOppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorCreateOppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
