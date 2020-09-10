import {Injectable} from '@angular/core';
import {
  FetchParams,
  FULL,
  HttpUtil,
  MulticastOptions,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {Observable, ReplaySubject} from 'rxjs';
import {share} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';

import {environment} from '../../environments/environment';
import {MemberList} from '../../types/member';
import {Params} from '@angular/router';

export interface MembersFetchParams extends FetchParams {
  member_of?: number;
  name?: string;
  editable?: boolean;
  update?: boolean;
}

export function isMembersFetchParams(object: any): object is MembersFetchParams {
  return object && 'limit' in object && 'offset' in object;
}

const DEFAULT_FETCH_PARAMS: MembersFetchParams = {limit: 500, offset: 0};

@Injectable({
  providedIn: 'root'
})
export class MembersService extends WsService<MemberList, MembersFetchParams> {

  public fetchParams = new ReplaySubject<MembersFetchParams>(1);

  constructor(private http: HttpClient) {
    super();
    this.updateFetchParams({
      offset: 0,
      limit: 20,
      editable: true,
      sort: 'name',
    }, true);
  }

  updateFetchParams(value: MembersFetchParams | undefined, update = true) {
    this.fetchParams.next({...value, update});
  }

  convertQueryParamsToFetchParams(queryParams: Params): MembersFetchParams {
    queryParams = {...queryParams};
    if ('member_of' in queryParams) {
      queryParams.member_of = parseInt(queryParams.member_of);
    }
    if ('editable' in queryParams) {
      if (queryParams.editable === 'true') {
        queryParams.editable = true;
      } else if (queryParams.editable === 'false') {
        queryParams.editable = false;
      }
    }
    return queryParams;
  }

  createParamsFromFetchParams(fetchParams: MembersFetchParams, params: HttpParams): HttpParams {
    if (fetchParams.editable === true) {
      params = params.set('editable', 'true');
    } else if (fetchParams.editable === false) {
      params = params.set('editable', 'false');
    }
    if (fetchParams.name) {
      params = params.set('name', fetchParams.name);
    }
    if (fetchParams.member_of) {
      params = params.set('member_of', fetchParams.member_of.toString());
    }
    return params;
  }

  // TODO added to lib, can be removed when lib updated
  stripNullOrUndefined(obj: any, deep = false): any {
    if (Array.isArray(obj)) {
      if (deep) {
        // tslint:disable-next-line:forin
        for (const k in obj) {
          obj[k] = this.stripNullOrUndefined(obj[k], true);
        }
      }
    } else if (obj && typeof obj === 'object') {
      Object.keys(obj).forEach(key => (obj[key] === undefined || obj[key] === null) && delete obj[key]);
    }
    return obj;
  }

  fetch(rOpt?: RequestOptions): Observable<MemberList>;
  fetch(params: MembersFetchParams, rOpt?: RequestOptions): Observable<MemberList>;
  fetch(mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<MemberList>;
  fetch(params: MembersFetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<MemberList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<MemberList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = this.createParamsFromFetchParams(fetchParams, HttpUtil.objectToParams(this.stripNullOrUndefined(fetchParams) || {}));
    const observable = this.http.get<MemberList>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
