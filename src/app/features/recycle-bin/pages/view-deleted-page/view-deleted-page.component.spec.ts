import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewDeletedPageComponent } from './view-deleted-page.component';

describe('ViewDeletedPageComponent', () => {
  let component: ViewDeletedPageComponent;
  let fixture: ComponentFixture<ViewDeletedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewDeletedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewDeletedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
