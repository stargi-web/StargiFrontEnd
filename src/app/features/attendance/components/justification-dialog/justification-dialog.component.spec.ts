import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JustificationDialogComponent } from './justification-dialog.component';

describe('JustificationDialogComponent', () => {
  let component: JustificationDialogComponent;
  let fixture: ComponentFixture<JustificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JustificationDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JustificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
