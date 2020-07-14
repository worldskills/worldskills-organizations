import {List} from './common';

export interface SocialNetworkType {
  name: string;
  id: number;
}

export interface SocialNetworkRequest {
  network: SocialNetworkType;
  person_value: string;
}

export interface SocialNetwork extends SocialNetworkRequest {
  id: number;
  network: SocialNetworkType;
}

export type SocialNetworkList = List<SocialNetworkType, 'socialNetworks'>;
