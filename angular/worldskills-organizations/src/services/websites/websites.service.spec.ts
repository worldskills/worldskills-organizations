import {TestBed} from '@angular/core/testing';

import {WebsitesService} from './websites.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('WebsitesService', () => {
  let service: WebsitesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(WebsitesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
