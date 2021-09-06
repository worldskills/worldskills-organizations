import {Injectable} from '@angular/core';
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
import { Person, PersonList, NewPerson } from '../../types/person';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

export interface PeopleFetchParams extends FetchParams {
  name?: string;
  entity?: number;
}

export const DEFAULT_FETCH_PARAMS = {offset: 0, limit: 9999};

@Injectable({
  providedIn: 'root'
})
export class PeopleService extends WsService<PersonList, PeopleFetchParams> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(params: PeopleFetchParams, rOpt?: RequestOptions): Observable<PersonList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<PersonList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL, DEFAULT_FETCH_PARAMS);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<PersonList>(
      requestOptions.url ?? `${environment.worldskillsApiPeople}/person`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  create(data: NewPerson): Observable<Person> {
    const url = `${environment.worldskillsApiPeople}/person`;
    return this.http.post<Person>(url, data);
  }

}
