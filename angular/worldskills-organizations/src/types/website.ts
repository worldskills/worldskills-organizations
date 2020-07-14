export interface WebsiteRequest {
  description: string;
  url: string;
}

export interface Website extends WebsiteRequest {
  id: number;
  description: string;
  url: string;
}
