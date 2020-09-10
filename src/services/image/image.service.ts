import {Injectable} from '@angular/core';
import {HttpRequest} from '@angular/common/http';

import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  httpRequest(file: File, url: string = null): HttpRequest<FormData> {
    const formData = new FormData();
    formData.append('file', file);
    return new HttpRequest('POST', url ?? environment.worldskillsApiImages, formData, {
      responseType: 'json',
      reportProgress: true
    });
  }

}
