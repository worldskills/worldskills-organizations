import { Component, OnInit } from '@angular/core';
import { WsComponent } from '@worldskills/worldskills-angular-lib';
import { Member, MemberList } from '../../../types/member';
import {
  isMembersFetchParams,
  MembersFetchParams,
  MembersService,
} from '../../../services/members/members.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
})
export class MembersComponent extends WsComponent implements OnInit {
  memberList: MemberList;
  fetchParams: MembersFetchParams;
  loading = false;
  exporting = false;
  appId = environment.worldskillsAppId;

  constructor(
    private membersService: MembersService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.membersService.fetchParams.subscribe((fetchParams) => {
        this.fetchParams = fetchParams;
        if (this.fetchParams.update) {
          const params = { ...this.fetchParams };
          this.membersService.fetch(params);
          this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { ...this.fetchParams, update: undefined },
            // queryParamsHandling: 'merge',
            // skipLocationChange: true
          });
        }
      }),
      this.membersService.subject.subscribe(
        (memberList) => (this.memberList = memberList)
      ),
      this.membersService.loading.subscribe(
        (loading) => (this.loading = loading)
      )
    );
    this.route.queryParams.pipe(take(1)).subscribe((queryParams) => {
      if (isMembersFetchParams(queryParams)) {
        this.membersService.updateFetchParams(
          this.membersService.convertQueryParamsToFetchParams(queryParams),
          true
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
      sort,
    });
  }

  fetch(page) {
    if (this.fetchParams.offset / this.fetchParams.limit !== page - 1) {
      this.membersService.fetchParams.next({
        ...this.fetchParams,
        limit: this.fetchParams.limit,
        offset: this.fetchParams.limit
          ? this.fetchParams.limit * (page - 1)
          : 0,
      });
    }
  }

  getJoinedYear(member: Member) {
    if (member && member.member_of) {
      const item = member.member_of.find((m) => m.id === this.fetchParams.member_of);
      return item == null ? 0 : item.year_joined;
    } else {
      return 0;
    }
  }

  downloadMembers() {
    this.exporting = true;
    this.http
      .get(`${environment.worldskillsApiOrg}/members/export?s=xlsx`, {
        responseType: 'arraybuffer',
      })
      .subscribe((response) => {
        const objectURL = window.URL.createObjectURL(
          new Blob([response], { type: 'application/octet-stream' })
        );
        const downloadLink = document.createElement('a');
        downloadLink.href = objectURL;
        downloadLink.setAttribute('download', 'worldskills_members.xlsx');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        this.exporting = false;
      });
  }

  get isFilteredByMemberOf() {
    return this.fetchParams && !!this.fetchParams.member_of;
  }
}
