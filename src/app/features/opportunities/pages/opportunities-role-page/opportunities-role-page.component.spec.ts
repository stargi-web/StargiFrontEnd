import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesRolePageComponent } from './opportunities-role-page.component';

describe('OpportunitiesRolePageComponent', () => {
  let component: OpportunitiesRolePageComponent;
  let fixture: ComponentFixture<OpportunitiesRolePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpportunitiesRolePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunitiesRolePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
