import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OportunityTableComponent } from './oportunity-table.component';

describe('OportunityTableComponent', () => {
  let component: OportunityTableComponent;
  let fixture: ComponentFixture<OportunityTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OportunityTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OportunityTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
