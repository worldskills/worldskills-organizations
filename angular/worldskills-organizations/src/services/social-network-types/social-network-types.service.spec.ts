import {TestBed} from '@angular/core/testing';

import {CountriesService} from './social-network-types.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(CountriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
