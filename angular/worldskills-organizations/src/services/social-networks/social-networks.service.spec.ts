import {TestBed} from '@angular/core/testing';

import {SocialNetworksService} from './social-networks.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('SocialNetworksService', () => {
  let service: SocialNetworksService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(SocialNetworksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
