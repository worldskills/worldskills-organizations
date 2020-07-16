import {Injectable} from '@angular/core';
import {
  FetchParams,
  FULL,
  MulticastOptions,
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
import {httpParamsFromFetchParams} from '../../utils/http';
import {share} from 'rxjs/operators';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MemberService extends WsService<Member> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(memberId: number, rOpt?: RequestOptions): Observable<Member>;
  fetch(memberId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Member>;
  fetch(memberId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  fetch(memberId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  fetch(memberId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(member: MemberRequest, rOpt?: RequestOptions): Observable<Member>;
  create(member: MemberRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Member>;
  create(member: MemberRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  create(member: MemberRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  create(member: MemberRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members`, member, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(memberId: number, member: MemberRequest, rOpt?: RequestOptions): Observable<Member>;
  update(memberId: number, member: MemberRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Member>;
  update(memberId: number, member: MemberRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  update(memberId: number, member: MemberRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  update(
    memberId: number,
    member: MemberRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}`, member, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(memberId: number, rOpt?: RequestOptions): Observable<Member>;
  delete(memberId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Member>;
  delete(memberId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  delete(memberId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  delete(memberId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  deleteFlag(memberId: number, rOpt?: RequestOptions): Observable<Member>;
  deleteFlag(memberId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Member>;
  deleteFlag(memberId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  deleteFlag(memberId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Member>;
  deleteFlag(memberId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Member> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Member>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/flag`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
