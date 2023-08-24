import {Component, OnInit} from '@angular/core';
import {
  AlertService,
  AlertType,
  MemberAward,
  NgAuthService,
  RecipientAwardRequest,
  WsComponent
} from '@worldskills/worldskills-angular-lib';
import {MemberAwardService} from '../../../services/member-award/member-award.service';
import {Member} from '../../../types/member';
import {PermissionHelper} from '../../helpers/permission-helper';
import {MemberService} from '../../../services/member/member.service';
import {TranslateService} from '@ngx-translate/core';
import {MemberAwardRequest} from '../../../types/member-award';

@Component({
  selector: 'app-member-awards',
  templateUrl: './member-awards.component.html',
  styleUrls: ['./member-awards.component.css']
})
export class MemberAwardsComponent extends WsComponent implements OnInit {

  member: Member;
  memberAwards: MemberAward[];
  canEdit = false;

  constructor(private memberService: MemberService,
              private auth: NgAuthService,
              private memberAwardService: MemberAwardService,
              private translateService: TranslateService,
              private alertService: AlertService) {
    super();
  }

  ngOnInit(): void {
    this.memberService.subject.subscribe(member => {
      this.member = member;
      this.canEdit = PermissionHelper.canEditMember(this.auth.currentUser.value, member.ws_entity.id);

      this.loadMemberAwards();
    });
  }

  private loadMemberAwards() {
    this.memberAwardService.getMemberAwards(this.member.id).subscribe(res => {
      this.memberAwards = res.member_awards;
    });
  }

  deleteMemberAward(memberAward: any) {
    const ma = memberAward as MemberAward;

    this.translateService.get('delete_member_award_confirm').subscribe(t => {
      if (confirm(t)) {
        this.memberAwardService.delete(ma.id).subscribe(_ => {
          this.loadMemberAwards();
          this.alertService.setAlert('new-alert', AlertType.success, null, 'Award deleted', true);
        });
      }
    });
  }

  saveMemberAward(rar: RecipientAwardRequest, type: 'create' | 'update') {
    const dataRequest: MemberAwardRequest = {
      member_id: this.member.id,
      award: rar.award,
      presented_at: rar.presented_at,
      extra_information: rar.extra_information,
    };

    (type === 'update' ?
      this.memberAwardService.update(rar.id, dataRequest) :
      this.memberAwardService.create(dataRequest)).subscribe(_ => {
      this.loadMemberAwards();
      this.alertService.setAlert('new-alert', AlertType.success, null, 'Award saved', true);
    });
  }
}
