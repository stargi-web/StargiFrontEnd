import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewAllOpportunitiesComponent } from './admin-view-all-opportunities.component';

describe('AdminViewAllOpportunitiesComponent', () => {
  let component: AdminViewAllOpportunitiesComponent;
  let fixture: ComponentFixture<AdminViewAllOpportunitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewAllOpportunitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewAllOpportunitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
