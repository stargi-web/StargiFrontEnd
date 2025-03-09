import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccumulatedPageComponent } from './accumulated-page.component';

describe('AccumulatedPageComponent', () => {
  let component: AccumulatedPageComponent;
  let fixture: ComponentFixture<AccumulatedPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccumulatedPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccumulatedPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
