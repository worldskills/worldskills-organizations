import {TestBed} from '@angular/core/testing';

import {HttpInterceptorService} from './http-interceptor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {NgAuthService} from '@worldskills/worldskills-angular-lib';
import {TranslateServiceTestingProvider} from '../../test';

describe('HttpInterceptorService', () => {
  let service: HttpInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {provide: NgAuthService, useValue: {currentUser: {subscribe: () => undefined}}},
        TranslateServiceTestingProvider
      ],
    });
    service = TestBed.inject(HttpInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
