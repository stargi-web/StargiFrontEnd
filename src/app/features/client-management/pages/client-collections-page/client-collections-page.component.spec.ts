import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCollectionsPageComponent } from './client-collections-page.component';

describe('ClientCollectionsPageComponent', () => {
  let component: ClientCollectionsPageComponent;
  let fixture: ComponentFixture<ClientCollectionsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCollectionsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCollectionsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
