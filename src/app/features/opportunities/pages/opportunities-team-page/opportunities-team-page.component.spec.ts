import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunitiesTeamPageComponent } from './opportunities-team-page.component';

describe('OpportunitiesTeamPageComponent', () => {
  let component: OpportunitiesTeamPageComponent;
  let fixture: ComponentFixture<OpportunitiesTeamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpportunitiesTeamPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunitiesTeamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
