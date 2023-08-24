import {Injectable} from '@angular/core';
import {
  FetchParams,
  FULL,
  HttpUtil,
  MemberAward,
  MulticastOptions,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {HttpClient} from '@angular/common/http';
import {environment} from 'src/environments/environment';
import {share} from 'rxjs/operators';
import {MemberAwardContainer, MemberAwardRequest} from '../../types/member-award';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberAwardService extends WsService<any> {

  constructor(private http: HttpClient) {
    super();
  }

  public getMemberAwards(memberId?: number): Observable<MemberAwardContainer> {
    const observable = this.http.get<MemberAwardContainer>(`${environment.worldskillsApiAwards}/member_awards/member/${memberId}`).pipe(share());
    return this.request(observable);
  }

  create(request: MemberAwardRequest, rOpt?: RequestOptions): Observable<MemberAward>;
  create(request: MemberAwardRequest, params: FetchParams, rOpt?: RequestOptions): Observable<MemberAward>;
  create(request: MemberAwardRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<MemberAward>;
  create(request: MemberAwardRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<MemberAward>;
  create(request: MemberAwardRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<MemberAward> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<MemberAward>(
      requestOptions.url ?? `${environment.worldskillsApiAwards}/member_awards`, request, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(memberAwardId: number, request: MemberAwardRequest, rOpt?: RequestOptions): Observable<MemberAward>;
  update(memberAwardId: number, request: MemberAwardRequest, params: FetchParams, rOpt?: RequestOptions): Observable<MemberAward>;
  update(memberAwardId: number, request: MemberAwardRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<MemberAward>;
  update(memberAwardId: number, request: MemberAwardRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<MemberAward>;
  update(memberAwardId: number, request: MemberAwardRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<MemberAward> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<MemberAward>(
      requestOptions.url ?? `${environment.worldskillsApiAwards}/member_awards/${memberAwardId}`, request, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(memberAwardId: number): Observable<void> {
    return this.http.delete<void>(`${environment.worldskillsApiAwards}/member_awards/${memberAwardId}`);
  }
}
