import {Injectable} from '@angular/core';
import {
  HttpUtil,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {MemberOrganizationRequest, Organization} from '../../types/organization';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MemberOrganizationService extends WsService<Organization> {

  constructor(private http: HttpClient) {
    super();
  }

  bind(memberId: number, memberMemberOrganizationRequest: MemberOrganizationRequest, rOpt?: RequestOptions): Observable<Organization>;
  bind(
    memberId: number,
    memberMemberOrganizationRequest: MemberOrganizationRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Organization>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/organization`, memberMemberOrganizationRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
