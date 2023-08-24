import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberAwardsComponent } from './member-awards.component';

describe('MemberAwardsComponent', () => {
  let component: MemberAwardsComponent;
  let fixture: ComponentFixture<MemberAwardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MemberAwardsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MemberAwardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
