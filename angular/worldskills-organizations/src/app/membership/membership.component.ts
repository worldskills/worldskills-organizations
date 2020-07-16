import {Component, OnInit, ViewChild} from '@angular/core';
import {LOADER_ONLY, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member} from '../../types/member';
import {MemberService} from '../../services/member/member.service';
import {combineLatest} from 'rxjs';
import {map} from 'rxjs/operators';
import {MembersService} from '../../services/members/members.service';
import {NgForm} from '@angular/forms';
import {Membership, MembershipRequest} from '../../types/membership';
import {MembershipsService} from '../../services/memberships/memberships.service';

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
    this.membershipsService.unbind(memberId, membership.id)
      .subscribe(() => this.memberService.fetch(memberId));
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
        .subscribe(() => this.memberService.fetch(memberId));
    }
  }

}
