import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsersViewComponent } from './admin-users-view.component';

describe('AdminUsersViewComponent', () => {
  let component: AdminUsersViewComponent;
  let fixture: ComponentFixture<AdminUsersViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUsersViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsersViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
