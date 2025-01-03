import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreateTeamDialogComponent } from './admin-create-team-dialog.component';

describe('AdminCreateTeamDialogComponent', () => {
  let component: AdminCreateTeamDialogComponent;
  let fixture: ComponentFixture<AdminCreateTeamDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCreateTeamDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCreateTeamDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
