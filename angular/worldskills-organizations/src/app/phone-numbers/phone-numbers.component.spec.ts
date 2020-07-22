import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PhoneNumbersComponent} from './phone-numbers.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {FormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {TranslateServiceTestingProvider, TranslationMockPipe} from '../../test';

describe('PhoneNumbersComponent', () => {
  let component: PhoneNumbersComponent;
  let fixture: ComponentFixture<PhoneNumbersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule, FormsModule, NgSelectModule],
      providers: [
        TranslateServiceTestingProvider,
      ],
      declarations: [TranslationMockPipe, PhoneNumbersComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneNumbersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
