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
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';
import {CountryList} from '../../types/country';

@Injectable({
  providedIn: 'root'
})
export class CountriesService extends WsService<CountryList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(rOpt?: RequestOptions): Observable<CountryList>;
  fetch(params: FetchParams, rOpt?: RequestOptions): Observable<CountryList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<CountryList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<CountryList>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/countries`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  // this will eventually replace the fetch methods as we plan to remove teh WSService
  getCountries(params: FetchParams): Observable<CountryList> {
    let url = `${environment.worldskillsApiOrg}/countries`;
    if (params.sort) {
      url = `${url}?sort=${params.sort}`;
    }
    if (params.offset) {
      url = `${url}&offset=${params.offset}`;
    }
    if (params.limit) {
      url = `${url}&limit=${params.limit}`;
    }
    if (params.l) {
      url = `${url}&l=${params.l}`;
    }
    return this.http.get<CountryList>(url);
  }
}
