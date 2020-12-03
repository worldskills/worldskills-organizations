import {TestBed} from '@angular/core/testing';

import {MembersService} from './members.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MembersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
