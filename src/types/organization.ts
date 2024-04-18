import {I18nText, WsEntityModel} from '@worldskills/worldskills-angular-lib';
import {Phone} from './phone';
import {Address} from './address';
import {Link} from './common';
import {OrgWebsite as Website} from './website';
import { Country } from './country';


export enum OrganizationRelationType {
  GLOBAL_PARTNER = 'GLOBAL_PARTNER', HOST = 'HOST', SPONSOR = 'SPONSOR', SUPPORTER = 'SUPPORTER',
  SUPPLIER = 'SUPPLIER', MEMBER = 'MEMBER', NGO_PARTNER = 'NGO_PARTNER', POTENTIAL_MEMBER = 'POTENTIAL_MEMBER',
  PARENT = 'PARENT', CHILD = 'CHILD'
}

export interface MemberOrganizationRequest {
  id: number;
}

export interface OrganizationRequest {
  name: I18nText;
  description?: I18nText;
  logo?: Logo;
  country?: Country;
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
  description?: I18nText;
  websites: Array<Website>;
  phones: Array<Phone>;
  addresses: Array<Address>;
  links: Array<Link>;
  wsEntity: WsEntityModel;
  relations?: OrganizationRelation[];
  logo?: Logo;
  country?: Country;
}

export interface OrganizationRelation {
  id: number;
  organizationId?: number;
  entity: WsEntityModel;
  type: OrganizationRelationType;
  since?: Date;
  end?: Date;
  organizationName?: string;
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


export interface OrganizationCreate {
  entityId?: number;
  name: I18nText;
  description?: I18nText;
  relation?: OrganizationRelationType;
  relationSince?: Date;
  countryId?: number;
}

export interface OrganizationRelationCreate {
  organization: number;
  entity: number;
  type: OrganizationRelationType;
  since?: Date;
}

export interface LogoRequest {
  image_id: number;
  thumbnail_hash: string;
}

export interface Logo {
  id: number;
  image_id: number;
  thumbnail_hash: string;
  thumbnail?: string;
  links?: Array<Link>;
}
