import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationSearchFormComponent } from './organization-search-form.component';

describe('OrganizationSearchFormComponent', () => {
  let component: OrganizationSearchFormComponent;
  let fixture: ComponentFixture<OrganizationSearchFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationSearchFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizationSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
