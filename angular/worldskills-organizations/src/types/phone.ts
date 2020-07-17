import {I18nModel} from '@worldskills/worldskills-angular-lib';
import {PhoneType} from './phoneType';

export interface PhoneCountry {
  id: number;
  code: string;
  name: I18nModel;
  prefix: string;
}

export interface PhoneRequest {
  country: number;
  phone_number: string;
  type: number;
}

export interface Phone {
  id: number;
  phone_type: PhoneType;
  phone_number: string;
  country: PhoneCountry;
}
