import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListPageComponent } from './user-list-page.component';

describe('UserListPageComponent', () => {
  let component: UserListPageComponent;
  let fixture: ComponentFixture<UserListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserListPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
