import {Component, OnInit, ViewChild} from '@angular/core';
import { AlertService, AlertType, LOADER_ONLY, RxjsUtil, WsComponent, GenericUtil, NgAuthService, DateUtil, toDate } from '@worldskills/worldskills-angular-lib';
import {Member} from '../../../types/member';
import {MemberService} from '../../../services/member/member.service';
import {MembersService} from '../../../services/members/members.service';
import {NgForm} from '@angular/forms';
import {Membership, MembershipRequest} from '../../../types/membership';
import {MembershipsService} from '../../../services/memberships/memberships.service';
import {TranslateService} from '@ngx-translate/core';
import { take } from 'rxjs/operators';
import { PermissionHelper } from '../../helpers/permission-helper';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent extends WsComponent implements OnInit {

  member: Member;
  members: Array<Member>;
  history: Membership[];
  loading = false;
  editingMembership: Membership = null;
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
    private auth: NgAuthService,
    private memberService: MemberService,
    private membersService: MembersService,
    private membershipsService: MembershipsService,
    private alertService: AlertService,
    private translateService: TranslateService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.memberService.subject.subscribe(member => {
        this.member = member;
        this.memberService.getMembership(this.member.id, true).pipe(take(1)).subscribe(data => this.history = data);
      }),
      RxjsUtil.loaderSubscriber(
        this.membersService,
        this.memberService,
      ).subscribe(loading => (this.loading = loading)),
    );
    this.membersService.fetch(LOADER_ONLY).subscribe(members => (this.members = members.members));
  }

  get initialized() {
    return !!this.member && !!this.members;
  }

  get currentMemberOf(): Membership[] {
    if (GenericUtil.isNullOrUndefined(this.member)) {
      return [];
    }

    if (GenericUtil.isNullOrUndefined(this.member.member_of)) {
      return [];
    }

    return this.member.member_of.filter(x => x.end == null);
  }

  get historyMemberOf(): Membership[] {
    if (GenericUtil.isNullOrUndefined(this.history)) {
      return [];
    }

    return this.history.filter(x => x.end != null);
  }

  canEditMembership(membership: Membership) {
    if (PermissionHelper.isAdmin(this.auth.currentUser.value)) {
      return true;
    }

    return this.calculateCanEdit(this.member);
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

    return canEdit;
  }

  editMembership(membership: Membership) {
    this.editingMembership = membership;
  }

  cancelEditMembership() {
    this.editingMembership = null;
  }

  unbindMembership(membership: Membership) {
    const memberId = this.member.id;
    this.translateService.get('Are you sure you want to unbind the membership').subscribe(t => {
      if (confirm(t)) {
        this.membershipsService.unbind(memberId, membership.id)
          .subscribe(() => {
            this.memberService.fetch(memberId);
            this.translateService.get('Unbound membership').subscribe(t2 => {
              this.alertService.setAlert('unbound-membership', AlertType.success, null, t2, true);
            });
          });
      }
    });
  }

  submitEditForm() {
    if (this.editForm.valid) {
      const memberId = this.member.id;
      const {status, year_joined} = this.editForm.value;
      const data: MembershipRequest = {
        status,
        year_joined,
      };
      this.membershipsService.update(memberId, this.editingMembership.id, data)
        .subscribe(() => {
          this.editingMembership = null;
          this.memberService.fetch(memberId);
          this.translateService.get('Updated membership').subscribe(t => {
            this.alertService.setAlert('updated-membership', AlertType.success, null, t, true);
          });
        });
    }
  }

  getMemberSelect() {
    if (PermissionHelper.isAdmin(this.auth.currentUser.value)) {
      return this.members || [];
    } else {
      if (GenericUtil.isNullOrUndefined(this.members)) {
        return [];
      } else {
        const entities = PermissionHelper.getEditableMemberEntities(this.auth.currentUser.value);
        if (GenericUtil.isNullOrUndefined(entities) || entities.length === 0) {
          return [];
        } else {
          return this.members.filter(x => entities.includes(x.ws_entity.id));
        }
      }
    }
  }

  submitForm() {
    if (this.form.valid) {
      const memberId = this.member.id;
      const {id, status, year_joined} = this.form.value;
      const data: MembershipRequest = {
        id,
        status,
        year_joined,
      };
      this.membershipsService.bind(memberId, data)
        .subscribe(() => {
          this.memberService.fetch(memberId);
          this.translateService.get('Bound to new membership').subscribe(t => {
            this.alertService.setAlert('bound-membership', AlertType.success, null, t, true);
          });
        });
    }
  }

  hasUpdatedDate(m: Membership) {
    if (GenericUtil.isNullOrUndefined(m.updated)) {
      return false;
    }
    m.updated = toDate(m.updated); // cater for safari
    return true;
  }

}
