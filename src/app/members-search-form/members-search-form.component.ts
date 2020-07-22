import {Component, OnInit, ViewChild} from '@angular/core';
import {LOADER_ONLY, WsComponent} from '@worldskills/worldskills-angular-lib';
import {MembersFetchParams, MembersService} from '../../services/members/members.service';
import {NgForm} from '@angular/forms';
import {Member} from '../../types/member';

@Component({
  selector: 'app-members-search-form',
  templateUrl: './members-search-form.component.html',
  styleUrls: ['./members-search-form.component.css']
})
export class MembersSearchFormComponent extends WsComponent implements OnInit {

  fetchParams: MembersFetchParams;
  members: Array<Member>;
  loading = false;
  @ViewChild('form') form: NgForm;

  constructor(
    private membersService: MembersService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribe(
      this.membersService.fetchParams.subscribe(fetchParams => this.fetchParams = fetchParams),
      this.membersService.loading.subscribe(loading => (this.loading = loading)),
    );
    this.membersService.fetch(LOADER_ONLY).subscribe(members => (this.members = members.members));
  }

  submit() {
    this.membersService.updateFetchParams(this.getFetchParamsFromForm());
  }

  get initialized() {
    return !!this.members;
  }

  onChange() {
    this.membersService.updateFetchParams(this.getFetchParamsFromForm(), false);
  }

  getFetchParamsFromForm() {
    return {...this.fetchParams, ...this.form.value};
  }

}
