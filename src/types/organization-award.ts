import {Award, OrganizationAward} from '@worldskills/worldskills-angular-lib';

export interface OrganizationAwardRequest {
  organization_id?: number;
  award?: Award;
  presented_at?: string;
  extra_information?: string;
  last_updated?: string;
}

export interface OrganizationAwardContainer {
  organization_awards: OrganizationAward[];
}
