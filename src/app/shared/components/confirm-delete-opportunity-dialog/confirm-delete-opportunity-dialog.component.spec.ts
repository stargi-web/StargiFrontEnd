import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteOpportunityDialogComponent } from './confirm-delete-opportunity-dialog.component';

describe('ConfirmDeleteOpportunityDialogComponent', () => {
  let component: ConfirmDeleteOpportunityDialogComponent;
  let fixture: ComponentFixture<ConfirmDeleteOpportunityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmDeleteOpportunityDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmDeleteOpportunityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
