import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../../../services/organization/organization.service';
import { take } from 'rxjs/operators';
import { OrganizationList } from '../../../../types/organization';
import { ErrorUtil, GenericUtil } from '@worldskills/worldskills-angular-lib';
import { defaultErrorMessage } from '../../../app-config';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-organizations',
  templateUrl: './organizations.component.html',
  styleUrls: ['./organizations.component.css']
})
export class OrganizationsComponent implements OnInit {

  appId = environment.worldskillsAppId;
  loading = false;
  data: OrganizationList;
  pageSize = 10;

  // params
  offset = 0;
  limit = 10;
  name: string;

  constructor(private orgs: OrganizationService) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.orgs.list(this.offset, this.limit, this.name).pipe(take(1)).subscribe(
      next => this.data = next,
      error => this.handleError(error),
      () => this.loading = false
    );
  }

  search(name: string) {
    this.name = name;
    this.offset = 0;
    this.limit = this.pageSize;
    this.loadData();
  }

  fetch(page) {
    if ((this.offset / this.limit) !== (page - 1)) {
      this.offset = this.limit ? this.limit * (page - 1) : 0;
      this.loadData();
    }
  }

  handleError(error: any) {
    const msg = ErrorUtil.getErrorMsg(error, defaultErrorMessage);
    alert(msg);
  }

  isEmpty() {
    if (GenericUtil.isNullOrUndefined(this.data)) {
      return true;
    }

    return GenericUtil.isNullOrUndefined(this.data.org_list) ? true : this.data.org_list.length <= 0;
  }

}
