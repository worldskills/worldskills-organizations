import {SocialNetworkType} from './socialNetworkType';

export interface ProfileSocialNetworkRequest {
  network: SocialNetworkType;
  person_value: string;
}

export interface ProfileSocialNetwork extends ProfileSocialNetworkRequest {
  id: number;
  network: SocialNetworkType;
}

export interface SocialNetworkRequest {
  social_network: number;
  social_network_identifier: string;
}

export interface SocialNetwork {
  id: number;
  social_network: SocialNetworkType;
  social_network_identifier: string;
}

