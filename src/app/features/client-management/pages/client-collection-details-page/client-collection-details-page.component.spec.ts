import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientCollectionDetailsPageComponent } from './client-collection-details-page.component';

describe('ClientCollectionDetailsPageComponent', () => {
  let component: ClientCollectionDetailsPageComponent;
  let fixture: ComponentFixture<ClientCollectionDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientCollectionDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientCollectionDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
