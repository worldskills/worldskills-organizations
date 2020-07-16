import {I18nModel} from '@worldskills/worldskills-angular-lib';
import {OrgEntity} from './entity';

export interface MembershipRequest {
  id?: number;
  status: string;
  year_joined: number;
}

export interface Membership extends MembershipRequest {
  name: I18nModel;
  ws_entity: OrgEntity;
}
