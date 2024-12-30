import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveOpportunitiesViewComponent } from './executive-opportunities-view.component';

describe('ExecutiveOpportunitiesViewComponent', () => {
  let component: ExecutiveOpportunitiesViewComponent;
  let fixture: ComponentFixture<ExecutiveOpportunitiesViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveOpportunitiesViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveOpportunitiesViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
