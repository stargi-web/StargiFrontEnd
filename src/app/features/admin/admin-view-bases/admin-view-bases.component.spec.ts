import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminViewBasesComponent } from './admin-view-bases.component';

describe('AdminViewBasesComponent', () => {
  let component: AdminViewBasesComponent;
  let fixture: ComponentFixture<AdminViewBasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminViewBasesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminViewBasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
