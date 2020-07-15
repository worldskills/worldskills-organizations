import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersSearchFormComponent } from './members-search-form.component';

describe('MembersSearchFormComponent', () => {
  let component: MembersSearchFormComponent;
  let fixture: ComponentFixture<MembersSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MembersSearchFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
