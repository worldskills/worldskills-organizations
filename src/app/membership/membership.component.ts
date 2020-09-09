import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertService, AlertType, LOADER_ONLY, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member} from '../../types/member';
import {MemberService} from '../../services/member/member.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {MembersService} from '../../services/members/members.service';
import {NgForm} from '@angular/forms';
import {Membership, MembershipRequest} from '../../types/membership';
import {MembershipsService} from '../../services/memberships/memberships.service';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.css']
})
export class MembershipComponent extends WsComponent implements OnInit {

  member: Member;
  members: Array<Member>;
  loading = false;
  editingMembership: Membership = null;
  @ViewChild('form') form: NgForm;
  @ViewChild('editForm') editForm: NgForm;

  constructor(
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
      this.memberService.subject.subscribe(member => (this.member = member)),
      combineLatest([
        this.membersService.loading,
        this.memberService.loading,
      ]).pipe(map(ls => !ls.every(l => !l)))
        .subscribe(loading => (this.loading = loading)),
    );
    this.membersService.fetch(LOADER_ONLY).subscribe(members => (this.members = members.members));
  }

  get initialized() {
    return !!this.member && !!this.members;
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

}
