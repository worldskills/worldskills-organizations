import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPersonFormComponent } from './new-person-form.component';

describe('NewPersonFormComponent', () => {
  let component: NewPersonFormComponent;
  let fixture: ComponentFixture<NewPersonFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewPersonFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewPersonFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
