import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorBaseDetailComponent } from './supervisor-base-detail.component';

describe('SupervisorBaseDetailComponent', () => {
  let component: SupervisorBaseDetailComponent;
  let fixture: ComponentFixture<SupervisorBaseDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorBaseDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorBaseDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
