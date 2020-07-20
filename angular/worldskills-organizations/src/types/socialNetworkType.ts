import {List} from './common';

export interface SocialNetworkType {
  name: string;
  id: number;
}

export type SocialNetworkTypeList = List<SocialNetworkType, 'socialNetworks'>;
