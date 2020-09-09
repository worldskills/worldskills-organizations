import {I18nText} from '@worldskills/worldskills-angular-lib';
import {List} from './common';

export interface CountryMember {
  id: number;
  code: string;
  name: I18nText;
}

export interface CountryRequest {
  code: string;
  member: number;
  name: I18nText;
  phone_prefix: string;
}

export interface Country {
  id: number;
  code: string;
  name: I18nText;
  phone_prefix: string;
  member: CountryMember;
}

export type CountryList = List<Country, 'country_list'>;
