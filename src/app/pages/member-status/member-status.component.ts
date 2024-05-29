import { Component } from '@angular/core';
import { Member, MemberList } from '../../../types/member';
import { environment } from '../../../environments/environment';
import {
  MembersFetchParams,
  MembersService,
} from '../../../services/members/members.service';
import { GenericUtil } from '@worldskills/worldskills-angular-lib';

@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.css'],
})
export class MemberStatusComponent {
  // used for filter
  allMembers: MemberList;
  allMembersFilter: MembersFetchParams;

  // used for status list
  memberList: MemberList;
  membersFilter: MembersFetchParams;
  member_of: number;

  loading = false;
  exporting = false;
  appId = environment.worldskillsAppId;

  constructor(private members: MembersService) {}

  ngOnInit(): void {
    this.allMembersFilter = {
      limit: 9999,
      offset: 0,
      editable: false,
      sort: 'code',
    };

    this.membersFilter = {
      limit: 9999,
      offset: 0,
      editable: false,
      sort: 'code',
      member_of: 1, // default WSI
    };

    this.member_of = 1;

    this.loading = true;
    this.members.getMemberList(this.allMembersFilter).subscribe(
      (allMembers) => {
        this.allMembers = allMembers;
      },
      (error) => (this.loading = false),
      () => this.loadMemberList()
    );
  }

  loadMemberList() {
    this.memberList = null;
    this.loading = true;
    this.members.getMemberList(this.membersFilter).subscribe((memberList) => {
      this.member_of = this.membersFilter.member_of;
      this.memberList = memberList;
      this.loading = false;
    });
  }

  getJoinedYear(member: Member) {
    if (GenericUtil.isNullOrUndefined(member)) return null;
    const found = member.member_of.find(
      (m) => m.id === this.member_of
    );
    if (GenericUtil.isNullOrUndefined(found)) return null;
    return found.year_joined;
  }

  getMemberStatus(member: Member) {
    if (GenericUtil.isNullOrUndefined(member)) return null;
    const found = member.member_of.find(
      (m) => m.id === this.member_of
    );
    if (GenericUtil.isNullOrUndefined(found)) return null;
    return found.status;
  }
}
