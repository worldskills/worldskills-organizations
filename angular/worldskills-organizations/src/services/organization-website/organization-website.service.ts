import {Injectable} from '@angular/core';
import {Website, WebsiteRequest} from '../../types/website';
import {
  FetchParams,
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
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationWebsiteService extends WsService<Array<Website>> {

  constructor(private http: HttpClient) {
    super();
  }

  update(
    organizationId: number, websiteId: number, memberWebsiteRequest: WebsiteRequest, rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  update(
    organizationId: number, websiteId: number, memberWebsiteRequest: WebsiteRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  update(
    organizationId: number,
    websiteId: number,
    memberWebsiteRequest: WebsiteRequest,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  update(
    organizationId: number, websiteId: number,
    memberWebsiteRequest: WebsiteRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  update(
    organizationId: number, websiteId: number,
    memberWebsiteRequest: WebsiteRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Website>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Array<Website>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${organizationId}/websites/${websiteId}`,
      memberWebsiteRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(
    organizationId: number, memberWebsiteRequest: WebsiteRequest, rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  create(
    organizationId: number, memberWebsiteRequest: WebsiteRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  create(
    organizationId: number,
    memberWebsiteRequest: WebsiteRequest,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  create(
    organizationId: number,
    memberWebsiteRequest: WebsiteRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  create(
    organizationId: number,
    memberWebsiteRequest: WebsiteRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Website>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Array<Website>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${organizationId}/websites`,
      memberWebsiteRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
