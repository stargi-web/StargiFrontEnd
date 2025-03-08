import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedAnimationDialogComponent } from './accumulated-animation-dialog.component';

describe('AccumulatedAnimationDialogComponent', () => {
  let component: AccumulatedAnimationDialogComponent;
  let fixture: ComponentFixture<AccumulatedAnimationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccumulatedAnimationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccumulatedAnimationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
