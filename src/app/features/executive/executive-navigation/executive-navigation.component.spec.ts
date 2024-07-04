import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExecutiveNavigationComponent } from './executive-navigation.component';

describe('ExecutiveNavigationComponent', () => {
  let component: ExecutiveNavigationComponent;
  let fixture: ComponentFixture<ExecutiveNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExecutiveNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExecutiveNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
