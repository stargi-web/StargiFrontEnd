import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedUsersComponentComponent } from './deleted-users-component.component';

describe('DeletedUsersComponentComponent', () => {
  let component: DeletedUsersComponentComponent;
  let fixture: ComponentFixture<DeletedUsersComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedUsersComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeletedUsersComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
