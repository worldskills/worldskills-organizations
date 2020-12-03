import {TestBed} from '@angular/core/testing';

import {MemberOrganizationService} from './member-organization.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MemberOrganizationService', () => {
  let service: MemberOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MemberOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
