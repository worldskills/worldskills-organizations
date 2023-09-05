import {Injectable} from '@angular/core';
import {
  FetchParams,
  FULL,
  HttpUtil,
  MulticastOptions,
  OrganizationAward,
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
import {OrganizationAwardContainer, OrganizationAwardRequest} from '../../types/organization-award';

@Injectable({
  providedIn: 'root'
})
export class OrganizationAwardService extends WsService<any> {

  constructor(private http: HttpClient) {
    super();
  }

  public getOrgAwards(orgId?: number): Observable<OrganizationAwardContainer> {
    const observable = this.http.get<OrganizationAwardContainer>(`${environment.worldskillsApiAwards}/organization_awards/org/${orgId}`).pipe(share());
    return this.request(observable);
  }

  create(request: OrganizationAwardRequest, rOpt?: RequestOptions): Observable<OrganizationAward>;
  create(request: OrganizationAwardRequest, params: FetchParams, rOpt?: RequestOptions): Observable<OrganizationAward>;
  create(request: OrganizationAwardRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<OrganizationAward>;
  create(request: OrganizationAwardRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<OrganizationAward>;
  create(request: OrganizationAwardRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<OrganizationAward> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<OrganizationAward>(
      requestOptions.url ?? `${environment.worldskillsApiAwards}/organization_awards`, request, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(orgAwardId: number, request: OrganizationAwardRequest, rOpt?: RequestOptions): Observable<OrganizationAward>;
  update(orgAwardId: number, request: OrganizationAwardRequest, params: FetchParams, rOpt?: RequestOptions): Observable<OrganizationAward>;
  update(orgAwardId: number, request: OrganizationAwardRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<OrganizationAward>;
  update(orgAwardId: number, request: OrganizationAwardRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<OrganizationAward>;
  update(orgAwardId: number, request: OrganizationAwardRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<OrganizationAward> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<OrganizationAward>(
      requestOptions.url ?? `${environment.worldskillsApiAwards}/organization_awards/${orgAwardId}`, request, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(orgAwardId: number): Observable<void> {
    return this.http.delete<void>(`${environment.worldskillsApiAwards}/organization_awards/${orgAwardId}`);
  }
}
