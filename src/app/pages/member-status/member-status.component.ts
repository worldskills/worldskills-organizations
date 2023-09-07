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
  memberList: MemberList;
  fetchParams: MembersFetchParams;
  loading = false;
  exporting = false;
  appId = environment.worldskillsAppId;

  constructor(private members: MembersService) {

  }

  ngOnInit(): void {
    this.fetchParams = {
      limit: 9999,
      offset: 0,
      editable: true,
      sort: 'code',
      member_of: 1 // default WSI
    };
  }

  loadMemberList() {
    this.loading = true;
    this.members.getMemberList(this.fetchParams).subscribe(
      (memberList) => {
      this.memberList = memberList;
      this.loading = false;}
    );
  }

  getJoinedYear(member: Member) {
    return member.member_of.find(m => m.id === this.fetchParams.member_of).year_joined;
  }

  getMemberStatus(member: Member) {
    return member.member_of.find(m => m.id === this.fetchParams.member_of).status;
  }

}
