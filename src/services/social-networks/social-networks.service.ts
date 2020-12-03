import {Injectable} from '@angular/core';
import {SocialNetwork, SocialNetworkRequest} from '../../types/socialNetwork';
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
export class SocialNetworksService extends WsService<Array<SocialNetwork>> {

  constructor(private http: HttpClient) {
    super();
  }

  bind(memberId: number, memberSocialNetworkRequest: SocialNetworkRequest, rOpt?: RequestOptions): Observable<Array<SocialNetwork>>;
  bind(
    memberId: number,
    memberSocialNetworkRequest: SocialNetworkRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<SocialNetwork>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Array<SocialNetwork>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/social_networks`, memberSocialNetworkRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  update(
    memberId: number, socialNetworkId: number, memberSocialNetworkRequest: SocialNetworkRequest, rOpt?: RequestOptions
  ): Observable<Array<SocialNetwork>>;
  update(
    memberId: number, socialNetworkId: number,
    memberSocialNetworkRequest: SocialNetworkRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<SocialNetwork>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Array<SocialNetwork>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/social_networks/${socialNetworkId}`,
      memberSocialNetworkRequest,
      {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  unbind(memberId: number, memberRoleId: number, rOpt?: RequestOptions): Observable<Array<SocialNetwork>>;
  unbind(
    memberId: number,
    memberRoleId: number,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<SocialNetwork>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Array<SocialNetwork>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/social_networks/${memberRoleId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
