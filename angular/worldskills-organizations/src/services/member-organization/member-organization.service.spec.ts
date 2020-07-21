import {TestBed} from '@angular/core/testing';

import {MemberOrganizationService} from './member-organization.service';

describe('MemberOrganizationService', () => {
  let service: MemberOrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemberOrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
