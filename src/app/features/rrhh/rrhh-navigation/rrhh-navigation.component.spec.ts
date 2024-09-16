import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhNavigationComponent } from './rrhh-navigation.component';

describe('RrhhNavigationComponent', () => {
  let component: RrhhNavigationComponent;
  let fixture: ComponentFixture<RrhhNavigationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RrhhNavigationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
