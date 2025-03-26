import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnexesListPageComponent } from './annexes-list-page.component';

describe('AnnexesListPageComponent', () => {
  let component: AnnexesListPageComponent;
  let fixture: ComponentFixture<AnnexesListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnnexesListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnnexesListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
