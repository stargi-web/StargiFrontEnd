import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUserOppComponent } from './admin-user-opp.component';

describe('AdminUserOppComponent', () => {
  let component: AdminUserOppComponent;
  let fixture: ComponentFixture<AdminUserOppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminUserOppComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUserOppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
