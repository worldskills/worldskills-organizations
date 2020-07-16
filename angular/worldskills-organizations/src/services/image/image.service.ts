import {Injectable} from '@angular/core';
import {
  FetchParams,
  FULL,
  MulticastOptions,
  RequestOptions,
  WsService,
  WsServiceRequestP1,
  WsServiceRequestP2,
  WsServiceRequestP3
} from '@worldskills/worldskills-angular-lib';
import {Image, ImageRequest} from '../../types/image';
import {HttpClient, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {httpParamsFromFetchParams} from '../../utils/http';
import {environment} from '../../environments/environment';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ImageService extends WsService<string | Image> {

  constructor(private http: HttpClient) {
    super();
  }

  create(file: File, rOpt?: RequestOptions): Observable<Image>;
  create(file: File, params: FetchParams, rOpt?: RequestOptions): Observable<Image>;
  create(file: File, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Image>;
  create(file: File, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Image>;
  create(file: File, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3): Observable<Image> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const formData = new FormData();
    formData.append('file', file);
    const observable = this.http.post<Image>(
      requestOptions.url ?? environment.worldskillsApiImages, formData, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions) as Observable<Image>;
  }

  httpRequest(file: File, url: string = null): HttpRequest<FormData> {
    const formData = new FormData();
    formData.append('file', file);
    return new HttpRequest('POST', url ?? environment.worldskillsApiImages, formData, {
      responseType: 'json',
      reportProgress: true
    });
  }

  fetch(imageId: number, thumbnailHash: string, rOpt?: RequestOptions): Observable<Image>;
  fetch(imageId: number, thumbnailHash: string, params: FetchParams, rOpt?: RequestOptions): Observable<Image>;
  fetch(imageId: number, thumbnailHash: string, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Image>;
  fetch(imageId: number, thumbnailHash: string, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Image>;
  fetch(
    imageId: number, thumbnailHash: string, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3
  ): Observable<Image> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get<Image>(
      requestOptions.url ?? `${environment.worldskillsApiImages}/${imageId}/${thumbnailHash}`, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions) as Observable<Image>;
  }

  fetchBase64(imageId: number, thumbnailHash: string, rOpt?: RequestOptions): Observable<string>;
  fetchBase64(imageId: number, thumbnailHash: string, params: FetchParams, rOpt?: RequestOptions): Observable<string>;
  fetchBase64(imageId: number, thumbnailHash: string, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<string>;
  fetchBase64(
    imageId: number, thumbnailHash: string, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<string>;
  fetchBase64(
    imageId: number, thumbnailHash: string, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3
  ): Observable<string> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.get(
      requestOptions.url ?? `${environment.worldskillsApiImages}/${imageId}/${thumbnailHash}/base64`, {
        params,
        responseType: 'text'
      }
    ).pipe(share());
    return this.request(observable, multicastOptions) as Observable<string>;
  }

  clone(imageId: number, thumbnailHash: string, image: ImageRequest, rOpt?: RequestOptions): Observable<Image>;
  clone(imageId: number, thumbnailHash: string, image: ImageRequest, params: FetchParams, rOpt?: RequestOptions): Observable<Image>;
  clone(imageId: number, thumbnailHash: string, image: ImageRequest, mOpt: MulticastOptions, rOpt?: RequestOptions): Observable<Image>;
  clone(
    imageId: number, thumbnailHash: string, image: ImageRequest, params: FetchParams, mOpt: MulticastOptions, rOpt?: RequestOptions
  ): Observable<Image>;
  clone(
    imageId: number, thumbnailHash: string, image: ImageRequest, p1: WsServiceRequestP1, p2?: WsServiceRequestP2, p3?: WsServiceRequestP3
  ): Observable<Image> {
    const {fetchParams, multicastOptions, requestOptions} = this.resolveArgs(p1, p2, p3, FULL);
    const params = httpParamsFromFetchParams(fetchParams);
    const observable = this.http.post<Image>(
      requestOptions.url ?? `${environment.worldskillsApiImages}/${imageId}/${thumbnailHash}/clone`, image, {params}
    ).pipe(share());
    return this.request(observable, multicastOptions) as Observable<Image>;
  }

}
