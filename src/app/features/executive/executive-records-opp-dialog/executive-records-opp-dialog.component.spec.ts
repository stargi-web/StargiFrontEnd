import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveRecordsOppDialogComponent } from './executive-records-opp-dialog.component';

describe('ExecutiveRecordsOppDialogComponent', () => {
  let component: ExecutiveRecordsOppDialogComponent;
  let fixture: ComponentFixture<ExecutiveRecordsOppDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveRecordsOppDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveRecordsOppDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
