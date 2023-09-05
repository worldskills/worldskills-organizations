import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizationAwardsComponent } from './organization-awards.component';

describe('OrganizationAwardsComponent', () => {
  let component: OrganizationAwardsComponent;
  let fixture: ComponentFixture<OrganizationAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrganizationAwardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrganizationAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
