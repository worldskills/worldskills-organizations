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
import {PersonList} from '../../types/person';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

export const DEFAULT_FETCH_PARAMS = {offset: 0, limit: 9999};

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends WsService<PersonList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(rOpt?: RequestOptions): Observable<PersonList>;
  fetch(params: FetchParams, rOpt?: RequestOptions): Observable<PersonList>;
  fetch(mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<PersonList>;
  fetch(params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<PersonList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<PersonList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<PersonList>(
      requestOptions.url ?? `${environment.worldskillsApiPeople}/person`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  fetchByEntityId(entityId: number, rOpt?: RequestOptions): Observable<PersonList>;
  fetchByEntityId(entityId: number, params: FetchParams, rOpt?: RequestOptions): Observable<PersonList>;
  fetchByEntityId(entityId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<PersonList>;
  fetchByEntityId(entityId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<PersonList>;
  fetchByEntityId(entityId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<PersonList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<PersonList>(
      requestOptions.url ?? `${environment.worldskillsApiPeople}/person?entity=${entityId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }
}
