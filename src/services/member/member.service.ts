import {Injectable} from '@angular/core';
import {
  FULL,
  HttpUtil,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {HttpClient} from '@angular/common/http';
import {Member, MemberRequest} from '../../types/member';
import {Observable} from 'rxjs';

import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';
import { Membership } from '../../types/membership';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends WsService<Member> {

  constructor(private http: HttpClient) {
    super();
  }

  getMembership(memberId: number, includeHistory: boolean): Observable<Membership[]> {
    const url = `${environment.worldskillsApiOrg}/members/${memberId}/memberships?include_membership_history=${includeHistory ? 'true' : 'false'}`;
    return this.http.get<Membership[]>(url);
  }

  fetch(memberId: number, rOpt?: RequestOptions): Observable<Member>;
  fetch(memberId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(member: MemberRequest, rOpt?: RequestOptions): Observable<Member>;
  create(member: MemberRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members`, member, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(memberId: number, member: MemberRequest, rOpt?: RequestOptions): Observable<Member>;
  update(
    memberId: number,
    member: MemberRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}`, member, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  deleteFlag(memberId: number, rOpt?: RequestOptions): Observable<Member>;
  deleteFlag(memberId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/flag`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
