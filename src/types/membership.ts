import {I18nText} from '@worldskills/worldskills-angular-lib';
import {OrgEntity} from './entity';

export interface MembershipRequest {
  id?: number;
  status: string;
  year_joined: number;
  end?: Date;
  created?: Date;
  updated?: Date;
}

export interface Membership extends MembershipRequest {
  name: I18nText;
  ws_entity: OrgEntity;
}
