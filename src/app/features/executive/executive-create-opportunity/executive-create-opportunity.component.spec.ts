import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveCreateOpportunityComponent } from './executive-create-opportunity.component';

describe('ExecutiveCreateOpportunityComponent', () => {
  let component: ExecutiveCreateOpportunityComponent;
  let fixture: ComponentFixture<ExecutiveCreateOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveCreateOpportunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveCreateOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
