import {Link, List} from './common';
import {I18nModel} from '@worldskills/worldskills-angular-lib';

export interface WsEntity {
  id: number;
  name: I18nModel;
  parent: WsEntity;
  links: Array<Link>;
}

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

export interface MemberOf {
  id: number;
  name: I18nModel;
  ws_entity: WsEntity;
  status: string;
  year_joined: number;
}

export interface PhoneType {
  id: number;
  name: string;
}

export interface Country {
  id: number;
  code: string;
  name: I18nModel;
  prefix: string;
}

export interface Phone {
  id: number;
  phone_type: PhoneType;
  phone_number: string;
  country: Country;
}

export interface AddressCountryMember {
  id: number;
  code: string;
  name: I18nModel;
}

export interface AddressCountry {
  id: number;
  code: string;
  name: I18nModel;
  phone_prefix: string;
  member: AddressCountryMember;
}

export interface Address {
  id: number;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  city: string;
  zip_code: string;
  country: AddressCountry;
}

export interface Contact {
  id: number;
  person_id: number;
  first_name: string;
  last_name: string;
  email: string;
}

export interface SocialNetwork {
  id: number;
  name: string;
}

export interface MemberSocialNetwork {
  id: number;
  social_network: SocialNetwork;
  social_network_identifier: string;
}

export interface Flag {
  id: number;
  image_id: number;
  thumbnail_hash: string;
  thumbnail: string;
  links: Array<Link>;
}

export interface Member {
  id: number;
  code: string;
  name: I18nModel;
  name_1058: I18nModel;
  ws_entity: WsEntity;
  organization: Organization;
  member_of: Array<MemberOf>;
  websites: Array<Website>;
  phones: Array<Phone>;
  addresses: Array<Address>;
  contacts: Array<Contact>;
  social_networks: Array<MemberSocialNetwork>;
  flag: Flag;
  links: Array<Link>;
}

export type MemberList = List<Member, 'members'>;
