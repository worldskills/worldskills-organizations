import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationPhoneComponent } from './organization-phone.component';

describe('OrganizationPhoneComponent', () => {
  let component: OrganizationPhoneComponent;
  let fixture: ComponentFixture<OrganizationPhoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationPhoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationPhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
