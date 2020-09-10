import {Injectable} from '@angular/core';
import {Contact, ContactRequest} from '../../types/contact';
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
export class ContactsService extends WsService<Array<Contact>> {

  constructor(private http: HttpClient) {
    super();
  }

  bind(memberId: number, memberContactRequest: ContactRequest, rOpt?: RequestOptions): Observable<Array<Contact>>;
  bind(
    memberId: number,
    memberContactRequest: ContactRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Contact>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Array<Contact>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/contacts`, memberContactRequest, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  unbind(memberId: number, memberRoleId: number, rOpt?: RequestOptions): Observable<Array<Contact>>;
  unbind(
    memberId: number,
    memberRoleId: number,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Array<Contact>> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Array<Contact>>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/members/${memberId}/contacts/${memberRoleId}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
