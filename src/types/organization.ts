import {I18nText} from '@worldskills/worldskills-angular-lib';
import {Phone} from './phone';
import {Address} from './address';
import {Link, List} from './common';
import {OrgWebsite as Website} from './website';

export interface MemberOrganizationRequest {
  id: number;
}

export interface OrganizationRequest {
  name: I18nText;
}

export interface Organization {
  id: number;
  legacyId?: number;
  name: I18nText;
  websites: Array<Website>;
  phones: Array<Phone>;
  addresses: Array<Address>;
  links: Array<Link>;
}

export type OrganizationList = List<Organization, 'org_list'>;
