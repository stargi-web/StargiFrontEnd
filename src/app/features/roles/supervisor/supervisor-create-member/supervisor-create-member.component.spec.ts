import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorCreateMemberComponent } from './supervisor-create-member.component';

describe('SupervisorCreateMemberComponent', () => {
  let component: SupervisorCreateMemberComponent;
  let fixture: ComponentFixture<SupervisorCreateMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorCreateMemberComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorCreateMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
