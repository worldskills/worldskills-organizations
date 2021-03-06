import {Injectable} from '@angular/core';
import {Website, WebsiteRequest} from '../../types/website';
import {
  HttpUtil,
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
export class OrganizationWebsiteService extends WsService<Array<Website>> {

  constructor(private http: HttpClient) {
    super();
  }

  create(
    organizationId: number, memberWebsiteRequest: WebsiteRequest, rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  create(
    organizationId: number,
    memberWebsiteRequest: WebsiteRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Website>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Array<Website>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${organizationId}/websites`,
      memberWebsiteRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(
    organizationId: number, websiteId: number, memberWebsiteRequest: WebsiteRequest, rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  update(
    organizationId: number,
    websiteId: number,
    memberWebsiteRequest: WebsiteRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Website>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Array<Website>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${organizationId}/websites/${websiteId}`,
      memberWebsiteRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  delete(
    organizationId: number, websiteId: number, rOpt?: RequestOptions
  ): Observable<Array<Website>>;
  delete(
    organizationId: number,
    websiteId: number,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Website>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Array<Website>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${organizationId}/websites/${websiteId}`,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }


}
