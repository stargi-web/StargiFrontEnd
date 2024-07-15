import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewTeamOpportunitiesComponent } from './admin-view-team-opportunities.component';

describe('AdminViewTeamOpportunitiesComponent', () => {
  let component: AdminViewTeamOpportunitiesComponent;
  let fixture: ComponentFixture<AdminViewTeamOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewTeamOpportunitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewTeamOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
