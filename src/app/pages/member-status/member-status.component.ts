import { Component } from '@angular/core';
import { Member, MemberList } from '../../../types/member';
import { environment } from '../../../environments/environment';
import { MembersFetchParams, MembersService } from '../../../services/members/members.service';



@Component({
  selector: 'app-member-status',
  templateUrl: './member-status.component.html',
  styleUrls: ['./member-status.component.css']
})
export class MemberStatusComponent {
  // used for filter
  allMembers: MemberList;
  allMembersFilter: MembersFetchParams;

  // used for status list
  memberList: MemberList;
  membersFilter: MembersFetchParams;

  loading = false;
  exporting = false;
  appId = environment.worldskillsAppId;

  constructor(private members: MembersService) {

  }

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
      member_of: 1 // default WSI
    };

    this.loading = true;
    this.members.getMemberList(this.allMembersFilter).subscribe(
      (allMembers) => {
        this.allMembers = allMembers;
      },
      error => this.loading = false,
      () => this.loadMemberList()
    );
  }

  loadMemberList() {
    this.loading = true;
    this.members.getMemberList(this.membersFilter).subscribe(
      (memberList) => {
      this.memberList = memberList;
      this.loading = false;}
    );
  }

  getJoinedYear(member: Member) {
    return member.member_of.find(m => m.id === this.membersFilter.member_of).year_joined;
  }

  getMemberStatus(member: Member) {
    return member.member_of.find(m => m.id === this.membersFilter.member_of).status;
  }

}
