import {Injectable} from '@angular/core';
import {Address, AddressRequest} from '../../types/address';
import {
  FetchParams,
  HttpUtil,
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

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressesService extends WsService<Array<Address>> {

  constructor(private http: HttpClient) {
    super();
  }

  bind(memberId: number, memberAddressRequest: AddressRequest, rOpt?: RequestOptions): Observable<Array<Address>>;
  bind(
    memberId: number, memberAddressRequest: AddressRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<Array<Address>>;
  bind(
    memberId: number, memberAddressRequest: AddressRequest, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Address>>;
  bind(
    memberId: number,
    memberAddressRequest: AddressRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Address>>;
  bind(
    memberId: number,
    memberAddressRequest: AddressRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Address>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Array<Address>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/addresses`, memberAddressRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(
    memberId: number, addressId: number, memberAddressRequest: AddressRequest, rOpt?: RequestOptions
  ): Observable<Array<Address>>;
  update(
    memberId: number, addressId: number, memberAddressRequest: AddressRequest, params: FetchParams, rOpt?: RequestOptions
  ): Observable<Array<Address>>;
  update(
    memberId: number, addressId: number, memberAddressRequest: AddressRequest, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Address>>;
  update(
    memberId: number, addressId: number,
    memberAddressRequest: AddressRequest,
    params: FetchParams,
    mOpt: MulticastOptions,
    rOpt?: RequestOptions
  ): Observable<Array<Address>>;
  update(
    memberId: number, addressId: number,
    memberAddressRequest: AddressRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Address>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Array<Address>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/addresses/${addressId}`,
      memberAddressRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  unbind(memberId: number, memberRoleId: number, rOpt?: RequestOptions): Observable<Array<Address>>;
  unbind(memberId: number, memberRoleId: number, params: FetchParams, rOpt?: RequestOptions): Observable<Array<Address>>;
  unbind(memberId: number, memberRoleId: number, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Array<Address>>;
  unbind(
    memberId: number, memberRoleId: number, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Array<Address>>;
  unbind(
    memberId: number,
    memberRoleId: number,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Address>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Array<Address>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/addresses/${memberRoleId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
