import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorViewBasesComponent } from './supervisor-view-bases.component';

describe('SupervisorViewBasesComponent', () => {
  let component: SupervisorViewBasesComponent;
  let fixture: ComponentFixture<SupervisorViewBasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupervisorViewBasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupervisorViewBasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
