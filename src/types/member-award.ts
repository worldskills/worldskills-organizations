import {Award, MemberAward} from "@worldskills/worldskills-angular-lib";

export interface MemberAwardRequest {
  member_id?: number;
  award?: Award;
  presented_at?: string;
  extra_information?: string;
  last_updated?: string;
}

export interface MemberAwardContainer {
  member_awards: MemberAward[];
}
