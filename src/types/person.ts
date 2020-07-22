import {I18nModel} from '@worldskills/worldskills-angular-lib';
import {AuthEntity} from './entity';
import {Link, List} from './common';

export interface Title {
  id: number;
  abbreviation: string;
  text: string;
}

export interface PersonMemberOrganization {
  id: number;
  name: I18nModel;
  organization?: any;
  legacy_id?: any;
}

export interface Flag {
  id: number;
  thumbnail_hash: string;
  thumbnail?: any;
}

export interface PersonCountryMember {
  id: number;
  code: string;
  name: I18nModel;
  entity: AuthEntity;
  organization: PersonMemberOrganization;
  flag: Flag;
}

export interface PersonCountry {
  id: number;
  abbreviation: string;
  name: I18nModel;
  member: PersonCountryMember;
  phonePrefix: string;
}

export interface EmailAddressType {
  id: number;
  name: string;
  primary: boolean;
}

export interface EmailAddress {
  id: number;
  person_id: number;
  email_address: string;
  type: EmailAddressType;
}

export interface BasePositionType {
  name: string;
}

export interface BasePosition {
  id: number;
  short_name: string;
  name: I18nModel;
  parent?: any;
  type: BasePositionType;
}

export interface Position {
  id: number;
  short_name: string;
  name: I18nModel;
  ws_entity: AuthEntity;
  base_position: BasePosition;
  hidden: boolean;
  num_active?: any;
}

export interface PersonPositionMember {
  id: number;
  code: string;
  name: I18nModel;
  entity: AuthEntity;
  organization: PersonMemberOrganization;
  flag: Flag;
}

export interface PersonPosition {
  id: number;
  position: Position;
  event?: any;
  skill?: any;
  sector?: any;
  member: PersonPositionMember;
  timestamp_start: Date;
  timestamp_end?: any;
  open_field?: any;
  invalid: boolean;
}

export interface PersonImage {
  id: number;
  person_id: number;
  image_id: number;
  thumbnail_hash: string;
  ws_entity?: any;
  modified: string;
  thumbnail: string;
  type: string;
  links: Array<Link>;
}

export interface Person {
  id: number;
  title: Title;
  first_name: string;
  last_name: string;
  date_of_birth?: any;
  gender?: any;
  country: PersonCountry;
  email_addresses: Array<EmailAddress>;
  addresses: Array<any>;
  organizations: Array<PersonMemberOrganization>;
  positions: Array<PersonPosition>;
  images: Array<PersonImage>;
  training_complete: boolean;
  entities: Array<AuthEntity>;
  deceased: boolean;
}

export type PersonList = List<Person, 'people'>;
