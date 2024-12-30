import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RrhhSurverysComponent } from './rrhh-surverys.component';

describe('RrhhSurverysComponent', () => {
  let component: RrhhSurverysComponent;
  let fixture: ComponentFixture<RrhhSurverysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RrhhSurverysComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RrhhSurverysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
