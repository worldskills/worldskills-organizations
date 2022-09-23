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
        this.calculateCanEdit(member);
      }),
      this.memberService.loading.subscribe(loading => (this.loading = loading)),
      this.route.params.subscribe(({memberId}) => this.memberService.fetch(memberId)),
    );
  }

  calculateCanEdit(member: Member)
  {
    let canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, member.ws_entity.id);
    if (!canEdit) {
      member.member_of.forEach(parent => {
        if (!canEdit) {
          canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, parent.ws_entity.id);
        }
      });
    }

    this.canEdit = canEdit;
  }

  get initialized() {
    return !!this.member;
  }

}
