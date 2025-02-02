import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesUserPageComponent } from './opportunities-user-page.component';

describe('OpportunitiesUserPageComponent', () => {
  let component: OpportunitiesUserPageComponent;
  let fixture: ComponentFixture<OpportunitiesUserPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpportunitiesUserPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunitiesUserPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
