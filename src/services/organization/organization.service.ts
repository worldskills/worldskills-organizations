import {Injectable} from '@angular/core';
import {
  FULL,
  HttpUtil,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {Organization, OrganizationRequest} from '../../types/organization';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends WsService<Organization> {

  constructor(private http: HttpClient) {
    super();
  }

  create(organization: OrganizationRequest, rOpt?: RequestOptions): Observable<Organization>;
  create(
    organization: OrganizationRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3
  ): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Organization>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}`, organization, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(organizationId: number, organization: OrganizationRequest, rOpt?: RequestOptions): Observable<Organization>;
  update(
    organizationId: number,
    organization: OrganizationRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Organization>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${organizationId}`, organization, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
