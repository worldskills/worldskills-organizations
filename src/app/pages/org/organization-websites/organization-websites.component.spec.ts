import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationWebsitesComponent } from './organization-websites.component';

describe('OrganizationWebsitesComponent', () => {
  let component: OrganizationWebsitesComponent;
  let fixture: ComponentFixture<OrganizationWebsitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationWebsitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationWebsitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
