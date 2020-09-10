import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MembersComponent} from './members.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateServiceTestingProvider, TranslationMockPipe} from '../../test';
import {NgAuthService, WorldskillsAngularLibModule} from '@worldskills/worldskills-angular-lib';

describe('MembersComponent', () => {
  let component: MembersComponent;
  let fixture: ComponentFixture<MembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TranslationMockPipe, MembersComponent],
      imports: [RouterTestingModule, WorldskillsAngularLibModule, HttpClientTestingModule],
      providers: [
        {provide: NgAuthService, useValue: {currentUser: {subscribe: () => undefined}}},
        TranslateServiceTestingProvider
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
