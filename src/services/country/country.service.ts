import {Injectable} from '@angular/core';
import {Country, CountryRequest} from '../../types/country';
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
export class CountryService extends WsService<Country> {

  constructor(private http: HttpClient) {
    super();
  }

  update(code: string, countryRequest: CountryRequest, rOpt?: RequestOptions): Observable<Country>;
  update(
    code: string,
    countryRequest: CountryRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Country> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Country>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/countries/${code}`,
      countryRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
