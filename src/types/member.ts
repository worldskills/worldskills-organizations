import {Link, List} from './common';
import {I18nText} from '@worldskills/worldskills-angular-lib';
import {OrgEntity} from './entity';
import {Membership, MembershipRequest} from './membership';
import {Contact} from './contact';
import {Address} from './address';
import {Phone} from './phone';
import {SocialNetwork} from './socialNetwork';
import {Organization} from './organization';
import {OrgWebsite as Website} from './website';

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
  name?: I18nText;
  name_1058?: I18nText;
  ws_entity?: OrgEntity;
  organization?: number;
  member_of?: MembershipRequest;
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
  name: I18nText;
  name_1058: I18nText;
  ws_entity: OrgEntity;
  organization: Organization;
  orgHistory?: Organization[];
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
