import {List} from './common';

export interface PhoneType {
  id: number;
  name: string;
}

export type PhoneTypeList = List<PhoneType, 'phone_types'>;
