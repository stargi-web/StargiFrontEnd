import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAssignedCollectionsComponent } from './view-assigned-collections.component';

describe('ViewAssignedCollectionsComponent', () => {
  let component: ViewAssignedCollectionsComponent;
  let fixture: ComponentFixture<ViewAssignedCollectionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAssignedCollectionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAssignedCollectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
