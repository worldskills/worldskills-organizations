import {TestBed} from '@angular/core/testing';
import {OrganizationWebsiteService} from './organization-website.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('OrganizationWebsiteService', () => {
  let service: OrganizationWebsiteService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(OrganizationWebsiteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
