import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PanelRowActionsComponent} from './panel-row-actions.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateServiceTestingProvider, TranslationMockPipe} from '../../test';

describe('PanelRowActionsComponent', () => {
  let component: PanelRowActionsComponent;
  let fixture: ComponentFixture<PanelRowActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [TranslateServiceTestingProvider],
      declarations: [TranslationMockPipe, PanelRowActionsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelRowActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
