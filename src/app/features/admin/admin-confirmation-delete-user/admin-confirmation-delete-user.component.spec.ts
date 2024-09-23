import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfirmationDeleteUserComponent } from './admin-confirmation-delete-user.component';

describe('AdminConfirmationDeleteUserComponent', () => {
  let component: AdminConfirmationDeleteUserComponent;
  let fixture: ComponentFixture<AdminConfirmationDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminConfirmationDeleteUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminConfirmationDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
