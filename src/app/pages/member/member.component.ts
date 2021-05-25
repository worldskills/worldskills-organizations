import {Component, OnDestroy, OnInit} from '@angular/core';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {MemberService} from '../../../services/member/member.service';
import {Member} from '../../../types/member';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent extends WsComponent implements OnInit, OnDestroy {

  member: Member;
  loading = false;

  constructor(
    private memberService: MemberService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => (this.member = member)),
      this.memberService.loading.subscribe(loading => (this.loading = loading)),
      this.route.params.subscribe(({memberId}) => this.memberService.fetch(memberId)),
    );
  }

  get initialized() {
    return !!this.member;
  }

}
