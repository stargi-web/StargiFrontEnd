import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTeamsViewComponent } from './admin-teams-view.component';

describe('AdminTeamsViewComponent', () => {
  let component: AdminTeamsViewComponent;
  let fixture: ComponentFixture<AdminTeamsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminTeamsViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminTeamsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
