import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DectivationsPageComponent } from './dectivations-page.component';

describe('DectivationsPageComponent', () => {
  let component: DectivationsPageComponent;
  let fixture: ComponentFixture<DectivationsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DectivationsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DectivationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
