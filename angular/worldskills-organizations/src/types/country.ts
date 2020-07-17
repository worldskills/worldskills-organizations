import {I18nModel} from '@worldskills/worldskills-angular-lib';
import {List} from './common';

export interface Member {
  id: number;
  code: string;
  name: I18nModel;
}

export interface Country {
  id: number;
  code: string;
  name: I18nModel;
  phone_prefix: string;
  member: Member;
}

export type CountryList = List<Country, 'country_list'>;
