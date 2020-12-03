import {TestBed} from '@angular/core/testing';

import {OrganizationService} from './organization.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OrganizationService', () => {
  let service: OrganizationService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(OrganizationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
