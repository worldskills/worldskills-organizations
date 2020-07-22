import {Injectable} from '@angular/core';
import {
  FetchParams,
  FULL,
  MulticastOptions,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {Organization, OrganizationRequest} from '../../types/organization';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends WsService<Organization> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(organizationId: number, rOpt?: RequestOptions): Observable<Organization>;
  fetch(organizationId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Organization>;
  fetch(organizationId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Organization>;
  fetch(organizationId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Organization>;
  fetch(organizationId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Organization>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${organizationId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(organization: OrganizationRequest, rOpt?: RequestOptions): Observable<Organization>;
  create(organization: OrganizationRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Organization>;
  create(organization: OrganizationRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Organization>;
  create(organization: OrganizationRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Organization>;
  create(
    organization: OrganizationRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3
  ): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Organization>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}`, organization, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(organizationId: number, organization: OrganizationRequest, rOpt?: RequestOptions): Observable<Organization>;
  update(organizationId: number, organization: OrganizationRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Organization>;
  update(
    organizationId: number,
    organization: OrganizationRequest,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Organization>;
  update(
    organizationId: number,
    organization: OrganizationRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Organization>;
  update(
    organizationId: number,
    organization: OrganizationRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Organization>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${organizationId}`, organization, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
