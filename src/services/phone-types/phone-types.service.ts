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
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';
import {PhoneTypeList} from '../../types/phoneType';

@Injectable({
  providedIn: 'root'
})
export class PhoneTypesService extends WsService<PhoneTypeList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(rOpt?: RequestOptions): Observable<PhoneTypeList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<PhoneTypeList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<PhoneTypeList>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/phone_types`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }
}
