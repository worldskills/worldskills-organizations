import {Component, OnInit} from '@angular/core';
import {UserModel, WsComponent} from '@worldskills/worldskills-angular-lib';
import {Member, MemberList} from '../../types/member';
import {isMembersFetchParams, MembersFetchParams, MembersService} from '../../services/members/members.service';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../../services/auth/auth.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent extends WsComponent implements OnInit {

  authenticatedUser: UserModel;
  memberList: MemberList;
  fetchParams: MembersFetchParams;
  loading = false;
  exporting = false;

  constructor(
    private authService: AuthService,
    private membersService: MembersService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.authService.authStatus.subscribe(authStatus => (this.authenticatedUser = authStatus.user)),
      this.membersService.fetchParams.subscribe(fetchParams => {
        this.fetchParams = fetchParams;
        if (this.fetchParams.update) {
          const params = {...this.fetchParams};
          this.membersService.fetch(params);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: {...this.fetchParams, update: undefined},
            // queryParamsHandling: 'merge',
            // skipLocationChange: true
          });
        }
      }),
      this.membersService.subject.subscribe(memberList => (this.memberList = memberList)),
      this.membersService.loading.subscribe(loading => (this.loading = loading))
    );
    this.route.queryParams.pipe(take(1)).subscribe(queryParams => {
      if (isMembersFetchParams(queryParams)) {
        this.membersService.updateFetchParams(
          this.membersService.convertQueryParamsToFetchParams(queryParams)
          , true
        );
      }
    });
  }

  sort(field: string) {
    let sort;
    if (!this.fetchParams.sort) {
      sort = field;
    } else {
      if (this.fetchParams.sort.startsWith(field)) {
        sort = this.fetchParams.sort === field ? `${field}_desc` : field;
      } else {
        sort = field;
      }
    }
    this.membersService.fetchParams.next({
      ...this.fetchParams,
      sort
    });
  }

  fetch(page) {
    if ((this.fetchParams.offset / this.fetchParams.limit) !== (page - 1)) {
      this.membersService.fetchParams.next({
        ...this.fetchParams,
        limit: this.fetchParams.limit,
        offset: this.fetchParams.limit ? this.fetchParams.limit * (page - 1) : 0,
      });
    }
  }

  getJoinedYear(member: Member) {
    return member.member_of.find(m => m.id === this.fetchParams.member_of).year_joined;
  }

  downloadMembers() {
    this.exporting = true;
    this.http.get(`${environment.worldskillsApiOrg}/members/export?s=xlsx`, {responseType: 'arraybuffer'})
      .subscribe(response => {
        const objectURL = window.URL.createObjectURL(new Blob([response], {type: 'application/octet-stream'}));
        const downloadLink = document.createElement('a');
        downloadLink.href = objectURL;
        downloadLink.setAttribute('download', 'worldskills_members.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.exporting = false;
      });
  }

  get isAdmin() {
    return this.authenticatedUser && this.authenticatedUser.roles && this.authenticatedUser.roles.some(
      role => role.roleApplication.applicationCode === environment.worldskillsAppId && role.name === 'Admin'
    );
  }

  get isFilteredByMemberOf() {
    return this.fetchParams && !!this.fetchParams.member_of;
  }

}
