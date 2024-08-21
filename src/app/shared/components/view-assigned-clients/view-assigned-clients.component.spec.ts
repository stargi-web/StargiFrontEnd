import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedClientsComponent } from './view-assigned-clients.component';

describe('ViewAssignedClientsComponent', () => {
  let component: ViewAssignedClientsComponent;
  let fixture: ComponentFixture<ViewAssignedClientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAssignedClientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssignedClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
