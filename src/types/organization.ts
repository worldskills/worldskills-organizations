import {I18nText, WsEntityModel} from '@worldskills/worldskills-angular-lib';
import {Phone} from './phone';
import {Address} from './address';
import {Link} from './common';
import {OrgWebsite as Website} from './website';

export interface MemberOrganizationRequest {
  id: number;
}

export interface OrganizationRequest {
  name: I18nText;
}

export interface OrganizationRelationRequest {
  organization: number;
  entity: number;
  type: string;
}

export interface Organization {
  id: number;
  legacyId?: number;
  name: I18nText;
  websites: Array<Website>;
  phones: Array<Phone>;
  addresses: Array<Address>;
  links: Array<Link>;
  wsEntity: WsEntityModel;
}

export interface OrganizationRelation {
  id: number;
  entity: WsEntityModel;
  type: string;
}

export interface OrganizationContact {
  id: number;
  personId: number;
  firstName: string;
  lastName: string;
  email: string;
}

/*
  List types
*/

export interface OrganizationList {
  org_list: Organization[];
  total_count: number;
}

export interface OrganizationContactList {
  contacts: OrganizationContact[];
  total_count: number;
}
