import {Link, List} from './common';
import {I18nModel} from '@worldskills/worldskills-angular-lib';
import {OrgEntity} from './entity';
import {Membership} from './membership';
import {Contact} from './contact';
import {Address} from './address';
import {Phone} from './phone';
import {SocialNetwork} from './socialNetwork';

export interface Website {
  id: number;
  url: string;
  name: I18nModel;
  description: I18nModel;
}

export interface Organization {
  id: number;
  legacyId?: number;
  name: I18nModel;
  websites: Array<Website>;
  phones: Array<Phone>;
  addresses: Array<Address>;
  links: Array<Link>;
}

export interface FlagRequest {
  image_id: number;
  thumbnail_hash: string;
}

export interface Flag {
  id: number;
  image_id: number;
  thumbnail_hash: string;
  thumbnail: string;
  links: Array<Link>;
}

export interface MemberRequest {
  code?: string;
  name?: I18nModel;
  name_1058?: I18nModel;
  ws_entity?: OrgEntity;
  organization?: Organization;
  member_of?: Array<Membership>;
  websites?: Array<Website>;
  phones?: Array<Phone>;
  addresses?: Array<Address>;
  contacts?: Array<Contact>;
  social_networks?: Array<SocialNetwork>;
  flag?: FlagRequest;
}

export interface Member {
  id: number;
  code: string;
  name: I18nModel;
  name_1058: I18nModel;
  ws_entity: OrgEntity;
  organization: Organization;
  member_of: Array<Membership>;
  websites: Array<Website>;
  phones: Array<Phone>;
  addresses: Array<Address>;
  contacts: Array<Contact>;
  social_networks: Array<SocialNetwork>;
  flag: Flag;
  links: Array<Link>;
}

export type MemberList = List<Member, 'members'>;
