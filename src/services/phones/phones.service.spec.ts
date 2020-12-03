import {TestBed} from '@angular/core/testing';

import {PhonesService} from './phones.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PhonesService', () => {
  let service: PhonesService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(PhonesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
