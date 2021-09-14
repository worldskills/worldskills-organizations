import {Component, OnDestroy, OnInit} from '@angular/core';
import { WsComponent, NgAuthService } from '@worldskills/worldskills-angular-lib';
import {MemberService} from '../../../services/member/member.service';
import {Member} from '../../../types/member';
import {ActivatedRoute} from '@angular/router';
import { PermissionHelper } from '../../helpers/permission-helper';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent extends WsComponent implements OnInit, OnDestroy {

  member: Member;
  loading = false;
  canEdit = false;

  constructor(
    private auth: NgAuthService,
    private memberService: MemberService,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => {
        this.member = member;
        this.canEdit = PermissionHelper.canEdit(this.auth.currentUser.value, member.ws_entity.id);
      }),
      this.memberService.loading.subscribe(loading => (this.loading = loading)),
      this.route.params.subscribe(({memberId}) => this.memberService.fetch(memberId)),
    );
  }

  get initialized() {
    return !!this.member;
  }

}
