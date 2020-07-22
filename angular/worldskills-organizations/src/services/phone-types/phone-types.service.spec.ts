import {TestBed} from '@angular/core/testing';

import {PhoneTypesService} from './phone-types.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PhoneTypesService', () => {
  let service: PhoneTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PhoneTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
