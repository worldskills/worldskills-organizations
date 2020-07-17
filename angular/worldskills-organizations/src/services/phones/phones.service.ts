import {Injectable} from '@angular/core';
import {Phone, PhoneRequest} from '../../types/phone';
import {
  FetchParams,
  MulticastOptions,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhonesService extends WsService<Array<Phone>> {

  constructor(private http: HttpClient) {
    super();
  }

  bind(memberId: number, memberPhoneRequest: PhoneRequest, rOpt?: RequestOptions): Observable<Array<Phone>>;
  bind(
    memberId: number, memberPhoneRequest: PhoneRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<Array<Phone>>;
  bind(
    memberId: number, memberPhoneRequest: PhoneRequest, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Phone>>;
  bind(
    memberId: number,
    memberPhoneRequest: PhoneRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Phone>>;
  bind(
    memberId: number,
    memberPhoneRequest: PhoneRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Phone>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Array<Phone>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/phones`, memberPhoneRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(
    memberId: number, phoneId: number, memberPhoneRequest: PhoneRequest, rOpt?: RequestOptions
  ): Observable<Array<Phone>>;
  update(
    memberId: number, phoneId: number, memberPhoneRequest: PhoneRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<Array<Phone>>;
  update(
    memberId: number, phoneId: number, memberPhoneRequest: PhoneRequest, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Phone>>;
  update(
    memberId: number, phoneId: number,
    memberPhoneRequest: PhoneRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Phone>>;
  update(
    memberId: number, phoneId: number,
    memberPhoneRequest: PhoneRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Phone>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.put<Array<Phone>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/phones/${phoneId}`,
      memberPhoneRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  unbind(memberId: number, memberRoleId: number, rOpt?: RequestOptions): Observable<Array<Phone>>;
  unbind(memberId: number, memberRoleId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Array<Phone>>;
  unbind(memberId: number, memberRoleId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Phone>>;
  unbind(
    memberId: number, memberRoleId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Phone>>;
  unbind(
    memberId: number,
    memberRoleId: number,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Phone>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.delete<Array<Phone>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/phones/${memberRoleId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
