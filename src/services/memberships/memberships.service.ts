import {Injectable} from '@angular/core';
import {Membership, MembershipRequest} from '../../types/membership';
import {
  FetchParams,
  HttpUtil,
  MulticastOptions,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MembershipsService extends WsService<Array<Membership>> {

  constructor(private http: HttpClient) {
    super();
  }

  bind(memberId: number, memberMembershipRequest: MembershipRequest, rOpt?: RequestOptions): Observable<Array<Membership>>;
  bind(
    memberId: number, memberMembershipRequest: MembershipRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<Array<Membership>>;
  bind(
    memberId: number, memberMembershipRequest: MembershipRequest, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Membership>>;
  bind(
    memberId: number,
    memberMembershipRequest: MembershipRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Membership>>;
  bind(
    memberId: number,
    memberMembershipRequest: MembershipRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Membership>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Array<Membership>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/memberships`, memberMembershipRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(
    memberId: number, membershipId: number, memberMembershipRequest: MembershipRequest, rOpt?: RequestOptions
  ): Observable<Array<Membership>>;
  update(
    memberId: number, membershipId: number, memberMembershipRequest: MembershipRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<Array<Membership>>;
  update(
    memberId: number, membershipId: number, memberMembershipRequest: MembershipRequest, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Membership>>;
  update(
    memberId: number, membershipId: number,
    memberMembershipRequest: MembershipRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Membership>>;
  update(
    memberId: number, membershipId: number,
    memberMembershipRequest: MembershipRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Membership>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Array<Membership>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/memberships/${membershipId}`,
      memberMembershipRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  unbind(memberId: number, memberRoleId: number, rOpt?: RequestOptions): Observable<Array<Membership>>;
  unbind(memberId: number, memberRoleId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Array<Membership>>;
  unbind(memberId: number, memberRoleId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Membership>>;
  unbind(
    memberId: number, memberRoleId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Membership>>;
  unbind(
    memberId: number,
    memberRoleId: number,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Membership>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Array<Membership>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/memberships/${memberRoleId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
