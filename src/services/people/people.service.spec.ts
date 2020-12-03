import {TestBed} from '@angular/core/testing';

import {PeopleService} from './people.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('PeopleService', () => {
  let service: PeopleService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(PeopleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
