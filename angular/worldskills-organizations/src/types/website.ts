import {I18nModel} from '@worldskills/worldskills-angular-lib';

export interface WebsiteRequest {
  description: string;
  url: string;
}

export interface Website extends WebsiteRequest {
  id: number;
  description: string;
  url: string;
}

export interface OrgWebsiteRequest {
  description: I18nModel;
  name: I18nModel;
  url: string;
}

export interface OrgWebsite extends OrgWebsiteRequest {
  id: number;
}
