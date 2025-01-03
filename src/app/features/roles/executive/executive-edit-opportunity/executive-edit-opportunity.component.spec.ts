import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveEditOpportunityComponent } from './executive-edit-opportunity.component';

describe('ExecutiveEditOpportunityComponent', () => {
  let component: ExecutiveEditOpportunityComponent;
  let fixture: ComponentFixture<ExecutiveEditOpportunityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveEditOpportunityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveEditOpportunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
