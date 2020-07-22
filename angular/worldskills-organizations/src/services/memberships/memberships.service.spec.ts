import {TestBed} from '@angular/core/testing';

import {MembershipsService} from './memberships.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MembershipsService', () => {
  let service: MembershipsService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MembershipsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
