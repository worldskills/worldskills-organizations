import {Injectable} from '@angular/core';
import {
  FULL,
  HttpUtil,
  NO_SUBJECT,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
// tslint:disable-next-line:max-line-length
import { Organization, OrganizationList, OrganizationRequest, OrganizationRelation, OrganizationContactList, OrganizationRelationRequest, OrganizationContact, OrganizationRelationType } from '../../types/organization';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';

import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';
import { Member } from '../../types/member';
import { Website } from 'src/types/website';
import { ContactRequest } from '../../types/contact';
import { WebsiteList, WebsiteRequest, OrgWebsite, OrgWebsiteRequest } from '../../types/website';
import { GenericUtil } from '@worldskills/worldskills-angular-lib';
import { Address, AddressRequest } from '../../types/address';
import { Phone, PhoneRequest } from 'src/types/phone';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends WsService<Organization> {

  endpoint: string;

  constructor(private http: HttpClient) {
    super();
    this.endpoint = environment.worldskillsApiOrg;
  }

  list(offset: number, limit: number, name: string, relation?: string, country?: number): Observable<OrganizationList> {
    let params = HttpUtil.objectToParams({ offset, limit, name});
    if (!GenericUtil.isNullOrUndefined(relation)) {
      params = params.set('type', relation);
    }
    if (!GenericUtil.isNullOrUndefined(country)) {
      params = params.set('country', country.toString());
    }
    return this.http.get<OrganizationList>(this.endpoint, {params});
  }

  get(id: number): Observable<Organization> {
    const url = `${this.endpoint}/${id}`;
    return this.http.get<Organization>(url);
  }

  getMembers(id: number): Observable<Member[]> {
    const url = `${this.endpoint}/${id}/members`;
    return this.http.get<Member[]>(url);
  }

  getRelations(id: number): Observable<OrganizationRelation[]> {
    const url = `${this.endpoint}/${id}/relations`;
    return this.http.get<OrganizationRelation[]>(url);
  }

  getInboundRelations(id: number): Observable<OrganizationRelation[]> {
    const url = `${this.endpoint}/${id}/relations_inbound`;
    return this.http.get<OrganizationRelation[]>(url);
  }

  getRelation(id: number, relationId: number): Observable<OrganizationRelation> {
    const url = `${this.endpoint}/${id}/relations/${relationId}`;
    return this.http.get<OrganizationRelation>(url);
  }

  getWebsites(id: number): Observable<WebsiteList> {
    const url = `${this.endpoint}/${id}/websites`;
    return this.http.get<WebsiteList>(url);
  }

  getContacts(id: number): Observable<OrganizationContactList> {
    const url = `${this.endpoint}/${id}/contacts`;
    return this.http.get<OrganizationContactList>(url);
  }

  getAddressess(id: number): Observable<Address[]> {
    const url = `${this.endpoint}/${id}/addresses`;
    return this.http.get<Address[]>(url);
  }


  create(organization: OrganizationRequest, rOpt?: RequestOptions): Observable<Organization>;
  create(
    organization: OrganizationRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3
  ): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.post<Organization>(
      requestOptions.url ?? `${this.endpoint}`, organization, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  createRelation(orgId: number, view: OrganizationRelationRequest): Observable<OrganizationRelation> {
    const url = `${this.endpoint}/${orgId}/relations/`;
    return this.http.post<OrganizationRelation>(url, view);
  }

  createWebsite(id: number, view: OrgWebsiteRequest): Observable<Website> {
    const url = `${this.endpoint}/${id}/websites`;
    return this.http.post<Website>(url, view);
  }

  createContacts(id: number, view: ContactRequest): Observable<OrganizationContact> {
    const url = `${this.endpoint}/${id}/contacts`;
    return this.http.post<OrganizationContact>(url, view);
  }

  createAddress(id: number, params: AddressRequest): Observable<Organization> {
    const url = `${this.endpoint}/${id}/addresses`;
    return this.http.post<Organization>(url, params);
  }

  createPhone(id: number, params: PhoneRequest): Observable<Organization> {
    const url = `${this.endpoint}/${id}/phones`;
    return this.http.post<Organization>(url, params);
  }

  update(organizationId: number, organization: OrganizationRequest, rOpt?: RequestOptions): Observable<Organization>;
  update(
    organizationId: number,
    organization: OrganizationRequest,
    p1: WsServiceRequestP1,
    p2?: WsServiceRequestP2,
    p3?: WsServiceRequestP3
  ): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.put<Organization>(
      requestOptions.url ?? `${this.endpoint}/${organizationId}`, organization, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

  updateRelation(orgId: number, relationId: number, view: OrganizationRelationRequest): Observable<OrganizationRelation> {
    const url = `${this.endpoint}/${orgId}/relations/${relationId}`;
    const params = HttpUtil.objectToParams(view);
    return this.http.put<OrganizationRelation>(url, {params});
  }

  updateWebsite(orgId: number, websiteId: number, view: OrgWebsite): Observable<Website> {
    const url = `${this.endpoint}/${orgId}/websites/${websiteId}`;
    return this.http.put<Website>(url, view);
  }

  updateContacts(orgId: number, contactId: number, view: OrganizationContact): Observable<OrganizationContact> {
    const url = `${this.endpoint}/${orgId}/contacts/${contactId}`;
    const params = HttpUtil.objectToParams(view);
    return this.http.put<OrganizationContact>(url, {params});
  }

  updateAddress(id: number, addressId: number, params: AddressRequest): Observable<Address> {
    const url = `${this.endpoint}/${id}/addresses/${addressId}`;
    return this.http.put<Address>(url, params);
  }

  updatePhone(id: number, phoneId: number, params: PhoneRequest): Observable<Phone> {
    const url = `${this.endpoint}/${id}/phones/${phoneId}`;
    return this.http.post<Phone>(url, params);
  }

  deleteRelation(orgId: number, relationId: number, view: OrganizationRelationRequest): Observable<any> {
    const url = `${this.endpoint}/${orgId}/relations/${relationId}`;
    return this.http.delete(url);
  }

  deleteWebsite(orgId: number, websiteId: number): Observable<any> {
    const url = `${this.endpoint}/${orgId}/websites/${websiteId}`;
    return this.http.delete(url);
  }

  deleteContacts(orgId: number, contactId: number): Observable<any> {
    const url = `${this.endpoint}/${orgId}/contacts/${contactId}`;
    return this.http.delete(url);
  }

  deleteAddress(id: number, addressId): Observable<any> {
    const url = `${this.endpoint}/${id}/addresses/${addressId}`;
    return this.http.delete(url);
  }

  deletePhone(id: number, phoneId: number): Observable<Phone> {
    const url = `${this.endpoint}/${id}/phones/${phoneId}`;
    return this.http.delete<Phone>(url);
  }

  deleteFlag(orgId: number, rOpt?: RequestOptions): Observable<Organization>;
  deleteFlag(orgId: number, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Organization> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, NO_SUBJECT);
    const params = HttpUtil.objectToParams(fetchParams || {});
    const observable = this.http.delete<Organization>(
      requestOptions.url ?? `${environment.worldskillsApiOrg}/${orgId}/flag`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions);
  }

}
