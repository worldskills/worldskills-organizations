import {TestBed} from '@angular/core/testing';

import {MemberService} from './member.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('MemberService', () => {
  let service: MemberService;

  beforeEach(() => {
    TestBed.configureTestingModule({imports: [HttpClientTestingModule]});
    service = TestBed.inject(MemberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
