import {I18nModel} from '@worldskills/worldskills-angular-lib';

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

export interface AddressRequest {
  city: string;
  country: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  zip_code: string;
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
