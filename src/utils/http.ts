import {HttpParams} from '@angular/common/http';
import {Link} from '../types/common';
import {FetchParams} from '@worldskills/worldskills-angular-lib';

export function httpParamsFromFetchParams(fetchParams: FetchParams): HttpParams {
  let params = new HttpParams();
  if (fetchParams) {
    if (fetchParams.limit) {
      params = params.set('limit', fetchParams.limit + '');
    }
    if (fetchParams.offset) {
      params = params.set('offset', fetchParams.offset + '');
    }
    if (fetchParams.l) {
      params = params.set('l', fetchParams.l);
    }
    if (fetchParams.sort) {
      params = params.set('sort', fetchParams.sort);
    }
  }
  return params;
}

export function fetchLink<T extends string = null>(linkable: { links: Array<Link<T>> }, key: string): Array<Link<T>> {
  return linkable.links.filter(link => link.rel === key);
}