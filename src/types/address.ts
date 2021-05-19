import {I18nText} from '@worldskills/worldskills-angular-lib';
import { AddressType } from './address-type';

export interface AddressCountryMember {
  id: number;
  code: string;
  name: I18nText;
}

export interface AddressCountry {
  id: number;
  code: string;
  name: I18nText;
  phone_prefix: string;
  member: AddressCountryMember;
}

export interface AddressRequest {
  city: string;
  country: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  zip_code: string;
  type: AddressType;
  attention: string;
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
  type: AddressType;
  attention: string;
}
