import {I18nModel} from '@worldskills/worldskills-angular-lib';
import {List} from './common';

export interface CountryMember {
  id: number;
  code: string;
  name: I18nModel;
}

export interface CountryRequest {
  code: string;
  member: number;
  name: I18nModel;
  phone_prefix: string;
}

export interface Country {
  id: number;
  code: string;
  name: I18nModel;
  phone_prefix: string;
  member: CountryMember;
}

export type CountryList = List<Country, 'country_list'>;
