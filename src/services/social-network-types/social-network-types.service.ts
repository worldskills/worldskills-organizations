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
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';
import {SocialNetworkTypeList} from '../../types/socialNetworkType';

@Injectable({
  providedIn: 'root'
})
export class SocialNetworkTypesService extends WsService<SocialNetworkTypeList> {

  constructor(private http: HttpClient) {
    super();
  }

  fetch(rOpt?: RequestOptions): Observable<SocialNetworkTypeList>;
  fetch(params: FetchParams, rOpt?: RequestOptions): Observable<SocialNetworkTypeList>;
  fetch(mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SocialNetworkTypeList>;
  fetch(params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<SocialNetworkTypeList>;
  fetch(p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<SocialNetworkTypeList> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.get<SocialNetworkTypeList>(
      requestOptions.url ?? `${environment.worldskillsApiPeople}/social_networks`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }
}
