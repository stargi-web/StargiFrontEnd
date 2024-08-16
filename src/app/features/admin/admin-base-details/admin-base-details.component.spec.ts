import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBaseDetailsComponent } from './admin-base-details.component';

describe('AdminBaseDetailsComponent', () => {
  let component: AdminBaseDetailsComponent;
  let fixture: ComponentFixture<AdminBaseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminBaseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBaseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
