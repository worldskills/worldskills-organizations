import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationContactsComponent } from './organization-contacts.component';

describe('OrganizationContactsComponent', () => {
  let component: OrganizationContactsComponent;
  let fixture: ComponentFixture<OrganizationContactsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationContactsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationContactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
