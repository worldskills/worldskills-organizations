import {Injectable} from '@angular/core';
import { OrganizationList, OrganizationCreate, Organization, OrganizationRelationCreate } from '../../types/organization';
import {
  FetchParams,
  FULL,
  HttpUtil,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

export interface OrganizationsFetchParams extends FetchParams {
  name?: string;
}

export const DEFAULT_FETCH_PARAMS = {
  offset: 0,
  limit: 9999,
};

@Injectable({
  providedIn: 'root'
})
export class OrganizationsService extends WsService<OrganizationList, OrganizationsFetchParams> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(params: OrganizationsFetchParams, rOpt?: RequestOptions): Observable<OrganizationList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<OrganizationList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<OrganizationList>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(params: OrganizationCreate): Observable<Organization> {
    return this.http.post<Organization>(environment.worldskillsApiOrg, params);
  }

  createRelation(params: OrganizationRelationCreate): Observable<any> {
    const url = `${environment.worldskillsApiOrg}/${params.organization}/relations`;
    return this.http.post(url, params);
  }

  deleteRelation(orgId: number, relationId: number): Observable<any> {
    const url = `${environment.worldskillsApiOrg}/${orgId}/relations/${relationId}`;
    return this.http.delete(url);
  }
}
