import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembershipSelectComponent } from './membership-select.component';

describe('MembershipSelectComponent', () => {
  let component: MembershipSelectComponent;
  let fixture: ComponentFixture<MembershipSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembershipSelectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembershipSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
