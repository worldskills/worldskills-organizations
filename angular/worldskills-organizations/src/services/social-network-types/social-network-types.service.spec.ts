import {TestBed} from '@angular/core/testing';

import {SocialNetworkTypesService} from './social-network-types.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SocialNetworkTypesService', () => {
  let service: SocialNetworkTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SocialNetworkTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
