import {I18nText} from '@worldskills/worldskills-angular-lib';

export interface WebsiteRequest {
  description?: string;
  url: string;
}

export interface Website extends WebsiteRequest {
  id: number;
  description: string;
  url: string;
}

export interface OrgWebsiteRequest {
  description?: I18nText;
  name?: I18nText;
  url: string;
}

export interface OrgWebsite extends OrgWebsiteRequest {
  id: number;
}
