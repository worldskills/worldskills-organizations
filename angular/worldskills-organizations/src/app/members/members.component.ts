import {Component, OnInit} from '@angular/core';
import {WsComponent} from '@worldskills/worldskills-angular-lib';
import {MemberList} from '../../types/member';
import {isMembersFetchParams, MembersFetchParams, MembersService} from '../../services/members/members.service';
import {take} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent extends WsComponent implements OnInit {

  memberList: MemberList;
  fetchParams: MembersFetchParams;
  loading = false;

  constructor(
    private membersService: MembersService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
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

}
